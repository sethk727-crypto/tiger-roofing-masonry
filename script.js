// Inside your existing DOMContentLoaded listener:
const navLinks = document.querySelectorAll('.nav-route');
const tabViews = document.querySelectorAll('.tab-view');

navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('data-target');

    // If the target is a section within the current view (like Services), just scroll to it
    if(targetId === 'view-services') {
        document.querySelector('.services-section').scrollIntoView({ behavior: 'smooth' });
        return;
    }

    // Update Nav Active States
    navLinks.forEach(nav => nav.classList.remove('active'));
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
      void targetView.offsetWidth; 
      targetView.style.animation = 'hologramFadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
});
