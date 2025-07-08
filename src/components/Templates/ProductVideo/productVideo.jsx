import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProductVideo({ onAddToCartClick, onScrollUp, onScrollDown }) {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const touchStartY = useRef(0);

  // 1️⃣ Set --vh and trigger layout update
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();

    // Trigger ScrollTrigger refresh after layout update
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    window.addEventListener('resize', () => {
      setVh();
      ScrollTrigger.refresh();
    });

    return () => {
      window.removeEventListener('resize', setVh);
    };
  }, []);

  // 2️⃣ Scroll up/down via wheel and touch
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const onWheel = (e) => {
      e.preventDefault();
      e.deltaY < 0 ? onScrollUp?.() : onScrollDown?.();
    };

    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      const deltaY = touchStartY.current - e.touches[0].clientY;
      if (Math.abs(deltaY) < 30) return;
      deltaY > 0 ? onScrollDown?.() : onScrollUp?.();
    };

    node.addEventListener('wheel', onWheel, { passive: false });
    node.addEventListener('touchstart', onTouchStart, { passive: true });
    node.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      node.removeEventListener('wheel', onWheel);
      node.removeEventListener('touchstart', onTouchStart);
      node.removeEventListener('touchmove', onTouchMove);
    };
  }, [onScrollUp, onScrollDown]);

  // 3️⃣ ScrollTrigger playback logic
  useEffect(() => {
    if (!videoRef.current) return;

    videoRef.current.loop = true;

    const trig = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => videoRef.current.play().catch(() => {}),
      onEnterBack: () => videoRef.current.play().catch(() => {}),
      onLeave: () => videoRef.current.pause(),
      onLeaveBack: () => videoRef.current.pause(),
    });

    return () => trig.kill();
  }, []);

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
        autoPlay
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
