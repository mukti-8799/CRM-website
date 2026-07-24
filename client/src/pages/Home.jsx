import React, { useEffect } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LiveDashboardPreview from '../components/LiveDashboardPreview';

const Home = () => {
  useEffect(() => {
      // Injected from d:/demo/script.js
      ﻿// NexaCRM Interactive JavaScript

setTimeout(() => {
  // 1. Scroll Reveal Animation using IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        // Remove so animation replays next time element enters view
        entry.target.classList.remove('active');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((el, i) => {
    // Add stagger delay based on position within its parent
    const siblings = el.parentElement.querySelectorAll('.reveal');
    siblings.forEach((sib, idx) => {
      if (!sib.style.transitionDelay) {
        sib.style.transitionDelay = `${idx * 0.12}s`;
      }
    });
    revealOnScroll.observe(el);
  });

  // 2. Animated number counter for stat values
  function animateCounter(el, target, suffix = '') {
    const duration = 1800;
    const start = performance.now();
    const from = 0;
    el.style.transition = 'none';

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + (target - from) * eased);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // Observe stat values and trigger counter when visible
  const statVals = document.querySelectorAll('.stat-val');
  const statTargets = [
    { value: 1.2, suffix: 'M', display: '$1.2M' },
    { value: 48,  suffix: '',  display: '48' },
    { value: 67,  suffix: '%', display: '67%' }
  ];

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const change = el.querySelector('.stat-change');
        const changeText = change ? change.outerHTML : '';
        const t = statTargets[idx] || {};

        if (t.value !== undefined) {
          if (t.suffix === 'M') {
            // Animate float
            const dur = 1800;
            const start = performance.now();
            function updateFloat(now) {
              const prog = Math.min((now - start) / dur, 1);
              const eased = 1 - Math.pow(1 - prog, 3);
              const val = (eased * t.value).toFixed(1);
              el.innerHTML = `$${val}M <span class="stat-change">${change ? change.textContent : ''}</span>`;
              if (prog < 1) requestAnimationFrame(updateFloat);
            }
            requestAnimationFrame(updateFloat);
          } else {
            const numEl = document.createElement('span');
            numEl.textContent = '0';
            el.innerHTML = '';
            el.appendChild(numEl);
            if (changeText) el.insertAdjacentHTML('beforeend', changeText);
            animateCounter(numEl, t.value, t.suffix);
          }
        }
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statVals.forEach(el => statObserver.observe(el));

  // 3. Typing effect for hero title words
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.style.opacity = '1'; // Already handled by CSS animation
  }

  // 4. Process Steps Interactive Showcase
  const processSteps = document.querySelectorAll('.process-step-item');
  const rocketOrb = document.getElementById('rocketOrb');

  const stepVisuals = {
    1: {
      emoji: '🚀',
      badges: [
        { selector: '.nb-1', icon: '📥', text: 'Inbox & Calendar Synced' },
        { selector: '.nb-2', icon: '⚡', text: 'Auto Data Ingestion' },
        { selector: '.nb-3', icon: '📊', text: 'Graph Built' },
        { selector: '.nb-4', icon: '✨', text: '100% Automated' }
      ]
    },
    2: {
      emoji: '🎯',
      badges: [
        { selector: '.nb-1', icon: '👑', text: 'Decision Maker Identified' },
        { selector: '.nb-2', icon: '🛡️', text: 'Champion Mapped' },
        { selector: '.nb-3', icon: '⚠️', text: 'Blocker Flagged' },
        { selector: '.nb-4', icon: '🗺️', text: 'Path to Closed-Won' }
      ]
    },
    3: {
      emoji: '💼',
      badges: [
        { selector: '.nb-1', icon: '✉️', text: 'Sequence Sent' },
        { selector: '.nb-2', icon: '🤝', text: 'Deal Room Active' },
        { selector: '.nb-3', icon: '✍️', text: 'E-Signature Pending' },
        { selector: '.nb-4', icon: '🎉', text: 'Deal Closed ($120k)' }
      ]
    }
  };

  processSteps.forEach(step => {
    step.addEventListener('click', () => {
      processSteps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');

      const stepNum = step.getAttribute('data-step');
      const data = stepVisuals[stepNum];

      if (data) {
        if (rocketOrb) {
          rocketOrb.style.transform = 'scale(0.8) rotate(15deg)';
          setTimeout(() => {
            rocketOrb.textContent = data.emoji;
            rocketOrb.style.transform = 'scale(1) rotate(0deg)';
          }, 200);
        }

        data.badges.forEach((b, i) => {
          const el = document.querySelector(b.selector);
          if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(10px)';
            setTimeout(() => {
              el.innerHTML = `<span>${b.icon}</span> <span>${b.text}</span>`;
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, 250 + i * 80);
          }
        });
      }
    });
  });

  // 5. Auto-cycle process steps
  let currentStep = 1;
  const totalSteps = processSteps.length;
  const autoCycle = setInterval(() => {
    currentStep = currentStep >= totalSteps ? 1 : currentStep + 1;
    const nextStep = document.querySelector(`[data-step="${currentStep}"]`);
    if (nextStep) nextStep.click();
  }, 3500);

  // Stop auto-cycle when user manually clicks
  processSteps.forEach(step => {
    step.addEventListener('click', () => clearInterval(autoCycle));
  });

  // 6. Pricing Toggle Logic
  const pricingToggle = document.getElementById('pricingToggle');
  const starterPrice = document.getElementById('starterPrice');
  const growthPrice = document.getElementById('growthPrice');

  if (pricingToggle) {
    pricingToggle.addEventListener('click', () => {
      pricingToggle.classList.toggle('active');
      const isAnnual = pricingToggle.classList.contains('active');

      // Animate price change
      [starterPrice, growthPrice].forEach(el => {
        el.style.transform = 'translateY(-10px)';
        el.style.opacity = '0';
        el.style.transition = 'all 0.2s ease';
      });

      setTimeout(() => {
        starterPrice.textContent = isAnnual ? '$23' : '$29';
        growthPrice.textContent  = isAnnual ? '$63' : '$79';
        [starterPrice, growthPrice].forEach(el => {
          el.style.transform = 'translateY(0)';
          el.style.opacity = '1';
        });
      }, 200);
    });
  }

  // 7. Mobile Menu Toggle
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggleBtn && navLinks) {
    mobileToggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });
  }

  // 8. Parallax effect on hero section
  const hero = document.querySelector('.hero-section');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (hero && scrollY < window.innerHeight * 1.5) {
      const heroLeft  = hero.querySelector('.hero-left-content');
      const heroRight = hero.querySelector('.hero-visual-container');
      if (heroLeft)  heroLeft.style.transform  = `translateY(${scrollY * 0.06}px)`;
      if (heroRight) heroRight.style.transform = `translateY(${scrollY * 0.04}px)`;
    }
  }, { passive: true });

  // 9. Magnetic button effect on primary buttons
  document.querySelectorAll('.btn-primary, .btn-outline-glass').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top  - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.2}px) translateY(-2px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // 10. Cursor ripple effect on click
  document.addEventListener('click', e => {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: fixed;
      left: ${e.clientX - 10}px;
      top:  ${e.clientY - 10}px;
      width: 20px; height: 20px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(124,58,237,0.5), transparent);
      pointer-events: none;
      z-index: 9999;
      animation: rippleOut 0.6s ease forwards;
    `;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });

  // Add ripple keyframe dynamically
  if (!document.getElementById('rippleStyle')) {
    const style = document.createElement('style');
    style.id = 'rippleStyle';
    style.textContent = `
      @keyframes rippleOut {
        0%   { transform: scale(1);  opacity: 1; }
        100% { transform: scale(8);  opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  // 11. Toast Notification System
  window.showToast = (message) => {
    const container = document.getElementById('toastContainer') || createToastContainer();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>⚡</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  // 12. Feature card click — darken on mousedown, reset on mouseleave
  document.querySelectorAll('.fc-card').forEach(card => {
    card.addEventListener('mousedown', () => card.classList.add('fc-pressed'));
    card.addEventListener('mouseup',   () => card.classList.remove('fc-pressed'));
    card.addEventListener('mouseleave',() => card.classList.remove('fc-pressed'));
  });

  function createToastContainer() {
    const c = document.createElement('div');
    c.id = 'toastContainer';
    c.className = 'toast-container';
    document.body.appendChild(c);
    return c;
  }
});

// ── Testimonial cards: replay animation every time they enter viewport ──
(function vcardReplayObserver() {
  const vcards = document.querySelectorAll('.vcard-grid .vcard');
  if (!vcards.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove first, then re-add on next frame so CSS transition re-fires
        entry.target.classList.remove('active');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            entry.target.classList.add('active');
          });
        });
      } else {
        // Reset when out of view so animation can replay
        entry.target.classList.remove('active');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  vcards.forEach(card => obs.observe(card));
}());

// ── Login Modal — shows after 10 seconds ─────────────────────

// ── Mini Dashboard — fully interactive inside homepage card ──

    }, []);

  return (
    <>
      

  {/*  Particle Network Background Canvas  */}
  <ParticleBackground />

  {/*  Sticky Glassmorphism Header Navbar  */}
  <div className="navbar-wrapper">
    <div className="container">
      <nav className="navbar">
        <a href="#" className="navbar-brand">
          <img src="logo.png" alt="ERROR Infotech Pvt Ltd" className="brand-logo brand-logo--nav" />
        </a>

        <ul className="nav-links" id="navLinks">
          <li><a href="features.html" className="nav-link">Features</a></li>
          <li><a href="#process" className="nav-link">Process</a></li>
          <li><a href="#testimonials" className="nav-link">Testimonials</a></li>
          <li><a href="#pricing" className="nav-link">Pricing</a></li>
          <li>
            <a href="#" className="nav-link">
              <span>Resources</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </a>
          </li>
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

  {/*  Hero Section  */}
  <header className="hero-section">
    <div className="container">
      <div className="hero-grid">
        
        {/*  Left Hero Column  */}
        <div className="hero-left-content reveal">
          <div className="hero-badge-pill">
            <span className="badge-tag">NEW ↗</span>
            <span>Error Infotech 2.0 is now live</span>
          </div>

          <h1 className="hero-title">
            BUILT <br />FOR <span className="script-accent">Sales</span>
          </h1>

          <div className="annotation-bubble">
            <span>Close more. Grow faster.</span>
            <svg width="40" height="20" viewBox="0 0 50 25" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M 5 20 Q 25 5 45 15" strokeDasharray="3 3"/>
              <polyline points="40 10 45 15 38 18"/>
            </svg>
          </div>

          <p className="hero-subtitle">
            Error Infotech helps modern businesses manage relationships, close deals, and predict revenue with confidence.
          </p>

          <div className="hero-cta-group">
            <button className="btn-primary btn-lg" onClick="showToast('Initiating pipeline builder...')">
              <span>Start Building Pipeline</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
            <button className="btn-outline-glass btn-lg" onClick="showToast('Playing interactive video demo...')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              <span>Watch Demo</span>
            </button>
          </div>

          {/*  Handwritten Paper Note Artifact  */}
          <div className="paper-note-card">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <div>
              <span style={{display: 'block', fontWeight: '800'}}>Real Insights. Real Growth.</span>
              <span style={{color: '#64748b', fontSize: '0.8rem', fontWeight: '500'}}>Trusted by 10,000+ teams</span>
            </div>
          </div>
        </div>

        {/*  Right Hero Visual Monitor Frame  */}
        <div className="hero-visual-container reveal">
          <div className="monitor-frame">
            <div className="monitor-header">
              <div className="window-dots">
                <div className="dot dot-red"></div>
                <div className="dot dot-yellow"></div>
                <div className="dot dot-green"></div>
              </div>
              <div style={{fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600'}}>Error Infotech Dashboard</div>
              <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Sarah Chen ▾</div>
            </div>
            <div style={{padding: '0', display: 'flex', height: '460px'}}>
              <LiveDashboardPreview />
            </div>
          </div>
        </div>

      </div>
    </div>
  </header>

  {/*  Logo Ribbon Bar Section (Light Contrast Bar)  */}
  <section className="logo-ribbon-section">
    <div className="container">
      <div className="logo-ribbon-container">
        <div className="ribbon-heading">
          TRUSTED BY TEAMS THAT GROW FAST
        </div>
        <div className="logos-wrapper">
          <div className="logo-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon></svg>
            <span>Acme Corp.</span>
          </div>
          <div className="logo-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>
            <span>Cloudix</span>
          </div>
          <div className="logo-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2"></rect></svg>
            <span>BrightEdge</span>
          </div>
          <div className="logo-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle></svg>
            <span>Penta Labs</span>
          </div>
          <div className="logo-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
            <span>InnovaCo</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  4-Column Feature Highlight Bar  */}
  <section className="feature-bar-section">
    <div className="container">
      <div className="feature-bar-grid">
        
        <div className="feature-bar-item">
          <div className="bar-icon">👥</div>
          <div>
            <div className="bar-title">360° CUSTOMER VIEW</div>
            <div className="bar-desc">See every interaction, every time — all in one place.</div>
          </div>
        </div>

        <div className="feature-bar-item">
          <div className="bar-icon">🌪️</div>
          <div>
            <div className="bar-title">SMART PIPELINES</div>
            <div className="bar-desc">Focus on the right deals and move them forward.</div>
          </div>
        </div>

        <div className="feature-bar-item">
          <div className="bar-icon">📈</div>
          <div>
            <div className="bar-title">REAL-TIME INSIGHTS</div>
            <div className="bar-desc">Dashboards that help you decide, not guess.</div>
          </div>
        </div>

        <div className="feature-bar-item">
          <div className="bar-icon">🔒</div>
          <div>
            <div className="bar-title">SECURE & RELIABLE</div>
            <div className="bar-desc">Your data is safe with enterprise-grade security.</div>
          </div>
        </div>

      </div>
    </div>
  </section>

  {/*  6 Core Feature Grid  */}
  <section className="features-section" id="features">
    <div className="container">
      <div className="section-header reveal">
        <h2 className="section-title">Everything you need to scale revenue.</h2>
        <p className="section-subtitle">Engineered for high-performing sales organizations that require speed, clarity, and automation.</p>
      </div>

      <div className="nfc-grid">

        {/*  Card 1: Relationship Graph  */}
        <article className="nfc-card nfc-peach">
          <div className="nfc-left">
            <span className="nfc-badge"><span className="nfc-dot nfc-dot-orange"></span>Active Feature</span>
            <h3 className="nfc-title">Relationship Graph</h3>
            <p className="nfc-desc">Map out complex organizational structures automatically. Know exactly who holds the buying power before you pitch.</p>
            <a href="#" className="nfc-link">Learn more &#x2192;</a>
          </div>
          <div className="nfc-right" aria-hidden="true">
            <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="168" y1="118" x2="234" y2="68"  stroke="#e07040" strokeWidth="2" strokeDasharray="6 5" strokeLinecap="round"/>
              <line x1="152" y1="118" x2="90"  y2="68"  stroke="#e07040" strokeWidth="2" strokeDasharray="6 5" strokeLinecap="round"/>
              <line x1="140" y1="132" x2="80"  y2="168" stroke="#e07040" strokeWidth="2" strokeDasharray="6 5" strokeLinecap="round"/>
              <line x1="186" y1="138" x2="238" y2="174" stroke="#e07040" strokeWidth="2" strokeDasharray="6 5" strokeLinecap="round"/>
              <line x1="160" y1="158" x2="160" y2="210" stroke="#e07040" strokeWidth="2" strokeDasharray="6 5" strokeLinecap="round"/>
              <circle cx="160" cy="136" r="36" fill="#e8956a"/>
              <circle cx="160" cy="128" r="9"  fill="white" opacity="0.92"/>
              <path d="M144 152 Q160 144 176 152" stroke="white" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
              <rect x="208" y="18"  width="80" height="64" rx="14" fill="#f0c4a8"/>
              <circle cx="248" cy="36" r="10" fill="#e07040" opacity="0.8"/>
              <line x1="230" y1="52" x2="274" y2="52" stroke="#e07040" strokeWidth="2.2" strokeLinecap="round" opacity="0.55"/>
              <line x1="230" y1="62" x2="264" y2="62" stroke="#e07040" strokeWidth="2.2" strokeLinecap="round" opacity="0.4"/>
              <rect x="28"  y="18"  width="80" height="64" rx="14" fill="#f0c4a8"/>
              <circle cx="68"  cy="36" r="10" fill="#e07040" opacity="0.8"/>
              <line x1="50"  y1="52" x2="94"  y2="52" stroke="#e07040" strokeWidth="2.2" strokeLinecap="round" opacity="0.55"/>
              <line x1="50"  y1="62" x2="84"  y2="62" stroke="#e07040" strokeWidth="2.2" strokeLinecap="round" opacity="0.4"/>
              <rect x="26"  y="148" width="80" height="64" rx="14" fill="#f0c4a8"/>
              <circle cx="66"  cy="166" r="10" fill="#e07040" opacity="0.8"/>
              <line x1="48"  y1="182" x2="92"  y2="182" stroke="#e07040" strokeWidth="2.2" strokeLinecap="round" opacity="0.55"/>
              <line x1="48"  y1="192" x2="80"  y2="192" stroke="#e07040" strokeWidth="2.2" strokeLinecap="round" opacity="0.4"/>
              <rect x="212" y="154" width="80" height="64" rx="14" fill="#f0c4a8"/>
              <circle cx="252" cy="172" r="10" fill="#e07040" opacity="0.8"/>
              <line x1="234" y1="188" x2="278" y2="188" stroke="#e07040" strokeWidth="2.2" strokeLinecap="round" opacity="0.55"/>
              <line x1="234" y1="198" x2="268" y2="198" stroke="#e07040" strokeWidth="2.2" strokeLinecap="round" opacity="0.4"/>
              <rect x="120" y="216" width="80" height="58" rx="14" fill="#f5d8c4"/>
              <circle cx="160" cy="232" r="9"  fill="#e07040" opacity="0.7"/>
              <line x1="143" y1="246" x2="177" y2="246" stroke="#e07040" strokeWidth="2.2" strokeLinecap="round" opacity="0.45"/>
            </svg>
          </div>
        </article>

        {/*  Card 2: Revenue Forecasting  */}
        <article className="nfc-card nfc-grey">
          <div className="nfc-left">
            <span className="nfc-badge"><span className="nfc-dot nfc-dot-grey"></span>94% Accuracy</span>
            <h3 className="nfc-title">Revenue Forecasting</h3>
            <p className="nfc-desc">AI-driven models predict your quarter with 94% accuracy based on historical deal velocity and current engagement.</p>
            <a href="#" className="nfc-link">Explore model &#x2192;</a>
          </div>
          <div className="nfc-right" aria-hidden="true">
            <svg viewBox="0 0 300 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="140" y="10"  width="148" height="90" rx="12" fill="white" stroke="#d8d8e0" strokeWidth="1.5"/>
              <polyline points="152,80 168,62 186,68 204,44 222,38 268,18" stroke="#aaaabc" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="152" cy="80" r="3.5" fill="#aaaabc"/>
              <circle cx="168" cy="62" r="3.5" fill="#aaaabc"/>
              <circle cx="186" cy="68" r="3.5" fill="#aaaabc"/>
              <circle cx="204" cy="44" r="3.5" fill="#aaaabc"/>
              <circle cx="222" cy="38" r="3.5" fill="#aaaabc"/>
              <rect x="10"  y="118" width="180" height="130" rx="12" fill="white" stroke="#d8d8e0" strokeWidth="1.5"/>
              <rect x="24"  y="192" width="26"  height="44"  rx="6" fill="#c8c8d8"/>
              <rect x="58"  y="172" width="26"  height="64"  rx="6" fill="#b8b8cc"/>
              <rect x="92"  y="152" width="26"  height="84"  rx="6" fill="#a8a8bc"/>
              <defs>
                <radialGradient id="lensGrad" cx="40%" cy="35%" r="60%">
                  <stop offset="0%"   stop-color="#ffffff" stop-opacity="1"/>
                  <stop offset="40%"  stop-color="#f0f0f8" stop-opacity="0.95"/>
                  <stop offset="100%" stop-color="#d8d8ec" stop-opacity="0.88"/>
                </radialGradient>
                <radialGradient id="rimGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="70%"  stop-color="transparent"/>
                  <stop offset="100%" stop-color="#b0b0cc" stop-opacity="0.4"/>
                </radialGradient>
                <linearGradient id="shineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stop-color="white" stop-opacity="0.85"/>
                  <stop offset="100%" stop-color="white" stop-opacity="0"/>
                </linearGradient>
                <linearGradient id="handleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stop-color="#c8c8dc"/>
                  <stop offset="100%" stop-color="#9898b4"/>
                </linearGradient>
              </defs>
              <circle cx="148" cy="188" r="36" fill="none" stroke="#c0c0d4" strokeWidth="4"/>
              <circle cx="148" cy="188" r="34" fill="url(#lensGrad)"/>
              <circle cx="148" cy="188" r="34" fill="url(#rimGrad)"/>
              <circle cx="148" cy="188" r="26" fill="rgba(235,235,248,0.72)" stroke="rgba(180,180,210,0.35)" strokeWidth="1"/>
              <ellipse cx="138" cy="174" rx="11" ry="6" fill="url(#shineGrad)" opacity="0.75" transform="rotate(-30 138 174)"/>
              <circle cx="132" cy="170" r="3" fill="white" opacity="0.65"/>
              <line x1="172" y1="210" x2="188" y2="228" stroke="url(#handleGrad)" strokeWidth="7" strokeLinecap="round"/>
              <polyline points="139,196 148,174 157,196" stroke="#9090aa" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="148" y1="174" x2="148" y2="198" stroke="#9090aa" strokeWidth="2.2" strokeLinecap="round"/>
              <rect x="206" y="118" width="82"  height="130" rx="12" fill="white" stroke="#d8d8e0" strokeWidth="1.5"/>
              <circle cx="222" cy="140" r="5" fill="#c8c8d8"/>
              <line x1="232" y1="140" x2="274" y2="140" stroke="#d8d8e0" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="222" cy="160" r="5" fill="#c8c8d8"/>
              <line x1="232" y1="160" x2="274" y2="160" stroke="#d8d8e0" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="222" cy="180" r="5" fill="#c8c8d8"/>
              <line x1="232" y1="180" x2="274" y2="180" stroke="#d8d8e0" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="222" cy="200" r="5" fill="#c8c8d8"/>
              <line x1="232" y1="200" x2="268" y2="200" stroke="#d8d8e0" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="222" cy="220" r="5" fill="#c8c8d8"/>
              <line x1="232" y1="220" x2="272" y2="220" stroke="#d8d8e0" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
        </article>

        {/*  Card 3: Smart Sequences  */}
        <article className="nfc-card nfc-lavender">
          <div className="nfc-left">
            <span className="nfc-badge"><span className="nfc-dot nfc-dot-purple"></span>Automated</span>
            <h3 className="nfc-title">Smart Sequences</h3>
            <p className="nfc-desc">Automate follow-ups based on buying signals, not just time delays. Trigger actions when they read your proposal.</p>
            <a href="#" className="nfc-link">See how it works &#x2192;</a>
          </div>
          <div className="nfc-right" aria-hidden="true">
            <svg viewBox="0 0 300 310" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M112,128 C130,90 155,60 186,56"  stroke="#b8aee0" strokeWidth="3.5" strokeDasharray="9 7" strokeLinecap="round" fill="none"/>
              <path d="M112,182 C130,220 155,248 186,254" stroke="#b8aee0" strokeWidth="3.5" strokeDasharray="9 7" strokeLinecap="round" fill="none"/>
              <circle cx="72" cy="155" r="44" fill="#e8e4f4" stroke="#b8aee0" strokeWidth="1.8"/>
              <polygon points="62,138 62,172 96,155" fill="#7c6abf"/>
              <line x1="186" y1="92"  x2="186" y2="130" stroke="#b8aee0" strokeWidth="2"/>
              <circle cx="186" cy="130" r="4" fill="#b8aee0"/>
              <line x1="186" y1="134" x2="186" y2="240" stroke="#b8aee0" strokeWidth="2"/>
              <circle cx="186" cy="240" r="4" fill="#b8aee0"/>
              <rect x="146" y="20"  width="80" height="72" rx="14" fill="#8b78cc"/>
              <polyline points="152,38 186,58 220,38" stroke="rgba(230,220,255,0.9)" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="152" y="36"  width="68" height="44" rx="4" fill="none" stroke="rgba(230,220,255,0.4)" strokeWidth="1.2"/>
              <line x1="234" y1="38" x2="292" y2="38" stroke="#c8c0e4" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="234" y1="52" x2="284" y2="52" stroke="#c8c0e4" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="234" y1="66" x2="290" y2="66" stroke="#c8c0e4" strokeWidth="2.2" strokeLinecap="round"/>
              <rect x="146" y="134" width="80" height="72" rx="14" fill="#d8d0f0" stroke="#b8aee0" strokeWidth="1.6"/>
              <circle cx="186" cy="170" r="22" stroke="#7c6abf" strokeWidth="2" fill="white"/>
              <line x1="186" y1="170" x2="186" y2="154" stroke="#7c6abf" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="186" y1="170" x2="199" y2="177" stroke="#7c6abf" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="234" y1="150" x2="292" y2="150" stroke="#c8c0e4" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="234" y1="164" x2="284" y2="164" stroke="#c8c0e4" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="234" y1="178" x2="290" y2="178" stroke="#c8c0e4" strokeWidth="2.2" strokeLinecap="round"/>
              <rect x="146" y="244" width="80" height="66" rx="14" fill="#a898d8" stroke="#b8aee0" strokeWidth="1.6"/>
              <polyline points="163,277 179,293 210,262" stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="234" y1="258" x2="292" y2="258" stroke="#c8c0e4" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="234" y1="271" x2="284" y2="271" stroke="#c8c0e4" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="234" y1="284" x2="290" y2="284" stroke="#c8c0e4" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          </div>
        </article>

        {/*  Card 4: Enterprise Grade  */}
        <article className="nfc-card nfc-sage">
          <div className="nfc-left">
            <span className="nfc-badge"><span className="nfc-dot nfc-dot-green"></span>SOC2 Certified</span>
            <h3 className="nfc-title">Enterprise Grade</h3>
            <p className="nfc-desc">SOC2 Type II certified, granular role-based access control, and audit logs to keep your most valuable data secure.</p>
            <a href="#" className="nfc-link">Get in touch &#x2192;</a>
          </div>
          <div className="nfc-right" aria-hidden="true">
            <svg viewBox="0 0 310 290" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="140" cy="148" r="118" stroke="#5a9e80" strokeWidth="1.3" strokeDasharray="6 5" fill="none"/>
              <circle cx="218" cy="34"  r="5.5" fill="#5a9e80"/>
              <circle cx="38"  cy="222" r="5.5" fill="#5a9e80"/>
              <path d="M96 72 L140 58 L184 72 L184 128 Q184 170 140 190 Q96 170 96 128 Z" fill="#c8e8d8" stroke="#3d8a62" strokeWidth="2.2"/>
              <path d="M108 80 L140 68 L172 80 L172 128 Q172 162 140 178 Q108 162 108 128 Z" fill="none" stroke="#5aaa80" strokeWidth="1.2"/>
              <path d="M126 120 L126 108 Q126 94 140 94 Q154 94 154 108 L154 120" stroke="#3d8a62" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
              <rect x="122" y="118" width="36" height="30" rx="8" fill="#3d8a62"/>
              <circle cx="140" cy="130" r="5.5" fill="#c8e8d8"/>
              <rect x="138" y="130" width="4"  height="8"  rx="2" fill="#c8e8d8"/>
              <rect x="198" y="42"  width="100" height="34" rx="9" fill="#b8deca" stroke="#5a9e80" strokeWidth="1.4"/>
              <circle cx="214" cy="59" r="3.5" fill="#3d8a62"/>
              <circle cx="225" cy="59" r="3.5" fill="#3d8a62" opacity="0.55"/>
              <circle cx="236" cy="59" r="3.5" fill="#3d8a62" opacity="0.3"/>
              <rect x="260" y="53"  width="28"  height="12" rx="6" fill="#5a9e80" opacity="0.7"/>
              <rect x="198" y="84"  width="100" height="34" rx="9" fill="#a8d4bc" stroke="#5a9e80" strokeWidth="1.4"/>
              <circle cx="214" cy="101" r="3.5" fill="#3d8a62"/>
              <circle cx="225" cy="101" r="3.5" fill="#3d8a62" opacity="0.55"/>
              <line x1="240" y1="97"  x2="276" y2="97"  stroke="#5a9e80" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
              <line x1="240" y1="105" x2="270" y2="105" stroke="#5a9e80" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
              <rect x="198" y="126" width="100" height="34" rx="9" fill="#b8deca" stroke="#5a9e80" strokeWidth="1.4"/>
              <circle cx="214" cy="143" r="3.5" fill="#3d8a62"/>
              <circle cx="225" cy="143" r="3.5" fill="#3d8a62" opacity="0.55"/>
              <rect x="260" y="137" width="28"  height="12" rx="6" fill="#5a9e80" opacity="0.7"/>
              <rect x="196" y="176" width="104" height="82" rx="12" fill="white" stroke="#8cc8a8" strokeWidth="1.5"/>
              <circle cx="215" cy="200" r="9" fill="none" stroke="#3d8a62" strokeWidth="1.8"/>
              <polyline points="210,200 214,205 222,195" stroke="#3d8a62" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="230" y1="198" x2="288" y2="198" stroke="#aad4bc" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="230" y1="206" x2="278" y2="206" stroke="#aad4bc" strokeWidth="2.2" strokeLinecap="round"/>
              <circle cx="215" cy="232" r="9" fill="none" stroke="#3d8a62" strokeWidth="1.8"/>
              <polyline points="210,232 214,237 222,227" stroke="#3d8a62" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="230" y1="230" x2="288" y2="230" stroke="#aad4bc" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="230" y1="238" x2="278" y2="238" stroke="#aad4bc" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          </div>
        </article>

      </div>
    </div>
  </section>

  {/*  Interactive Process Section  */}
  <section className="process-section" id="process">
    <div className="container">
      <div className="section-header reveal">
        <h2 className="section-title">How top performers close deals faster.</h2>
        <p className="section-subtitle">We analyzed millions of successful B2B transactions to build a workflow that actually reflects how modern sales happens.</p>
      </div>

      <div className="process-layout">
        <div className="process-steps-list reveal">
          <div className="process-step-item active" data-step="1">
            <div className="step-number">01</div>
            <div>
              <h3 className="step-content-title">Connect Your Data</h3>
              <p className="step-content-desc">Sync your inbox, calendar, and existing tools in one click. Error Infotech instantly ingests historical data to build your relationship graph.</p>
            </div>
          </div>

          <div className="process-step-item" data-step="2">
            <div className="step-number">02</div>
            <div>
              <h3 className="step-content-title">Map the Organization</h3>
              <p className="step-content-desc">Our AI automatically identifies decision-makers, champions, and blockers, visualizing the exact path to closed-won.</p>
            </div>
          </div>

          <div className="process-step-item" data-step="3">
            <div className="step-number">03</div>
            <div>
              <h3 className="step-content-title">Execute & Close</h3>
              <p className="step-content-desc">Run personalized sequences, track engagement intent, and negotiate in shared deal rooms to accelerate the final signature.</p>
            </div>
          </div>
        </div>

        <div className="process-visual-display reveal" id="orbitViz">

          {/*  Central core  */}
          <div className="orb-core">
            <div className="orb-pulse"></div>
            <div className="orb-inner">
              <svg viewBox="0 0 44 44" fill="none"><circle cx="22" cy="22" r="20" stroke="rgba(42,157,143,0.6)" strokeWidth="1.5"/><polyline points="10,26 17,18 22,22 30,13 38,10" stroke="#2a9d8f" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><circle cx="22" cy="22" r="3" fill="#1a6b5c"/></svg>
            </div>
          </div>

          {/*  SVG orbit lines + animated dot tracers  */}
          <svg className="orbit-svg" viewBox="0 0 420 380" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/*  Orbit ellipses  */}
            <ellipse cx="210" cy="190" rx="155" ry="100" stroke="rgba(26,107,92,0.12)" strokeWidth="1.2"/>
            <ellipse cx="210" cy="190" rx="105" ry="68"  stroke="rgba(26,107,92,0.10)" strokeWidth="1"/>
            {/*  Tracer dots on outer orbit  */}
            <circle r="4" fill="#2a9d8f" opacity="0.8">
              <animateMotion dur="6s" repeatCount="indefinite">
                <mpath href="#outerOrbit"/>
              </animateMotion>
            </circle>
            <circle r="3" fill="#1a6b5c" opacity="0.5">
              <animateMotion dur="6s" begin="3s" repeatCount="indefinite">
                <mpath href="#outerOrbit"/>
              </animateMotion>
            </circle>
            {/*  Tracer on inner orbit  */}
            <circle r="3.5" fill="#2a9d8f" opacity="0.7">
              <animateMotion dur="4s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath href="#innerOrbit"/>
              </animateMotion>
            </circle>
            {/*  Hidden paths for animateMotion  */}
            <ellipse id="outerOrbit" cx="210" cy="190" rx="155" ry="100" display="none"/>
            <ellipse id="innerOrbit" cx="210" cy="190" rx="105" ry="68"  display="none"/>
            {/*  Connector lines from center to nodes (animated opacity)  */}
            <line className="orb-line" x1="210" y1="190" x2="72"  y2="112"/>
            <line className="orb-line" x1="210" y1="190" x2="348" y2="108"/>
            <line className="orb-line" x1="210" y1="190" x2="58"  y2="268"/>
            <line className="orb-line" x1="210" y1="190" x2="358" y2="278"/>
          </svg>

          {/*  Floating data nodes — each unique  */}
          <div className="orb-node on-tl">
            <span className="on-icon">📥</span>
            <span className="on-label">Inbox Synced</span>
            <div className="on-bar"><div className="on-fill" style={{width: '88%'}}></div></div>
          </div>

          <div className="orb-node on-tr">
            <span className="on-icon">⚡</span>
            <span className="on-label">Data Ingested</span>
            <div className="on-bar"><div className="on-fill" style={{width: '72%'}}></div></div>
          </div>

          <div className="orb-node on-bl">
            <span className="on-icon">📊</span>
            <span className="on-label">Graph Built</span>
            <div className="on-bar"><div className="on-fill" style={{width: '95%'}}></div></div>
          </div>

          <div className="orb-node on-br">
            <span className="on-icon">✨</span>
            <span className="on-label">100% Automated</span>
            <div className="on-bar"><div className="on-fill" style={{width: '100%'}}></div></div>
          </div>

        </div>
      </div>
    </div>
  </section>

  {/*  Testimonials Section  */}
  <section className="testimonials-section" id="testimonials">
    <div className="container">
      <div className="section-header reveal">
        <h2 className="section-title">Trusted by high-velocity sales teams worldwide.</h2>
      </div>

      <div className="vcard-grid">

        <div className="vcard reveal">
          <div className="vcard-spiral" aria-hidden="true"><svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="sp-ring sp-r1" d="M60,60 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" stroke="#1a6b5c" strokeWidth="1.2" fill="none" strokeDasharray="314" strokeDashoffset="314"/><path className="sp-ring sp-r2" d="M60,60 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" stroke="#2a9d8f" strokeWidth="1" fill="none" strokeDasharray="226" strokeDashoffset="226"/><path className="sp-ring sp-r3" d="M60,60 m-22,0 a22,22 0 1,1 44,0 a22,22 0 1,1 -44,0" stroke="#1a6b5c" strokeWidth="0.9" fill="none" strokeDasharray="138" strokeDashoffset="138"/></svg></div>
          <div className="vcard-icon-wrap">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="14" r="7" stroke="white" strokeWidth="1.8"/>
              <path d="M8 34 Q8 24 32 24 Q32 34 32 34 Z" stroke="white" strokeWidth="1.7" fill="none"/>
            </svg>
          </div>
          <h3 className="vcard-title">Sarah Chen</h3>
          <p className="vcard-role">VP Sales, Meridian Technologies</p>
          <p className="vcard-desc">"We switched from Salesforce six months ago. The difference in rep adoption is staggering. Error Infotech feels like it was built for people who actually sell, not just for managers who want reports."</p>
        </div>

        <div className="vcard reveal vcard-featured">
          <div className="vcard-spiral" aria-hidden="true"><svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="sp-ring sp-r1" d="M60,60 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" stroke="#1a6b5c" strokeWidth="1.2" fill="none" strokeDasharray="314" strokeDashoffset="314"/><path className="sp-ring sp-r2" d="M60,60 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" stroke="#2a9d8f" strokeWidth="1" fill="none" strokeDasharray="226" strokeDashoffset="226"/><path className="sp-ring sp-r3" d="M60,60 m-22,0 a22,22 0 1,1 44,0 a22,22 0 1,1 -44,0" stroke="#1a6b5c" strokeWidth="0.9" fill="none" strokeDasharray="138" strokeDashoffset="138"/></svg></div>
          <div className="vcard-icon-wrap">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="14" r="7" stroke="white" strokeWidth="1.8"/>
              <path d="M8 34 Q8 24 32 24 Q32 34 32 34 Z" stroke="white" strokeWidth="1.7" fill="none"/>
            </svg>
          </div>
          <h3 className="vcard-title">Marcus Johnson</h3>
          <p className="vcard-role">Chief Revenue Officer, CloudScale Inc.</p>
          <p className="vcard-desc">"The Pipeline Intelligence feature alone paid for our annual contract in the first week. We identified a critical bottleneck in our enterprise motion that we had missed for years."</p>
        </div>

        <div className="vcard reveal">
          <div className="vcard-spiral" aria-hidden="true"><svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="sp-ring sp-r1" d="M60,60 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" stroke="#1a6b5c" strokeWidth="1.2" fill="none" strokeDasharray="314" strokeDashoffset="314"/><path className="sp-ring sp-r2" d="M60,60 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" stroke="#2a9d8f" strokeWidth="1" fill="none" strokeDasharray="226" strokeDashoffset="226"/><path className="sp-ring sp-r3" d="M60,60 m-22,0 a22,22 0 1,1 44,0 a22,22 0 1,1 -44,0" stroke="#1a6b5c" strokeWidth="0.9" fill="none" strokeDasharray="138" strokeDashoffset="138"/></svg></div>
          <div className="vcard-icon-wrap">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="14" r="7" stroke="white" strokeWidth="1.8"/>
              <path d="M8 34 Q8 24 32 24 Q32 34 32 34 Z" stroke="white" strokeWidth="1.7" fill="none"/>
            </svg>
          </div>
          <h3 className="vcard-title">Elena Rodriguez</h3>
          <p className="vcard-role">Director of Sales Ops, Nexus Financial</p>
          <p className="vcard-desc">"Finally, a CRM that doesn't feel like a spreadsheet from 2005. It's blazing fast, the UI is gorgeous, and the automated data enrichment saves our SDRs hours every week."</p>
        </div>

      </div>
    </div>
  </section>


  {/*  Pricing Section  */}
  <section className="pricing-section" id="pricing">
    <div className="container">
      <div className="section-header reveal">
        <h2 className="section-title">Simple, transparent pricing.</h2>
        <p className="section-subtitle">No hidden fees, no surprise overages. Pick the plan that fits your team and scale with confidence.</p>
      </div>

      <div className="pricing-toggle-wrapper reveal">
        <span className="toggle-label">Monthly</span>
        <div className="toggle-switch" id="pricingToggle">
          <div className="toggle-slider"></div>
        </div>
        <span className="toggle-label">Annual</span>
        <span className="discount-badge">Save 20%</span>
      </div>

      <div className="pricing-grid">
        <div className="pricing-card reveal">
          <h3 className="plan-name">Starter</h3>
          <p className="plan-desc">Perfect for small teams building their first revenue engine.</p>
          <div className="plan-price">
            <span id="starterPrice">$29</span>
            <span className="price-period">/mo per user</span>
          </div>
          <ul className="plan-features">
            <li className="plan-feature-item"><span className="check-icon">✓</span> Up to 5 users</li>
            <li className="plan-feature-item"><span className="check-icon">✓</span> Basic Pipeline Management</li>
            <li className="plan-feature-item"><span className="check-icon">✓</span> Email & Calendar Sync</li>
            <li className="plan-feature-item"><span className="check-icon">✓</span> Standard Reporting</li>
            <li className="plan-feature-item"><span className="check-icon">✓</span> Email Support</li>
          </ul>
          <button className="btn-outline-glass w-full" onClick="showToast('Starter trial selected')">Start Free Trial</button>
        </div>

        <div className="pricing-card popular reveal">
          <div className="popular-tag">MOST POPULAR</div>
          <h3 className="plan-name">Growth</h3>
          <p className="plan-desc">For scaling teams that need advanced analytics and automation.</p>
          <div className="plan-price">
            <span id="growthPrice">$79</span>
            <span className="price-period">/mo per user</span>
          </div>
          <ul className="plan-features">
            <li className="plan-feature-item"><span className="check-icon">✓</span> Unlimited users</li>
            <li className="plan-feature-item"><span className="check-icon">✓</span> Advanced Revenue Forecasting</li>
            <li className="plan-feature-item"><span className="check-icon">✓</span> Smart Sequences & Automation</li>
            <li className="plan-feature-item"><span className="check-icon">✓</span> Deal Rooms</li>
            <li className="plan-feature-item"><span className="check-icon">✓</span> Custom API Access</li>
            <li className="plan-feature-item"><span className="check-icon">✓</span> Priority Support</li>
          </ul>
          <button className="btn-primary w-full" onClick="showToast('Growth trial selected')">Start Free Trial</button>
        </div>

        <div className="pricing-card reveal">
          <h3 className="plan-name">Enterprise</h3>
          <p className="plan-desc">For large organizations with complex requirements.</p>
          <div className="plan-price">
            <span>Custom</span>
          </div>
          <ul className="plan-features">
            <li className="plan-feature-item"><span className="check-icon">✓</span> Custom Integrations</li>
            <li className="plan-feature-item"><span className="check-icon">✓</span> SSO & Advanced Security</li>
            <li className="plan-feature-item"><span className="check-icon">✓</span> SLA Guarantee</li>
            <li className="plan-feature-item"><span className="check-icon">✓</span> On-Prem Option</li>
            <li className="plan-feature-item"><span className="check-icon">✓</span> Dedicated Success Manager</li>
          </ul>
          <button className="btn-outline-glass w-full" onClick="showToast('Connecting with Sales...')">Contact Sales</button>
        </div>
      </div>
    </div>
  </section>

  {/*  CTA Banner  */}
  <section className="cta-section">
    <div className="container">
      <div className="cta-banner reveal">
        <h2 className="cta-title">Ready to accelerate your revenue?</h2>
        <p className="cta-subtitle">Join thousands of high-performing sales teams who have already made the switch. Set up takes less than 5 minutes.</p>
        <button className="btn-primary btn-lg btn-white" onClick="showToast('Initiating free trial setup...')">
          <span>Start Your Free Trial →</span>
        </button>
        <p className="cta-note">No credit card required. 14-day free trial.</p>
      </div>
    </div>
  </section>

  {/*  Footer  */}
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="#" className="navbar-brand">
            <img src="logo.png" alt="ERROR Infotech Pvt Ltd" className="brand-logo brand-logo--footer" />
          </a>
          <p>The cockpit for sales teams who move fast, close hard, and never let a lead go cold.</p>
          <div className="social-links">
            <a href="#" className="social-icon" aria-label="Twitter">𝕏</a>
            <a href="#" className="social-icon" aria-label="YouTube">▶</a>
            <a href="#" className="social-icon" aria-label="GitHub">⚙</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Product</h4>
          <ul className="footer-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#">Integrations</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#">Changelog</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul className="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <ul className="footer-links">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 EriScale Infotech Pvt Ltd. All rights reserved.</p>
        <div className="status-badge">
          <span className="status-dot"></span>
          <span>System Status: Operational</span>
        </div>
      </div>
    </div>
  </footer>

  
  
  

  {/*  ── Login Modal ──  */}
  <div id="loginOverlay" className="lm-overlay" aria-modal="true" role="dialog" aria-label="Sign in">
    <div className="lm-backdrop" id="loginBackdrop"></div>
    <div className="lm-card" id="loginCard">

      {/*  Decorative animated rings  */}
      <div className="lm-ring lm-ring-1"></div>
      <div className="lm-ring lm-ring-2"></div>

      {/*  Close button  */}
      <button className="lm-close" id="loginClose" aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>

      {/*  Logo + heading  */}
      <div className="lm-header">
        <div className="lm-logo-mark">
          <svg viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="17" stroke="#2a9d8f" strokeWidth="1.5"/><polyline points="8,22 14,15 18,18 24,11 30,8" stroke="#1a6b5c" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><circle cx="18" cy="18" r="2.5" fill="#1a6b5c"/></svg>
        </div>
        <h2 className="lm-title">Welcome back</h2>
        <p className="lm-subtitle">Sign in to your Error Infotech account</p>
      </div>

      {/*  Form  */}
      <form className="lm-form" onSubmit="return false;">
        <div className="lm-field">
          <label className="lm-label">Email address</label>
          <div className="lm-input-wrap">
            <svg className="lm-input-icon" viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><polyline points="2,5 10,12 18,5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
            <input type="email" className="lm-input" placeholder="you@company.com" autocomplete="email"/>
          </div>
        </div>

        <div className="lm-field">
          <label className="lm-label">Password</label>
          <div className="lm-input-wrap">
            <svg className="lm-input-icon" viewBox="0 0 20 20" fill="none"><rect x="5" y="9" width="10" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 9V7a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
            <input type="password" className="lm-input" placeholder="••••••••" autocomplete="current-password"/>
          </div>
          <a href="#" className="lm-forgot">Forgot password?</a>
        </div>

        <button type="submit" className="lm-submit" onClick="showToast('Signing you in...')">
          <span>Sign in</span>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="10" x2="16" y2="10"/><polyline points="11 5 16 10 11 15"/></svg>
        </button>
      </form>

      <p className="lm-signup">Don't have an account? <a href="#" onClick="showToast('Redirecting to signup...')">Start free trial</a></p>

      {/*  Animated progress bar (auto-close hint)  */}
      <div className="lm-timer-bar"><div className="lm-timer-fill" id="loginTimerFill"></div></div>

    </div>
  </div>


    </>
  );
};

export default Home;
