
tailwind.config = {
  theme: {
    extend: {
      colors: {
        obsidian: '#070709',
        charcoal: '#101014',
        'panel': '#13131a',
        gold: '#C5A059',
        'gold-light': '#F3E5AB',
        'gold-dim': '#7A6335',
        'off-white': '#EAEAE0',
        steel: '#8A93A2',
        'steel-dim': '#555F6E',
      },
      fontFamily: {
        serif: ['Cinzel', 'serif'],
        sans:  ['Manrope', 'sans-serif'],
        mono:  ['Space Mono', 'monospace'],
      },
    }
  }
}

/* Cursor */
const cur = document.getElementById('cur');
if (window.matchMedia('(pointer:fine)').matches) {
  document.addEventListener('mousemove', e => { cur.style.left = e.clientX+'px'; cur.style.top = e.clientY+'px'; });
  document.querySelectorAll('a,button').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('big'));
    el.addEventListener('mouseleave', () => cur.classList.remove('big'));
  });
}

/* Mobile menu */
const burger  = document.getElementById('burger');
const mobMenu = document.getElementById('mob-menu');
let open = false;
const BARS = `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"/></svg>`;
const CROSS= `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"/></svg>`;
burger.addEventListener('click', () => {
  open = !open;
  mobMenu.classList.toggle('translate-x-full', !open);
  document.body.style.overflow = open ? 'hidden' : '';
  burger.innerHTML = open ? CROSS : BARS;
});
document.querySelectorAll('.mob-lnk').forEach(l => l.addEventListener('click', () => {
  open = false; mobMenu.classList.add('translate-x-full'); document.body.style.overflow = ''; burger.innerHTML = BARS;
}));

/* Nav compact on scroll */
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => { nav.classList.toggle('py-3', scrollY > 80); nav.classList.toggle('py-4', scrollY <= 80); }, { passive:true });

/* Active nav */
const secs = [...document.querySelectorAll('section[id]')];
const nls  = [...document.querySelectorAll('.nav-link')];
window.addEventListener('scroll', () => {
  let c = ''; secs.forEach(s => { if (scrollY >= s.offsetTop - 200) c = s.id; });
  nls.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#'+c));
}, { passive:true });

/* Scroll reveal */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); } });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => obs.observe(el));

/* Subtle parallax on the banner image */
const bannerImg = document.getElementById('banner-img');
if (bannerImg) {
  window.addEventListener('scroll', () => {
    const banner = document.getElementById('img-banner');
    const rect   = banner.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      const pct  = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const offset = (pct - 0.5) * 60;
      bannerImg.style.transform = `translateY(${offset}px)`;
    }
  }, { passive: true });
}
