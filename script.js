/* ============================================================
   CONQUER SOFTWARE — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll ──────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });


  /* ── Hamburger / Mobile Nav ─────────────────────────────── */
  const ham     = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = mobileNav.querySelectorAll('a');

  ham.addEventListener('click', () => {
    const open = ham.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileLinks.forEach(l => l.addEventListener('click', () => {
    ham.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }));


  /* ── Scroll Reveal ──────────────────────────────────────── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObs.observe(el);
  });

  /* Staggered delays for grid children */
  document.querySelectorAll('.services-grid .service-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 80}ms`;
    el.classList.add('reveal');
    revealObs.observe(el);
  });


  /* ── Particle Canvas ────────────────────────────────────── */
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x  = Math.random() * W;
        this.y  = Math.random() * H;
        this.r  = Math.random() * 1.5 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.a  = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,106,0,${this.a})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 100; i++) particles.push(new Particle());

    function animate() {
      ctx.clearRect(0, 0, W, H);
      // Draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,106,0,${0.07 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animate);
    }
    animate();
  }


  /* ── Service Modal ──────────────────────────────────────── */
  const serviceData = {
    web: {
      icon: 'assets/service-web.png',
      title: 'Web Development',
      desc: 'We craft blazing-fast, modern websites using the latest technologies — React, Next.js, and Vue — tailored to your brand and business goals.',
      detail: 'From simple landing pages to complex multi-page applications, we ensure every line of code is clean, optimised, and built to scale.',
      features: ['React / Next.js', 'Responsive Design', 'SEO Optimised', 'Performance First', 'CMS Integration', 'SSL & Hosting']
    },
    shopify: {
      icon: 'assets/service-shopify.png',
      title: 'Shopify Stores',
      desc: 'Launch or transform your e-commerce presence with custom Shopify stores that convert browsers into buyers.',
      detail: 'We build fully custom Shopify themes, integrate third-party apps, set up payment gateways, and optimise the entire checkout experience.',
      features: ['Custom Themes', 'App Integration', 'Payment Setup', 'Inventory Sync', 'SEO-Ready', 'Mobile Optimised']
    },
    html: {
      icon: 'assets/service-html.png',
      title: 'HTML/CSS/JS Sites',
      desc: 'Lightweight, lightning-fast static sites with zero dependencies and maximum performance — ideal for portfolios, landing pages, and microservices.',
      detail: 'No bloated frameworks, no unnecessary overhead. Pure, hand-crafted code that loads instantly and scores 100 on Lighthouse.',
      features: ['Pure Vanilla Code', '100 Lighthouse Score', 'Zero Dependencies', 'Pixel-Perfect UI', 'Animation-Rich', 'Blazing Fast']
    },
    custom: {
      icon: 'assets/service-custom.png',
      title: 'Custom Web Apps',
      desc: 'Beyond websites — full-stack web applications with custom backends, databases, APIs, authentication, and admin dashboards.',
      detail: 'Need something unique? We engineer bespoke solutions: booking systems, SaaS platforms, client portals, and more.',
      features: ['Full-Stack Dev', 'REST / GraphQL APIs', 'Database Design', 'Auth Systems', 'Admin Panels', 'Cloud Deployment']
    },
    quiz: {
      icon: 'assets/service-quiz.png',
      title: 'Quiz & Interactive Apps',
      desc: 'Engaging, gamified quiz and assessment applications — perfect for lead generation, product configurators, and learning platforms.',
      detail: 'We build the exact kind of tool you\'re using right now on this page — multi-step quizzes, cost estimators, calculators, and interactive configurators.',
      features: ['Multi-Step Flows', 'Score Logic', 'Results Pages', 'Form Integration', 'Analytics', 'Embeddable Widget']
    },
    android: {
      icon: 'assets/service-android.png',
      title: 'Android Apps',
      desc: 'Native and cross-platform Android applications that deliver smooth, polished user experiences on all screen sizes.',
      detail: 'We develop Android apps using React Native and Kotlin — from MVPs to fully polished Play Store releases with complete documentation.',
      features: ['React Native', 'Kotlin / Java', 'API Integration', 'Push Notifications', 'Offline Mode', 'Play Store Deploy']
    },
    playstore: {
      icon: 'assets/service-playstore.png',
      title: 'Play Store Services',
      desc: 'End-to-end Play Store management: account setup, ASO optimisation, listing creation, and app submission support.',
      detail: 'We handle developer account registration, optimise your store listing for discoverability, and manage the full submission and review process.',
      features: ['Account Setup', 'ASO Optimisation', 'Listing Design', 'Screenshots', 'Review Management', 'Update Submissions']
    },
    ai: {
      icon: 'assets/service-ai.png',
      title: 'AI Chatbot Development',
      desc: 'Intelligent, context-aware chatbots that handle customer support, lead qualification, and product discovery — 24/7.',
      detail: 'Built on GPT-4 and custom LLM pipelines, our chatbots integrate seamlessly into your website, app, or WhatsApp Business account.',
      features: ['GPT-4 Integration', 'WhatsApp Bot', 'Website Widget', 'Lead Capture', 'Custom Persona', 'Analytics Dashboard']
    },
    logo: {
      icon: 'assets/service-logo.png',
      title: 'Logo & Brand Design',
      desc: 'Distinctive logos and brand identity systems that make your company instantly recognisable and unforgettable.',
      detail: 'We create full brand packages: logo (all formats), colour palette, typography system, brand guidelines, and social media kit.',
      features: ['Logo (SVG/PNG/PDF)', 'Brand Guidelines', 'Colour Palette', 'Typography System', 'Social Media Kit', 'Business Cards']
    }
  };

  const modalOverlay = document.getElementById('serviceModal');
  const modalClose   = document.getElementById('modalClose');

  function openModal(key) {
    const d = serviceData[key];
    if (!d) return;
    document.getElementById('modalIcon').innerHTML  = `<img src="${d.icon}" alt="${d.title}" style="width:40px;height:40px;object-fit:contain;">`;
    document.getElementById('modalTitle').textContent = d.title;
    document.getElementById('modalDesc').textContent  = d.desc;
    document.getElementById('modalDetail').textContent = d.detail;
    const feat = document.getElementById('modalFeatures');
    feat.innerHTML = d.features.map(f => `<span>${f}</span>`).join('');
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-modal]').forEach(el => {
    el.addEventListener('click', () => openModal(el.dataset.modal));
  });
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });


  /* ── Project Estimator Quiz ─────────────────────────────── */
  const PRICING = {
    service: {
      web:       { label: 'Web Development',     base: 30000 },
      shopify:   { label: 'Shopify Store',        base: 20000 },
      html:      { label: 'HTML/CSS/JS Site',     base: 8000  },
      custom:    { label: 'Custom Web App',       base: 60000 },
      quiz:      { label: 'Quiz App',             base: 12000 },
      android:   { label: 'Android App',          base: 50000 },
      ai:        { label: 'AI Chatbot',           base: 25000 },
      logo:      { label: 'Logo & Branding',      base: 5000  }
    },
    complexity: { simple: 1, medium: 1.7, complex: 2.8 },
    features:   { none: 0, some: 0.2, all: 0.45 }
  };

  let quizState = { step: 1, service: null, complexity: null, features: null };
  const totalSteps = 3;

  function updateProgress() {
    const pct = ((quizState.step - 1) / totalSteps) * 100;
    document.getElementById('quizFill').style.width  = pct + '%';
    document.getElementById('quizLabel').textContent = `Step ${quizState.step} of ${totalSteps}`;
  }

  function showStep(n) {
    document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
    const step = document.getElementById(`step${n}`);
    if (step) step.classList.add('active');
    document.getElementById('quizResult').classList.remove('active');
    quizState.step = n;
    updateProgress();
  }

  function selectOption(stepEl, value, key) {
    stepEl.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
    stepEl.querySelector(`[data-val="${value}"]`).classList.add('selected');
    quizState[key] = value;
  }

  // Option click handlers
  document.querySelectorAll('#step1 .quiz-option').forEach(opt => {
    opt.addEventListener('click', () => {
      selectOption(document.getElementById('step1'), opt.dataset.val, 'service');
    });
  });
  document.querySelectorAll('#step2 .quiz-option').forEach(opt => {
    opt.addEventListener('click', () => {
      selectOption(document.getElementById('step2'), opt.dataset.val, 'complexity');
    });
  });
  document.querySelectorAll('#step3 .quiz-option').forEach(opt => {
    opt.addEventListener('click', () => {
      selectOption(document.getElementById('step3'), opt.dataset.val, 'features');
    });
  });

  // Next buttons
  document.getElementById('next1').addEventListener('click', () => {
    if (!quizState.service) return showToast('Please select a service first', true);
    showStep(2);
  });
  document.getElementById('next2').addEventListener('click', () => {
    if (!quizState.complexity) return showToast('Please select a complexity level', true);
    showStep(3);
  });
  document.getElementById('next3').addEventListener('click', () => {
    if (!quizState.features) return showToast('Please make a selection to continue', true);
    computeResult();
  });

  // Back buttons
  document.getElementById('back2').addEventListener('click', () => showStep(1));
  document.getElementById('back3').addEventListener('click', () => showStep(2));

  function computeResult() {
    const svc  = PRICING.service[quizState.service];
    const comp = PRICING.complexity[quizState.complexity];
    const feat = PRICING.features[quizState.features];

    const low  = Math.round(svc.base * comp);
    const high = Math.round(low * (1 + feat) * 1.25);

    const fmt = n => '₹' + n.toLocaleString('en-IN');

    document.getElementById('resultRange').textContent = `${fmt(low)} – ${fmt(high)}`;

    const complexityLabels = { simple: 'Simple', medium: 'Medium', complex: 'Complex' };
    const featureLabels    = { none: 'Core Features Only', some: 'Some Additional Features', all: 'Full Feature Set' };

    document.getElementById('rService').textContent    = svc.label;
    document.getElementById('rComplexity').textContent = complexityLabels[quizState.complexity];
    document.getElementById('rFeatures').textContent   = featureLabels[quizState.features];
    document.getElementById('rTimeline').textContent   = getTimeline();

    // Prefill contact form
    const serviceSelect = document.getElementById('formService');
    const budgetInput   = document.getElementById('formBudget');
    if (serviceSelect) {
      for (let opt of serviceSelect.options) {
        if (opt.text.toLowerCase().includes(svc.label.toLowerCase().split(' ')[0].toLowerCase())) {
          opt.selected = true; break;
        }
      }
    }
    if (budgetInput) budgetInput.value = `${fmt(low)} – ${fmt(high)}`;

    // Show result
    document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
    document.getElementById('quizResult').classList.add('active');
    document.getElementById('quizFill').style.width  = '100%';
    document.getElementById('quizLabel').textContent = 'Complete!';
  }

  function getTimeline() {
    const map = {
      simple:  { none: '1–2 weeks', some: '2–3 weeks', all: '3–4 weeks' },
      medium:  { none: '3–5 weeks', some: '5–7 weeks', all: '6–10 weeks' },
      complex: { none: '6–10 weeks', some: '10–16 weeks', all: '14–20 weeks' }
    };
    return map[quizState.complexity]?.[quizState.features] ?? '4–8 weeks';
  }

  document.getElementById('restartQuiz').addEventListener('click', () => {
    quizState = { step: 1, service: null, complexity: null, features: null };
    document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
    showStep(1);
  });

  document.getElementById('quizToContact').addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });

  showStep(1);


  /* ── Contact Form ───────────────────────────────────────── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      const orig = btn.innerHTML;
      btn.innerHTML = '<span>Sending…</span>';
      btn.disabled = true;

      const data = new FormData(form);
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: data
        });
        if (res.ok || res.status === 200) {
          showToast('Message sent! We\'ll be in touch within 24 hours. 🎉', false);
          form.reset();
        } else {
          throw new Error('Server error');
        }
      } catch (_) {
        showToast('Something went wrong. Please try WhatsApp or email us directly.', true);
      } finally {
        btn.innerHTML = orig;
        btn.disabled = false;
      }
    });
  }


  /* ── Toast Notification ─────────────────────────────────── */
  function showToast(msg, isError = false) {
    const el = document.getElementById('notification');
    el.querySelector('.n-icon').textContent = isError ? '⚠️' : '✅';
    el.querySelector('h4').textContent      = isError ? 'Heads Up' : 'Success';
    el.querySelector('p').textContent       = msg;
    el.className = 'notify show' + (isError ? ' error' : '');
    clearTimeout(el._t);
    el._t = setTimeout(() => { el.classList.remove('show'); }, 5000);
  }


  /* ── Smooth Scroll for anchor links ────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});