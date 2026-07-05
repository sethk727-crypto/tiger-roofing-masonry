document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. SPA ROUTING ENGINE (TAB SWITCHING) - FIXED
  // ==========================================
  const navLinks = document.querySelectorAll('.nav-route');
  const tabViews = document.querySelectorAll('.tab-view');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-target');

      // --- NEW LOGIC FOR SERVICES SCROLLING ---
      if (targetId === 'section-services') {
        // Step 1: Hide all views
        tabViews.forEach(view => {
          view.classList.remove('active-view');
          view.style.animation = 'none'; 
        });
        
        // Step 2: Force Home tab to be active (since services are on the home tab)
        const homeView = document.getElementById('view-home');
        homeView.classList.add('active-view');
        
        // Update nav UI to highlight "Home" but allow action
        navLinks.forEach(nav => nav.classList.remove('active'));
        document.querySelector('.nav-route[data-target="view-home"]').classList.add('active');

        // Step 3: Scroll to the services section (needs a tiny timeout to allow display:block to render)
        setTimeout(() => {
          const servicesSection = document.getElementById('section-services');
          if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50); 
        
        return; // Stop running the rest of the tab code
      }

      // --- STANDARD TAB SWITCHING LOGIC ---
      
      // Update Nav Active States
      navLinks.forEach(nav => nav.classList.remove('active'));
      
      // Only highlight top links, not the CTA button or inner card links
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
        
        // Smooth snap to top for new tabs
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
  // 3. BEFORE/AFTER SLIDER ENGINE
  // ==========================================
  const slider = document.getElementById('drag-engine');
  const fgWrap = document.querySelector('.img-fg-wrap');
  if (slider && fgWrap) {
    slider.addEventListener('input', (e) => { 
      fgWrap.style.width = `${e.target.value}%`; 
    });
  }

  // ==========================================
  // 4. NLP HYPNOTIC FORM SUBMISSION
  // ==========================================
  const formBtn = document.getElementById('form-btn');
  const form = document.getElementById('tiger-form');
  
  if(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // NLP Transition State
      formBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> TRANSMITTING BLUEPRINT...';
      formBtn.style.backgroundColor = '#4285F4'; // Switch to trust blue
      formBtn.style.boxShadow = '0 0 30px rgba(66, 133, 244, 0.8)';
      
      setTimeout(() => {
        formBtn.innerHTML = '<i class="fa-solid fa-check"></i> BLUEPRINT SECURED';
        formBtn.style.backgroundColor = '#34A853'; // Switch to success green
        formBtn.style.boxShadow = '0 0 30px rgba(52, 168, 83, 0.8)';
        form.reset();
      }, 2000);
    });
  }
});
