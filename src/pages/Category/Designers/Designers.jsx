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
  const innerRef     = useRef(null);
  const heroRef      = useRef(null);
  const videoRef     = useRef(null);
  const infoRef      = useRef(null);
  const detailsRef   = useRef(null);

  useEffect(() => {
    // 1) Pin & scrub through all sections
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

    // 2) IntersectionObserver to swap header classes
    const header   = document.querySelector('header');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio >= 0.5) {
            // read the desired nav style from data-nav-style
            const style = entry.target.getAttribute('data-nav-style');
            header.classList.remove('nav-dark', 'nav-light');
            if (style === 'nav-dark' || style === 'nav-light') {
              header.classList.add(style);
            }
          }
        });
      },
      {
        root:      containerRef.current,
        threshold: 0.5
      }
    );
    sections.forEach(sec => observer.observe(sec));

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      observer.disconnect();
    };
  }, []);

  // 3) Helper to jump to a given ref‐section
  const scrollToSection = ref => {
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
        <section ref={heroRef} className="onepage-section" data-nav-style="nav-light">
          <ProductHeroSection
            onAddToCartClick={() => scrollToSection(videoRef)}
          />
        </section>

        <section ref={videoRef} className="onepage-section" data-nav-style="nav-light">
          <ProductVideo
            onAddToCartClick={()    => scrollToSection(infoRef)}
            onScrollUp={()          => scrollToSection(heroRef)}
          />
        </section>

        <section ref={infoRef} className="onepage-section" data-nav-style="nav-dark">
          <ProductInfo
            onFirstPanelUp={()   => scrollToSection(videoRef)}
            onLastPanelDown={() => scrollToSection(detailsRef)}
          />
        </section>

        <section ref={detailsRef} className="onepage-section d-flex align-items-center justify-content-center" data-nav-style="nav-dark">
          <ProductDetails
            ref={detailsRef}
            onScrollUp={() => scrollToSection(infoRef)}
          />
        </section>
      </div>
    </div>
  );
}