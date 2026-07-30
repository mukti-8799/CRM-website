import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import ParticleBackground from '../components/ParticleBackground';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LiveDashboardPreview from '../components/LiveDashboardPreview';

gsap.registerPlugin(ScrollTrigger);

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
    const nextStep = document.querySelector(`.process-step-item[data-step="${currentStep}"]`);
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

  // Video playback reset on scroll
  const processVideo = document.getElementById('processVideo');
  if (processVideo) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.currentTime = 0;
          entry.target.play().catch(e => console.log('Autoplay prevented:', e));
        } else {
          entry.target.pause();
        }
      });
    }, { threshold: 0.2 });
    videoObserver.observe(processVideo);
  }

  // 13. Chaos Sticky Video — hover-gated scroll logic
  const chaosBody        = document.querySelector('#chaosStickyBody');
  const chaosVideoWrapper = document.querySelector('#chaosVideoWrapper');
  const chaosVideos      = document.querySelectorAll('.chaos-video');
  const chaosTotalSteps  = 4;

  function setActiveStep(stepNum, dir = 1) {
    // Video: scale-fade with exit class on outgoing
    chaosVideos.forEach(v => {
      const isActive = v.id === `chaos-vid-${stepNum}`;
      if (isActive) {
        v.classList.remove('exit');
        v.classList.add('active');
        v.play().catch(() => {});
      } else if (v.classList.contains('active')) {
        v.classList.add('exit');
        v.classList.remove('active');
        setTimeout(() => { v.classList.remove('exit'); v.pause(); }, 700);
      }
    });

    // Left numbers: wheel roll animation
    document.querySelectorAll('.chaos-num-item').forEach((n, i) => {
      const isActive = n.getAttribute('data-step') === String(stepNum);
      const wasActive = n.classList.contains('active');

      // clear all animation classes
      n.classList.remove('roll-in-up','roll-in-down','roll-out-up','roll-out-down','active');
      n.style.transitionDelay = '0s';

      if (isActive) {
        // incoming: from bottom if scrolling down, from top if scrolling up
        n.classList.add(dir > 0 ? 'roll-in-up' : 'roll-in-down');
        n.classList.add('active');
        n.style.transitionDelay = `${i * 0.04}s`;
      } else if (wasActive) {
        // outgoing: to top if scrolling down, to bottom if scrolling up
        n.classList.add(dir > 0 ? 'roll-out-up' : 'roll-out-down');
        setTimeout(() => {
          n.classList.remove('roll-out-up','roll-out-down');
          n.style.opacity = '0.22';
        }, 420);
      }
    });

    // Right desc: slide from right + blur clear
    document.querySelectorAll('.chaos-desc-text').forEach(d => {
      d.classList.toggle('active', d.id === `chaos-desc-${stepNum}`);
    });

    // Right col card: same active theme as left cards
    const descCol = document.querySelector('.chaos-desc-col');
    if (descCol) descCol.classList.add('active-desc');

    // Dots
    document.querySelectorAll('.chaos-dot').forEach(d => {
      d.classList.toggle('active', d.getAttribute('data-step') === String(stepNum));
    });
  }

  if (chaosBody && chaosVideos.length > 0) {
    let currentStep = 1;
    setActiveStep(1);

    // activate right col on load
    const descCol = document.querySelector('.chaos-desc-col');
    if (descCol) descCol.classList.add('active-desc');

    // ── Smooth Scroll Progress via GSAP ScrollTrigger ──
    // Replaced laggy wheel trap with native smooth scroll tracking
    ScrollTrigger.create({
      trigger: chaosBody,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        let newStep = Math.floor(self.progress * chaosTotalSteps) + 1;
        if (newStep > chaosTotalSteps) newStep = chaosTotalSteps;
        if (newStep < 1) newStep = 1;

        if (newStep !== currentStep) {
          const dir = newStep > currentStep ? 1 : -1;
          currentStep = newStep;
          setActiveStep(currentStep, dir);
        }
      }
    });

    // ── Dot click navigation ──
    document.querySelectorAll('.chaos-dot').forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        const step = parseInt(dot.getAttribute('data-step'));
        // Approximate scroll position for smooth jump
        const targetScroll = chaosBody.offsetTop + ((step - 1) * (chaosBody.offsetHeight / chaosTotalSteps));
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      });
    });
  }

  function createToastContainer() {
    const c = document.createElement('div');
    c.id = 'toastContainer';
    c.className = 'toast-container';
    document.body.appendChild(c);
    return c;
  }

  // ── Quote card: replay animation every time chaos section enters viewport ──
  const quoteCard = document.querySelector('.chaos-quote-card');
  const quoteBars = document.querySelectorAll('.cq-bar');

  if (quoteCard) {
    const quoteObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Reset quote fade-in
          quoteCard.style.animation = 'none';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              quoteCard.style.animation = '';
            });
          });

          // Reset each bar's rise animation with stagger
          quoteBars.forEach((bar, i) => {
            bar.style.animation = 'none';
            bar.style.transform = 'scaleY(0)';
            const delay = i * 0.2;
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                bar.style.animation = '';
                bar.style.setProperty('--d', `${delay}s`);
              });
            });
          });
        }
      });
    }, { threshold: 0.15 });

    quoteObserver.observe(document.querySelector('.chaos-section') || quoteCard);
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

  // ── Lenis Smooth Scroll + GSAP ScrollTrigger ──
  // Home page only — cleaned up on unmount
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  // Pause lenis when chaos trap is active
  window.__chaosScrollTrapped = (val) => {
    if (val) lenis.stop();
    else     lenis.start();
  };

  // Sync lenis with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  const lenisRaf = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(lenisRaf);
  gsap.ticker.lagSmoothing(0);

  // ── Parallax on hero elements ──
  gsap.to('.hero-left-content', {
    y: -60,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    }
  });

  gsap.to('.hero-visual-container', {
    y: -30,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 2,
    }
  });


  // ── GSAP ScrollTrigger for Accordion Section ──
  const accordionSection = document.querySelector('.accordion-section');
  const panels = document.querySelectorAll('.accordion-panel');
  if (accordionSection && panels.length > 0) {
    ScrollTrigger.create({
      trigger: accordionSection,
      start: 'center center',
      end: '+=2000',
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const total = panels.length;
        let activeIdx = Math.floor(progress * total);
        if (activeIdx >= total) activeIdx = total - 1;
        
        panels.forEach((p, i) => {
          if (i === activeIdx) {
            if (!p.classList.contains('active')) p.classList.add('active');
          } else {
            if (p.classList.contains('active')) p.classList.remove('active');
          }
        });
      }
    });
  }

  // ── Stagger reveal for feature bar items ──
  gsap.fromTo('.feature-bar-item',
    { opacity: 0, y: 30 },
    {
      opacity: 1, y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.feature-bar-section',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    }
  );

  return () => {
    lenis.destroy();
    gsap.ticker.remove(lenisRaf);
    ScrollTrigger.getAll().forEach(t => t.kill());
    window.__chaosScrollTrapped = null;
  };

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
            BUILT <br />FOR <span className="script-accent" spellCheck={false}>Sales</span>
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
            <span>REAL INSIGHTS.</span>
            <span>REAL GROWTH.</span>
            <span>REAL RESULTS.</span>
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
            <div style={{padding: '0', display: 'flex', height: 'clamp(280px, 40vw, 460px)'}}>
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

    {/* Format Video Section replacing Accordion */}
    <style dangerouslySetInnerHTML={{__html: `
      .format-accordion-wrapper {
        display: flex;
        width: 100%;
        height: 65vh;
        min-height: 500px;
        max-height: 700px;
        background: #111;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        margin-top: 1rem;
      }
      
      .format-panel {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 2rem;
        transition: flex 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        cursor: pointer;
        border-right: 2px solid #000;
        overflow: hidden;
        position: relative;
      }
      
      .format-panel:last-child {
        border-right: none;
      }
      
      .format-panel.active {
        flex: 4;
      }
      
      .format-panel-top {
        display: flex;
        align-items: flex-start;
        gap: 1.5rem;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.5s ease;
        white-space: nowrap;
      }
      
      .format-panel.active .format-panel-top {
        opacity: 1;
        transform: translateY(0);
        transition-delay: 0.2s;
      }
      
      .format-panel-num {
        font-family: 'Outfit', sans-serif;
        font-size: 3rem;
        font-weight: 900;
        line-height: 0.8;
        letter-spacing: -2px;
      }
      
      .format-panel-desc {
        font-size: 0.9rem;
        font-weight: 700;
        text-transform: uppercase;
        max-width: 160px;
        white-space: normal;
        line-height: 1.3;
      }
      
      .format-panel-video-wrapper {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem 0;
        position: relative;
        min-height: 0;
      }
      
      .format-panel-video {
        width: 100%;
        height: 100%;
        max-height: 250px;
        object-fit: cover;
        transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        filter: grayscale(100%);
        border-radius: 8px;
        opacity: 0.4;
      }
      
      .format-panel.active .format-panel-video {
        filter: grayscale(0%);
        max-height: 350px;
        opacity: 1;
      }
      
      .format-panel-bottom {
        position: relative;
        display: flex;
        align-items: flex-end;
        height: 80px;
      }
      
      .format-panel-title {
        font-family: 'Outfit', sans-serif;
        font-size: clamp(2.5rem, 4.5vw, 5.5rem);
        font-weight: 900;
        text-transform: uppercase;
        line-height: 0.75;
        margin: 0;
        white-space: nowrap;
        letter-spacing: -0.02em;
        transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
      }
      
      .format-panel:not(.active) .format-panel-title {
        font-size: 2rem;
        opacity: 0.6;
      }
      
      .fp-1 { background: #e5e7eb; color: #111; }
      .fp-2 { background: #111827; color: #f3f4f6; }
      .fp-3 { background: #fbcfe8; color: #111; }
      .fp-4 { background: #2a9d8f; color: #f3f4f6; }
    `}} />
  <section className="format-section" id="chaos">
    <div className="container format-container">
      <div className="accordion-heading-row" style={{marginBottom: '2rem'}}>
        <h2 className="chaos-title" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)' }}>
          Everything you need to <span className="script-accent" spellCheck={false} style={{ fontSize: '1.15em' }}>scale</span>
        </h2>
        <p className="chaos-subtitle">Your team deserves better than scattered data and missed follow-ups.</p>
      </div>

      <div className="format-accordion-wrapper">
        
        {/* Panel 1 */}
        <div className="format-panel fp-1 active" onMouseEnter={(e) => { document.querySelectorAll('.format-panel').forEach(p => p.classList.remove('active')); e.currentTarget.classList.add('active'); }}>
          <div className="format-panel-top">
            <div className="format-panel-num">00-1</div>
            <div className="format-panel-desc">Monitor your daily activities</div>
          </div>
          <div className="format-panel-video-wrapper">
            <video className="format-panel-video" src="/video/video1.mp4" autoPlay loop muted playsInline></video>
          </div>
          <div className="format-panel-bottom">
            <h3 className="format-panel-title">AGENT DASHBOARD</h3>
          </div>
        </div>

        {/* Panel 2 */}
        <div className="format-panel fp-2" onMouseEnter={(e) => { document.querySelectorAll('.format-panel').forEach(p => p.classList.remove('active')); e.currentTarget.classList.add('active'); }}>
          <div className="format-panel-top">
            <div className="format-panel-num">00-2</div>
            <div className="format-panel-desc">Track leads through every stage</div>
          </div>
          <div className="format-panel-video-wrapper">
            <video className="format-panel-video" src="/video/video2.mp4" autoPlay loop muted playsInline></video>
          </div>
          <div className="format-panel-bottom">
            <h3 className="format-panel-title">LEAD PIPELINE</h3>
          </div>
        </div>

        {/* Panel 3 */}
        <div className="format-panel fp-3" onMouseEnter={(e) => { document.querySelectorAll('.format-panel').forEach(p => p.classList.remove('active')); e.currentTarget.classList.add('active'); }}>
          <div className="format-panel-top">
            <div className="format-panel-num">00-3</div>
            <div className="format-panel-desc">View and manage the latest leads</div>
          </div>
          <div className="format-panel-video-wrapper">
            <video className="format-panel-video" src="/video/video3.mp4" autoPlay loop muted playsInline></video>
          </div>
          <div className="format-panel-bottom">
            <h3 className="format-panel-title">LEAD QUEUE</h3>
          </div>
        </div>

        {/* Panel 4 */}
        <div className="format-panel fp-4" onMouseEnter={(e) => { document.querySelectorAll('.format-panel').forEach(p => p.classList.remove('active')); e.currentTarget.classList.add('active'); }}>
          <div className="format-panel-top">
            <div className="format-panel-num">00-4</div>
            <div className="format-panel-desc">Analyze lead performance & trends</div>
          </div>
          <div className="format-panel-video-wrapper">
            <video className="format-panel-video" src="/video/video4.mp4" autoPlay loop muted playsInline></video>
          </div>
          <div className="format-panel-bottom">
            <h3 className="format-panel-title">LEAD ANALYTICS</h3>
          </div>
        </div>

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

        <div className="process-visual-display reveal" id="orbitViz" style={{ padding: 0, overflow: 'hidden', minHeight: 'auto', display: 'block' }}>
          <video 
            id="processVideo"
            src="/video/CRM_video_202607241644.mp4"
            autoPlay 
            loop 
            muted 
            playsInline 
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 'inherit' }}
          />
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
