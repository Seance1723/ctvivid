// src/components/ProductVideo/ProductVideo.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const ProductVideo = ({ onAddToCartClick }) => {
  const videoRef   = useRef(null);
  const sectionRef = useRef(null);

  const handleAddToCart = () => {
    const nextSection = sectionRef.current?.nextElementSibling;
    if (nextSection) {
      gsap.to(window, {
        duration: 1,
        ease: 'power2.out',
        scrollTo: {
          y: nextSection,
          autoKill: false
        }
      });
    }
    // call the parent handler (which scrolls to ProductInfo)
    onAddToCartClick?.();
  };

  const handleScrollToInfo = () => {
    const sliderSection = sectionRef.current.closest('.onepage-section');
    if (!sliderSection) return;
    const sections = Array.from(document.querySelectorAll('.onepage-section'));
    const idx = sections.indexOf(sliderSection);
    if (idx !== -1 && idx < sections.length - 1) {
      const nextSection = sections[idx + 1];
      nextSection.scrollIntoView({ behavior: 'smooth' });
      // const vid = nextSection.querySelector('video');
      // if (vid) {
      //   vid.currentTime = 0;
      //   vid.play();
      // }
    }
  };

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.loop = true;

    const trigger = ScrollTrigger.create({
      trigger: videoRef.current,
      start:   'top center',
      end:     'bottom center',
      onEnter:     () => videoRef.current.play().catch(() => {}),
      onEnterBack: () => videoRef.current.play().catch(() => {}),
      onLeave:     () => videoRef.current.pause(),
      onLeaveBack: () => videoRef.current.pause(),
    });

    return () => trigger.kill();
  }, []);

  return (
    <section ref={sectionRef} className="product-video-section">
      <video
        ref={videoRef}
        src="/products/designers/video/DesignersVideo.mp4"
        className="video-player"
        muted
        playsInline
        preload="auto"
        loop
      />
      <button
        type="button"
        className="cta cta-addToCart right_bottom"
        onClick={handleScrollToInfo}
      >
        Add to Cart
      </button>
    </section>
  );
};

export default ProductVideo;
