/**
 * TIGER ROOFING & MASONRY - CORE INTERACTIVE ENGINE
 * Features: 1:1 Slider Tracking, 3D Card Physics, Scroll Observers
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. BEFORE & AFTER SLIDER ENGINE ---
  const slider = document.getElementById('drag-engine');
  const fgWrap = document.querySelector('.img-fg-wrap');
  
  if (slider && fgWrap) {
    slider.addEventListener('input', (e) => {
      // Sync foreground wrapper width with slider value precisely
      fgWrap.style.width = `${e.target.value}%`;
    });
  }

  // --- 2. 3D TILT PHYSICS FOR SERVICE CARDS ---
  const cards = document.querySelectorAll('.service-card');
  
  cards.forEach(card => {
    // Track mouse movement over the card
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // Cursor X position within card
      const y = e.clientY - rect.top;  // Cursor Y position within card
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation based on distance from center (max 8 degrees for subtlety)
      const rotateX = ((y - centerY) / centerY) * -8; 
      const rotateY = ((x - centerX) / centerX) * 8;
      
      // Apply the 3D transform dynamically
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    // Snap back to original position when mouse leaves
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      card.style.transition = 'transform 0.5s ease-out'; // Smooth snap back
    });
    
    // Remove transition delay while actively tracking mouse for zero latency
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none'; 
    });
  });

  // --- 3. INTERSECTION OBSERVER (SCROLL ANIMATIONS) ---
  // Setup the hardware-accelerated initial states via JS so fallback works if JS fails
  const animatedElements = document.querySelectorAll('.features-bar, .service-card, .utility-row');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)';
  });

  // Configure the observer payload
  const observerOptions = {
    threshold: 0.15, // Trigger when 15% of element is visible
    rootMargin: "0px 0px -50px 0px"
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Trigger the animation
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // Stop observing once animated to save memory
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Deploy observer to targets
  animatedElements.forEach(el => scrollObserver.observe(el));
});
