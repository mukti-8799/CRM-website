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
    // NexaCRM Interactive JavaScript

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
        { value: 48, suffix: '', display: '48' },
        { value: 67, suffix: '%', display: '67%' }
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
          emoji: 'ðŸš€',
          badges: [
            { selector: '.nb-1', icon: 'ðŸ“¥', text: 'Inbox & Calendar Synced' },
            { selector: '.nb-2', icon: 'âš¡', text: 'Auto Data Ingestion' },
            { selector: '.nb-3', icon: 'ðŸ“Š', text: 'Graph Built' },
            { selector: '.nb-4', icon: 'âœ¨', text: '100% Automated' }
          ]
        },
        2: {
          emoji: 'ðŸŽ¯',
          badges: [
            { selector: '.nb-1', icon: 'ðŸ‘‘', text: 'Decision Maker Identified' },
            { selector: '.nb-2', icon: 'ðŸ›¡ï¸', text: 'Champion Mapped' },
            { selector: '.nb-3', icon: 'âš ï¸', text: 'Blocker Flagged' },
            { selector: '.nb-4', icon: 'ðŸ—ºï¸', text: 'Path to Closed-Won' }
          ]
        },
        3: {
          emoji: 'ðŸ’¼',
          badges: [
            { selector: '.nb-1', icon: 'âœ‰ï¸', text: 'Sequence Sent' },
            { selector: '.nb-2', icon: 'ðŸ¤', text: 'Deal Room Active' },
            { selector: '.nb-3', icon: 'âœï¸', text: 'E-Signature Pending' },
            { selector: '.nb-4', icon: 'ðŸŽ‰', text: 'Deal Closed ($120k)' }
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
            growthPrice.textContent = isAnnual ? '$63' : '$79';
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
          const heroLeft = hero.querySelector('.hero-left-content');
          const heroRight = hero.querySelector('.hero-visual-container');
          if (heroLeft) heroLeft.style.transform = `translateY(${scrollY * 0.06}px)`;
          if (heroRight) heroRight.style.transform = `translateY(${scrollY * 0.04}px)`;
        }
      }, { passive: true });

      // 9. Magnetic button effect on primary buttons
      document.querySelectorAll('.btn-primary, .btn-outline-glass').forEach(btn => {
        btn.addEventListener('mousemove', e => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
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
        toast.innerHTML = `<span>âš¡</span> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
          toast.style.opacity = '0';
          toast.style.transform = 'translateX(100px)';
          setTimeout(() => toast.remove(), 300);
        }, 3000);
      };

      // 12. Feature card click â€” darken on mousedown, reset on mouseleave
      document.querySelectorAll('.fc-card').forEach(card => {
        card.addEventListener('mousedown', () => card.classList.add('fc-pressed'));
        card.addEventListener('mouseup', () => card.classList.remove('fc-pressed'));
        card.addEventListener('mouseleave', () => card.classList.remove('fc-pressed'));
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

      // 13. Format Accordion Scroll-based Pin Logic initialized below

      function createToastContainer() {
        const c = document.createElement('div');
        c.id = 'toastContainer';
        c.className = 'toast-container';
        document.body.appendChild(c);
        return c;
      }

      // â”€â”€ Quote card: replay animation every time chaos section enters viewport â”€â”€
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

    // â”€â”€ Testimonial cards: replay animation every time they enter viewport â”€â”€
        // -- ERP Showcase scroll-in animation --
    (function erpShowcaseAnim() {
      var observed = false;
      var obs = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting && !observed) {
            observed = true;
            var lCol = document.getElementById('erpL');
            var rCol = document.getElementById('erpR');
            if (lCol) lCol.classList.add('ei');
            setTimeout(function() { if (rCol) rCol.classList.add('ei'); }, 150);
            ['erpHa','erpHb','erpHc'].forEach(function(id, i) {
              setTimeout(function() {
                var el = document.getElementById(id);
                if (el) el.classList.add('hin');
              }, 600 + i * 180);
            });
          }
        });
      }, { threshold: 0.15 });
      var sec = document.getElementById('erp-showcase');
      if (sec) obs.observe(sec);
    }());
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

    // â”€â”€ Login Modal â€” shows after 10 seconds â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    // â”€â”€ Mini Dashboard â€” fully interactive inside homepage card â”€â”€

    // â”€â”€ Lenis Smooth Scroll + GSAP ScrollTrigger â”€â”€
    // Home page only â€” cleaned up on unmount
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
      else lenis.start();
    };

    // Sync lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const lenisRaf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);

    // â”€â”€ Parallax on hero elements â”€â”€
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


    // â”€â”€ GSAP ScrollTrigger for Accordion Section â”€â”€
    const formatSection = document.querySelector('.format-section');
    const formatPanels = document.querySelectorAll('.format-panel');
    if (formatSection && formatPanels.length > 0) {
      const firstVid = formatPanels[0].querySelector('video');
      if (firstVid) firstVid.play().catch(() => { });

      let currentCardIdx = 0;
      let isCardAnimating = false;
      let trapped = false;
      const totalCards = formatPanels.length;

      const updatePanelClasses = (idx) => {
        formatPanels.forEach((panel, i) => {
          const video = panel.querySelector('video');
          if (i === idx) {
            if (!panel.classList.contains('active')) panel.classList.add('active');
            if (video) video.play().catch(() => { });
          } else {
            if (panel.classList.contains('active')) panel.classList.remove('active');
            if (video) video.pause();
          }
        });
      };
      updatePanelClasses(0);

      const goToCard = (idx) => {
        isCardAnimating = true;
        updatePanelClasses(idx);

        const animTl = gsap.timeline({
          onComplete: () => {
            setTimeout(() => { isCardAnimating = false; }, 400); // Cooldown to prevent multi-firing
          }
        });

        formatPanels.forEach((panel, i) => {
          if (i === 0) return;
          const targetLeft = i <= idx ? `${i * 60}px` : `calc(100% - ${(totalCards - i) * 60}px)`;
          animTl.to(panel, { left: targetLeft, duration: 1.0, ease: "power2.inOut" }, 0);
        });
      };

      ScrollTrigger.create({
        id: 'formatScrollTrigger',
        trigger: formatSection,
        start: 'center center',
        end: '+=50', // Minimal pin window since we handle logic via event trap
        pin: true,
        onEnter: () => {
          if (currentCardIdx === 0 && !trapped) {
            trapped = true;
            if (window.__chaosScrollTrapped) window.__chaosScrollTrapped(true);
          }
        },
        onEnterBack: () => {
          if (currentCardIdx === totalCards - 1 && !trapped) {
            trapped = true;
            if (window.__chaosScrollTrapped) window.__chaosScrollTrapped(true);
          }
        }
      });

      const releaseTrap = (direction) => {
        trapped = false;
        if (window.__chaosScrollTrapped) window.__chaosScrollTrapped(false);
        // Force scroll outside the pinned area to allow normal scrolling to resume
        window.scrollBy({ top: direction === 'down' ? 60 : -60, behavior: 'instant' });
      };

      const handleIntent = (deltaY) => {
        if (!trapped || isCardAnimating) return;
        if (Math.abs(deltaY) < 15) return;

        if (deltaY > 0) { // Scroll Down
          if (currentCardIdx < totalCards - 1) {
            currentCardIdx++;
            goToCard(currentCardIdx);
          } else {
            releaseTrap('down');
          }
        } else { // Scroll Up
          if (currentCardIdx > 0) {
            currentCardIdx--;
            goToCard(currentCardIdx);
          } else {
            releaseTrap('up');
          }
        }
      };

      window.__formatWheelHandler = (e) => {
        if (trapped) {
          e.preventDefault();
          handleIntent(e.deltaY);
        }
      };

      let touchStartY = 0;
      window.__formatTouchStart = (e) => {
        if (trapped) touchStartY = e.touches[0].clientY;
      };
      window.__formatTouchMove = (e) => {
        if (trapped) {
          e.preventDefault();
          const deltaY = touchStartY - e.touches[0].clientY;
          if (Math.abs(deltaY) > 30) {
            handleIntent(deltaY);
            touchStartY = e.touches[0].clientY;
          }
        }
      };

      window.addEventListener('wheel', window.__formatWheelHandler, { passive: false });
      window.addEventListener('touchstart', window.__formatTouchStart, { passive: false });
      window.addEventListener('touchmove', window.__formatTouchMove, { passive: false });
    }

    // â”€â”€ Stagger reveal for feature bar items â”€â”€
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
      if (window.__formatWheelHandler) window.removeEventListener('wheel', window.__formatWheelHandler);
      if (window.__formatTouchStart) window.removeEventListener('touchstart', window.__formatTouchStart);
      if (window.__formatTouchMove) window.removeEventListener('touchmove', window.__formatTouchMove);
    };

  }, []);

  return (
    <>


      {/*  Particle Network Background Canvas  */}
      <ParticleBackground />



      {/*  Hero Section  */}
      <header className="hero-section">
        <div className="container">
          <div className="hero-grid">

            {/*  Left Hero Column  */}
            <div className="hero-left-content reveal" style={{ paddingLeft: '12rem' }}>
              <div className="hero-badge-pill">
                <span className="badge-tag">NEW â†—</span>
                <span>Error Infotech 2.0 is now live</span>
              </div>

              <h1 className="hero-title">
                BUILT <br />FOR <span className="script-accent" spellCheck={false}>Sales</span>
              </h1>

              <div className="annotation-bubble">
                <span>Close more. Grow faster.</span>
                <svg width="40" height="20" viewBox="0 0 50 25" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M 5 20 Q 25 5 45 15" strokeDasharray="3 3" />
                  <polyline points="40 10 45 15 38 18" />
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
              <div className="paper-note-card" style={{ transform: 'scale(1.15) rotate(-2deg)', marginTop: '1rem' }}>
                <span>REAL INSIGHTS.</span>
                <span>REAL GROWTH.</span>
                <span>REAL RESULTS.</span>
              </div>
            </div>

            {/*  Right Hero Visual Monitor Frame  */}
            <div className="hero-visual-container reveal" style={{ maxWidth: '1050px', alignSelf: 'flex-start', marginTop: '62px' }}>
              <div className="monitor-frame">
                <div className="monitor-header">
                  <div className="window-dots">
                    <div className="dot dot-red"></div>
                    <div className="dot dot-yellow"></div>
                    <div className="dot dot-green"></div>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Error Infotech Dashboard</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sarah Chen â–¾</div>
                </div>
                <div style={{ padding: '0', display: 'flex', height: 'clamp(450px, 65vw, 670px)' }}>
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
              <div className="bar-icon">ðŸ‘¥</div>
              <div>
                <div className="bar-title">360Â° CUSTOMER VIEW</div>
                <div className="bar-desc">See every interaction, every time â€” all in one place.</div>
              </div>
            </div>

            <div className="feature-bar-item">
              <div className="bar-icon">ðŸŒªï¸</div>
              <div>
                <div className="bar-title">SMART PIPELINES</div>
                <div className="bar-desc">Focus on the right deals and move them forward.</div>
              </div>
            </div>

            <div className="feature-bar-item">
              <div className="bar-icon">ðŸ“ˆ</div>
              <div>
                <div className="bar-title">REAL-TIME INSIGHTS</div>
                <div className="bar-desc">Dashboards that help you decide, not guess.</div>
              </div>
            </div>

            <div className="feature-bar-item">
              <div className="bar-icon">ðŸ”’</div>
              <div>
                <div className="bar-title">SECURE & RELIABLE</div>
                <div className="bar-desc">Your data is safe with enterprise-grade security.</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Format Video Section replacing Accordion */}
      <style dangerouslySetInnerHTML={{
        __html: `
      .format-section {
        position: relative; /* Ensure quote card positions relative to this section */
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 0;
        box-sizing: border-box;
      }

      .format-container {
        max-width: 95vw !important;
        width: 100% !important;
        padding-left: 2rem !important;
        padding-right: 2rem !important;
      }

      /* â”€â”€ Outer wrapper: active panel + slim tabs side by side â”€â”€ */
      .format-accordion-wrapper {
        position: relative;
        display: block;
        width: 100%;
        max-width: 1260px;
        margin-left: auto;
        margin-right: auto;
        height: calc(60vh + 1cm);
        min-height: 520px;
        max-height: 720px;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 24px 60px rgba(0,0,0,0.14);
        margin-top: 1rem;
      }

      .format-panel {
        position: absolute;
        top: 0;
        bottom: 0;
        width: calc(100% - 180px);
        display: flex;
        flex-direction: column;
        cursor: pointer;
        box-shadow: -4px 0 24px rgba(0,0,0,0.08);
      }
      .format-panel.fp-1 { left: 0; z-index: 1; }
      .format-panel.fp-2 { left: calc(100% - 180px); z-index: 2; }
      .format-panel.fp-3 { left: calc(100% - 120px); z-index: 3; }
      .format-panel.fp-4 { left: calc(100% - 60px); z-index: 4; }

      /* â”€â”€ Slim tab: centered number â”€â”€ */
      .format-panel-tab {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding-top: 2rem;
        border-right: 1px solid rgba(0,0,0,0.05);
        z-index: 10;
        pointer-events: auto;
      }
      .format-tab-num {
        font-family: 'Outfit', sans-serif;
        font-size: 1.1rem;
        font-weight: 900;
        letter-spacing: -0.02em;
        margin-bottom: 1rem;
      }
      .format-tab-title {
        display: block;
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        font-family: 'Outfit', sans-serif;
        font-size: 1.05rem;
        font-weight: 700;
        text-transform: uppercase;
        white-space: nowrap;
        opacity: 0.6;
        transition: opacity 0.3s;
      }
      .format-panel.active .format-tab-title {
        opacity: 1;
      }
      .format-tab-scroll {
        position: absolute;
        bottom: 1.2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: 'Outfit', sans-serif;
        font-size: 0.65rem;
        font-weight: 800;
        letter-spacing: 0.05em;
        color: rgba(255, 255, 255, 0.85);
        gap: 0.2rem;
        line-height: 1;
      }
      .format-tab-scroll .arrow {
        font-size: 0.95rem;
        font-weight: 900;
        margin-top: 2px;
      }

      .format-panel-inner {
        position: absolute;
        left: 60px;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        opacity: 1;
        pointer-events: auto;
        overflow: hidden;
      }

      /* Top: 00-N + subtitle label */
      .format-panel-top {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1.4rem 1.5rem 0.6rem 1.5rem; /* Reduced padding to make active panel tighter */
        flex-shrink: 0;
      }
      .format-panel-num {
        font-family: 'Outfit', sans-serif;
        font-size: 3rem;
        font-weight: 900;
        line-height: 0.85;
        letter-spacing: -3px;
        flex-shrink: 0;
      }
      .format-panel-desc {
        font-size: 0.78rem;
        font-weight: 700;
        text-transform: uppercase;
        line-height: 1.35;
        padding-top: 0.3rem;
        max-width: 160px;
      }

      /* Middle: LEFT content + RIGHT video player */
      .format-panel-body {
        display: flex;
        flex: 1;
        align-items: center;
        padding: 0.5rem 1.5rem 0.5rem 1.5rem; /* Reduced padding to shift video left & decrease size */
        gap: 1.8rem; /* Reduced gap between left text and video player */
        min-height: 0;
      }

      /* Left content column */
      .format-panel-content {
        flex: 0 0 300px; /* Reduced from 320px to 250px to make the left column tighter */
        display: flex;
        flex-direction: column;
        gap: 0.9rem;
        justify-content: center;
        align-self: center;
      }
      .format-panel-content-title {
        font-family: 'Outfit', sans-serif;
        font-size: clamp(1.5rem, 2vw, 2rem);
        font-weight: 900;
        text-transform: uppercase;
        line-height: 1.05;
        letter-spacing: -0.02em;
        margin: 0;
        transform: translateY(20px);
        opacity: 0;
        transition: transform 0.6s cubic-bezier(0.25, 1, 0.3, 1) 0.15s, opacity 0.5s ease 0.15s;
      }
      .format-panel.active .format-panel-content-title {
        transform: translateY(0);
        opacity: 1;
      }
      .format-panel-content-desc {
        font-size: 0.9rem;
        line-height: 1.6;
        margin: 0;
        transform: translateY(15px);
        opacity: 0;
        transition: transform 0.6s cubic-bezier(0.25, 1, 0.3, 1) 0.25s, opacity 0.5s ease 0.25s;
      }
      .format-panel.active .format-panel-content-desc {
        transform: translateY(0);
        opacity: 0.75;
      }

      /* Right: premium video player box */
      .format-panel-video-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: 0;
        border-radius: 12px;
        overflow: hidden;
        background: #000;
        box-shadow: 0 12px 40px rgba(0,0,0,0.22);
        position: relative;
        max-height: 600px;
        aspect-ratio: 16/9;
        align-self: center;
        transform: scale(0.92) translateX(30px);
        opacity: 0;
        transition: transform 0.7s cubic-bezier(0.25, 1, 0.3, 1) 0.2s, opacity 0.6s ease 0.2s;
        backface-visibility: hidden;
        transform-style: preserve-3d;
        will-change: transform, opacity;
      }
      .format-panel.active .format-panel-video-wrapper {
        transform: scale(1) translateX(0);
        opacity: 1;
      }
      .format-panel-video {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: contain;
        min-height: 250px;
        max-height: 600px;
        backface-visibility: hidden;
        transform-style: preserve-3d;
      }

      /* Custom video controls bar */
      .fp-controls {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.55rem 1rem;
        background: rgba(10,10,10,0.92);
        backdrop-filter: blur(8px);
        flex-shrink: 0;
      }
      .fp-play-btn {
        width: 28px;
        height: 28px;
        border: none;
        background: transparent;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        flex-shrink: 0;
      }
      .fp-play-btn svg { width: 18px; height: 18px; fill: white; }
      .fp-time {
        font-family: 'Outfit', monospace;
        font-size: 0.78rem;
        color: #e5e5e5;
        white-space: nowrap;
        flex-shrink: 0;
      }
      .fp-progress-track {
        flex: 1;
        height: 4px;
        background: rgba(255,255,255,0.22);
        border-radius: 2px;
        position: relative;
        cursor: pointer;
      }
      .fp-progress-fill {
        height: 100%;
        width: 25%;
        background: #e53935;
        border-radius: 2px;
        position: relative;
      }
      .fp-progress-fill::after {
        content: '';
        position: absolute;
        right: -5px;
        top: 50%;
        transform: translateY(-50%);
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #e53935;
      }
      .fp-right-controls {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        flex-shrink: 0;
      }
      .fp-icon-btn {
        width: 22px;
        height: 22px;
        border: none;
        background: transparent;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        opacity: 0.8;
        transition: opacity 0.2s;
      }
      .fp-icon-btn:hover { opacity: 1; }
      .fp-icon-btn svg { width: 16px; height: 16px; stroke: white; fill: none; stroke-width: 2; }

      /* Bottom: oversized title */
      .format-panel-bottom {
        padding: 0.2rem 1.5rem 1.2rem 1.5rem; /* Reduced padding */
        flex-shrink: 0;
      }
      .format-panel-title {
        font-family: 'Outfit', sans-serif;
        font-size: clamp(3rem, 5.5vw, 6.5rem);
        font-weight: 900;
        text-transform: uppercase;
        line-height: 0.82;
        margin: 0;
        white-space: nowrap;
        transform: translateY(30px);
        opacity: 0;
        letter-spacing: -0.05em;
        transition: transform 0.8s cubic-bezier(0.25, 1, 0.3, 1) 0.1s, opacity 0.6s ease 0.1s, letter-spacing 0.8s cubic-bezier(0.25, 1, 0.3, 1);
      }
      .format-panel.active .format-panel-title {
        transform: translateY(0);
        opacity: 1;
        letter-spacing: -0.03em;
      }
      
      /* Fix for long text in panel 4 */
      .format-panel.fp-4 .format-panel-title {
        font-size: clamp(2rem, 4.2vw, 5rem);
      }

      /* Panel bg colors (both active and collapsed) */
      .format-panel.fp-1 { background: #f0f8f6; color: #111111; }
      .format-panel.fp-2 { background: #f5e6d3; color: #2c1810; }
      .format-panel.fp-3 { background: #d4ede8; color: #111111; }
      .format-panel.fp-4 { background: #1a6b5c; color: #f0f8f6; }

      /* Dynamic text coloring for active components matching the panel theme */
      .format-panel.fp-1.active { color: #111111; }
      .format-panel.fp-2.active { color: #2c1810; }
      .format-panel.fp-3.active { color: #111111; }
      .format-panel.fp-4.active { color: #f0f8f6; }

      .format-panel.fp-1.active .format-panel-num,
      .format-panel.fp-1.active .format-panel-desc,
      .format-panel.fp-1.active .format-panel-content-title,
      .format-panel.fp-1.active .format-panel-title { color: #111111 !important; }
      .format-panel.fp-1.active .format-panel-content-desc { color: #222222 !important; opacity: 0.8; }

      .format-panel.fp-2.active .format-panel-num,
      .format-panel.fp-2.active .format-panel-desc,
      .format-panel.fp-2.active .format-panel-content-title,
      .format-panel.fp-2.active .format-panel-title { color: #2c1810 !important; }
      .format-panel.fp-2.active .format-panel-content-desc { color: #3a2218 !important; opacity: 0.8; }

      .format-panel.fp-3.active .format-panel-num,
      .format-panel.fp-3.active .format-panel-desc,
      .format-panel.fp-3.active .format-panel-content-title,
      .format-panel.fp-3.active .format-panel-title { color: #111111 !important; }
      .format-panel.fp-3.active .format-panel-content-desc { color: #222222 !important; opacity: 0.8; }

      .format-panel.fp-4.active .format-panel-num,
      .format-panel.fp-4.active .format-panel-desc,
      .format-panel.fp-4.active .format-panel-content-title,
      .format-panel.fp-4.active .format-panel-title { color: #f0f8f6 !important; }
      .format-panel.fp-4.active .format-panel-content-desc { color: #e2edea !important; opacity: 0.8; }

      /* Tab labels (numbers) should match the text color of the parent panel */
      .format-panel.fp-1 .format-tab-num { color: #111111; }
      .format-panel.fp-2 .format-tab-num { color: #2c1810; }
      .format-panel.fp-3 .format-tab-num { color: #111111; }
      .format-panel.fp-4 .format-tab-num { color: #f0f8f6; }

      /* Scroll indicator should match Panel 4 text color */
      .format-panel.fp-4 .format-tab-scroll { color: rgba(240, 248, 246, 0.85); }
    `}} />
      <section className="format-section" id="chaos">
        {/* â”€â”€ Chaos Quote Card â”€â”€ */}
        <div className="chaos-quote-card">
          <div className="cq-grid">
            <div className="cq-bar" style={{ width: '8%', marginTop: '4%', '--h': '78%', '--d': '0.1s', '--c': '#e5edea', borderRadius: '20px' }}></div>
            <div className="cq-bar" style={{ width: '8%', marginTop: '0%', '--h': '92%', '--d': '0.2s', '--c': '#ede8f5', borderRadius: '20px' }}></div>
            <div className="cq-bar" style={{ width: '8%', marginTop: '8%', '--h': '72%', '--d': '0.3s', '--c': '#f5e4da', borderRadius: '20px' }}></div>
            <div className="cq-bar" style={{ width: '8%', marginTop: '2%', '--h': '85%', '--d': '0.4s', '--c': '#ebf0e6', borderRadius: '20px' }}></div>
            <div className="cq-bar" style={{ width: '8%', marginTop: '6%', '--h': '76%', '--d': '0.5s', '--c': '#f2eae4', borderRadius: '20px' }}></div>
            <div className="cq-bar" style={{ width: '8%', marginTop: '1%', '--h': '96%', '--d': '0.6s', '--c': '#e1e8ea', borderRadius: '20px' }}></div>
            <div className="cq-bar" style={{ width: '8%', marginTop: '7%', '--h': '82%', '--d': '0.7s', '--c': '#e8ede1', borderRadius: '20px' }}></div>
            <div className="cq-bar" style={{ width: '8%', marginTop: '3%', '--h': '88%', '--d': '0.8s', '--c': '#f2e1e1', borderRadius: '20px' }}></div>
            <div className="cq-bar" style={{ width: '8%', marginTop: '10%', '--h': '68%', '--d': '0.9s', '--c': '#f5ebd8', borderRadius: '20px' }}></div>
            <div className="cq-bar" style={{ width: '8%', marginTop: '5%', '--h': '75%', '--d': '1.0s', '--c': '#e5edea', borderRadius: '20px' }}></div>
          </div>
          <div className="cq-dot cq-dot-1"></div>
          <div className="cq-dot cq-dot-2"></div>
          <div className="cq-dot cq-dot-3"></div>
          <div className="cq-dot cq-dot-4"></div>
          <div className="cq-body">
            <h4 className="cq-line1">you don't</h4>
            <h4 className="cq-line2">need <span className="cq-muted">more</span></h4>
            <div className="cq-highlight">
              <span className="cq-hl-box">COMPLEXITY,</span>
            </div>
            <h4 className="cq-line2">you need to</h4>
            <div className="cq-highlight">
              <span className="cq-hl-box" style={{ background: 'rgba(26, 107, 92, 0.15)', borderColor: '#2a9d8f' }}>automate</span>
            </div>
            <p className="cq-line3">your sales pipeline.</p>
          </div>
        </div>

        <div className="container format-container">
          <div className="accordion-heading-row" style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h2 className="chaos-title" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', textAlign: 'center' }}>
              Everything you need to <span className="script-accent" spellCheck={false} style={{ fontSize: '1.15em' }}>scale</span>
            </h2>
            <p className="chaos-subtitle">Your team deserves better than scattered data and missed follow-ups.</p>
          </div>

          <div className="format-accordion-wrapper">

            {/* Panel 1 */}
            <div className="format-panel fp-1 active" onClick={() => {
              const scrollTriggerInstance = ScrollTrigger.getById('formatScrollTrigger');
              if (scrollTriggerInstance) {
                const start = scrollTriggerInstance.start;
                const end = scrollTriggerInstance.end;
                const targetScroll = start + (end - start) * (0 / 3);
                window.scrollTo({
                  top: targetScroll + 10,
                  behavior: 'smooth'
                });
              }
            }}>
              <div className="format-panel-tab">
                <span className="format-tab-num">00-1</span>
                <span className="format-tab-title">Lead Agent</span>
              </div>
              <div className="format-panel-inner">
                <div className="format-panel-top">
                  <div className="format-panel-num">00-1</div>
                  <div className="format-panel-desc">MONITOR YOUR DAILY ACTIVITIES</div>
                </div>
                <div className="format-panel-body">
                  <div className="format-panel-content">
                    <h3 className="format-panel-content-title">Lead<br />Agent</h3>
                    <p className="format-panel-content-desc">

                      Never miss an opportunity. Lead Agent captures, organizes, and monitors every lead from the moment it enters your CRM. With real-time tracking, smart updates, and centralized management, your sales team always knows what to do next.</p>
                  </div>
                  <div className="format-panel-video-wrapper">
                    <video className="format-panel-video" id="fpVideo1" src="/video/video1.mp4" preload="auto" autoPlay loop muted playsInline></video>

                  </div>
                </div>
                <div className="format-panel-bottom">
                  <h3 className="format-panel-title">LEAD AGENT</h3>
                </div>
              </div>
            </div>

            {/* Panel 2 */}
            <div className="format-panel fp-2" onClick={() => {
              const scrollTriggerInstance = ScrollTrigger.getById('formatScrollTrigger');
              if (scrollTriggerInstance) {
                const start = scrollTriggerInstance.start;
                const end = scrollTriggerInstance.end;
                const targetScroll = start + (end - start) * (1 / 3);
                window.scrollTo({
                  top: targetScroll + 10,
                  behavior: 'smooth'
                });
              }
            }}>
              <div className="format-panel-tab">
                <span className="format-tab-num">00-2</span>
                <span className="format-tab-title">Call Agent</span>
              </div>
              <div className="format-panel-inner">
                <div className="format-panel-top">
                  <div className="format-panel-num">00-2</div>
                  <div className="format-panel-desc">TRACK LEADS THROUGH EVERY STAGE</div>
                </div>
                <div className="format-panel-body">
                  <div className="format-panel-content">
                    <h3 className="format-panel-content-title">Call<br />Agent</h3>
                    <p className="format-panel-content-desc">Call Agent simplifies customer communication with intelligent call management, automatic logging, and follow-up tracking. Every conversation is recorded inside your workflow, helping your team stay productive and responsive.</p>
                  </div>
                  <div className="format-panel-video-wrapper">
                    <video className="format-panel-video" src="/video/video2.mp4" preload="auto" autoPlay loop muted playsInline></video>

                  </div>
                </div>
                <div className="format-panel-bottom">
                  <h3 className="format-panel-title">CALL AGENT</h3>
                </div>
              </div>
            </div>

            {/* Panel 3 */}
            <div className="format-panel fp-3" onClick={() => {
              const scrollTriggerInstance = ScrollTrigger.getById('formatScrollTrigger');
              if (scrollTriggerInstance) {
                const start = scrollTriggerInstance.start;
                const end = scrollTriggerInstance.end;
                const targetScroll = start + (end - start) * (2 / 3);
                window.scrollTo({
                  top: targetScroll + 10,
                  behavior: 'smooth'
                });
              }
            }}>
              <div className="format-panel-tab">
                <span className="format-tab-num">00-3</span>
                <span className="format-tab-title">Chat Agent</span>
              </div>
              <div className="format-panel-inner">
                <div className="format-panel-top">
                  <div className="format-panel-num">00-3</div>
                  <div className="format-panel-desc">CHAT WITH YOUR CUSTOMERS INSTANTLY</div>
                </div>
                <div className="format-panel-body">
                  <div className="format-panel-content">
                    <h3 className="format-panel-content-title">Chat<br />Agent</h3>
                    <p className="format-panel-content-desc">Deliver fast, personalized customer support through real-time chat. Chat Agent manages conversations efficiently, reduces response time, and ensures every customer receives timely assistance across your communication channels. and escalates when needed.</p>
                  </div>
                  <div className="format-panel-video-wrapper">
                    <video className="format-panel-video" src="/video/video3.mp4" preload="auto" autoPlay loop muted playsInline></video>
                  </div>
                </div>
                <div className="format-panel-bottom">
                  <h3 className="format-panel-title">CHAT AGENT</h3>
                </div>
              </div>
            </div>

            {/* Panel 4 */}
            <div className="format-panel fp-4" onClick={() => {
              const scrollTriggerInstance = ScrollTrigger.getById('formatScrollTrigger');
              if (scrollTriggerInstance) {
                const start = scrollTriggerInstance.start;
                const end = scrollTriggerInstance.end;
                const targetScroll = start + (end - start) * (3 / 3);
                window.scrollTo({
                  top: targetScroll + 10,
                  behavior: 'smooth'
                });
              }
            }}>
              <div className="format-panel-tab">
                <span className="format-tab-num">00-4</span>
                <span className="format-tab-title">Lead Bifurcation</span>
              </div>
              <div className="format-panel-inner">
                <div className="format-panel-top">
                  <div className="format-panel-num">00-4</div>
                  <div className="format-panel-desc">ANALYZE LEAD PERFORMANCE & TRENDS</div>
                </div>
                <div className="format-panel-body">
                  <div className="format-panel-content">
                    <h3 className="format-panel-content-title">Lead<br />Bifurcation</h3>
                    <p className="format-panel-content-desc">Automatically classify and distribute incoming leads based on predefined rules, priority, source, or team. Lead Bifurcation Agent ensures every lead reaches the right salesperson instantly, improving response time and maximizing conversion opportunities.</p>
                  </div>
                  <div className="format-panel-video-wrapper">
                    <video className="format-panel-video" src="/video/video4.mp4" preload="auto" autoPlay loop muted playsInline></video>
                  </div>
                </div>
                <div className="format-panel-bottom">
                  <h3 className="format-panel-title">LEAD Bifurcation</h3>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/*  ═══ ERP DASHBOARD SHOWCASE ═══  */}
      <style dangerouslySetInnerHTML={{ __html: `
        .erp-sec {
          padding: 7rem 0 5rem;
          background:
            radial-gradient(circle at 75% 30%, rgba(42,157,143,0.10) 0%, transparent 60%),
            radial-gradient(circle at 20% 80%, rgba(26,107,92,0.07) 0%, transparent 50%),
            transparent;
          border-top: 1px solid rgba(26,107,92,0.10);
          border-bottom: 1px solid rgba(26,107,92,0.10);
          overflow: visible; position: relative;
        }
        .erp-lcol {
          order: 2;
          margin-left: 12rem;
          transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1);
          opacity:0; transform:translateX(44px);
        }
        .erp-lcol.ei { opacity:1; transform:translateX(0); }
        /* image col — now on left, slides in from left */
        .erp-rcol {
          order: 1;
          width: 155%;
          margin-left: -35%;
          transition: opacity 0.95s cubic-bezier(0.22,1,0.36,1) 0.12s, transform 0.95s cubic-bezier(0.22,1,0.36,1) 0.12s;
          opacity:0; transform:translateX(-52px) scale(0.97); position:relative;
        }
        .erp-rcol.ei { opacity:1; transform:translateX(0) scale(1); }
        .erp-grid {
          display:grid; grid-template-columns:1fr 420px;
          gap:3rem; align-items:center; position:relative; z-index:1;
        }
        .erp-pill {
          display:inline-flex; align-items:center; gap:0.55rem;
          background:rgba(42,157,143,0.10); border:1px solid rgba(26,107,92,0.22);
          border-radius:9999px; padding:0.36rem 1rem;
          font-size:0.73rem; font-weight:800; letter-spacing:0.10em;
          color:#1a6b5c; text-transform:uppercase; margin-bottom:1.7rem;
        }
        .erp-dot {
          width:7px; height:7px; border-radius:50%; background:#2a9d8f;
          animation:erpP 1.8s ease-in-out infinite;
        }
        @keyframes erpP { 0%,100%{transform:scale(1);opacity:1;} 50%{transform:scale(1.6);opacity:0.5;} }
        .erp-h1 {
          font-family:'Outfit',sans-serif;
          font-size:clamp(2.4rem,3.8vw,3.3rem); font-weight:900;
          line-height:1.06; letter-spacing:-0.025em; color:#111a16; margin-bottom:0.6rem;
        }
        .erp-h1 .eg {
          color:#1a6b5c; font-style:italic; position:relative; display:inline-block;
        }
        .erp-h1 .eg::after {
          content:''; position:absolute; left:0; bottom:-4px;
          width:100%; height:3px;
          background:linear-gradient(90deg,#1a6b5c,#2a9d8f 60%,transparent);
          border-radius:2px; transform:scaleX(0); transform-origin:left;
          transition:transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.55s;
        }
        .erp-lcol.ei .erp-h1 .eg::after { transform:scaleX(1); }
        .erp-tag {
          font-family:'Caveat',cursive; font-size:1.35rem; font-weight:700;
          color:#2a9d8f; letter-spacing:0.01em; margin-bottom:0.6rem;
          display:flex; align-items:center; gap:0.4rem;
        }
        .erp-tag::before {
          content:''; display:inline-block; width:30px; height:2px;
          background:linear-gradient(90deg,#2a9d8f,transparent); border-radius:2px;
        }
        .erp-p { font-size:1rem; color:#4a6057; line-height:1.72; margin-bottom:1.8rem; max-width:400px; }
        .erp-ul { list-style:none; margin-bottom:2.2rem; display:flex; flex-direction:column; gap:0.65rem; }
        .erp-ul li { display:flex; align-items:flex-start; gap:0.7rem; font-size:0.92rem; font-weight:600; color:#2c3e35; }
        .erp-fi {
          width:22px; height:22px; flex-shrink:0; border-radius:6px;
          background:linear-gradient(135deg,rgba(26,107,92,0.14),rgba(42,157,143,0.08));
          display:flex; align-items:center; justify-content:center; margin-top:1px;
        }
        .erp-fi svg { color:#1a6b5c; }
        .erp-fs { font-size:0.78rem; font-weight:400; color:#7a9088; margin-top:1px; display:block; }
        .erp-btns { display:flex; align-items:center; gap:0.9rem; flex-wrap:wrap; }
        .erp-bf {
          display:inline-flex; align-items:center; gap:0.5rem;
          background:linear-gradient(135deg,#1a6b5c 0%,#2a9d8f 100%);
          color:#fff; border:none; border-radius:9999px; padding:0.78rem 1.9rem;
          font-family:'Outfit',sans-serif; font-size:0.9rem; font-weight:700;
          cursor:pointer; box-shadow:0 4px 22px rgba(26,107,92,0.30);
          transition:transform 0.22s,box-shadow 0.22s; letter-spacing:0.01em;
        }
        .erp-bf:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(26,107,92,0.40); }
        .erp-bo {
          display:inline-flex; align-items:center; gap:0.45rem;
          background:transparent; color:#1a6b5c; border:1.5px solid rgba(26,107,92,0.32);
          border-radius:9999px; padding:0.75rem 1.5rem;
          font-family:'Outfit',sans-serif; font-size:0.88rem; font-weight:600;
          cursor:pointer; transition:background 0.2s,border-color 0.2s,transform 0.2s;
        }
        .erp-bo:hover { background:rgba(26,107,92,0.07); border-color:#1a6b5c; transform:translateY(-1px); }
        /* sticky note */
        .erp-note {
          margin-top:1.6rem; display:inline-block;
          background:#fff8e7; border-left:3px solid #e9c46a;
          border-radius:4px 10px 10px 4px; padding:0.55rem 1rem 0.55rem 0.9rem;
          box-shadow:3px 4px 14px rgba(0,0,0,0.08),0 1px 0 rgba(255,255,255,0.8) inset;
          transform:rotate(-1.2deg); position:relative; max-width:280px;
        }
        .erp-note::before {
          content:''; position:absolute; top:-6px; left:14px;
          width:18px; height:8px; border-radius:0 0 4px 4px;
          background:linear-gradient(180deg,#d4a017,#e9c46a);
          box-shadow:0 2px 4px rgba(0,0,0,0.12);
        }
        .erp-note p { font-family:'Caveat',cursive; font-size:0.92rem; font-weight:700; color:#5a4520; line-height:1.5; margin:0; }
        .erp-note p em { color:#1a6b5c; font-style:normal; }
        .erp-ring {
          position:absolute; border-radius:50%;
          border:1.5px dashed rgba(42,157,143,0.22);
          pointer-events:none; z-index:0;
          animation:erpRot 18s linear infinite;
        }
        .erp-ring-1 { width:110%; height:110%; top:-5%; left:-5%; }
        .erp-ring-2 { width:122%; height:122%; top:-11%; left:-11%; animation-direction:reverse; animation-duration:27s; border-style:dotted; border-color:rgba(26,107,92,0.13); }
        @keyframes erpRot { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
        .erp-frame { position:relative; z-index:1; border-radius:20px; overflow:visible; }
        .erp-glow {
          position:absolute; inset:-20px; border-radius:30px;
          background:linear-gradient(135deg,rgba(42,157,143,0.20),rgba(26,107,92,0.13),rgba(42,157,143,0.08));
          filter:blur(22px); z-index:0;
          animation:erpGB 4s ease-in-out infinite;
        }
        @keyframes erpGB { 0%,100%{opacity:0.65;transform:scale(1);} 50%{opacity:1;transform:scale(1.04);} }
        .erp-imgwrap {
          position:relative; z-index:1; border-radius:18px; overflow:hidden;
          box-shadow:0 0 0 1px rgba(26,107,92,0.13),0 28px 65px -8px rgba(26,107,92,0.24),0 2px 0 0 rgba(255,255,255,0.85) inset;
        }
        .erp-imgwrap img { width:100%; height:auto; display:block; border-radius:18px; transition:transform 0.7s cubic-bezier(0.22,1,0.36,1); }
        .erp-imgwrap:hover img { transform:scale(1.022); }
        /* HUD chips */
        .erp-hud {
          position:absolute; z-index:3; display:flex; align-items:center; gap:0.5rem;
          background:rgba(255,255,255,0.95); border:1px solid rgba(26,107,92,0.16);
          border-radius:12px; padding:0.55rem 0.9rem;
          font-size:0.75rem; font-weight:700; color:#1a1a1a;
          box-shadow:0 6px 22px rgba(26,107,92,0.15); backdrop-filter:blur(10px);
          white-space:nowrap; opacity:0;
          transition:opacity 0.55s ease,transform 0.55s cubic-bezier(0.34,1.56,0.64,1);
        }
        .erp-hud.hin { opacity:1; }
        .erp-hi { width:28px; height:28px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:0.85rem; flex-shrink:0; }
        .erp-ht { line-height:1.25; }
        .erp-ht b { display:block; font-size:0.82rem; color:#111; }
        .erp-ht span { font-size:0.68rem; color:#7a9088; font-weight:500; }
        .erp-ha { top:-22px; right:60px; transform:translateY(-10px); }
        .erp-ha.hin { transform:translateY(0); }
        .erp-hb { bottom:26px; right:-18px; transform:translateX(10px); }
        .erp-hb.hin { transform:translateX(0); }
        .erp-hc { top:50%; left:-18px; transform:translateY(-50%) translateX(-12px); }
        .erp-hc.hin { transform:translateY(-50%) translateX(0); }
        /* stats strip */
        .erp-strip { display:flex; gap:1rem; margin-top:1.2rem; opacity:0; transform:translateY(18px); transition:opacity 0.65s ease 0.35s,transform 0.65s ease 0.35s; }
        .erp-rcol.ei .erp-strip { opacity:1; transform:translateY(0); }
        .erp-stt { flex:1; display:flex; flex-direction:column; align-items:center; background:rgba(255,255,255,0.88); border:1px solid rgba(26,107,92,0.12); border-radius:12px; padding:0.7rem 0.6rem; backdrop-filter:blur(6px); }
        .erp-stn { font-family:'Outfit',sans-serif; font-size:1.45rem; font-weight:900; color:#1a6b5c; line-height:1; }
        .erp-stl { font-size:0.67rem; font-weight:700; color:#7a9088; letter-spacing:0.05em; text-transform:uppercase; margin-top:0.28rem; text-align:center; }
        @media(max-width:960px){
          .erp-grid{grid-template-columns:1fr;gap:3rem;}
          .erp-lcol { order: 2; transform: translateY(30px); margin-left: 0; }
          .erp-lcol.ei { transform: translateY(0); }
          .erp-rcol { order: 1; width: 100%; margin-left: 0; transform:translateY(38px) scale(0.97); }
          .erp-rcol.ei{transform:translateY(0) scale(1);}
          .erp-ring{display:none;}
        }
      `}} />

      <section className="erp-sec" id="erp-showcase">
        <div className="container">
          <div className="erp-grid">

            {/* RIGHT: Text */}
            <div className="erp-lcol" id="erpL">
              <div className="erp-pill">
                <span className="erp-dot"></span>
                Smarter Business. Stronger Growth.
              </div>
              <h2 className="erp-h1">
                <span style={{ whiteSpace: 'nowrap' }}>POWER YOUR</span><br />
                BUSINESS.<br />
                <span className="script-accent" spellCheck={false}>STREAMLINE</span><br />
                EVERYTHING.
              </h2>
              <p className="erp-tag">The ERP Advantage.</p>
              <p className="erp-p">
                Unify your processes, connect your teams, and gain real-time visibility with a powerful ERP built for modern businesses.
              </p>

              <div className="hero-cta-group">
                <button className="btn-primary btn-lg" onClick={() => window.showToast && window.showToast('Exploring ERP Modules...')}>
                  <span>Explore ERP Modules</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
                <button className="btn-outline-glass btn-lg" onClick={() => window.showToast && window.showToast('Playing overview...')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  <span>Watch Overview</span>
                </button>
              </div>
              <div className="premium-trust-badge" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px',
                background: 'rgba(255, 255, 255, 0.45)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.7)',
                padding: '10px 20px',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(26, 107, 92, 0.08)',
                marginTop: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {[
                    "https://i.pravatar.cc/100?img=11", 
                    "https://i.pravatar.cc/100?img=47", 
                    "https://i.pravatar.cc/100?img=12"
                  ].map((src, i) => (
                    <img 
                      key={i}
                      src={src} 
                      alt="User avatar"
                      style={{
                        width: '32px', 
                        height: '32px', 
                        borderRadius: '50%', 
                        border: '2px solid white',
                        marginLeft: i === 0 ? '0' : '-12px',
                        zIndex: 3 - i,
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                      }} 
                    />
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ 
                      width: '6px', 
                      height: '6px', 
                      borderRadius: '50%', 
                      backgroundColor: '#10b981', 
                      boxShadow: '0 0 8px #10b981',
                    }}></span>
                    <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1a6b5c', letterSpacing: '0.05em' }}>
                      500+ ACTIVE TEAMS
                    </span>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#4b5563', fontWeight: '500' }}>
                    Transforming their workflow daily.
                  </span>
                </div>
              </div>
            </div>

            {/* LEFT: Image */}
            <div className="erp-rcol" id="erpR">
              <div className="erp-ring erp-ring-1"></div>
              <div className="erp-ring erp-ring-2"></div>
              <div className="erp-frame">
                <div className="erp-glow"></div>

                <div className="monitor-frame" style={{ width: '100%', maxWidth: '1250px', alignSelf: 'flex-start', margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div className="monitor-header">
                    <div className="window-dots">
                      <div className="dot dot-red"></div>
                      <div className="dot dot-yellow"></div>
                      <div className="dot dot-green"></div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>ERP Dashboard</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Admin ▾</div>
                  </div>
                  <div style={{ padding: '0', display: 'block', height: 'clamp(450px, 65vw, 670px)', overflowY: 'hidden', overflowX: 'hidden', position: 'relative' }}>
                    
                    <iframe 
                      src="https://active.erp.errorinfotech.in" 
                      title="ERP Dashboard Preview"
                      style={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '115%', 
                        height: '115%', 
                        transform: 'scale(0.8695) translateZ(0)',
                        transformOrigin: 'top left',
                        border: 'none',
                        WebkitOverflowScrolling: 'touch',
                        willChange: 'transform',
                        backfaceVisibility: 'hidden',
                        filter: 'blur(0)'
                      }}
                    />
                  </div>
                </div>
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
        </div>

        <div className="marquee-container">
            <div className="marquee-track">
              <div className="marquee-group">
              {/* Card 1 */}
              <div className="vcard">
                <div className="vcard-spiral" aria-hidden="true"><svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="sp-ring sp-r1" d="M60,60 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" stroke="#1a6b5c" strokeWidth="1.2" fill="none" strokeDasharray="314" strokeDashoffset="314" /><path className="sp-ring sp-r2" d="M60,60 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" stroke="#2a9d8f" strokeWidth="1" fill="none" strokeDasharray="226" strokeDashoffset="226" /><path className="sp-ring sp-r3" d="M60,60 m-22,0 a22,22 0 1,1 44,0 a22,22 0 1,1 -44,0" stroke="#1a6b5c" strokeWidth="0.9" fill="none" strokeDasharray="138" strokeDashoffset="138" /></svg></div>
                <div className="vcard-icon-wrap">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="14" r="7" stroke="white" strokeWidth="1.8" /><path d="M8 34 Q8 24 32 24 Q32 34 32 34 Z" stroke="white" strokeWidth="1.7" fill="none" /></svg>
                </div>
                <h3 className="vcard-title">Sarah Chen</h3>
                <p className="vcard-role">VP Sales, Meridian Technologies</p>
                <p className="vcard-desc">"We switched from Salesforce six months ago. The difference in rep adoption is staggering. Error Infotech feels like it was built for people who actually sell, not just for managers who want reports."</p>
              </div>

              {/* Card 2 */}
              <div className="vcard vcard-featured">
                <div className="vcard-spiral" aria-hidden="true"><svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="sp-ring sp-r1" d="M60,60 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" stroke="#1a6b5c" strokeWidth="1.2" fill="none" strokeDasharray="314" strokeDashoffset="314" /><path className="sp-ring sp-r2" d="M60,60 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" stroke="#2a9d8f" strokeWidth="1" fill="none" strokeDasharray="226" strokeDashoffset="226" /><path className="sp-ring sp-r3" d="M60,60 m-22,0 a22,22 0 1,1 44,0 a22,22 0 1,1 -44,0" stroke="#1a6b5c" strokeWidth="0.9" fill="none" strokeDasharray="138" strokeDashoffset="138" /></svg></div>
                <div className="vcard-icon-wrap">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="14" r="7" stroke="white" strokeWidth="1.8" /><path d="M8 34 Q8 24 32 24 Q32 34 32 34 Z" stroke="white" strokeWidth="1.7" fill="none" /></svg>
                </div>
                <h3 className="vcard-title">Marcus Johnson</h3>
                <p className="vcard-role">Chief Revenue Officer, CloudScale Inc.</p>
                <p className="vcard-desc">"The Pipeline Intelligence feature alone paid for our annual contract in the first week. We identified a critical bottleneck in our enterprise motion that we had missed for years."</p>
              </div>

              {/* Card 3 */}
              <div className="vcard">
                <div className="vcard-spiral" aria-hidden="true"><svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="sp-ring sp-r1" d="M60,60 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" stroke="#1a6b5c" strokeWidth="1.2" fill="none" strokeDasharray="314" strokeDashoffset="314" /><path className="sp-ring sp-r2" d="M60,60 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" stroke="#2a9d8f" strokeWidth="1" fill="none" strokeDasharray="226" strokeDashoffset="226" /><path className="sp-ring sp-r3" d="M60,60 m-22,0 a22,22 0 1,1 44,0 a22,22 0 1,1 -44,0" stroke="#1a6b5c" strokeWidth="0.9" fill="none" strokeDasharray="138" strokeDashoffset="138" /></svg></div>
                <div className="vcard-icon-wrap">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="14" r="7" stroke="white" strokeWidth="1.8" /><path d="M8 34 Q8 24 32 24 Q32 34 32 34 Z" stroke="white" strokeWidth="1.7" fill="none" /></svg>
                </div>
                <h3 className="vcard-title">Elena Rodriguez</h3>
                <p className="vcard-role">Director of Sales Ops, Nexus Financial</p>
                <p className="vcard-desc">"Finally, a CRM that doesn't feel like a spreadsheet from 2005. It's blazing fast, the UI is gorgeous, and the automated data enrichment saves our SDRs hours every week."</p>
              </div>

              {/* Card 4 */}
              <div className="vcard">
                <div className="vcard-spiral" aria-hidden="true"><svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="sp-ring sp-r1" d="M60,60 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" stroke="#1a6b5c" strokeWidth="1.2" fill="none" strokeDasharray="314" strokeDashoffset="314" /><path className="sp-ring sp-r2" d="M60,60 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" stroke="#2a9d8f" strokeWidth="1" fill="none" strokeDasharray="226" strokeDashoffset="226" /><path className="sp-ring sp-r3" d="M60,60 m-22,0 a22,22 0 1,1 44,0 a22,22 0 1,1 -44,0" stroke="#1a6b5c" strokeWidth="0.9" fill="none" strokeDasharray="138" strokeDashoffset="138" /></svg></div>
                <div className="vcard-icon-wrap">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="14" r="7" stroke="white" strokeWidth="1.8" /><path d="M8 34 Q8 24 32 24 Q32 34 32 34 Z" stroke="white" strokeWidth="1.7" fill="none" /></svg>
                </div>
                <h3 className="vcard-title">David Lee</h3>
                <p className="vcard-role">Sales Director, AlphaTech</p>
                <p className="vcard-desc">"Implementation was seamless. Our entire team was onboarded within 48 hours, and we've seen a 40% increase in outbound activities simply because the tool is a joy to use."</p>
              </div>

              {/* Card 5 */}
              <div className="vcard">
                <div className="vcard-spiral" aria-hidden="true"><svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="sp-ring sp-r1" d="M60,60 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" stroke="#1a6b5c" strokeWidth="1.2" fill="none" strokeDasharray="314" strokeDashoffset="314" /><path className="sp-ring sp-r2" d="M60,60 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" stroke="#2a9d8f" strokeWidth="1" fill="none" strokeDasharray="226" strokeDashoffset="226" /><path className="sp-ring sp-r3" d="M60,60 m-22,0 a22,22 0 1,1 44,0 a22,22 0 1,1 -44,0" stroke="#1a6b5c" strokeWidth="0.9" fill="none" strokeDasharray="138" strokeDashoffset="138" /></svg></div>
                <div className="vcard-icon-wrap">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="14" r="7" stroke="white" strokeWidth="1.8" /><path d="M8 34 Q8 24 32 24 Q32 34 32 34 Z" stroke="white" strokeWidth="1.7" fill="none" /></svg>
                </div>
                <h3 className="vcard-title">Jessica Patel</h3>
                <p className="vcard-role">Enterprise AE, Innovate Inc</p>
                <p className="vcard-desc">"The best part is how it integrates our data sources. I no longer switch between five different tabs to understand my accounts. Everything I need is right there."</p>
              </div>

              </div>
              
              {/* DUPLICATE SET FOR SEAMLESS LOOP */}
              <div className="marquee-group" aria-hidden="true">
              {/* Card 1 */}
              <div className="vcard">
                <div className="vcard-spiral" aria-hidden="true"><svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="sp-ring sp-r1" d="M60,60 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" stroke="#1a6b5c" strokeWidth="1.2" fill="none" strokeDasharray="314" strokeDashoffset="314" /><path className="sp-ring sp-r2" d="M60,60 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" stroke="#2a9d8f" strokeWidth="1" fill="none" strokeDasharray="226" strokeDashoffset="226" /><path className="sp-ring sp-r3" d="M60,60 m-22,0 a22,22 0 1,1 44,0 a22,22 0 1,1 -44,0" stroke="#1a6b5c" strokeWidth="0.9" fill="none" strokeDasharray="138" strokeDashoffset="138" /></svg></div>
                <div className="vcard-icon-wrap">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="14" r="7" stroke="white" strokeWidth="1.8" /><path d="M8 34 Q8 24 32 24 Q32 34 32 34 Z" stroke="white" strokeWidth="1.7" fill="none" /></svg>
                </div>
                <h3 className="vcard-title">Sarah Chen</h3>
                <p className="vcard-role">VP Sales, Meridian Technologies</p>
                <p className="vcard-desc">"We switched from Salesforce six months ago. The difference in rep adoption is staggering. Error Infotech feels like it was built for people who actually sell, not just for managers who want reports."</p>
              </div>

              {/* Card 2 */}
              <div className="vcard vcard-featured">
                <div className="vcard-spiral" aria-hidden="true"><svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="sp-ring sp-r1" d="M60,60 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" stroke="#1a6b5c" strokeWidth="1.2" fill="none" strokeDasharray="314" strokeDashoffset="314" /><path className="sp-ring sp-r2" d="M60,60 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" stroke="#2a9d8f" strokeWidth="1" fill="none" strokeDasharray="226" strokeDashoffset="226" /><path className="sp-ring sp-r3" d="M60,60 m-22,0 a22,22 0 1,1 44,0 a22,22 0 1,1 -44,0" stroke="#1a6b5c" strokeWidth="0.9" fill="none" strokeDasharray="138" strokeDashoffset="138" /></svg></div>
                <div className="vcard-icon-wrap">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="14" r="7" stroke="white" strokeWidth="1.8" /><path d="M8 34 Q8 24 32 24 Q32 34 32 34 Z" stroke="white" strokeWidth="1.7" fill="none" /></svg>
                </div>
                <h3 className="vcard-title">Marcus Johnson</h3>
                <p className="vcard-role">Chief Revenue Officer, CloudScale Inc.</p>
                <p className="vcard-desc">"The Pipeline Intelligence feature alone paid for our annual contract in the first week. We identified a critical bottleneck in our enterprise motion that we had missed for years."</p>
              </div>

              {/* Card 3 */}
              <div className="vcard">
                <div className="vcard-spiral" aria-hidden="true"><svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="sp-ring sp-r1" d="M60,60 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" stroke="#1a6b5c" strokeWidth="1.2" fill="none" strokeDasharray="314" strokeDashoffset="314" /><path className="sp-ring sp-r2" d="M60,60 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" stroke="#2a9d8f" strokeWidth="1" fill="none" strokeDasharray="226" strokeDashoffset="226" /><path className="sp-ring sp-r3" d="M60,60 m-22,0 a22,22 0 1,1 44,0 a22,22 0 1,1 -44,0" stroke="#1a6b5c" strokeWidth="0.9" fill="none" strokeDasharray="138" strokeDashoffset="138" /></svg></div>
                <div className="vcard-icon-wrap">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="14" r="7" stroke="white" strokeWidth="1.8" /><path d="M8 34 Q8 24 32 24 Q32 34 32 34 Z" stroke="white" strokeWidth="1.7" fill="none" /></svg>
                </div>
                <h3 className="vcard-title">Elena Rodriguez</h3>
                <p className="vcard-role">Director of Sales Ops, Nexus Financial</p>
                <p className="vcard-desc">"Finally, a CRM that doesn't feel like a spreadsheet from 2005. It's blazing fast, the UI is gorgeous, and the automated data enrichment saves our SDRs hours every week."</p>
              </div>

              {/* Card 4 */}
              <div className="vcard">
                <div className="vcard-spiral" aria-hidden="true"><svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="sp-ring sp-r1" d="M60,60 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" stroke="#1a6b5c" strokeWidth="1.2" fill="none" strokeDasharray="314" strokeDashoffset="314" /><path className="sp-ring sp-r2" d="M60,60 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" stroke="#2a9d8f" strokeWidth="1" fill="none" strokeDasharray="226" strokeDashoffset="226" /><path className="sp-ring sp-r3" d="M60,60 m-22,0 a22,22 0 1,1 44,0 a22,22 0 1,1 -44,0" stroke="#1a6b5c" strokeWidth="0.9" fill="none" strokeDasharray="138" strokeDashoffset="138" /></svg></div>
                <div className="vcard-icon-wrap">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="14" r="7" stroke="white" strokeWidth="1.8" /><path d="M8 34 Q8 24 32 24 Q32 34 32 34 Z" stroke="white" strokeWidth="1.7" fill="none" /></svg>
                </div>
                <h3 className="vcard-title">David Lee</h3>
                <p className="vcard-role">Sales Director, AlphaTech</p>
                <p className="vcard-desc">"Implementation was seamless. Our entire team was onboarded within 48 hours, and we've seen a 40% increase in outbound activities simply because the tool is a joy to use."</p>
              </div>

              {/* Card 5 */}
              <div className="vcard">
                <div className="vcard-spiral" aria-hidden="true"><svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="sp-ring sp-r1" d="M60,60 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" stroke="#1a6b5c" strokeWidth="1.2" fill="none" strokeDasharray="314" strokeDashoffset="314" /><path className="sp-ring sp-r2" d="M60,60 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" stroke="#2a9d8f" strokeWidth="1" fill="none" strokeDasharray="226" strokeDashoffset="226" /><path className="sp-ring sp-r3" d="M60,60 m-22,0 a22,22 0 1,1 44,0 a22,22 0 1,1 -44,0" stroke="#1a6b5c" strokeWidth="0.9" fill="none" strokeDasharray="138" strokeDashoffset="138" /></svg></div>
                <div className="vcard-icon-wrap">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="14" r="7" stroke="white" strokeWidth="1.8" /><path d="M8 34 Q8 24 32 24 Q32 34 32 34 Z" stroke="white" strokeWidth="1.7" fill="none" /></svg>
                </div>
                <h3 className="vcard-title">Jessica Patel</h3>
                <p className="vcard-role">Enterprise AE, Innovate Inc</p>
                <p className="vcard-desc">"The best part is how it integrates our data sources. I no longer switch between five different tabs to understand my accounts. Everything I need is right there."</p>
              </div>
              </div>

              {/* 3rd DUPLICATE SET FOR ULTRA-WIDE SCREENS */}
              <div className="marquee-group" aria-hidden="true">
              {/* Card 1 */}
              <div className="vcard">
                <div className="vcard-spiral" aria-hidden="true"><svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="sp-ring sp-r1" d="M60,60 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" stroke="#1a6b5c" strokeWidth="1.2" fill="none" strokeDasharray="314" strokeDashoffset="314" /><path className="sp-ring sp-r2" d="M60,60 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" stroke="#2a9d8f" strokeWidth="1" fill="none" strokeDasharray="226" strokeDashoffset="226" /><path className="sp-ring sp-r3" d="M60,60 m-22,0 a22,22 0 1,1 44,0 a22,22 0 1,1 -44,0" stroke="#1a6b5c" strokeWidth="0.9" fill="none" strokeDasharray="138" strokeDashoffset="138" /></svg></div>
                <div className="vcard-icon-wrap">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="14" r="7" stroke="white" strokeWidth="1.8" /><path d="M8 34 Q8 24 32 24 Q32 34 32 34 Z" stroke="white" strokeWidth="1.7" fill="none" /></svg>
                </div>
                <h3 className="vcard-title">Sarah Chen</h3>
                <p className="vcard-role">VP Sales, Meridian Technologies</p>
                <p className="vcard-desc">"We switched from Salesforce six months ago. The difference in rep adoption is staggering. Error Infotech feels like it was built for people who actually sell, not just for managers who want reports."</p>
              </div>

              {/* Card 2 */}
              <div className="vcard vcard-featured">
                <div className="vcard-spiral" aria-hidden="true"><svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="sp-ring sp-r1" d="M60,60 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" stroke="#1a6b5c" strokeWidth="1.2" fill="none" strokeDasharray="314" strokeDashoffset="314" /><path className="sp-ring sp-r2" d="M60,60 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" stroke="#2a9d8f" strokeWidth="1" fill="none" strokeDasharray="226" strokeDashoffset="226" /><path className="sp-ring sp-r3" d="M60,60 m-22,0 a22,22 0 1,1 44,0 a22,22 0 1,1 -44,0" stroke="#1a6b5c" strokeWidth="0.9" fill="none" strokeDasharray="138" strokeDashoffset="138" /></svg></div>
                <div className="vcard-icon-wrap">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="14" r="7" stroke="white" strokeWidth="1.8" /><path d="M8 34 Q8 24 32 24 Q32 34 32 34 Z" stroke="white" strokeWidth="1.7" fill="none" /></svg>
                </div>
                <h3 className="vcard-title">Marcus Johnson</h3>
                <p className="vcard-role">Chief Revenue Officer, CloudScale Inc.</p>
                <p className="vcard-desc">"The Pipeline Intelligence feature alone paid for our annual contract in the first week. We identified a critical bottleneck in our enterprise motion that we had missed for years."</p>
              </div>

              {/* Card 3 */}
              <div className="vcard">
                <div className="vcard-spiral" aria-hidden="true"><svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="sp-ring sp-r1" d="M60,60 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" stroke="#1a6b5c" strokeWidth="1.2" fill="none" strokeDasharray="314" strokeDashoffset="314" /><path className="sp-ring sp-r2" d="M60,60 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" stroke="#2a9d8f" strokeWidth="1" fill="none" strokeDasharray="226" strokeDashoffset="226" /><path className="sp-ring sp-r3" d="M60,60 m-22,0 a22,22 0 1,1 44,0 a22,22 0 1,1 -44,0" stroke="#1a6b5c" strokeWidth="0.9" fill="none" strokeDasharray="138" strokeDashoffset="138" /></svg></div>
                <div className="vcard-icon-wrap">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="14" r="7" stroke="white" strokeWidth="1.8" /><path d="M8 34 Q8 24 32 24 Q32 34 32 34 Z" stroke="white" strokeWidth="1.7" fill="none" /></svg>
                </div>
                <h3 className="vcard-title">Elena Rodriguez</h3>
                <p className="vcard-role">Director of Sales Ops, Nexus Financial</p>
                <p className="vcard-desc">"Finally, a CRM that doesn't feel like a spreadsheet from 2005. It's blazing fast, the UI is gorgeous, and the automated data enrichment saves our SDRs hours every week."</p>
              </div>

              {/* Card 4 */}
              <div className="vcard">
                <div className="vcard-spiral" aria-hidden="true"><svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="sp-ring sp-r1" d="M60,60 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" stroke="#1a6b5c" strokeWidth="1.2" fill="none" strokeDasharray="314" strokeDashoffset="314" /><path className="sp-ring sp-r2" d="M60,60 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" stroke="#2a9d8f" strokeWidth="1" fill="none" strokeDasharray="226" strokeDashoffset="226" /><path className="sp-ring sp-r3" d="M60,60 m-22,0 a22,22 0 1,1 44,0 a22,22 0 1,1 -44,0" stroke="#1a6b5c" strokeWidth="0.9" fill="none" strokeDasharray="138" strokeDashoffset="138" /></svg></div>
                <div className="vcard-icon-wrap">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="14" r="7" stroke="white" strokeWidth="1.8" /><path d="M8 34 Q8 24 32 24 Q32 34 32 34 Z" stroke="white" strokeWidth="1.7" fill="none" /></svg>
                </div>
                <h3 className="vcard-title">David Lee</h3>
                <p className="vcard-role">Sales Director, AlphaTech</p>
                <p className="vcard-desc">"Implementation was seamless. Our entire team was onboarded within 48 hours, and we've seen a 40% increase in outbound activities simply because the tool is a joy to use."</p>
              </div>

              {/* Card 5 */}
              <div className="vcard">
                <div className="vcard-spiral" aria-hidden="true"><svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="sp-ring sp-r1" d="M60,60 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" stroke="#1a6b5c" strokeWidth="1.2" fill="none" strokeDasharray="314" strokeDashoffset="314" /><path className="sp-ring sp-r2" d="M60,60 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" stroke="#2a9d8f" strokeWidth="1" fill="none" strokeDasharray="226" strokeDashoffset="226" /><path className="sp-ring sp-r3" d="M60,60 m-22,0 a22,22 0 1,1 44,0 a22,22 0 1,1 -44,0" stroke="#1a6b5c" strokeWidth="0.9" fill="none" strokeDasharray="138" strokeDashoffset="138" /></svg></div>
                <div className="vcard-icon-wrap">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="14" r="7" stroke="white" strokeWidth="1.8" /><path d="M8 34 Q8 24 32 24 Q32 34 32 34 Z" stroke="white" strokeWidth="1.7" fill="none" /></svg>
                </div>
                <h3 className="vcard-title">Jessica Patel</h3>
                <p className="vcard-role">Enterprise AE, Innovate Inc</p>
                <p className="vcard-desc">"The best part is how it integrates our data sources. I no longer switch between five different tabs to understand my accounts. Everything I need is right there."</p>
              </div>
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
              <span>Start Your Free Trial â†’</span>
            </button>
            <p className="cta-note">No credit card required. 14-day free trial.</p>
          </div>
        </div>
      </section>







      {/*  â”€â”€ Login Modal â”€â”€  */}
      <div id="loginOverlay" className="lm-overlay" aria-modal="true" role="dialog" aria-label="Sign in">
        <div className="lm-backdrop" id="loginBackdrop"></div>
        <div className="lm-card" id="loginCard">

          {/*  Decorative animated rings  */}
          <div className="lm-ring lm-ring-1"></div>
          <div className="lm-ring lm-ring-2"></div>

          {/*  Close button  */}
          <button className="lm-close" id="loginClose" aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>

          {/*  Logo + heading  */}
          <div className="lm-header">
            <div className="lm-logo-mark">
              <svg viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="17" stroke="#2a9d8f" strokeWidth="1.5" /><polyline points="8,22 14,15 18,18 24,11 30,8" stroke="#1a6b5c" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" /><circle cx="18" cy="18" r="2.5" fill="#1a6b5c" /></svg>
            </div>
            <h2 className="lm-title">Welcome back</h2>
            <p className="lm-subtitle">Sign in to your Error Infotech account</p>
          </div>

          {/*  Form  */}
          <form className="lm-form" onSubmit="return false;">
            <div className="lm-field">
              <label className="lm-label">Email address</label>
              <div className="lm-input-wrap">
                <svg className="lm-input-icon" viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" /><polyline points="2,5 10,12 18,5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
                <input type="email" className="lm-input" placeholder="you@company.com" autocomplete="email" />
              </div>
            </div>

            <div className="lm-field">
              <label className="lm-label">Password</label>
              <div className="lm-input-wrap">
                <svg className="lm-input-icon" viewBox="0 0 20 20" fill="none"><rect x="5" y="9" width="10" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M7 9V7a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
                <input type="password" className="lm-input" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" autocomplete="current-password" />
              </div>
              <a href="#" className="lm-forgot">Forgot password?</a>
            </div>

            <button type="submit" className="lm-submit" onClick="showToast('Signing you in...')">
              <span>Sign in</span>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="10" x2="16" y2="10" /><polyline points="11 5 16 10 11 15" /></svg>
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
