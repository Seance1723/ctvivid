// src/components/Templates/ProductVideo/ProductVideo.jsx

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function ProductVideo({ onAddToCartClick }) {
  const videoRef    = useRef(null);
  const sectionRef  = useRef(null);
  const isScrolling = useRef(false);

  // our helper: disable the main scrub while animating, then re-enable
  const scrollToSection = (secEl) => {
    if (!secEl) return;
    const mainST = ScrollTrigger.getById('main');
    mainST && mainST.disable();

    isScrolling.current = true;
    gsap.to(window, {
      duration: 1,
      ease: 'power2.out',
      scrollTo: { y: secEl, autoKill: false },
      onComplete: () => {
        mainST && mainST.enable();
        isScrolling.current = false;
      }
    });
  };

  // wheel only handled here: up = to prev section; down is swallowed
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const onWheel = (e) => {
      if (isScrolling.current) {
        e.preventDefault();
        return;
      }
      const parent = node.closest('.onepage-section');
      if (e.deltaY < 0) {
        // scroll up → prev
        e.preventDefault();
        const prev = parent?.previousElementSibling;
        if (prev) scrollToSection(prev);
      } else {
        // swallow any downward wheel
        e.preventDefault();
      }
    };

    node.addEventListener('wheel', onWheel, { passive: false });
    return () => node.removeEventListener('wheel', onWheel);
  }, []);

  // play/pause video as before
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.loop = true;

    const trig = ScrollTrigger.create({
      trigger:     sectionRef.current,
      start:       'top center',
      end:         'bottom center',
      onEnter:     () => videoRef.current.play().catch(() => {}),
      onEnterBack: () => videoRef.current.play().catch(() => {}),
      onLeave:     () => videoRef.current.pause(),
      onLeaveBack: () => videoRef.current.pause(),
    });
    return () => trig.kill();
  }, []);

  // Add to Cart now jumps to next section (and still calls parent)
  const handleClick = () => {
    const parent = sectionRef.current.closest('.onepage-section');
    const next   = parent?.nextElementSibling;
    scrollToSection(next);
    onAddToCartClick && onAddToCartClick();
  };

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
        onClick={handleClick}
      >
        Add to Cart
      </button>
    </section>
  );
}
