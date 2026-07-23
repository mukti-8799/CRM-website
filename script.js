// NexaCRM Interactive JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Reveal Animation using IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
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
