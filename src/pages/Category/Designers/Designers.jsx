// src/pages/Category/Designers/Designers.jsx
import React, { useRef, useEffect, useState } from 'react';
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
  const innerRef     = useRef(null);
  const heroRef      = useRef(null);
  const videoRef     = useRef(null);
  const infoRef      = useRef(null);
  const detailsRef   = useRef(null);
  const [scrolling,setScrolling] = useState(0)
  useEffect(() => {
    // 1) Pin & scrub through all sections exactly as before
    const sections = gsap.utils.toArray('.onepage-section');
    const total    = sections.length;

    gsap.to(innerRef.current, {
      yPercent: -100 * (total - 1),
      ease:     'none',
      scrollTrigger: {
        id:            'main',
        scroller:      containerRef.current,
        trigger:       innerRef.current,
        start:         'top top',
        end:           () => `+=${window.innerHeight * (total - 1)}`,
        scrub:         1,
        pin:           true,
        anticipatePin: 1,
      },
    });

    // 2) No more IntersectionObserver for header classes—PageHeader handles it
    //    (We simply leave data-nav-style on each section and let PageHeader read it.)

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      // no observer to disconnect
    };
  }, []);

  // 3) Helper to jump to a given ref‐section stays the same
  const scrollToSection = ref => {
    setScrolling(pre=>pre+1)
    const idx = [heroRef, videoRef, infoRef, detailsRef].findIndex(r => r === ref);
    if (idx >= 0) {
      gsap.to(containerRef.current, {
        duration: 1,
        ease:     'power2.out',
        scrollTo: { y: window.innerHeight * idx, autoKill: false }
      });
    }
  };

  return (
    <div className="onepage-container" ref={containerRef}>
      <div className="inner" ref={innerRef}>

        {/* ───────── Hero (full-light header) ───────── */}
        <section
          ref={heroRef}
          className="onepage-section"
          data-nav-style="full-light"
        >
          <ProductHeroSection
            onAddToCartClick={() => scrollToSection(videoRef)}
          />
        </section>

        {/* ───────── Video (full-light header) ───────── */}
        <section
          ref={videoRef}
          className="onepage-section"
          data-nav-style="full-light"
        >
          <ProductVideo
            // click → go to Details
            onAddToCartClick={() => scrollToSection(detailsRef)}
            // scroll up → go back to Hero
            onScrollUp={()       => scrollToSection(heroRef)}
            // scroll down → go to Info
            onScrollDown={()     => scrollToSection(infoRef)}
          />
        </section>

        {/* ───────── Info (full-dark header) ───────── */}
        <section
          ref={infoRef}
          className="onepage-section"
          data-nav-style="full-dark"
        >
          <ProductInfo
            onFirstPanelUp={()    => scrollToSection(videoRef)}
            onLastPanelDown={() => scrollToSection(detailsRef)}
            currentRef = {containerRef.current}
            scrolling={scrolling}
          />
        </section>

        {/* ───────── Details (full-dark header) ───────── */}
        <section
          id="productDetails"
          ref={detailsRef}
          className="onepage-section d-flex align-items-center justify-content-center position-relative"
          data-nav-style="full-dark"
        >
          <ProductDetails
            ref={detailsRef}
            onScrollUp={() => scrollToSection(infoRef)}
          />
        </section>

      </div>
    </div>
  );
}