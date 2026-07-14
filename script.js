document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. SPA ROUTING ENGINE (TAB SWITCHING)
  // ==========================================
  const navLinks = document.querySelectorAll('.nav-route');
  const tabViews = document.querySelectorAll('.tab-view');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-target');

      // Update Nav Active States
      navLinks.forEach(nav => nav.classList.remove('active'));
      // Only highlight top links, not the CTA button
      if (!this.classList.contains('nav-cta') && !this.classList.contains('hero-btn') && !this.classList.contains('card-link')) {
        this.classList.add('active');
      }

      // Hide all views and reset animations
      tabViews.forEach(view => {
        view.classList.remove('active-view');
        view.style.animation = 'none'; 
      });

      // Show target view with hologram physics
      const targetView = document.getElementById(targetId);
      if (targetView) {
        targetView.classList.add('active-view');
        void targetView.offsetWidth; // Trigger reflow
        targetView.style.animation = 'hologramFadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        
        // Smooth snap to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  // ==========================================
  // 2. 3D TILT PHYSICS (Cards & Stats)
  // ==========================================
  const glowItems = document.querySelectorAll('.glow-effect');
  glowItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left; 
      const y = e.clientY - rect.top;
      const rotateX = ((y - (rect.height / 2)) / (rect.height / 2)) * -6; 
      const rotateY = ((x - (rect.width / 2)) / (rect.width / 2)) * 6;
      item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    item.addEventListener('mouseleave', () => { 
      item.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`; 
    });
  });

  // ==========================================
  // 3. DYNAMIC LIVE PROJECT COUNTER
  // ==========================================
  const counterEl = document.getElementById('live-project-counter');
  if (counterEl) {
    const targetCount = parseInt(counterEl.getAttribute('data-count'), 10) || 5280;
    const startCount = 4950;
    let currentCount = startCount;
    const duration = 2500; // ms
    const intervalTime = 30; // ms
    const step = Math.ceil((targetCount - startCount) / (duration / intervalTime));

    const counterTimer = setInterval(() => {
      currentCount += step;
      if (currentCount >= targetCount) {
        counterEl.textContent = targetCount.toLocaleString() + '+';
        clearInterval(counterTimer);
      } else {
        counterEl.textContent = currentCount.toLocaleString();
      }
    }, intervalTime);
  }

  // ==========================================
  // 4. INTERACTIVE ROI ESTIMATOR ENGINE
  // ==========================================
  const slider = document.getElementById('home-value-slider');
  const valDisplay = document.getElementById('val-display');
  const selectBtns = document.querySelectorAll('.roi-select-btn');
  const equityResult = document.getElementById('equity-result');
  const energyResult = document.getElementById('energy-result');
  const percentResult = document.getElementById('percent-result');
  const roiTransferBtn = document.getElementById('roi-transfer-btn');

  let activeRoi = 0.08; // default roofing ROI
  let activeEnergy = 420; // default annual savings
  let activeProjectName = "Architectural Roofing";

  function calculateROI() {
    if (!slider) return;
    const homeVal = parseInt(slider.value, 10);
    
    // Update Display
    valDisplay.textContent = '$' + homeVal.toLocaleString();

    // Calculations
    const addedValue = Math.round(homeVal * activeRoi);
    const percentage = (activeRoi * 100).toFixed(1);

    // Render results with animation
    if (equityResult) {
      equityResult.textContent = '$' + addedValue.toLocaleString();
    }
    if (percentResult) {
      percentResult.textContent = percentage + '% Appraised';
    }
    if (energyResult) {
      energyResult.textContent = activeEnergy > 0 ? '$' + activeEnergy + '/yr' : 'N/A (Structural)';
    }
  }

  // Slider Input Event
  if (slider) {
    slider.addEventListener('input', calculateROI);
  }

  // Selector Button Events
  selectBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      selectBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      activeRoi = parseFloat(this.getAttribute('data-roi'));
      activeEnergy = parseInt(this.getAttribute('data-energy'), 10);
      activeProjectName = this.textContent.trim();

      calculateROI();
    });
  });

  // ROI Transfer state (Seamless persuation bridge)
  if (roiTransferBtn) {
    roiTransferBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (!slider) return;

      const homeVal = parseInt(slider.value, 10);
      const addedValue = Math.round(homeVal * activeRoi);

      // Pre-fill description
      const clientDesc = document.getElementById('client-desc');
      if (clientDesc) {
        clientDesc.value = `ROI-CALCULATED GOAL:\nPrestige ${activeProjectName} project for my property currently valued at $${homeVal.toLocaleString()}.\nEstimated Appraisal Equity Added: $${addedValue.toLocaleString()}.\nLet's coordinate a priority inspection.`;
      }

      // Display custom ROI transferred badge on Contact Form
      const roiBadge = document.getElementById('contact-roi-badge');
      const roiValueDisplay = document.getElementById('contact-roi-value');
      if (roiBadge && roiValueDisplay) {
        roiValueDisplay.textContent = '$' + addedValue.toLocaleString();
        roiBadge.style.display = 'block';
        roiBadge.style.animation = 'hologramFadeIn 0.6s forwards';
      }

      // Switch view smoothly to Contact Tab
      const contactRoute = document.querySelector('.nav-route[data-target="view-contact"]');
      if (contactRoute) {
        contactRoute.click();
      }
    });
  }

  // Run initial calculation
  calculateROI();

  // ==========================================
  // 5. NLP HYPNOTIC FORM SUBMISSION
  // ==========================================
  const formBtn = document.getElementById('form-btn');
  const form = document.getElementById('tiger-form');
  
  if(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // NLP Transition State
      formBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> TRANSMITTING COORDINATES...';
      formBtn.style.backgroundColor = '#4285F4'; // Switch to trust blue
      formBtn.style.boxShadow = '0 0 30px rgba(66, 133, 244, 0.8)';
      
      setTimeout(() => {
        formBtn.innerHTML = '<i class="fa-solid fa-check"></i> PROPOSAL LOCK SECURED';
        formBtn.style.backgroundColor = '#34A853'; // Switch to success green
        formBtn.style.boxShadow = '0 0 30px rgba(52, 168, 83, 0.8)';
        
        // Clear forms and hide dynamic badges elegantly
        setTimeout(() => {
          form.reset();
          formBtn.innerHTML = 'ACTIVATE MY EVALUATION & SECURE BLUEPRINT';
          formBtn.style.backgroundColor = '';
          formBtn.style.boxShadow = '';
          
          const roiBadge = document.getElementById('contact-roi-badge');
          if (roiBadge) {
            roiBadge.style.display = 'none';
          }
        }, 3000);
      }, 2000);
    });
  }

  // ==========================================
  // 6. SCROLL REVEAL ENGINE (IntersectionObserver)
  // ==========================================
  // Elements tagged .reveal start at translateY(30px)/opacity:0 (see style.css)
  // and glide into view. Once revealed, the classes are stripped so the reveal
  // transition never fights the 3D tilt or .glow-effect hover transforms.
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('revealed');
        revealObserver.unobserve(el);

        // After the transition (0.8s) + any stagger delay, hand styling back
        // to the base stylesheet. Computed styles are identical, so no jump.
        const delayMs = (parseFloat(getComputedStyle(el).transitionDelay) || 0) * 1000;
        setTimeout(() => el.classList.remove('reveal', 'revealed'), 900 + delayMs);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    // Legacy fallback: show everything immediately.
    revealEls.forEach(el => el.classList.remove('reveal'));
  }

  // ==========================================
  // 7. AUTO-SLIDING GOOGLE REVIEWS CAROUSEL
  // ==========================================
  const reviewCarousel = document.getElementById('review-carousel');
  const reviewTrack = document.getElementById('review-track');
  const dotsContainer = document.getElementById('carousel-dots');

  if (reviewCarousel && reviewTrack && dotsContainer) {
    const slides = reviewTrack.querySelectorAll('.review-slide');
    const slideCount = slides.length;
    let currentSlide = 0;
    let autoSlideTimer = null;

    // Build navigation dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Show review ' + (i + 1));
      dot.addEventListener('click', () => {
        goToSlide(i);
        restartAutoSlide();
      });
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    function goToSlide(index) {
      currentSlide = (index + slideCount) % slideCount;
      // The track is a block-level flex container, so its width equals one
      // viewport (the slides overflow it) — translate -100% per slide.
      reviewTrack.style.transform = 'translateX(' + (-currentSlide * 100) + '%)';
      dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
    }

    function startAutoSlide() {
      autoSlideTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
    }

    function restartAutoSlide() {
      clearInterval(autoSlideTimer);
      startAutoSlide();
    }

    // Pause on hover / touch so reviews stay readable
    reviewCarousel.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
    reviewCarousel.addEventListener('mouseleave', restartAutoSlide);
    reviewCarousel.addEventListener('touchstart', () => clearInterval(autoSlideTimer), { passive: true });
    reviewCarousel.addEventListener('touchend', restartAutoSlide);

    startAutoSlide();
  }
});
