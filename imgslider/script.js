document.addEventListener("DOMContentLoaded", function() {
    const slider = document.querySelector('.slider');
    const images = document.querySelectorAll('.image');
    const leftArrow = document.querySelector('.arrow-left');
    const rightArrow = document.querySelector('.arrow-right');
  
    let currentIndex = 0;
  
    function updateSlider() {
      const offset = -(currentIndex * 600); 
      slider.style.transform = `translateX(${offset}px)`;
    }
  
    leftArrow.addEventListener('click', function() {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = images.length - 1; 
      }
      updateSlider();
    });
  
    rightArrow.addEventListener('click', function() {
      if (currentIndex < images.length - 1) {
        currentIndex++;
      } else {
        currentIndex = 0; 
      }
      updateSlider();
    });
  });
  