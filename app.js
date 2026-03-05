// ===== assets/js/app.js =====

document.addEventListener('DOMContentLoaded', function() {
  // ---------- hamburger menu ----------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const menuOverlay = document.getElementById('menuOverlay');
  const closeMenuBtn = document.getElementById('closeMenu');

  if (hamburgerBtn && menuOverlay && closeMenuBtn) {
    hamburgerBtn.addEventListener('click', () => {
      menuOverlay.classList.add('active');
    });
    closeMenuBtn.addEventListener('click', () => {
      menuOverlay.classList.remove('active');
    });
    // close on overlay click (optional, but we use close button)
    menuOverlay.addEventListener('click', (e) => {
      if (e.target === menuOverlay) {
        menuOverlay.classList.remove('active');
      }
    });
  }

  // ---------- bottom navigation active state ----------
  const navItems = document.querySelectorAll('.nav-item');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPage) {
      item.classList.add('active');
    } else if (currentPage === '' && href === 'index.html') {
      item.classList.add('active');
    }
  });

  // ---------- hero slider (if on homepage) ----------
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('dots');
  if (slides.length && dotsContainer) {
    let slideIndex = 0;
    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dot.addEventListener('click', () => showSlide(i));
      dotsContainer.appendChild(dot);
    });

    function showSlide(n) {
      if (n >= slides.length) slideIndex = 0;
      else if (n < 0) slideIndex = slides.length - 1;
      else slideIndex = n;
      document.querySelector('.slides').style.transform = `translateX(-${slideIndex * 100}%)`;
      document.querySelectorAll('.dot').forEach((d, idx) => d.classList.toggle('active', idx === slideIndex));
    }

    window.moveSlide = (step) => showSlide(slideIndex + step);
    showSlide(0);
    setInterval(() => moveSlide(1), 5000);
  }

  // ---------- gallery filter (gallery page) ----------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        galleryItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ---------- booking add-ons toggle ----------
  const addonChips = document.querySelectorAll('.addon-chip');
  addonChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
    });
  });

  // ---------- booking form validation (simple) ----------
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Booking summary (demo). In production, payment would be processed.');
    });
  }

  // ---------- profile tabs ----------
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  if (tabBtns.length && tabPanes.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
      });
    });
  }

  // ---------- demo login (for profile page) ----------
  const demoLoginBtn = document.getElementById('demoLoginBtn');
  if (demoLoginBtn) {
    demoLoginBtn.addEventListener('click', () => {
      document.querySelector('.login-section').style.display = 'none';
      document.querySelector('.dashboard-section').style.display = 'block';
    });
  }
  const demoLogoutBtn = document.getElementById('demoLogoutBtn');
  if (demoLogoutBtn) {
    demoLogoutBtn.addEventListener('click', () => {
      document.querySelector('.login-section').style.display = 'block';
      document.querySelector('.dashboard-section').style.display = 'none';
    });
  }

  // ---------- PWA install button (placeholder) ----------
  const pwaBtn = document.getElementById('pwaInstallBtn');
  if (pwaBtn) {
    pwaBtn.addEventListener('click', () => {
      alert('Install Meghaa Makeovers app (PWA prompt would appear here)');
    });
  }

  // ---------- review carousel already works via CSS ----------
});