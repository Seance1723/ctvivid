import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProductVideo({ onAddToCartClick, onScrollUp, onScrollDown }) {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const touchStartY = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Stop FullSlider and other interfering components
  useEffect(() => {
    const stopInterferingComponents = () => {
      console.log('Stopping interfering components for video page');
      
      try {
        // Stop FullSlider
        if (window.FullSlider && window.FullSlider.getInstance) {
          const slider = window.FullSlider.getInstance();
          if (slider) {
            // Stop all slider functionality
            if (slider.stop) slider.stop();
            if (slider.hide) slider.hide(false);
            if (slider.scroller && slider.scroller.stop) slider.scroller.stop();
            
            // Disable the slider
            slider.enabled = false;
            slider.visible = false;
            slider.isShow = false;
            
            // Set alpha to 0
            if (window.FullSlider.alpha !== undefined) window.FullSlider.alpha = 0;
            
            console.log('FullSlider stopped successfully');
          }
        }
        
        // Stop any other global sliders
        if (window.slider) {
          if (window.slider.stop) window.slider.stop();
          if (window.slider.hide) window.slider.hide();
        }
        
        // Clear any slider-related timeouts
        if (window.sliderTimeout) {
          clearTimeout(window.sliderTimeout);
        }
        
        // Stop CircleSlider if it exists
        if (window.CircleSlider && window.CircleSlider.getInstance) {
          try {
            const circleSlider = window.CircleSlider.getInstance();
            if (circleSlider && circleSlider.hide) {
              circleSlider.hide();
            }
          } catch (e) {
            console.log('CircleSlider not found');
          }
        }
        
      } catch (error) {
        console.log('Some components not found or already stopped:', error);
      }
    };

    // Stop interfering components immediately
    stopInterferingComponents();
    
    // Also stop them after a delay to catch any late initializations
    setTimeout(stopInterferingComponents, 100);
    setTimeout(stopInterferingComponents, 500);

    return () => {
      // Cleanup function - you can restart components here if needed
      console.log('Video component unmounting');
    };
  }, []);

  // Smart aspect ratio calculation and perfect cropping
  useEffect(() => {
    const calculatePerfectCrop = () => {
      if (!videoRef.current || !sectionRef.current) return;
      
      const video = videoRef.current;
      const section = sectionRef.current;
      
      // Get screen dimensions
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const visualHeight = window.visualViewport ? window.visualViewport.height : screenHeight;
      const realHeight = Math.max(screenHeight, visualHeight);
      const screenAspectRatio = screenWidth / realHeight;
      
      console.log('Screen dimensions:', { screenWidth, realHeight, screenAspectRatio });
      
      // Update CSS custom property for viewport height
      document.documentElement.style.setProperty('--real-vh', `${realHeight}px`);
      
      // Set section dimensions
      section.style.width = `${screenWidth}px`;
      section.style.height = `${realHeight}px`;
      section.style.overflow = 'hidden';
      section.style.position = 'relative';
      section.style.background = 'black';
      
      // Wait for video metadata to calculate aspect ratio
      const handleVideoMetadata = () => {
        if (video.videoWidth && video.videoHeight) {
          const videoAspectRatio = video.videoWidth / video.videoHeight;
          
          console.log('Video dimensions:', { 
            videoWidth: video.videoWidth, 
            videoHeight: video.videoHeight, 
            videoAspectRatio 
          });
          
          // Calculate scale to ensure video covers screen perfectly
          let scale = 1;
          
          if (videoAspectRatio > screenAspectRatio) {
            // Video is wider than screen - scale based on height
            scale = realHeight / video.videoHeight;
          } else {
            // Video is taller than screen - scale based on width
            scale = screenWidth / video.videoWidth;
          }
          
          // Add a small buffer to ensure no gaps
          scale *= 1.02;
          
          console.log('Calculated scale:', scale);
          
          // Apply scale via CSS custom property
          document.documentElement.style.setProperty('--video-scale', scale.toString());
          
          // Force video to use calculated dimensions
          video.style.position = 'absolute';
          video.style.top = '50%';
          video.style.left = '50%';
          video.style.transform = `translate(-50%, -50%) scale(${scale})`;
          video.style.width = 'auto';
          video.style.height = 'auto';
          video.style.minWidth = '100vw';
          video.style.minHeight = `${realHeight}px`;
          video.style.objectFit = 'cover';
          video.style.objectPosition = 'center center';
          
          // Force autoplay
          video.play().catch(() => {
            console.log('Autoplay blocked, will try again on user interaction');
          });
        }
      };
      
      // Check if video metadata is already loaded
      if (video.readyState >= 1) {
        handleVideoMetadata();
      } else {
        video.addEventListener('loadedmetadata', handleVideoMetadata);
        video.addEventListener('canplay', handleVideoMetadata);
      }
    };

    // Execute calculation
    calculatePerfectCrop();
    
    // Recalculate on viewport changes
    const handleViewportChange = () => {
      setTimeout(calculatePerfectCrop, 100);
    };

    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('orientationchange', handleViewportChange);
    
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange);
    }

    return () => {
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('orientationchange', handleViewportChange);
      
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportChange);
      }
    };
  }, []);

  // Mobile slide navigation
  const goToSlide = (slideIndex) => {
    if (slideIndex >= 0 && slideIndex < totalSlides) {
      setCurrentSlide(slideIndex);
    }
  };

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onScrollDown?.();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else {
      onScrollUp?.();
    }
  };

  // Scroll handling
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const onWheel = (e) => {
      e.preventDefault();
      if (isMobile) {
        e.deltaY < 0 ? prevSlide() : nextSlide();
      } else {
        e.deltaY < 0 ? onScrollUp?.() : onScrollDown?.();
      }
    };

    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      const deltaY = touchStartY.current - e.touches[0].clientY;
      if (Math.abs(deltaY) < 30) return;
      if (isMobile) {
        deltaY > 0 ? nextSlide() : prevSlide();
      } else {
        deltaY > 0 ? onScrollDown?.() : onScrollUp?.();
      }
    };

    node.addEventListener('wheel', onWheel, { passive: false });
    node.addEventListener('touchstart', onTouchStart, { passive: true });
    node.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      node.removeEventListener('wheel', onWheel);
      node.removeEventListener('touchstart', onTouchStart);
      node.removeEventListener('touchmove', onTouchMove);
    };
  }, [onScrollUp, onScrollDown, isMobile, currentSlide]);

  // Enhanced autoplay and iOS prevention
  useEffect(() => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    video.loop = true;
    video.muted = true; // Essential for autoplay
    
    // Aggressive iOS inline playback enforcement
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x5-playsinline', 'true');
    
    // Remove all controls
    video.controls = false;
    video.setAttribute('controls', 'false');
    video.removeAttribute('controls');
    
    // Prevent picture-in-picture and remote playback
    video.disablePictureInPicture = true;
    video.disableRemotePlayback = true;
    
    // Force autoplay when video is ready
    const forceAutoplay = () => {
      video.play().catch((error) => {
        console.log('Autoplay failed:', error);
        // Try again after user interaction
        document.addEventListener('touchstart', () => {
          video.play().catch(() => {});
        }, { once: true });
      });
    };
    
    // Try autoplay on multiple events
    video.addEventListener('loadeddata', forceAutoplay);
    video.addEventListener('canplay', forceAutoplay);
    video.addEventListener('canplaythrough', forceAutoplay);
    
    // Force autoplay immediately if video is already loaded
    if (video.readyState >= 3) {
      forceAutoplay();
    }

    const trig = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        video.play().catch(() => {});
      },
      onEnterBack: () => {
        video.play().catch(() => {});
      },
      onLeave: () => {
        video.pause();
      },
      onLeaveBack: () => {
        video.pause();
      },
    });

    return () => trig.kill();
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = '9443310108';
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section 
      ref={sectionRef} 
      className="product-video-section"
    >
      <video
        ref={videoRef}
        src="/products/designers/video/DesignersVideo.mp4"
        className="video-player"
        muted
        playsInline
        autoPlay
        preload="auto"
        loop
        controls={false}
        disablePictureInPicture={true}
        disableRemotePlayback={true}
        webkit-playsinline="true"
        x5-playsinline="true"
        onLoadedData={() => {
          // Extra enforcement when video loads
          if (videoRef.current) {
            const video = videoRef.current;
            video.setAttribute('playsinline', 'true');
            video.setAttribute('webkit-playsinline', 'true');
            video.setAttribute('x5-playsinline', 'true');
            video.controls = false;
            video.removeAttribute('controls');
          }
        }}
        style={{
          WebkitUserSelect: 'none',
          userSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitTapHighlightColor: 'transparent'
        }}
      />
      <button
        type="button"
        className="cta cta-addToCart right_bottom"
        onClick={handleWhatsAppClick}
      >
        Contact Us
      </button>
    </section>
  );
}