// src/components/Templates/ProductSlide/Designer.jsx
import React, { useRef, useEffect, useState } from 'react';
import './ProductSlide.scss';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

// const productHeroImages = [
//   '/products/designers/Designer_01.png',
//   '/products/designers/Designer_02.png',
//   '/products/designers/Designer_03.png',
//   '/products/designers/Designer_04.png',
//   '/products/designers/Designer_05.png',
//   '/products/designers/Designer_06.png',
// ];

// const taglines = [
//   "The touch reveals the void, the nothingness.",
//   "Even as the searing heat radiates, the finger inches closer.",
//   "Phantom flames lick the burning flesh, a pretty lesson etched in pain.",
//   "A primal urge stirs within—to touch, to capture.",
//   "What draws one to touch a burning flame?",
//   "Dancing scarlet embers draw attention.",
// ];

const productHeroImages = [

    '/products/designers/Designer_05.png',
    '/products/designers/Designer_06.png',
    '/products/designers/Designer_04.png',
    '/products/designers/Designer_02.png',
  '/products/designers/Designer_01.png',
  '/products/designers/Designer_03.png',


  
];

const taglines = [
  "What draws one to touch a burning flame?",
  "Dancing scarlet embers draw attention.",
  "A primal urge stirs within—to touch, to capture.",
  "Even as the searing heat radiates, the finger inches closer.",
  "The touch reveals the void, the nothingness.",
  "Phantom flames lick the burning flesh, a pretty lesson etched in pain.",


];

const clamp = (v, min, max) => (v < min ? min : v > max ? max : v);

export default function Designer() {
  const [isModalOpen, setModalOpen] = useState(false);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const tagRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  // useEffect(() => {
  //   const checkMobile = () => {
  //     setIsMobile(window.innerWidth <= 768);
  //   };
    
  //   // Function to handle viewport height changes (mobile browser behavior)
  //   const setViewportHeight = () => {
  //     const vh = window.innerHeight * 0.01;
  //     document.documentElement.style.setProperty('--vh', `${vh}px`);
  //   };
    
  //   // Prevent page scrolling when component is active
  //   const preventScroll = (e) => {
  //     // Allow horizontal scrolling but prevent vertical
  //     if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
  //       e.preventDefault();
  //     }
  //   };
    
  //   // Prevent touch scrolling
  //   const preventTouchScroll = (e) => {
  //     // Only prevent if it's a vertical scroll
  //     if (e.touches.length === 1) {
  //       e.preventDefault();
  //     }
  //   };
    
  //   checkMobile();
  //   setViewportHeight();
    
  //   // Add body class to prevent scrolling
  //   document.body.classList.add('product-slide-active');
    
  //   // Add event listeners
  //   window.addEventListener('resize', checkMobile);
  //   window.addEventListener('resize', setViewportHeight);
  //   window.addEventListener('orientationchange', setViewportHeight);
  //   document.addEventListener('wheel', preventScroll, { passive: false });
  //   document.addEventListener('touchmove', preventTouchScroll, { passive: false });
    
  //   return () => {
  //     // Remove body class
  //     document.body.classList.remove('product-slide-active');
      
  //     // Remove event listeners
  //     window.removeEventListener('resize', checkMobile);
  //     window.removeEventListener('resize', setViewportHeight);
  //     window.removeEventListener('orientationchange', setViewportHeight);
  //     document.removeEventListener('wheel', preventScroll);
  //     document.removeEventListener('touchmove', preventTouchScroll);
  //   };
  // }, []);
  useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  // Function to handle viewport height changes (mobile browser behavior)
  const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  // Prevent vertical page scroll, but allow scroll inside modal
  const preventScroll = (e) => {
    const modal = document.querySelector('.modal.show');
    if (modal && modal.contains(e.target)) {
      return; // Allow scroll inside modal
    }

    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
    }
  };

  // Prevent touch scrolling on page, allow inside modal
  const preventTouchScroll = (e) => {
    const modal = document.querySelector('.modal.show');
    if (modal && modal.contains(e.target)) {
      return; // Allow touch scroll inside modal
    }

    if (e.touches.length === 1) {
      e.preventDefault();
    }
  };

  checkMobile();
  setViewportHeight();

  // Add body class to prevent scrolling
  document.body.classList.add('product-slide-active');

  // Add event listeners
  window.addEventListener('resize', checkMobile);
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', setViewportHeight);
  document.addEventListener('wheel', preventScroll, { passive: false });
  document.addEventListener('touchmove', preventTouchScroll, { passive: false });

  return () => {
    // Remove body class
    document.body.classList.remove('product-slide-active');

    // Remove event listeners
    window.removeEventListener('resize', checkMobile);
    window.removeEventListener('resize', setViewportHeight);
    window.removeEventListener('orientationchange', setViewportHeight);
    document.removeEventListener('wheel', preventScroll);
    document.removeEventListener('touchmove', preventTouchScroll);
  };
}, []);


  const handleExplore = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDetails = () => {
    const sliderSection = containerRef.current.closest('.onepage-section');
    if (!sliderSection) return;
    
    const sections = Array.from(document.querySelectorAll('.onepage-section'));
    const idx = sections.indexOf(sliderSection);
    
    if (idx !== -1 && idx < sections.length - 1) {
      const nextSection = sections[idx + 1];
      gsap.set(nextSection, { x: '100%' });
      
      const tl = gsap.timeline({
        onComplete: () => {
          const vid = nextSection.querySelector('video');
          if (vid) {
            vid.currentTime = 0;
            vid.play();
          }
        }
      });
      
      tl.to(sliderSection, {
        x: '-100%',
        duration: 0.5,
        ease: 'power2.in'
      });
      
      tl.to(nextSection, {
        x: '0%',
        duration: 0.5,
        ease: 'power2.out'
      }, '<');
    }
  };

  const handleMouseClick = () => {
    const sliderSection = containerRef.current.closest('.onepage-section');
    if (!sliderSection) return;
    
    const sections = Array.from(document.querySelectorAll('.onepage-section'));
    const idx = sections.indexOf(sliderSection);
    
    if (idx !== -1 && idx < sections.length - 1) {
      sections[idx + 1].scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Modal body class management
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isModalOpen]);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const originals = Array.from(track.children);
    const visibleCount = 3;
    const slideCount = originals.length;
    
    // Get current viewport width and calculate slide width responsively
    const getSlideWidth = () => {
      const viewportWidth = window.innerWidth;
      if (viewportWidth <= 480) {
        return viewportWidth * 0.8; // 80% on small mobile
      } else if (viewportWidth <= 768) {
        return viewportWidth * 0.7; // 70% on mobile
      } else if (viewportWidth <= 1024) {
        return viewportWidth * 0.6; // 60% on tablet
      } else {
        return viewportWidth * 0.5; // 50% on desktop
      }
    };

    let slideW = getSlideWidth();
    let currentDraggable = null;

    const initializeSlider = () => {
      // Clear existing clones
      const clones = track.querySelectorAll('.clone');
      clones.forEach(clone => clone.remove());

      // Get fresh original slides after cleanup
      const originalSlides = Array.from(track.children);
      const slideCount = originalSlides.length;

      // Create clones for infinite effect - more clones for smoother infinite scroll
      const cloneCount = Math.max(visibleCount, 2); // At least 2 clones on each side
      
      // Add clones at the beginning (last slides)
      originalSlides.slice(-cloneCount).forEach(s => {
        const c = s.cloneNode(true);
        c.classList.add('clone');
        c.classList.add('clone-start');
        track.insertBefore(c, track.firstChild);
      });
      
      // Add clones at the end (first slides)
      originalSlides.slice(0, cloneCount).forEach(s => {
        const c = s.cloneNode(true);
        c.classList.add('clone');
        c.classList.add('clone-end');
        track.appendChild(c);
      });

      // Update sizing
      const slides = Array.from(track.children);
      const totalCount = slides.length;
      
      gsap.set(track, { width: totalCount * slideW });
      slides.forEach(s => gsap.set(s, { width: slideW }));

      // Initial positioning - start at the first real slide (after start clones)
      const initialOffset = -(cloneCount * slideW);
      gsap.set(track, { x: initialOffset });

      // Update thresholds for infinite scrolling
      const rightThreshold = -(cloneCount - 1) * slideW; // When to wrap from right
      const leftThreshold = -(cloneCount + slideCount) * slideW; // When to wrap from left

      const wrapTrack = () => {
        const x = gsap.getProperty(track, 'x');
        
        // If we've scrolled too far right (past right threshold)
        if (x > rightThreshold) {
          const newX = x - slideCount * slideW;
          gsap.set(track, { x: newX });
        }
        // If we've scrolled too far left (past left threshold)  
        else if (x < leftThreshold) {
          const newX = x + slideCount * slideW;
          gsap.set(track, { x: newX });
        }
      };

      // Enhanced zoom effect with responsive considerations
      const updateScale = () => {
        const viewportWidth = container.getBoundingClientRect().width;
        const slidesNow = Array.from(track.children);
        
        slidesNow.forEach(slide => {
          const img = slide.querySelector('img');
          if (!img) return;
          
          const { left: c, right: d, width: w } = slide.getBoundingClientRect();
          let scale = 1;
          
          // Reduce scale effect on mobile for better performance
          const maxScale = window.innerWidth <= 768 ? 1.5 : 3;
          const scaleMultiplier = window.innerWidth <= 768 ? 0.5 : 2;
          
          if (c < 0 && d > 0) {
            const progress = clamp(-c / w, 0, 1);
            scale = 1 + scaleMultiplier * progress;
          } else if (c < viewportWidth && d > viewportWidth) {
            const progress = clamp((d - viewportWidth) / w, 0, 1);
            scale = 1 + scaleMultiplier * progress;
          }
          
          gsap.set(img, { scale: Math.min(scale, maxScale) });
        });
      };

      // Update taglines based on active slide
      const updateTaglines = num => {
        if (!tagRef.current) return;
        const items = tagRef.current.children;
        Array.from(items).forEach(li => li.classList.remove('active'));
        const idx = (num - 1) % taglines.length;
        if (items[idx]) {
          items[idx].classList.add('active');
        }
      };

      // Update classes and determine active slide
      const updateClasses = () => {
        const x = gsap.getProperty(track, 'x');
        const slidePosition = -x / slideW;
        
        // Calculate which slide should be active (accounting for clones)
        const activeIndex = Math.round(slidePosition) - cloneCount;
        const normalizedIndex = ((activeIndex % slideCount) + slideCount) % slideCount;
        
        // Remove all previous classes
        slides.forEach(s => s.classList.remove('prev', 'active', 'next'));
        
        // Find the actual active slide in the DOM
        const activeSlideIndex = Math.round(slidePosition);
        const prevSlideIndex = activeSlideIndex - 1;
        const nextSlideIndex = activeSlideIndex + 1;
        
        if (slides[prevSlideIndex]) slides[prevSlideIndex].classList.add('prev');
        if (slides[activeSlideIndex]) slides[activeSlideIndex].classList.add('active');
        if (slides[nextSlideIndex]) slides[nextSlideIndex].classList.add('next');
        
        // Update taglines based on the normalized index (original slide number)
        updateTaglines(normalizedIndex + 1);
      };

      // Initialize draggable with responsive sensitivity
      const dragSensitivity = window.innerWidth <= 768 ? 2 : 1.5;
      
      // Kill existing draggable if it exists
      if (currentDraggable) {
        currentDraggable.kill();
      }
      
      currentDraggable = Draggable.create(track, {
        type: 'x',
        cursor: 'grab',
        inertia: true, // Add inertia for smoother scrolling
        onDrag: () => {
          wrapTrack();
          updateScale();
          updateClasses();
        },
        onRelease: () => {
          wrapTrack();
          updateScale();
          updateClasses();
        },
        onThrowUpdate: () => {
          wrapTrack();
          updateScale();
          updateClasses();
        }
      })[0];

      // Enhanced wheel scrolling with touch support
      const handleWheel = (e) => {
        e.preventDefault();
        const cur = gsap.getProperty(track, 'x');
        const delta = e.deltaY || e.deltaX;
        const tgt = cur - delta * dragSensitivity;
        
        gsap.to(track, {
          x: tgt,
          duration: 0.3,
          ease: 'none',
          onUpdate: () => {
            wrapTrack();
            updateScale();
            updateClasses();
          },
          onComplete: () => {
            wrapTrack();
            updateScale();
            updateClasses();
          }
        });
      };

      // Touch events for mobile with improved infinite scroll
      let touchStartX = 0;
      let touchStartY = 0;
      let isTouchDragging = false;

      const handleTouchStart = (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isTouchDragging = false;
      };

      const handleTouchMove = (e) => {
        if (!touchStartX) return;
        
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const deltaX = touchStartX - touchX;
        const deltaY = touchStartY - touchY;
        
        // Only handle horizontal swipes
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
          e.preventDefault();
          isTouchDragging = true;
          
          const cur = gsap.getProperty(track, 'x');
          const tgt = cur - deltaX * 0.5;
          
          gsap.set(track, { x: tgt });
          wrapTrack();
          updateScale();
          updateClasses();
        }
      };

      const handleTouchEnd = (e) => {
        if (isTouchDragging) {
          // Add momentum/inertia effect
          const touchEndX = e.changedTouches[0].clientX;
          const deltaX = touchStartX - touchEndX;
          const velocity = Math.abs(deltaX) > 50 ? deltaX * 2 : 0;
          
          if (velocity !== 0) {
            const cur = gsap.getProperty(track, 'x');
            const tgt = cur - velocity;
            
            gsap.to(track, {
              x: tgt,
              duration: 0.5,
              ease: 'power2.out',
              onUpdate: () => {
                wrapTrack();
                updateScale();
                updateClasses();
              },
              onComplete: () => {
                wrapTrack();
                updateScale();
                updateClasses();
              }
            });
          }
        }
        
        touchStartX = 0;
        touchStartY = 0;
        isTouchDragging = false;
      };

      // Remove old event listeners
      track.removeEventListener('wheel', track._handleWheel);
      track.removeEventListener('touchstart', track._handleTouchStart);
      track.removeEventListener('touchmove', track._handleTouchMove);
      track.removeEventListener('touchend', track._handleTouchEnd);

      // Store references for cleanup
      track._handleWheel = handleWheel;
      track._handleTouchStart = handleTouchStart;
      track._handleTouchMove = handleTouchMove;
      track._handleTouchEnd = handleTouchEnd;

      // Add new event listeners
      track.addEventListener('wheel', handleWheel, { passive: false });
      track.addEventListener('touchstart', handleTouchStart, { passive: false });
      track.addEventListener('touchmove', handleTouchMove, { passive: false });
      track.addEventListener('touchend', handleTouchEnd, { passive: false });

      // Initialize
      updateScale();
      updateClasses();
    };

    // Handle resize
    const handleResize = () => {
      const newSlideW = getSlideWidth();
      if (newSlideW !== slideW) {
        slideW = newSlideW;
        initializeSlider();
      }
    };

    // Initialize slider
    initializeSlider();

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      // Remove event listeners
      if (track._handleWheel) {
        track.removeEventListener('wheel', track._handleWheel);
      }
      if (track._handleTouchStart) {
        track.removeEventListener('touchstart', track._handleTouchStart);
      }
      if (track._handleTouchMove) {
        track.removeEventListener('touchmove', track._handleTouchMove);
      }
      if (track._handleTouchEnd) {
        track.removeEventListener('touchend', track._handleTouchEnd);
      }
      
      // Kill draggable
      if (currentDraggable) {
        currentDraggable.kill();
      }
      
      // Remove resize listener
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="product-slide onepage-section position-relative" ref={containerRef}>
        <div className="tagline-container">
          <img className="brand_logo" src="/products/designers/vakra_logo.png" alt="Vakra Logo" />
          <ul className="taglines" ref={tagRef}>
            {taglines.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
          <button className="explore-more" onClick={handleExplore}>
            Explore More
          </button>
        </div>

        <button 
          type="button" 
          className="cta cta-outlineDefault right_bottom" 
          onClick={handleExplore} 
          style={{ display: 'none' }}
        >
          Product details
        </button>

        <div className="slide-track" ref={trackRef}>
          {productHeroImages.map((src, i) => (
            <div className="slide" key={i} data-slide-number={i + 1}>
              <img src={src} alt={`Designer ${i + 1}`} />
            </div>
          ))}
        </div>

        <div className="mouse" onClick={handleMouseClick}></div>
      </div>

      {isModalOpen && (
        <>
          <div 
            id="asuriModal" 
            className="modal fade show" 
            style={{ display: 'block' }} 
            tabIndex="-1" 
            role="dialog" 
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                {/* <button type="button" className="close" onClick={handleCloseModal}>
                  <span style={{ pointerEvents: 'none' }}>&times;</span>
                </button> */}
                <button type="button" className="close" onClick={handleCloseModal} aria-label="Close modal">
  &times;
</button>



                <div className="modal-body">
                  <h5>Title: Asuri (Demoness)</h5>
                  <h5>Creator: Vakra</h5>
                  <h5>Year: 2024</h5>
                  <p className="mt-3">
                    Poochandi—a nameless dread spun to terrorize wayward children. The story warps with every tongue that tells it, its true form lost to generations of terrified whispers.
                  </p>
                  <p>This is Vakra's Poochandi. This is Asuri.</p>
                  <p>
                    No longer just a mother's cautionary tale, she stands before you now—confronting fear and desire. You do not merely fear her. You crave the danger she exudes with every step.
                  </p>
                  <p>
                    Delicate lace coils around her neck, studded with skulls—small, precise, like carnage worn as an afterthought. Crystals glint like fresh blood frozen mid-fall, suspended in the quiet aftermath of the kill. The air around her hangs heavy, thick with something slow and deliberate: the calm of a storm that has passed, its violence folded into something almost like grace.
                  </p>
                  <p>
                    Beyond the obvious, a chilling playfulness lingers—an apathetic intensity that dares you to look too long, too deep. If straying from the path is what delivers you to her, then so be it. She is a carnivorous bloom, offering exquisite beauty alongside the certainty of destruction.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
}