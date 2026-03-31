const container = document.getElementById('different-pages');
const pages = document.querySelectorAll('.page');
let lastScrollTime = 0;
const SCROLL_COOLDOWN = 5000; // ms
let currentIndex = 0;
let isScrolling = false;
const WHEEL_THRESHOLD = 30;
const visitedPages = new Set(); // store indices of pages already viewed

// Message
// const msg = document.createElement('div');
// msg.textContent = "Nooooo, you are trying to move too fast!";
// Object.assign(msg.style, {
//   position: 'fixed',
//   top: '20px',
//   left: '50%',
//   transform: 'translateX(-50%)',
//   background: 'rgba(255, 255, 0, 0.9)',
//   padding: '10px 20px',
//   borderRadius: '10px',
//   fontFamily: 'Georgia, serif',
//   fontSize: '1.2rem',
//   color: '#000',
//   boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
//   zIndex: 9999,
//   display: 'none'
// });
// document.body.appendChild(msg);

// function showMessage(duration = 2000) {
//   msg.style.display = 'block';
//   setTimeout(() => { msg.style.display = 'none'; }, duration);
// }

function scrollToPage(index) {
  isScrolling = true;
  pages[index].scrollIntoView({ behavior: 'smooth' });
  currentIndex = index;

  visitedPages.add(index);

  if (!visitedPages.has(index)) {
    setTimeout(() => { isScrolling = false; }, SCROLL_COOLDOWN);
  } else {
    isScrolling = false;
  }
}

// WHELL SCROLL MAINLY FOR PC
container.addEventListener('wheel', (e) => {
  if (Math.abs(e.deltaY) < WHEEL_THRESHOLD){
    e.preventDefault();
    return;
  }

  const now = Date.now();

  // THIS LOGIC HANDLES THE SCROLL ON VISITED PAGES = 1sec
  const nextIndex = e.deltaY > 0 ? currentIndex + 1 : currentIndex - 1;
  if (nextIndex >= 0 && nextIndex < pages.length && visitedPages.has(nextIndex)) {
    if (isScrolling) return;

    scrollToPage(nextIndex);

    isScrolling = true;
    setTimeout(() => {
      isScrolling = false;
    }, 1000);

    return;
  }

  // THIS LOGIC HANDLES THE SCROLL ON NEW PAGES = 5sec
  if (isScrolling || now - lastScrollTime < SCROLL_COOLDOWN) {
    e.preventDefault();
    return;
  }

  e.preventDefault();
  lastScrollTime = now;

  if (e.deltaY > 0 && currentIndex < pages.length - 1) scrollToPage(currentIndex + 1);
  if (e.deltaY < 0 && currentIndex > 0) scrollToPage(currentIndex - 1);
});














// TOUCH SCROLL FOR PHONES
let startY = 0;

container.addEventListener('touchstart', (e) => {
  startY = e.touches[0].clientY;
}, { passive: true });

container.addEventListener('touchend', (e) => {
  const endY = e.changedTouches[0].clientY;
  const diff = startY - endY;

  if (Math.abs(diff) < 50) return; // ignore small swipes

  const now = Date.now();
  const nextIndex = diff > 0 ? currentIndex + 1 : currentIndex - 1;

  if (nextIndex < 0 || nextIndex >= pages.length) return;

  // If page already visited, apply short cooldown
  if (visitedPages.has(nextIndex)) {
    if (isScrolling) return; // prevent infinite scrolling

    scrollToPage(nextIndex);

    // Start short cooldown for 1s
    isScrolling = true;
    setTimeout(() => { isScrolling = false; }, 1000);

    return;
  }

  // Normal cooldown logic for new pages
  if (isScrolling || now - lastScrollTime < SCROLL_COOLDOWN) return;

  lastScrollTime = now;
  scrollToPage(nextIndex);
});
