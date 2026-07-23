/**
 * Particle Network Background
 * Animated dots connected by lines, cursor-reactive
 */
(function () {
  'use strict';

  /* ── Config ─────────────────────────────────────────── */
  const CFG = {
    particleCount : 90,
    dotRadius      : 2.5,
    maxSpeed       : 0.55,
    lineDistance   : 140,
    cursorRadius   : 160,
    cursorAttract  : 0.012,
    bgColor        : null,          // transparent — use CSS background
    dotColor       : null,          // set per-particle from palette
    lineColor      : 'rgba(26,107,92,',   // teal base for lines
    cursorDotColor : 'rgba(26,107,92,0.9)',
    cursorLineColor: 'rgba(42,157,143,',
  };

  // Teal dot palette matching the new theme
  const DOT_PALETTE = [
    '26,107,92',    // dark teal
    '42,157,143',   // teal
    '224,112,96',   // coral/peach
    '168,200,192',  // light teal
    '20,87,73',     // deep teal
    '200,165,155',  // warm peach
    '82,170,155',   // mid teal
  ];

  /* ── Setup canvas ───────────────────────────────────── */
  const canvas = document.getElementById('plexus-canvas');
  const ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  /* ── Cursor tracking ────────────────────────────────── */
  const mouse = { x: -9999, y: -9999, active: false };

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  }, { passive: true });

  window.addEventListener('mouseleave', () => { mouse.active = false; });

  /* ── Particle class ─────────────────────────────────── */
  function Particle(w, h) {
    this.reset(w, h);
  }

  Particle.prototype.reset = function (w, h) {
    this.x  = Math.random() * w;
    this.y  = Math.random() * h;
    this.vx = (Math.random() - 0.5) * CFG.maxSpeed * 2;
    this.vy = (Math.random() - 0.5) * CFG.maxSpeed * 2;
    this.r  = CFG.dotRadius + Math.random() * 1.2;
    this.opacity = 0.5 + Math.random() * 0.5;
    this.color = DOT_PALETTE[Math.floor(Math.random() * DOT_PALETTE.length)];
  };

  Particle.prototype.update = function (w, h) {
    // Cursor attraction
    if (mouse.active) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CFG.cursorRadius) {
        const force = (CFG.cursorRadius - dist) / CFG.cursorRadius;
        this.vx += dx / dist * force * CFG.cursorAttract;
        this.vy += dy / dist * force * CFG.cursorAttract;
      }
    }

    // Clamp speed
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > CFG.maxSpeed) {
      this.vx = (this.vx / speed) * CFG.maxSpeed;
      this.vy = (this.vy / speed) * CFG.maxSpeed;
    }

    this.x += this.vx;
    this.y += this.vy;

    // Wrap edges
    if (this.x < -10) this.x = w + 10;
    if (this.x > w + 10) this.x = -10;
    if (this.y < -10) this.y = h + 10;
    if (this.y > h + 10) this.y = -10;
  };

  /* ── Build particle array ───────────────────────────── */
  let particles = [];

  function buildParticles() {
    particles = [];
    const count = Math.floor(
      CFG.particleCount * (canvas.width * canvas.height) / (1440 * 900)
    );
    const n = Math.max(40, Math.min(count, 200));
    for (let i = 0; i < n; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }
  }

  buildParticles();
  window.addEventListener('resize', buildParticles, { passive: true });

  /* ── Draw loop ──────────────────────────────────────── */
  function draw() {
    const W = canvas.width;
    const H = canvas.height;

    // Background — clear to transparent
    ctx.clearRect(0, 0, W, H);

    // Update + draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.update(W, H);

      // Draw dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.opacity})`;
      ctx.fill();

      // Draw lines to nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx   = p.x - q.x;
        const dy   = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CFG.lineDistance) {
          const alpha = (1 - dist / CFG.lineDistance) * 0.45;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(${p.color},${alpha})`;
          ctx.lineWidth   = 0.8;
          ctx.stroke();
        }
      }

      // Lines from particle to cursor
      if (mouse.active) {
        const dx   = p.x - mouse.x;
        const dy   = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CFG.cursorRadius) {
          const alpha = (1 - dist / CFG.cursorRadius) * 0.75;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = CFG.cursorLineColor + alpha + ')';
          ctx.lineWidth   = 1;
          ctx.stroke();
        }
      }
    }

    // Cursor dot
    if (mouse.active) {
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = CFG.cursorDotColor;
      ctx.fill();

      // Cursor pulse ring
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 12, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(180,130,255,0.25)';
      ctx.lineWidth   = 1.5;
      ctx.stroke();
    }

    requestAnimationFrame(draw);
  }

  draw();
})();
