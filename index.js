// ============================================================
// SCROLL ENGINE
// ============================================================
const container = document.getElementById('different-pages');
const pages = document.querySelectorAll('.page');
let lastScrollTime = 0;
const SCROLL_COOLDOWN = 4000;
const SCROLL_COOLDOWN_PAGE_2 = 8000;
let currentIndex = 0;
let isScrolling = false;
const WHEEL_THRESHOLD = 30;
const visitedPages = new Set([0]);

function scrollToPage(index) {
  isScrolling = true;
  pages[index].scrollIntoView({ behavior: 'smooth' });
  currentIndex = index;

  if (!visitedPages.has(index)) {
    visitedPages.add(index);
    if (index === 1) triggerPage2();
    if (index === 2) triggerPage3();
    if (index === 4) triggerPage5();
  }

  setTimeout(() => { isScrolling = false; }, visitedPages.has(index) ? 800 : 1000);
}

container.addEventListener('wheel', (e) => {
  e.preventDefault();
  if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;

  const now = Date.now();
  const dir = e.deltaY > 0 ? 1 : -1;
  const nextIndex = currentIndex + dir;

  if (nextIndex < 0 || nextIndex >= pages.length) return;

  if (visitedPages.has(nextIndex)) {
    if (isScrolling) return;
    scrollToPage(nextIndex);
    return;
  }

  const cooldown = currentIndex === 1 ? SCROLL_COOLDOWN_PAGE_2 : SCROLL_COOLDOWN;
  if (isScrolling || now - lastScrollTime < cooldown) return;

  lastScrollTime = now;
  scrollToPage(nextIndex);
}, { passive: false });

// Touch
let startY = 0;
container.addEventListener('touchstart', (e) => { startY = e.touches[0].clientY; }, { passive: true });
container.addEventListener('touchend', (e) => {
  const diff = startY - e.changedTouches[0].clientY;
  if (Math.abs(diff) < 50) return;
  const dir = diff > 0 ? 1 : -1;
  const nextIndex = currentIndex + dir;
  if (nextIndex < 0 || nextIndex >= pages.length) return;

  if (visitedPages.has(nextIndex)) {
    if (isScrolling) return;
    scrollToPage(nextIndex);
    return;
  }

  const now = Date.now();
  const cooldown = currentIndex === 1 ? SCROLL_COOLDOWN_PAGE_2 : SCROLL_COOLDOWN;
  if (isScrolling || now - lastScrollTime < cooldown) return;
  lastScrollTime = now;
  scrollToPage(nextIndex);
});

// ============================================================
// NAVBAR
// ============================================================
const menuBtn = document.getElementById('menuBtn');
const dropdown = document.getElementById('dropdown');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  dropdown.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (!menuBtn.contains(e.target) && !dropdown.contains(e.target)) {
    menuBtn.classList.remove('active');
    dropdown.classList.remove('open');
  }
});

// ============================================================
// PAGE 1 — Scroll hint
// ============================================================
setTimeout(() => {
  const hint = document.getElementById('scroll-hint');
  if (hint) hint.style.opacity = '0';
}, 3500);

// ============================================================
// PAGE 2 — Skills
// ============================================================
let page2Triggered = false;

function triggerPage2() {
  if (page2Triggered) return;
  page2Triggered = true;

  const cards = document.querySelectorAll('.skill-card');
  const total = cards.length;
  const xpPerCard = 42 / total;
  let xp = 0;

  cards.forEach((card, i) => {
    const delay = i * 180;
    card.style.animation = `stepFadeIn 0.5s ease ${delay}ms forwards`;

    setTimeout(() => {
      xp = Math.min(xp + xpPerCard, 42);
      const fill = document.getElementById('xp-fill');
      const pct = document.getElementById('xp-pct');
      if (fill) fill.style.width = xp + '%';
      if (pct) pct.textContent = Math.round(xp) + '%';
    }, delay);
  });
}

// ============================================================
// PAGE 3 — Projects (staggered reveal)
// ============================================================
let page3Triggered = false;

function triggerPage3() {
  if (page3Triggered) return;
  page3Triggered = true;

  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card, i) => {
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 150);
  });

  // Animate XP bar
  setTimeout(() => {
    const fill = document.getElementById('xp-fill2');
    const pct = document.getElementById('xp-pct2');
    if (fill) fill.style.width = '72%';
    if (pct) pct.textContent = '72%';
  }, 800);
}

// ============================================================
// PAGE 5 — Hobbies
// ============================================================
let page5Triggered = false;

function triggerPage5() {
  if (page5Triggered) return;
  page5Triggered = true;

  const cards = document.querySelectorAll('.hobby-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 150 + 300);
  });
}
