import React, { useEffect } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Features = () => {
  useEffect(() => {
      // Injected from d:/demo/features.js
      // Features Page — Error Infotech CRM
'use strict';

setTimeout(() => {

  // ── 1. Scroll Reveal (reuse homepage class pattern) ──────────
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObs.observe(el));

  // ── 2. Sticky nav pill active state on scroll ─────────────────
  const sections = document.querySelectorAll('[id^="fp-"]');
  const pills    = document.querySelectorAll('.fp-pill');
  const stickyH  = 130;

  const secObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        pills.forEach(p => {
          p.classList.toggle('fp-pill-active', p.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: `-${stickyH}px 0px -55% 0px` });
  sections.forEach(s => secObs.observe(s));

  // Smooth scroll for pills
  pills.forEach(pill => {
    pill.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(pill.getAttribute('href'));
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - stickyH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── 3. Animated counters ──────────────────────────────────────
  function animateCounter(el) {
    const target  = parseFloat(el.dataset.target);
    const suffix  = el.dataset.suffix || '';
    const isFloat = String(target).includes('.');
    const dur     = 1800;
    const start   = performance.now();

    function tick(now) {
      const p   = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const val  = target * ease;
      el.textContent = (isFloat ? val.toFixed(1) : Math.round(val)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = '1';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

  // ── 4. Chart line draw on scroll ─────────────────────────────
  const chartObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.fp-chart-line').forEach(line => {
          line.style.animation = 'drawLine 2s cubic-bezier(0.4,0,0.2,1) forwards';
        });
        entry.target.querySelectorAll('.fp-chart-area').forEach(area => {
          area.style.animation = 'fadeIn 1.5s ease 0.8s forwards';
        });
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.fp-dash-chart, .fp-bento-lg').forEach(el => chartObs.observe(el));

  // ── 5. Bento bars and bar chart animate on scroll ────────────
  const bentoObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.fp-bento-bar').forEach(bar => bar.classList.add('animated'));
        entry.target.querySelectorAll('.fp-bar-fill').forEach(bar => bar.classList.add('animated'));
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.fp-bento-grid').forEach(el => bentoObs.observe(el));

  // ── 6. Mouse parallax tilt on hero dashboard ─────────────────
  const dash = document.querySelector('.fp-dashboard');
  if (dash) {
    document.addEventListener('mousemove', e => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      dash.style.transform = `perspective(900px) rotateY(${dx * 4}deg) rotateX(${dy * -3}deg)`;
    });
  }

  // ── 7. Mobile toggle (same as homepage) ──────────────────────
  const mobileBtn = document.getElementById('mobileToggleBtn');
  const navLinks  = document.getElementById('navLinks');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      mobileBtn.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });
  }

  // ── 8. showToast (reuse if not defined by script.js) ─────────
  if (typeof showToast !== 'function') {
    window.showToast = function(msg) {
      const t = document.createElement('div');
      t.className = 'toast-item';
      t.textContent = msg;
      Object.assign(t.style, {
        background:'#1a6b5c', color:'white', padding:'0.75rem 1.25rem',
        borderRadius:'12px', fontSize:'0.875rem', fontWeight:'600',
        boxShadow:'0 8px 24px rgba(26,107,92,0.3)',
        animation:'toastIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards'
      });
      let container = document.querySelector('.toast-container');
      if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
      }
      container.appendChild(t);
      setTimeout(() => t.remove(), 3000);
    };
  }

});

    }, []);

  return (
    <>
      
  <ParticleBackground />

  {/*  Navbar (same as homepage)  */}
  <div className="navbar-wrapper">
    <div className="container">
      <nav className="navbar">
        <a href="index.html" className="navbar-brand">
          <img src="logo.png" alt="ERROR Infotech Pvt Ltd" className="brand-logo brand-logo--nav" />
        </a>
        <ul className="nav-links" id="navLinks">
          <li><a href="index.html#features" className="nav-link">Features</a></li>
          <li><a href="index.html#process" className="nav-link">Process</a></li>
          <li><a href="index.html#testimonials" className="nav-link">Testimonials</a></li>
          <li><a href="index.html#pricing" className="nav-link">Pricing</a></li>
          <li><a href="#" className="nav-link"><span>Resources</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </a></li>
        </ul>
        <div className="nav-actions">
          <button className="btn-ghost" onClick="showToast('Redirecting to login portal...')">Log in</button>
          <button className="btn-primary" onClick="showToast('Starting 14-day free trial!')">
            <span>Start Free Trial</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
        <button className="mobile-toggle" id="mobileToggleBtn" aria-label="Toggle navigation">☰</button>
      </nav>
    </div>
  </div>

  {/*  SECTION 1: Hero  */}
  <section className="fp-hero">
    <div className="container">
      <div className="fp-hero-grid">
        <div className="fp-hero-left reveal">
          <span className="fp-eyebrow">Platform Overview</span>
          <h1 className="fp-hero-title">Everything Your<br />Sales Team Needs.<br /><span className="fp-accent">Powered by<br />Intelligent CRM.</span></h1>
          <p className="fp-hero-desc">One unified platform that maps relationships, predicts revenue, automates follow-ups, and helps your team close faster — without the complexity.</p>
          <div className="fp-hero-btns">
            <button className="btn-primary btn-lg" onClick="showToast('Exploring features...')">
              <span>Explore Features</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
            <button className="btn-outline-glass btn-lg" onClick="showToast('Opening demo calendar...')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <span>Book Demo</span>
            </button>
          </div>
        </div>
        <div className="fp-hero-right reveal">
          <div className="fp-dashboard">
            <div className="fp-dash-header">
              <div className="window-dots"><div className="dot dot-red"></div><div className="dot dot-yellow"></div><div className="dot dot-green"></div></div>
              <span style={{fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600'}}>Error Infotech — Live Dashboard</span>
              <span style={{fontSize: '0.78rem', color: 'var(--text-muted)'}}>Q2 2026</span>
            </div>
            <div className="fp-dash-body">
              <div className="fp-dash-stats">
                <div className="fp-stat-box"><div className="fp-stat-label">Pipeline Value</div><div className="fp-stat-num" data-target="4.8" data-suffix="M">$0M</div><span className="stat-change">+22%</span></div>
                <div className="fp-stat-box"><div className="fp-stat-label">Win Rate</div><div className="fp-stat-num" data-target="68" data-suffix="%">0%</div><span className="stat-change">+9%</span></div>
                <div className="fp-stat-box"><div className="fp-stat-label">Deals Closed</div><div className="fp-stat-num" data-target="127" data-suffix="">0</div><span className="stat-change">+14%</span></div>
              </div>
              <div className="fp-dash-chart">
                <svg width="100%" height="90" viewBox="0 0 320 90" preserveAspectRatio="none">
                  <defs><linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a6b5c" stop-opacity="0.3"/><stop offset="100%" stop-color="#1a6b5c" stop-opacity="0"/></linearGradient></defs>
                  <path className="fp-chart-area" d="M0 70 Q40 50 80 55 T160 30 T240 20 T320 10 L320 90 L0 90 Z" fill="url(#chartGrad)"/>
                  <path className="fp-chart-line" d="M0 70 Q40 50 80 55 T160 30 T240 20 T320 10" fill="none" stroke="#1a6b5c" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="fp-dash-widgets">
                <div className="fp-widget fp-widget-float" style={{animationDelay: '0s'}}>
                  <div style={{fontSize: '0.72rem', color: '#6b7b74', marginBottom: '0.3rem'}}>AI Score</div>
                  <div style={{fontSize: '1.4rem', fontWeight: '800', color: '#1a6b5c'}}>94<span style={{fontSize: '0.8rem'}}>%</span></div>
                </div>
                <div className="fp-widget fp-widget-float" style={{animationDelay: '0.4s'}}>
                  <div style={{fontSize: '0.72rem', color: '#6b7b74', marginBottom: '0.3rem'}}>Hot Leads</div>
                  <div style={{fontSize: '1.4rem', fontWeight: '800', color: '#e07060'}}>38</div>
                </div>
                <div className="fp-widget fp-widget-float" style={{animationDelay: '0.8s'}}>
                  <div style={{fontSize: '0.72rem', color: '#6b7b74', marginBottom: '0.3rem'}}>Meetings</div>
                  <div style={{fontSize: '1.4rem', fontWeight: '800', color: '#1a1a1a'}}>12</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  SECTION 2: Sticky Feature Nav  */}
  <div className="fp-sticky-nav" id="fpStickyNav">
    <div className="container">
      <div className="fp-nav-pills">
        <a href="#fp-ai" className="fp-pill fp-pill-active">AI Assistant</a>
        <a href="#fp-pipeline" className="fp-pill">Pipeline</a>
        <a href="#fp-automation" className="fp-pill">Automation</a>
        <a href="#fp-analytics" className="fp-pill">Analytics</a>
        <a href="#fp-relationships" className="fp-pill">Relationships</a>
        <a href="#fp-integrations" className="fp-pill">Integrations</a>
        <a href="#fp-security" className="fp-pill">Security</a>
        <a href="#fp-mobile" className="fp-pill">Mobile</a>
      </div>
    </div>
  </div>

  {/*  SECTION 3: AI Assistant  */}
  <section className="fp-section fp-ai-section" id="fp-ai">
    <div className="container">
      <div className="fp-split-layout">
        <div className="fp-split-left reveal">
          <span className="fp-eyebrow fp-eyebrow-moss">AI Assistant</span>
          <h2 className="fp-section-title">AI That Thinks<br />Before You Do.</h2>
          <p className="fp-section-desc">Your intelligent sales companion that reads every conversation, predicts outcomes, and tells you exactly what to do next.</p>
          <ul className="fp-feature-list">
            <li className="fp-feature-item"><div className="fp-feat-icon"><svg viewBox="0 0 20 20" fill="none"><path d="M10 2L12 7H17L13 10L15 15L10 12L5 15L7 10L3 7H8Z" stroke="#1a6b5c" strokeWidth="1.5" fill="none"/></svg></div><div><strong>Meeting Summaries</strong><p>Auto-generates action items and next steps after every call.</p></div></li>
            <li className="fp-feature-item"><div className="fp-feat-icon"><svg viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="12" rx="2" stroke="#1a6b5c" strokeWidth="1.5"/><line x1="7" y1="9" x2="13" y2="9" stroke="#1a6b5c" strokeWidth="1.5" strokeLinecap="round"/><line x1="7" y1="12" x2="11" y2="12" stroke="#1a6b5c" strokeWidth="1.5" strokeLinecap="round"/></svg></div><div><strong>Email Generation</strong><p>Personalized outreach drafted in seconds, tuned to each prospect.</p></div></li>
            <li className="fp-feature-item"><div className="fp-feat-icon"><svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="#1a6b5c" strokeWidth="1.5"/><path d="M7 10l2 2 4-4" stroke="#1a6b5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div><div><strong>Lead Prediction</strong><p>Scores every lead with 94% accuracy using historical signals.</p></div></li>
            <li className="fp-feature-item"><div className="fp-feat-icon"><svg viewBox="0 0 20 20" fill="none"><path d="M4 15 L8 10 L12 12 L16 6" stroke="#1a6b5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div><div><strong>Opportunity Detection</strong><p>Surfaces hidden deals before your team even knows they exist.</p></div></li>
          </ul>
          <button className="btn-primary" onClick="showToast('Launching AI demo...')"><span>Try AI</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></button>
        </div>
        <div className="fp-split-right reveal">
          <div className="fp-ai-interface">
            <div className="fp-ai-header"><span className="fp-ai-dot"></span><span style={{fontSize: '0.8rem', fontWeight: '600', color: '#1a1a1a'}}>AI Copilot</span><span style={{fontSize: '0.72rem', color: '#6b7b74', marginLeft: 'auto'}}>Online</span></div>
            <div className="fp-ai-messages">
              <div className="fp-ai-msg fp-ai-system">Analyzing your pipeline for Q2 opportunities...</div>
              <div className="fp-ai-msg fp-ai-result">
                <strong>3 high-probability deals detected</strong>
                <p>Acme Corp — 89% close probability. Follow up within 24h.</p>
              </div>
              <div className="fp-ai-typing"><span></span><span></span><span></span></div>
            </div>
            <div className="fp-ai-suggestion-cards">
              <div className="fp-ai-card fp-card-float" style={{animationDelay: '0s'}}><span>📧</span> Draft follow-up email</div>
              <div className="fp-ai-card fp-card-float" style={{animationDelay: '0.3s'}}><span>📅</span> Schedule demo call</div>
              <div className="fp-ai-card fp-card-float" style={{animationDelay: '0.6s'}}><span>📊</span> View deal health</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  SECTION 4: Pipeline Management  */}
  <section className="fp-section fp-pipeline-section" id="fp-pipeline">
    <div className="container">
      <div className="fp-centered-header reveal">
        <span className="fp-eyebrow">Pipeline Management</span>
        <h2 className="fp-section-title">Your Deals, Always<br />In Motion.</h2>
        <p className="fp-section-desc" style={{maxWidth: '520px', margin: '0 auto'}}>A beautiful Kanban board that moves with your team. Drag, score, and close — all in one view.</p>
      </div>
      <div className="fp-kanban reveal">
        <div className="fp-kanban-col">
          <div className="fp-kanban-header"><span className="fp-kbadge fp-kb-lead">Lead</span><span className="fp-kcount">12</span></div>
          <div className="fp-kcard"><div className="fp-kcard-name">Acme Corp</div><div className="fp-kcard-val">$42,000</div><div className="fp-kbar"><div style={{width: '30%', background: '#1a6b5c', height: '100%', borderRadius: '4px'}}></div></div></div>
          <div className="fp-kcard"><div className="fp-kcard-name">BrightEdge</div><div className="fp-kcard-val">$18,500</div><div className="fp-kbar"><div style={{width: '20%', background: '#1a6b5c', height: '100%', borderRadius: '4px'}}></div></div></div>
        </div>
        <div className="fp-kanban-col">
          <div className="fp-kanban-header"><span className="fp-kbadge fp-kb-qual">Qualified</span><span className="fp-kcount">8</span></div>
          <div className="fp-kcard fp-kcard-hot"><div className="fp-kcard-name">Cloudix Inc</div><div className="fp-kcard-val">$86,000</div><div className="fp-kbar"><div style={{width: '55%', background: '#2a9d8f', height: '100%', borderRadius: '4px'}}></div></div><span className="fp-hot-tag">🔥 Hot</span></div>
          <div className="fp-kcard"><div className="fp-kcard-name">Penta Labs</div><div className="fp-kcard-val">$33,000</div><div className="fp-kbar"><div style={{width: '45%', background: '#2a9d8f', height: '100%', borderRadius: '4px'}}></div></div></div>
        </div>
        <div className="fp-kanban-col">
          <div className="fp-kanban-header"><span className="fp-kbadge fp-kb-prop">Proposal</span><span className="fp-kcount">5</span></div>
          <div className="fp-kcard"><div className="fp-kcard-name">InnovaCo</div><div className="fp-kcard-val">$124,000</div><div className="fp-kbar"><div style={{width: '70%', background: '#e07060', height: '100%', borderRadius: '4px'}}></div></div></div>
          <div className="fp-kcard fp-kcard-hot"><div className="fp-kcard-name">Nexus Financial</div><div className="fp-kcard-val">$200,000</div><div className="fp-kbar"><div style={{width: '65%', background: '#e07060', height: '100%', borderRadius: '4px'}}></div></div><span className="fp-hot-tag">⚡ Priority</span></div>
        </div>
        <div className="fp-kanban-col">
          <div className="fp-kanban-header"><span className="fp-kbadge fp-kb-neg">Negotiation</span><span className="fp-kcount">3</span></div>
          <div className="fp-kcard"><div className="fp-kcard-name">Orion SaaS</div><div className="fp-kcard-val">$95,000</div><div className="fp-kbar"><div style={{width: '85%', background: '#145749', height: '100%', borderRadius: '4px'}}></div></div></div>
        </div>
        <div className="fp-kanban-col">
          <div className="fp-kanban-header"><span className="fp-kbadge fp-kb-won">Won ✓</span><span className="fp-kcount">24</span></div>
          <div className="fp-kcard fp-kcard-won"><div className="fp-kcard-name">CloudScale</div><div className="fp-kcard-val">$180,000</div></div>
          <div className="fp-kcard fp-kcard-won"><div className="fp-kcard-name">Meridian Tech</div><div className="fp-kcard-val">$65,000</div></div>
        </div>
      </div>
    </div>
  </section>

  {/*  SECTION 5: Relationship Intelligence  */}
  <section className="fp-section fp-rel-section" id="fp-relationships">
    <div className="container">
      <div className="fp-split-layout fp-split-reverse">
        <div className="fp-split-right reveal">
          <div className="fp-rel-viz">
            <svg className="fp-rel-svg" viewBox="0 0 400 320" fill="none">
              {/*  Connection lines  */}
              <line x1="200" y1="160" x2="90"  y2="80"  stroke="rgba(26,107,92,0.25)" strokeWidth="1.5" strokeDasharray="4 3"/>
              <line x1="200" y1="160" x2="310" y2="80"  stroke="rgba(26,107,92,0.25)" strokeWidth="1.5" strokeDasharray="4 3"/>
              <line x1="200" y1="160" x2="70"  y2="240" stroke="rgba(26,107,92,0.25)" strokeWidth="1.5" strokeDasharray="4 3"/>
              <line x1="200" y1="160" x2="330" y2="240" stroke="rgba(26,107,92,0.25)" strokeWidth="1.5" strokeDasharray="4 3"/>
              <line x1="200" y1="160" x2="200" y2="290" stroke="rgba(26,107,92,0.20)" strokeWidth="1.5" strokeDasharray="4 3"/>
              {/*  Center node  */}
              <circle cx="200" cy="160" r="36" fill="#1a6b5c" opacity="0.9"/>
              <circle cx="200" cy="150" r="12" fill="white" opacity="0.9"/>
              <path d="M183 170 Q200 162 217 170" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              {/*  Orbit nodes  */}
              <circle cx="90"  cy="80"  r="22" fill="#f0f8f6" stroke="#1a6b5c" strokeWidth="1.5"/>
              <text x="90" y="85" text-anchor="middle" font-size="9" fill="#1a6b5c" font-weight="600">CEO</text>
              <circle cx="310" cy="80"  r="22" fill="#f0f8f6" stroke="#2a9d8f" strokeWidth="1.5"/>
              <text x="310" y="85" text-anchor="middle" font-size="9" fill="#1a6b5c" font-weight="600">VP Sales</text>
              <circle cx="70"  cy="240" r="22" fill="#f0f8f6" stroke="#1a6b5c" strokeWidth="1.5"/>
              <text x="70" y="245" text-anchor="middle" font-size="9" fill="#1a6b5c" font-weight="600">Manager</text>
              <circle cx="330" cy="240" r="22" fill="#fff3ef" stroke="#e07060" strokeWidth="1.5"/>
              <text x="330" y="245" text-anchor="middle" font-size="8" fill="#e07060" font-weight="700">Decision</text>
              <circle cx="200" cy="290" r="18" fill="#f0f8f6" stroke="#2a9d8f" strokeWidth="1.5"/>
              <text x="200" y="295" text-anchor="middle" font-size="8" fill="#1a6b5c" font-weight="600">Customer</text>
              {/*  Pulse rings  */}
              <circle cx="200" cy="160" r="50" stroke="rgba(26,107,92,0.10)" strokeWidth="1" fill="none" className="fp-pulse-ring"/>
              <circle cx="200" cy="160" r="70" stroke="rgba(26,107,92,0.06)" strokeWidth="1" fill="none" className="fp-pulse-ring" style={{animationDelay: '0.5s'}}/>
            </svg>
            <div className="fp-rel-badge">
              <span>👤</span><span>Decision Maker Mapped</span>
            </div>
          </div>
        </div>
        <div className="fp-split-left reveal">
          <span className="fp-eyebrow">Relationship Intelligence</span>
          <h2 className="fp-section-title">Know Every<br />Stakeholder<br />By Name.</h2>
          <p className="fp-section-desc">Automatically maps org structures, identifies decision-makers, and shows you the exact path to a closed deal.</p>
          <div className="fp-mini-stats">
            <div className="fp-mini-stat"><div className="fp-mini-num" data-target="3.2" data-suffix="x">0x</div><div className="fp-mini-label">Faster deal cycles</div></div>
            <div className="fp-mini-stat"><div className="fp-mini-num" data-target="89" data-suffix="%">0%</div><div className="fp-mini-label">Stakeholder coverage</div></div>
          </div>
          <button className="btn-outline-glass" onClick="showToast('Opening relationship demo...')"><span>See it in action</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></button>
        </div>
      </div>
    </div>
  </section>

  {/*  SECTION 6: Workflow Automation  */}
  <section className="fp-section fp-auto-section" id="fp-automation">
    <div className="container">
      <div className="fp-centered-header reveal">
        <span className="fp-eyebrow fp-eyebrow-copper">Automation</span>
        <h2 className="fp-section-title">Your Workflow,<br />On Autopilot.</h2>
        <p className="fp-section-desc" style={{maxWidth: '500px', margin: '0 auto'}}>Set it once. Let Error Infotech handle the rest — from lead creation to final report.</p>
      </div>
      <div className="fp-flow-viz reveal">
        <div className="fp-flow-step"><div className="fp-flow-icon">📥</div><span>Lead Created</span><div className="fp-flow-connector"><div className="fp-flow-dot"></div></div></div>
        <div className="fp-flow-step"><div className="fp-flow-icon">👤</div><span>Assign Rep</span><div className="fp-flow-connector"><div className="fp-flow-dot" style={{animationDelay: '0.3s'}}></div></div></div>
        <div className="fp-flow-step"><div className="fp-flow-icon">✉️</div><span>Generate Email</span><div className="fp-flow-connector"><div className="fp-flow-dot" style={{animationDelay: '0.6s'}}></div></div></div>
        <div className="fp-flow-step"><div className="fp-flow-icon">📅</div><span>Schedule Meeting</span><div className="fp-flow-connector"><div className="fp-flow-dot" style={{animationDelay: '0.9s'}}></div></div></div>
        <div className="fp-flow-step"><div className="fp-flow-icon">🔔</div><span>Notify Team</span><div className="fp-flow-connector"><div className="fp-flow-dot" style={{animationDelay: '1.2s'}}></div></div></div>
        <div className="fp-flow-step"><div className="fp-flow-icon">📊</div><span>Update CRM</span><div className="fp-flow-connector"><div className="fp-flow-dot" style={{animationDelay: '1.5s'}}></div></div></div>
        <div className="fp-flow-step fp-flow-last"><div className="fp-flow-icon fp-flow-icon-end">✅</div><span>Report Generated</span></div>
      </div>
    </div>
  </section>

  {/*  SECTION 7: Analytics Bento  */}
  <section className="fp-section fp-analytics-section" id="fp-analytics">
    <div className="container">
      <div className="fp-centered-header reveal">
        <span className="fp-eyebrow">Analytics</span>
        <h2 className="fp-section-title">Decisions Backed<br />by Real Data.</h2>
      </div>
      <div className="fp-bento-grid reveal">
        <div className="fp-bento fp-bento-lg">
          <div className="fp-bento-label">Revenue Trend</div>
          <div className="fp-bento-big-num" data-target="4.8" data-suffix="M">$0M</div>
          <svg width="100%" height="80" viewBox="0 0 300 80" preserveAspectRatio="none">
            <defs><linearGradient id="bg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a6b5c" stop-opacity="0.2"/><stop offset="100%" stop-color="#1a6b5c" stop-opacity="0"/></linearGradient></defs>
            <path className="fp-chart-area" d="M0 65 Q50 45 100 50 T200 25 T300 10 L300 80 L0 80Z" fill="url(#bg2)"/>
            <path className="fp-chart-line" d="M0 65 Q50 45 100 50 T200 25 T300 10" fill="none" stroke="#1a6b5c" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="fp-bento fp-bento-sm">
          <div className="fp-bento-label">Win Rate</div>
          <div className="fp-bento-big-num" style={{color: '#2a9d8f'}} data-target="68" data-suffix="%">0%</div>
          <div className="fp-bento-bar-wrap"><div className="fp-bento-bar" style={{'--bw': '68%', background: '#2a9d8f'}}></div></div>
        </div>
        <div className="fp-bento fp-bento-sm">
          <div className="fp-bento-label">Forecast Accuracy</div>
          <div className="fp-bento-big-num" style={{color: '#e07060'}} data-target="94" data-suffix="%">0%</div>
          <div className="fp-bento-bar-wrap"><div className="fp-bento-bar" style={{'--bw': '94%', background: '#e07060'}}></div></div>
        </div>
        <div className="fp-bento fp-bento-md">
          <div className="fp-bento-label">Deal Health</div>
          <div className="fp-health-grid">
            <div className="fp-health-item" style={{'--hc': '#1a6b5c'}}><span>On Track</span><strong data-target="48" data-suffix="">0</strong></div>
            <div className="fp-health-item" style={{'--hc': '#e07060'}}><span>At Risk</span><strong data-target="12" data-suffix="">0</strong></div>
            <div className="fp-health-item" style={{'--hc': '#2a9d8f'}}><span>Stalled</span><strong data-target="7" data-suffix="">0</strong></div>
          </div>
        </div>
        <div className="fp-bento fp-bento-md">
          <div className="fp-bento-label">Pipeline Growth</div>
          <div className="fp-bar-chart">
            <div className="fp-bar-item"><div className="fp-bar-fill" style={{'--bh': '45%', background: '#e0ede8'}}></div><span>Q3</span></div>
            <div className="fp-bar-item"><div className="fp-bar-fill" style={{'--bh': '62%', background: '#b8d8cc'}}></div><span>Q4</span></div>
            <div className="fp-bar-item"><div className="fp-bar-fill" style={{'--bh': '78%', background: '#2a9d8f'}}></div><span>Q1</span></div>
            <div className="fp-bar-item"><div className="fp-bar-fill" style={{'--bh': '100%', background: '#1a6b5c'}}></div><span>Q2</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  SECTION 8: Integrations Orbit  */}
  <section className="fp-section fp-integrations-section" id="fp-integrations">
    <div className="container">
      <div className="fp-integrations-layout">
        <div className="fp-int-left reveal">
          <span className="fp-eyebrow">Integrations</span>
          <h2 className="fp-section-title">Connects to Your<br />Entire Stack.</h2>
          <p className="fp-section-desc">Error Infotech plugs into the tools your team already loves. No switching. No friction. Just flow.</p>
          <div className="fp-int-list">
            <span className="fp-int-tag">Slack</span><span className="fp-int-tag">Google Workspace</span><span className="fp-int-tag">Zoom</span><span className="fp-int-tag">Microsoft Teams</span><span className="fp-int-tag">Notion</span><span className="fp-int-tag">HubSpot</span><span className="fp-int-tag">Stripe</span><span className="fp-int-tag">Outlook</span>
          </div>
        </div>
        <div className="fp-int-right reveal">
          <div className="fp-orbit-container">
            <div className="fp-orbit-center">
              <img src="logo.png" alt="Error Infotech" style={{width: '42px', height: '42px', objectFit: 'contain'}}/>
            </div>
            <div className="fp-orbit fp-orbit-1">
              <div className="fp-orbit-item" style={{'--angle': '0deg'}}>Slack</div>
              <div className="fp-orbit-item" style={{'--angle': '60deg'}}>Google</div>
              <div className="fp-orbit-item" style={{'--angle': '120deg'}}>Zoom</div>
              <div className="fp-orbit-item" style={{'--angle': '180deg'}}>Teams</div>
              <div className="fp-orbit-item" style={{'--angle': '240deg'}}>Notion</div>
              <div className="fp-orbit-item" style={{'--angle': '300deg'}}>Stripe</div>
            </div>
            <div className="fp-orbit fp-orbit-2">
              <div className="fp-orbit-item fp-orbit-item-sm" style={{'--angle': '30deg'}}>HubSpot</div>
              <div className="fp-orbit-item fp-orbit-item-sm" style={{'--angle': '150deg'}}>Outlook</div>
              <div className="fp-orbit-item fp-orbit-item-sm" style={{'--angle': '270deg'}}>Zapier</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  SECTION 9: Mobile  */}
  <section className="fp-section fp-mobile-section" id="fp-mobile">
    <div className="container">
      <div className="fp-split-layout">
        <div className="fp-split-left reveal">
          <span className="fp-eyebrow fp-eyebrow-moss">Mobile</span>
          <h2 className="fp-section-title">Your Pipeline,<br />In Your Pocket.</h2>
          <p className="fp-section-desc">Full CRM power on iOS and Android. Update deals, check scores, and close on the go.</p>
          <ul className="fp-mobile-features">
            <li>📲 Instant push notifications for hot leads</li>
            <li>📊 Live dashboard with swipe navigation</li>
            <li>🎙️ Voice-to-CRM — log calls hands-free</li>
            <li>🔔 Smart follow-up reminders</li>
          </ul>
        </div>
        <div className="fp-split-right reveal">
          <div className="fp-phone-mockup">
            <div className="fp-phone-frame">
              <div className="fp-phone-notch"></div>
              <div className="fp-phone-screen">
                <div className="fp-phone-bar" style={{background: 'linear-gradient(135deg,#1a6b5c,#2a9d8f)', color: 'white', padding: '0.6rem', fontSize: '0.7rem', fontWeight: '700'}}>Error Infotech</div>
                <div style={{padding: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                  <div className="fp-phone-notif fp-notif-float" style={{animationDelay: '0s'}}><span>🔥</span><span style={{fontSize: '0.65rem', fontWeight: '600'}}>Acme Corp opened proposal</span></div>
                  <div className="fp-phone-notif fp-notif-float" style={{animationDelay: '0.8s'}}><span>✅</span><span style={{fontSize: '0.65rem', fontWeight: '600'}}>Deal closed — $86k</span></div>
                  <div className="fp-phone-notif fp-notif-float" style={{animationDelay: '1.6s'}}><span>📅</span><span style={{fontSize: '0.65rem', fontWeight: '600'}}>Meeting in 15 minutes</span></div>
                  <div style={{background: '#f0f8f6', borderRadius: '8px', padding: '0.6rem', marginTop: '0.2rem'}}>
                    <div style={{fontSize: '0.6rem', color: '#6b7b74', marginBottom: '0.3rem'}}>Pipeline Value</div>
                    <div style={{fontSize: '1.1rem', fontWeight: '800', color: '#1a6b5c'}}>$4.8M</div>
                    <div style={{height: '4px', background: '#e0ede8', borderRadius: '2px', marginTop: '0.3rem'}}><div style={{width: '72%', height: '100%', background: 'linear-gradient(90deg,#1a6b5c,#2a9d8f)', borderRadius: '2px'}}></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  SECTION 10: Security  */}
  <section className="fp-section fp-security-section" id="fp-security">
    <div className="container">
      <div className="fp-security-layout reveal">
        <div className="fp-sec-visual">
          <div className="fp-shield-wrap">
            <svg className="fp-shield-svg" viewBox="0 0 200 220" fill="none">
              <path d="M100 10 L170 35 L170 100 Q170 160 100 190 Q30 160 30 100 L30 35 Z" fill="rgba(26,107,92,0.08)" stroke="#1a6b5c" strokeWidth="1.8"/>
              <path d="M100 30 L155 50 L155 100 Q155 148 100 172 Q45 148 45 100 L45 50 Z" fill="rgba(26,107,92,0.05)" stroke="rgba(26,107,92,0.3)" strokeWidth="1"/>
              <rect x="82" y="100" width="36" height="30" rx="7" fill="#1a6b5c"/>
              <path d="M89 100 L89 91 Q89 80 100 80 Q111 80 111 91 L111 100" stroke="#1a6b5c" strokeWidth="4" fill="none" strokeLinecap="round"/>
              <circle cx="100" cy="113" r="5" fill="rgba(240,248,246,0.9)"/>
              <rect x="98" y="113" width="4" height="7" rx="2" fill="rgba(240,248,246,0.9)"/>
              <circle cx="100" cy="110" r="55" stroke="rgba(26,107,92,0.08)" strokeWidth="1" strokeDasharray="4 4" className="fp-pulse-ring"/>
              <circle cx="100" cy="110" r="78" stroke="rgba(26,107,92,0.05)" strokeWidth="1" strokeDasharray="4 4" className="fp-pulse-ring" style={{animationDelay: '0.8s'}}/>
            </svg>
          </div>
        </div>
        <div className="fp-sec-content">
          <span className="fp-eyebrow fp-eyebrow-copper">Enterprise Security</span>
          <h2 className="fp-section-title">Fortress-Grade<br />Protection.</h2>
          <p className="fp-section-desc">Your data is safe with military-grade encryption, zero-trust architecture, and continuous compliance monitoring.</p>
          <div className="fp-sec-grid">
            <div className="fp-sec-item"><div className="fp-sec-icon">🛡️</div><strong>SOC2 Type II</strong><p>Independently audited annually.</p></div>
            <div className="fp-sec-item"><div className="fp-sec-icon">🔐</div><strong>AES-256 Encryption</strong><p>At rest and in transit, always.</p></div>
            <div className="fp-sec-item"><div className="fp-sec-icon">👁️</div><strong>Audit Logs</strong><p>Every action tracked and exportable.</p></div>
            <div className="fp-sec-item"><div className="fp-sec-icon">⚙️</div><strong>Role-Based Access</strong><p>Granular permissions for every team.</p></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  SECTION 11: Feature Highlight Cards  */}
  <section className="fp-section fp-cards-section">
    <div className="container">
      <div className="fp-centered-header reveal">
        <span className="fp-eyebrow">All Features</span>
        <h2 className="fp-section-title">Built for Every<br />Part of the Deal.</h2>
      </div>
      <div className="fp-cards-bento reveal">
        <div className="fp-hcard fp-hcard-a">
          <div className="fp-hcard-icon" style={{background: 'rgba(26,107,92,0.1)', borderRadius: '16px'}}><svg viewBox="0 0 32 32" fill="none" width="28" height="28"><circle cx="16" cy="10" r="5" stroke="#1a6b5c" strokeWidth="1.8"/><circle cx="6"  cy="24" r="3.5" stroke="#1a6b5c" strokeWidth="1.5"/><circle cx="26" cy="24" r="3.5" stroke="#1a6b5c" strokeWidth="1.5"/><line x1="16" y1="15" x2="6"  y2="20.5" stroke="#1a6b5c" strokeWidth="1.3" strokeDasharray="2 2"/><line x1="16" y1="15" x2="26" y2="20.5" stroke="#1a6b5c" strokeWidth="1.3" strokeDasharray="2 2"/></svg></div>
          <h4>Relationship Intelligence</h4>
          <p>Map every stakeholder before the pitch. See buying committees at a glance.</p>
        </div>
        <div className="fp-hcard fp-hcard-b">
          <div className="fp-hcard-icon" style={{background: 'rgba(42,157,143,0.12)', borderRadius: '50%'}}><svg viewBox="0 0 32 32" fill="none" width="28" height="28"><path d="M8 24 L12 17 L16 20 L22 11 L26 8" stroke="#2a9d8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="17" r="2" fill="#2a9d8f"/><circle cx="22" cy="11" r="2" fill="#2a9d8f"/></svg></div>
          <h4>Revenue Analytics</h4>
          <p>Forecasting accuracy at 94%. Real-time dashboards that update as deals move.</p>
        </div>
        <div className="fp-hcard fp-hcard-c">
          <div className="fp-hcard-icon" style={{background: 'rgba(224,112,96,0.12)', borderRadius: '12px 24px 12px 24px'}}><svg viewBox="0 0 32 32" fill="none" width="28" height="28"><rect x="4" y="6" width="24" height="20" rx="4" stroke="#e07060" strokeWidth="1.8"/><line x1="4" y1="13" x2="28" y2="13" stroke="#e07060" strokeWidth="1.4"/><circle cx="10" cy="10" r="1.5" fill="#e07060"/><circle cx="16" cy="10" r="1.5" fill="#e07060" opacity="0.5"/></svg></div>
          <h4>Workflow Builder</h4>
          <p>Drag-and-drop automation. Zero code required. Unlimited flows.</p>
        </div>
        <div className="fp-hcard fp-hcard-d">
          <div className="fp-hcard-icon" style={{background: 'rgba(26,107,92,0.08)', borderRadius: '8px'}}><svg viewBox="0 0 32 32" fill="none" width="28" height="28"><path d="M8 28 L8 18 M16 28 L16 12 M24 28 L24 6" stroke="#145749" strokeWidth="2.5" strokeLinecap="round"/></svg></div>
          <h4>Pipeline Tracking</h4>
          <p>Kanban or list view. Move deals, add notes, and update stages instantly.</p>
        </div>
        <div className="fp-hcard fp-hcard-e">
          <div className="fp-hcard-icon" style={{background: 'rgba(178,140,114,0.12)', borderRadius: '20px 8px 20px 8px'}}><svg viewBox="0 0 32 32" fill="none" width="28" height="28"><circle cx="16" cy="16" r="12" stroke="#B28C72" strokeWidth="1.8"/><line x1="16" y1="16" x2="16" y2="9" stroke="#B28C72" strokeWidth="2" strokeLinecap="round"/><line x1="16" y1="16" x2="21" y2="19" stroke="#B28C72" strokeWidth="2" strokeLinecap="round"/></svg></div>
          <h4>Meeting Intelligence</h4>
          <p>Records, transcribes, and summarises every sales call. Auto-syncs to CRM.</p>
        </div>
        <div className="fp-hcard fp-hcard-f">
          <div className="fp-hcard-icon" style={{background: 'rgba(42,157,143,0.10)', borderRadius: '14px'}}><svg viewBox="0 0 32 32" fill="none" width="28" height="28"><rect x="4" y="8" width="24" height="16" rx="3" stroke="#2a9d8f" strokeWidth="1.8"/><polyline points="4,12 16,20 28,12" stroke="#2a9d8f" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
          <h4>Email Automation</h4>
          <p>Sequences that trigger on intent signals — not just calendar intervals.</p>
        </div>
        <div className="fp-hcard fp-hcard-g">
          <div className="fp-hcard-icon" style={{background: 'rgba(20,87,73,0.10)', borderRadius: '50% 14px 50% 14px'}}><svg viewBox="0 0 32 32" fill="none" width="28" height="28"><path d="M16 4 L26 9 L26 20 Q26 27 16 30 Q6 27 6 20 L6 9 Z" stroke="#145749" strokeWidth="1.8" fill="none"/><path d="M11 16 L14 19 L21 13" stroke="#145749" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
          <h4>AI Copilot</h4>
          <p>Your always-on AI that drafts emails, predicts outcomes, and coaches reps.</p>
        </div>
        <div className="fp-hcard fp-hcard-h">
          <div className="fp-hcard-icon" style={{background: 'rgba(93,74,102,0.10)', borderRadius: '6px'}}><svg viewBox="0 0 32 32" fill="none" width="28" height="28"><rect x="10" y="14" width="12" height="12" rx="3" stroke="#5D4A66" strokeWidth="1.8"/><path d="M12 14 L12 10 Q12 5 16 5 Q20 5 20 10 L20 14" stroke="#5D4A66" strokeWidth="1.8" fill="none" strokeLinecap="round"/><circle cx="16" cy="19" r="2" fill="#5D4A66"/></svg></div>
          <h4>Enterprise Security</h4>
          <p>SOC2 II, AES-256, GDPR compliant. Your data stays yours, always.</p>
        </div>
      </div>
    </div>
  </section>

  {/*  SECTION 12: Before vs After  */}
  <section className="fp-section fp-bva-section">
    <div className="container">
      <div className="fp-centered-header reveal">
        <span className="fp-eyebrow fp-eyebrow-copper">The Difference</span>
        <h2 className="fp-section-title">Before.<br />After.</h2>
      </div>
      <div className="fp-bva-grid reveal">
        <div className="fp-bva-before">
          <div className="fp-bva-tag fp-bva-tag-before">Before</div>
          <ul className="fp-bva-list fp-bva-list-before">
            <li>📋 Spreadsheets &amp; sticky notes</li>
            <li>📧 Manual email follow-ups</li>
            <li>📂 Scattered contacts &amp; data silos</li>
            <li>😰 Missed follow-ups &amp; lost deals</li>
            <li>🤔 Gut-feel forecasting</li>
            <li>🔁 Repetitive manual tasks</li>
          </ul>
        </div>
        <div className="fp-bva-arrow">
          <div className="fp-bva-arrow-inner">
            <svg viewBox="0 0 40 40" fill="none" width="40" height="40"><circle cx="20" cy="20" r="19" fill="#1a6b5c"/><polyline points="14,20 26,20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><polyline points="22,15 27,20 22,25" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
        <div className="fp-bva-after">
          <div className="fp-bva-tag fp-bva-tag-after">After</div>
          <ul className="fp-bva-list fp-bva-list-after">
            <li>🧠 One Intelligent CRM</li>
            <li>⚡ AI-powered automation</li>
            <li>🗺️ Full relationship graph</li>
            <li>🎯 Predictive insights &amp; scoring</li>
            <li>📈 94% forecast accuracy</li>
            <li>🚀 3x faster deal velocity</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  {/*  SECTION 13: Testimonial  */}
  <section className="fp-section fp-testimonial-section">
    <div className="container">
      <div className="fp-testi-layout reveal">
        <div className="fp-testi-quote">"</div>
        <blockquote className="fp-testi-text">"Error Infotech didn't just replace our CRM. It replaced our entire sales strategy. We went from 48% win rate to 71% in one quarter. The AI surface insights we didn't even know to look for."</blockquote>
        <div className="fp-testi-author">
          <div className="fp-testi-avatar"><svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="30" fill="#1a6b5c"/><circle cx="30" cy="24" r="10" fill="white"/><path d="M12 52 Q12 38 48 38 Q48 52 48 52 Z" fill="white"/></svg></div>
          <div>
            <strong>Marcus Johnson</strong>
            <p>Chief Revenue Officer, CloudScale Inc.</p>
          </div>
          <div className="fp-testi-stats">
            <div className="fp-testi-stat"><span className="fp-tstat-num" data-target="71" data-suffix="%">0%</span><span>Win Rate</span></div>
            <div className="fp-testi-stat"><span className="fp-tstat-num" data-target="3.2" data-suffix="x">0x</span><span>Faster Close</span></div>
            <div className="fp-testi-stat"><span className="fp-tstat-num" data-target="180" data-suffix="k">$0k</span><span>Avg Deal Size</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  SECTION 14: Final CTA  */}
  <section className="fp-cta-section">
    <div className="container">
      <div className="fp-cta-inner reveal">
        <div className="fp-cta-grain"></div>
        {/*  Decorative blurred circles (like image)  */}
        <div className="fp-cta-blob fp-cta-blob-1"></div>
        <div className="fp-cta-blob fp-cta-blob-2"></div>
        <h2 className="fp-cta-title">Ready to accelerate<br />your revenue?</h2>
        <p className="fp-cta-desc">Join thousands of high-performing sales teams who have already made<br />the switch. Set up takes less than 5 minutes.</p>
        <button className="fp-cta-pill-btn" onClick="showToast('Starting your free trial...')">
          Start Your Free Trial &nbsp;→
        </button>
        <p className="fp-cta-note">No credit card required. 14-day free trial.</p>
      </div>
    </div>
  </section>

  {/*  Footer (same as homepage)  */}
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="index.html" className="navbar-brand">
            <img src="logo.png" alt="ERROR Infotech Pvt Ltd" className="brand-logo brand-logo--footer" />
          </a>
          <p>The cockpit for sales teams who move fast, close hard, and never let a lead go cold.</p>
          <div className="social-links">
            <a href="#" className="social-icon" aria-label="Twitter">𝕏</a>
            <a href="#" className="social-icon" aria-label="YouTube">▶</a>
            <a href="#" className="social-icon" aria-label="GitHub">⚙</a>
          </div>
        </div>
        <div className="footer-col"><h4>Product</h4><ul className="footer-links"><li><a href="#features">Features</a></li><li><a href="#">Integrations</a></li><li><a href="index.html#pricing">Pricing</a></li><li><a href="#">Changelog</a></li></ul></div>
        <div className="footer-col"><h4>Company</h4><ul className="footer-links"><li><a href="#">About Us</a></li><li><a href="#">Careers</a></li><li><a href="#">Blog</a></li><li><a href="#">Contact</a></li></ul></div>
        <div className="footer-col"><h4>Legal</h4><ul className="footer-links"><li><a href="#">Privacy Policy</a></li><li><a href="#">Terms of Service</a></li><li><a href="#">Cookie Policy</a></li></ul></div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 EriScale Infotech Pvt Ltd. All rights reserved.</p>
        <div className="status-badge"><span className="status-dot"></span><span>System Status: Operational</span></div>
      </div>
    </div>
  </footer>

  
  
  

    </>
  );
};

export default Features;
