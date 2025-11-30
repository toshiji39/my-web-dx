document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  const toggler = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  const header = document.querySelector('.site-header');
  if (toggler && nav) {
    toggler.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggler.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggler.setAttribute('aria-expanded', 'false');
    }));
  }

  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    if (!header) return;
    header.style.boxShadow = y > 4 ? '0 10px 30px rgba(0,0,0,.35)' : 'none';
    lastY = y;
    const bar = document.querySelector('.scrollbar span');
    if (bar) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, y / (max || 1)));
      bar.style.width = (p * 100).toFixed(2) + '%';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const tiltEls = document.querySelectorAll('[data-tilt]');
  tiltEls.forEach(el => {
    const r = 10;
    const enter = () => el.style.transition = 'transform 120ms ease';
    const leave = () => { el.style.transform = ''; el.style.transition = 'transform 220ms ease'; };
    const move = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - y) * r;
      const ry = (x - 0.5) * r;
      el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    }
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
  });
});
