/* ─── HEADER SCROLL ─────────────────────────────── */
const header = document.querySelector('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });
}

/* ─── MOBILE MENU ───────────────────────────────── */
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav  = document.querySelector('.mobile-nav');

if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuToggle.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ─── LIGHTBOX ──────────────────────────────────── */
const lightbox    = document.getElementById('lightbox');
const lbImg       = document.getElementById('lb-img');
const lbCaption   = document.getElementById('lb-caption');
let   lbItems     = [];
let   lbIndex     = 0;

function lbOpen(index) {
  lbIndex = index;
  const item = lbItems[index];
  lbImg.src  = item.dataset.full || item.querySelector('img').src;
  if (lbCaption) lbCaption.textContent = item.dataset.caption || '';
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function lbClose() {
  lightbox.classList.remove('active');
  lbImg.src = '';
  document.body.style.overflow = '';
}

function lbStep(dir) {
  lbIndex = (lbIndex + dir + lbItems.length) % lbItems.length;
  const item = lbItems[lbIndex];
  lbImg.style.opacity = '0';
  setTimeout(() => {
    lbImg.src = item.dataset.full || item.querySelector('img').src;
    if (lbCaption) lbCaption.textContent = item.dataset.caption || '';
    lbImg.style.opacity = '1';
  }, 150);
}

document.addEventListener('DOMContentLoaded', () => {
  lbItems = Array.from(document.querySelectorAll('[data-lightbox]'));
  lbItems.forEach((el, i) => el.addEventListener('click', () => lbOpen(i)));

  if (lightbox) {
    document.querySelector('.lb-close')?.addEventListener('click', lbClose);
    document.querySelector('.lb-prev')?.addEventListener('click', () => lbStep(-1));
    document.querySelector('.lb-next')?.addEventListener('click', () => lbStep(1));
    lightbox.addEventListener('click', e => { if (e.target === lightbox) lbClose(); });
  }

  document.addEventListener('keydown', e => {
    if (!lightbox?.classList.contains('active')) return;
    if (e.key === 'Escape')      lbClose();
    if (e.key === 'ArrowRight')  lbStep(1);
    if (e.key === 'ArrowLeft')   lbStep(-1);
  });

  /* ─── LAZY FADE-IN ──────────────────────────── */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.fade-in').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
  }

  /* ─── CONTACT FORM ──────────────────────────── */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.btn');
      btn.textContent = 'Sent!';
      btn.disabled = true;
      btn.style.background = '#22c55e';
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.disabled = false;
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }
});
