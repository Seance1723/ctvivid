// JavaScript: Initialize SwiperJS slider
document.addEventListener("DOMContentLoaded", function () {
  // Select the swiper wrapper element
  var swiperWrapper = document.querySelector(
    ".swiper-container .swiper-wrapper"
  );

  // Clone the first slide to serve as a duplicate at the end to fill the gap
  var slides = document.querySelectorAll(".swiper-container .swiper-slide");
  if (slides.length) {
    var firstSlideClone = slides[0].cloneNode(true);
    // Optionally update attributes such as alt if needed
    firstSlideClone
      .querySelector("img")
      .setAttribute("alt", "Image 1 Duplicate");
    // Append the cloned slide to the end of the wrapper
    swiperWrapper.appendChild(firstSlideClone);
  }

  // (Optional) To fill a gap on the extreme left, you could also clone the last slide and insert it at the beginning:
  // var lastSlideClone = slides[slides.length - 1].cloneNode(true);
  // lastSlideClone.querySelector('img').setAttribute('alt', 'Last Image Duplicate');
  // swiperWrapper.insertBefore(lastSlideClone, slides[0]);

  // Initialize Swiper with free mode enabled for fractional scrolling
  var swiper = new Swiper(".swiper-container", {
    initialSlide: 3,
    centeredSlides: true,
    slidesPerView: "auto",
    spaceBetween: 0,
    speed: 1000,
    freeMode: true,
    loop: false,
    mousewheel: {
      thresholdDelta: 30
    },
    // Update Swiper after DOM manipulation to ensure it recognizes the added slide
    on: {
      setTranslate: function() {
        // Define a threshold (in pixels) for detecting when you're near an edge
        var threshold = 10;
        
        // Show the left duplicate if near the extreme left (translate is near 0)
        if (this.translate >= -threshold) {
          document.querySelector('.swiper-duplicate-left').classList.remove('d-none');
        } else {
          document.querySelector('.swiper-duplicate-left').classList.add('d-none');
        }
        
        // Show the right duplicate if near the extreme right.
        // this.maxTranslate is the maximum negative translate value.
        if (Math.abs(this.translate - this.maxTranslate) <= threshold) {
          document.querySelector('.swiper-duplicate-right').classList.remove('d-none');
        } else {
          document.querySelector('.swiper-duplicate-right').classList.add('d-none');
        }
      }
    },

    breakpoints: {
      // Responsive design, changing slidesPerView based on screen width Code by Amit Niranjan
      640: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 3
      },
      1024: {
        slidesPerView: 3
      }
    }
  });
});
