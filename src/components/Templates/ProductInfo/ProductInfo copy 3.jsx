// src/components/Templates/ProductInfo/ProductInfo.jsx
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './ProductInfo.scss';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const highlightsData = [
  {
    id: 'panel1',
    imageSrc: '/products/designers/vakra/vakra_01.png',
    dots: [
      {
        id: 'p1d1',
        xPercent: 48,
        yPercent: 64,
        title: 'Silhouette',
        description:
          'A figure-flattering silhouette that accentuates curves and elongates the frame, evoking a sense of mystery and allure.',
        thumbnail: '',
        contentSide: 'right',
      },
    ],
  },
  {
    id: 'panel2',
    imageSrc: '/products/designers/vakra/vakra_02.png',
    dots: [
      {
        id: 'p2d1',
        xPercent: 50,
        yPercent: 50,
        thumbnail: '/products/highlight/vakra_02_01.jpg',
      },
    ],
  },
  {
    id: 'panel3',
    imageSrc: '/products/designers/vakra/vakra_03.png',
    dots: [
      {
        id: 'p3d1',
        xPercent: 30,
        yPercent: 60,
        title: 'Premium Fabric',
        description: 'Silky soft, breathable fabric.',
        thumbnail: '/products/designers/vakra/vakra_03_01.png',
        contentSide: 'right',
      },
      {
        id: 'p3d2',
        xPercent: 70,
        yPercent: 40,
        title: 'Artisan Embroidery',
        description: 'Handcrafted floral patterns.',
        thumbnail: '/products/designers/vakra/vakra_03_02.png',
        contentSide: 'left',
      },
    ],
  },
];

const slides = highlightsData.flatMap(panel =>
  panel.dots.map(dot => ({ ...dot, imageSrc: panel.imageSrc }))
);

export default function ProductInfo({
  onFirstPanelUp,
  onLastPanelDown,
}) {
  const [index, setIndex]     = useState(0);
  const containerRef          = useRef(null);
  const contentRefs           = useRef([]);
  const prevIndex             = useRef(0);
  const isAnimating           = useRef(false);

  // wheel handler
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handler = (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      if (isAnimating.current) return;

      const delta = e.deltaY;
      if (delta > 0) { // scroll down
        if (index < slides.length - 1) {
          isAnimating.current = true;
          setIndex(i => i + 1);
        } else {
          onLastPanelDown?.();
        }
      } else {        // scroll up
        if (index > 0) {
          isAnimating.current = true;
          setIndex(i => i - 1);
        } else {
          onFirstPanelUp?.();
        }
      }
    };

    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, [index, onFirstPanelUp, onLastPanelDown]);

  // pop-in/out animation
  useEffect(() => {
    const incoming = contentRefs.current[index];
    const outgoing = contentRefs.current[prevIndex.current];

    if (outgoing) {
      gsap.to(outgoing, {
        scale:   0,
        opacity: 0,
        duration: 0.5,
        ease:    'power2.in'
      });
    }
    if (incoming) {
      gsap.fromTo(incoming,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
    prevIndex.current = index;
  }, [index]);

  // once the CSS translateY completes, re-allow in-panel wheel
  const onTransitionEnd = () => {
    isAnimating.current = false;
  };

  return (
    <div className="product-info-slider" ref={containerRef}>
      <div
        className="slides"
        style={{ transform: `translateY(-${index * 100}vh)` }}
        onTransitionEnd={onTransitionEnd}
      >
        {slides.map((slide, i) => {
          const {
            imageSrc, xPercent, yPercent,
            title, description, thumbnail, contentSide
          } = slide;
          const hasContent = title || description || thumbnail;
          const isFirst    = i === 0;
          const isLast     = i === slides.length - 1;

          return (
            <div
              key={i}
              className={
                `slide` +
                (isFirst ? ' first-panel' : '') +
                (isLast  ? ' last-panel'  : '')
              }
            >
              <img src={imageSrc} className="bg-image" alt="" />
              <div
                className="dot"
                style={{ left:`${xPercent}%`, top:`${yPercent}%` }}
              />
              {hasContent && (
                <div
                  className={`highlight-content ${contentSide}`}
                  ref={el => contentRefs.current[i] = el}
                  style={{
                    left: contentSide === 'left' ? '5%' : '60%',
                    top:  `${yPercent}%`
                  }}
                >
                  {thumbnail   && <img src={thumbnail} alt="" />}
                  {title       && <h4>{title}</h4>}
                  {description && <p>{description}</p>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}