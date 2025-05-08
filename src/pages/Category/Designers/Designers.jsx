// src/pages/Category/Designers/Designers.jsx
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import ProductHeroSection from '../../../components/Templates/ProductSlide/ProductSlide';
import ProductVideo       from '../../../components/Templates/ProductVideo/productVideo';
import ProductInfo        from '../../../components/Templates/ProductInfo/ProductInfo';
import ProductDetails     from '../../../components/Templates/ProductDetails/ProductDetails';

import './Designers.scss';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Designers() {
  const containerRef = useRef(null);
  const heroRef      = useRef(null);
  const videoRef     = useRef(null);
  const infoRef      = useRef(null);
  const detailsRef   = useRef(null);

  // Pin & scrub through all sections
  useEffect(() => {
    const sections = gsap.utils.toArray('.onepage-section');
    const total    = sections.length;

    gsap.to('.inner', {
      yPercent: -100 * (total - 1),
      ease:     'none',
      scrollTrigger: {
        trigger:       containerRef.current,
        start:         'top top',
        end:           `+=${window.innerHeight * (total - 1)}`,
        scrub:         1,
        pin:           true,
        snap:          1 / (total - 1),
        anticipatePin: 1,
      },
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  // All your section refs in order
  const sections = [heroRef, videoRef, infoRef, detailsRef];

  // Scroll to section number `idx`
  const scrollToSection = (targetRef) => {
    const idx = sections.findIndex(r => r === targetRef);
    if (idx >= 0) {
      gsap.to(window, {
        duration: 1,
        ease:     'power2.out',
        scrollTo: { y: window.innerHeight * idx, autoKill: false }
      });
    }
  };

  return (
    <div className="onepage-container" ref={containerRef}>
      <div className="inner">
        <section ref={heroRef}  className="onepage-section">
          <ProductHeroSection
            onAddToCartClick={() => scrollToSection(videoRef)}
          />
        </section>

        <section ref={videoRef} className="onepage-section">
          <ProductVideo
            onAddToCartClick={() => scrollToSection(infoRef)}
          />
        </section>

        <section ref={infoRef}  className="onepage-section">
          <ProductInfo />
        </section>

        <section ref={detailsRef} className="onepage-section">
          <ProductDetails />
        </section>
      </div>
    </div>
  );
}
