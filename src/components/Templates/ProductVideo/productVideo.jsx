// src/components/Templates/ProductVideo/ProductVideo.jsx

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProductVideo({ onAddToCartClick, onScrollUp }) {
  const videoRef   = useRef(null);
  const sectionRef = useRef(null);

  // wheel handler: up → call onScrollUp, swallow down
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const onWheel = e => {
      if (e.deltaY < 0) {
        e.preventDefault();
        onScrollUp?.();
      } else {
        e.preventDefault();
      }
    };

    node.addEventListener('wheel', onWheel, { passive: false });
    return () => node.removeEventListener('wheel', onWheel);
  }, [onScrollUp]);

  // video play/pause via ScrollTrigger
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.loop = true;

    const trig = ScrollTrigger.create({
      trigger:      sectionRef.current,
      start:        'top center',
      end:          'bottom center',
      onEnter:      () => videoRef.current.play().catch(() => {}),
      onEnterBack:  () => videoRef.current.play().catch(() => {}),
      onLeave:      () => videoRef.current.pause(),
      onLeaveBack:  () => videoRef.current.pause(),
    });
    return () => trig.kill();
  }, []);

  // clicking CTA only ever goes forward via the parent callback
  const handleClick = () => {
    onAddToCartClick?.();
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
