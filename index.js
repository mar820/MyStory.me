pages = {
  intro: `
    <h1 class="text-4xl font-bold">Hello my name is Marinos</h1>
  `,

  expirience1: `
    <h1 class="text-4xl font-bold">My experiences...</h1>
  `,

  expirience2: `
    <h1 class="text-4xl font-bold">My experiences...</h1>
  `,

  educationAndTraining: `
    <h1 class="text-4xl font-bold">Education and Training</h1>
  `,

  hobbies: `
    <h1 class="text-4xl font-bold">Hobbies</h1>
  `,
}


const diffPages = document.getElementById('different-pages');

for (const key in pages) {
  const div = document.createElement('div');
  div.classList.add('h-screen');
  div.innerHTML = pages[key];
  diffPages.appendChild(div);
}









// This is for each section to change nicely like a book page?

let isScrolling = false;
const pagesDivs = diffPages.querySelectorAll('div');
let currentPage = 0;

diffPages.addEventListener("wheel", (e) => {
  e.preventDefault(); // stop default scroll
  if (isScrolling) return;
  isScrolling = true;

  if (e.deltaY > 0 && currentPage < pagesDivs.length - 1) {
    currentPage++;
  } else if (e.deltaY < 0 && currentPage > 0) {
    currentPage--;
  }

  pagesDivs[currentPage].scrollIntoView({ behavior: 'smooth' });

  setTimeout(() => { isScrolling = false; }, 600);
}, { passive: false }); // must be passive: false to allow preventDefault

