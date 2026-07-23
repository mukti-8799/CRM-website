/**
 * Plexus Network Background
 * - Bold black dots + connecting lines
 * - Page 1: RIGHT-TOP → LEFT-BOTTOM  ( \ )
 * - Page 2: LEFT-TOP  → RIGHT-BOTTOM ( / )
 * - Alternates every viewport-height section
 * - SMOOTH CROSSFADE transition between sections on scroll
 */
(function () {
  'use strict';

  const canvas = document.getElementById('plexus-canvas');
  const ctx    = canvas.getContext('2d');

  let VW, VH;

  function resizeCanvas() {
    VW = canvas.width  = window.innerWidth;
    VH = canvas.height = window.innerHeight;
  }
  resizeCanvas();

  /* ── Scroll ─────────────────────────────────────────── */
  let scrollY = window.scrollY || 0;
  window.addEventListener('scroll', () => { scrollY = window.scrollY || 0; }, { passive: true });

  function pageHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, VH);
  }

  /* ── Config ─────────────────────────────────────────── */
  const STRIP_WIDTH  = 200;
  const LINE_DIST    = 160;
  const DOT_COUNT    = 68;
  const SPEED        = 0.28;
  const FADE_ZONE    = 0.28;  // fraction of VH over which crossfade happens (0–0.5)

  /* ── Strip geometry ─────────────────────────────────── */
  function getAxis(si) {
    let dx, dy;
    if (si % 2 === 0) { dx = -VW; dy = VH; }   // \ right-top → left-bottom
    else               { dx =  VW; dy = VH; }   // / left-top  → right-bottom

    const len = Math.sqrt(dx * dx + dy * dy);
    const lx  = dx / len;
    const ly  = dy / len;
    const nx  = -ly;
    const ny  =  lx;
    return { lx, ly, nx, ny, cx: VW / 2, cy: VH / 2, len };
  }

  function perpDist(px, py, ax) {
    return (px - ax.cx) * ax.nx + (py - ax.cy) * ax.ny;
  }

  /* ── Particle ───────────────────────────────────────── */
  function Particle(si) {
    this.si = si;
    this.reset();
  }

  Particle.prototype.reset = function () {
    const ax   = getAxis(this.si);
    const t    = (Math.random() - 0.5) * ax.len;
    const perp = (Math.random() - 0.5) * 2 * STRIP_WIDTH;

    this.x = ax.cx + ax.lx * t + ax.nx * perp;
    this.y = ax.cy + ax.ly * t + ax.ny * perp;

    const driftAlong = (Math.random() - 0.5) * SPEED * 2;
    const driftPerp  = (Math.random() - 0.5) * SPEED * 0.5;
    this.vx = ax.lx * driftAlong + ax.nx * driftPerp;
    this.vy = ax.ly * driftAlong + ax.ny * driftPerp;

    this.r = 3.0 + Math.random() * 3.2;
  };

  Particle.prototype.update = function () {
    const ax = getAxis(this.si);

    const pd = perpDist(this.x, this.y, ax);
    if (Math.abs(pd) > STRIP_WIDTH * 0.82) {
      const force = 0.05 * (Math.abs(pd) - STRIP_WIDTH * 0.82) / STRIP_WIDTH;
      this.vx -= ax.nx * pd * force;
      this.vy -= ax.ny * pd * force;
    }

    const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (spd > SPEED * 1.5) {
      this.vx = (this.vx / spd) * SPEED * 1.5;
      this.vy = (this.vy / spd) * SPEED * 1.5;
    }

    this.x += this.vx;
    this.y += this.vy;

    const t    = (this.x - ax.cx) * ax.lx + (this.y - ax.cy) * ax.ly;
    const half = ax.len / 2 + STRIP_WIDTH;
    if (t >  half) { this.x -= ax.lx * ax.len; this.y -= ax.ly * ax.len; }
    if (t < -half) { this.x += ax.lx * ax.len; this.y += ax.ly * ax.len; }
  };

  /* ── Sections store ─────────────────────────────────── */
  let sections = [];

  function ensureSection(si) {
    if (sections[si]) return;
    const group = [];
    for (let k = 0; k < DOT_COUNT; k++) group.push(new Particle(si));
    sections[si] = group;
  }

  function rebuildAll() {
    const nSec = Math.ceil(pageHeight() / VH) + 2;
    sections = [];
    for (let i = 0; i < nSec; i++) ensureSection(i);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    rebuildAll();
  }, { passive: true });

  /* ── Draw one section group with a given global alpha ── */
  function drawGroup(group, globalAlpha) {
    if (!group || globalAlpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = globalAlpha;

    // Lines
    for (let i = 0; i < group.length; i++) {
      const p = group[i];
      for (let j = i + 1; j < group.length; j++) {
        const q  = group[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < LINE_DIST) {
          const alpha = (1 - d / LINE_DIST) * 0.68;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(10,10,10,${alpha})`;
          ctx.lineWidth   = 1.1;
          ctx.stroke();
        }
      }
    }

    // Dots
    for (let i = 0; i < group.length; i++) {
      const p = group[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(8,8,8,0.88)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 0.30, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.65)';
      ctx.fill();
    }

    ctx.restore();
  }

  /* ── Draw loop ──────────────────────────────────────── */
  function draw() {
    ctx.clearRect(0, 0, VW, VH);

    /*
      scrollY within a section:
        progress = (scrollY % VH) / VH   → 0 … 1

      Crossfade zone = last FADE_ZONE fraction of each section.

      If progress < (1 - FADE_ZONE):  show current section only  (alpha = 1)
      If progress >= (1 - FADE_ZONE): crossfade current → next
        fadeT = (progress - (1-FADE_ZONE)) / FADE_ZONE   → 0 … 1
        current alpha = 1 - fadeT
        next    alpha = fadeT
    */

    const si       = Math.floor(scrollY / VH);
    const progress = (scrollY % VH) / VH;
    const fadeStart = 1 - FADE_ZONE;

    ensureSection(si);
    ensureSection(si + 1);

    // Update both sections' particles every frame so they keep moving
    const cur  = sections[si];
    const next = sections[si + 1];

    for (let i = 0; i < cur.length;  i++) cur[i].update();
    for (let i = 0; i < next.length; i++) next[i].update();

    if (progress < fadeStart) {
      // Fully in current section
      drawGroup(cur, 1.0);
    } else {
      // Crossfading
      const fadeT = (progress - fadeStart) / FADE_ZONE;
      const eased = fadeT * fadeT * (3 - 2 * fadeT);  // smoothstep
      drawGroup(cur,  1 - eased);
      drawGroup(next, eased);
    }

    requestAnimationFrame(draw);
  }

  /* ── Start ──────────────────────────────────────────── */
  function start() {
    rebuildAll();
    draw();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(start, 80));
  } else {
    setTimeout(start, 80);
  }

})();
