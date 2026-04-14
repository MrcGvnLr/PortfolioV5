// Wrap in a function to ensure elements are found
window.onload = () => {
  const slide = document.querySelector('.carousel-slide');
  const cards = document.querySelectorAll('.project-card');
  const nextBtn = document.querySelector('#nextBtn');
  const prevBtn = document.querySelector('#prevBtn');

  // Verify elements exist in console to debug
  if (!slide || !nextBtn || !prevBtn) {
    console.error("Carousel elements not found! Check your IDs/Classes.");
    return;
  }

  let counter = 0;

  function moveSlide() {
    // We calculate size INSIDE the function so it's always accurate
    const size = cards[0].offsetWidth; 
    slide.style.transform = `translateX(${-size * counter}px)`;
  }

  nextBtn.addEventListener('click', () => {
    counter = (counter >= cards.length - 1) ? 0 : counter + 1;
    moveSlide();
  });

  prevBtn.addEventListener('click', () => {
    counter = (counter <= 0) ? cards.length - 1 : counter - 1;
    moveSlide();
  });

  // Handle window resizing
  window.addEventListener('resize', moveSlide);
};