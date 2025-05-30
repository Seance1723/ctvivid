// src/components/Templates/ProductInfo/ProductInfo.jsx

import React, { useState, useEffect, useRef } from 'react';
import './ProductInfo.scss';

const highlightsData = [
  {
    id: 'panel1',
    imageSrc: '/products/designers/vakra/vakra_01.png',
    dots: [
      {
        id: 'p1d1',
        xPercent: 48,
        yPercent: 64,
        lineLength: 120,
        title: 'Silhouette',
        description:
          'A figure-flattering silhouette that accentuates curves and elongates the frame, evoking a sense of mystery and allure.',
        thumbnail: '',
        contentSide: 'right',
        contentXPercent: 70,
        contentYPercent: 60
      }
    ]
  },
  {
    id: 'panel2',
    imageSrc: '/products/designers/vakra/vakra_02.png',
    dots: [
      {
        id: 'p2d1',
        xPercent: 50,
        yPercent: 50,
        lineLength: 100,
        thumbnail: '/products/highlight/vakra_02_01.jpg',
        contentSide: 'right',
        contentXPercent: 60,
        contentYPercent: 45
      }
    ]
  },
  {
    id: 'panel3',
    imageSrc: '/products/designers/vakra/vakra_03.png',
    dots: [
      {
        id: 'p3d1',
        xPercent: 30,
        yPercent: 60,
        lineLength: 140,
        title: 'Premium Fabric',
        description: 'Silky soft, breathable fabric.',
        thumbnail: '/products/designers/vakra/vakra_03_01.png',
        contentSide: 'right',
        contentXPercent: 65,
        contentYPercent: 55
      },
      {
        id: 'p3d2',
        xPercent: 70,
        yPercent: 40,
        lineLength: 120,
        title: 'Artisan Embroidery',
        description: 'Handcrafted floral patterns.',
        thumbnail: '/products/designers/vakra/vakra_03_02.png',
        contentSide: 'left',
        contentXPercent: 20,
        contentYPercent: 35
      }
    ]
  }
];

// flatten to a single array of “slides”
const slides = highlightsData.flatMap(panel =>
  panel.dots.map(dot => ({ ...dot, imageSrc: panel.imageSrc }))
);

export default function ProductInfo({
  onFirstPanelUp,
  onLastPanelDown
}) {
  const [index, setIndex] = useState(0);
  const containerRef      = useRef(null);
  const prevIndex         = useRef(0);
  const isAnimating       = useRef(false);

  // wheel handler: scroll through slides or bubble out
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handler = e => {
      e.preventDefault();
      if (isAnimating.current) return;
      const d = e.deltaY;
      if (d > 0) {
        if (index < slides.length - 1) {
          isAnimating.current = true;
          setIndex(i => i + 1);
        } else {
          onLastPanelDown?.();
        }
      } else {
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

  // add/remove “active” class on the current slide
  useEffect(() => {
    const slidesEls = containerRef.current.querySelectorAll('.slide');
    slidesEls[prevIndex.current]?.classList.remove('active');
    slidesEls[index]?.classList.add('active');
    prevIndex.current = index;
  }, [index]);

  // re-enable wheel after the CSS transition
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
        {slides.map((s, i) => {
          const {
            imageSrc, xPercent, yPercent,
            lineLength,
            contentXPercent, contentYPercent, contentSide,
            title, description, thumbnail
          } = s;

          const hasContent = title || description || thumbnail;
          const isFirst    = i === 0;
          const isLast     = i === slides.length - 1;

          return (
            <div
              key={`${s.id}-${i}`}
              className={
                `slide` +
                (isFirst ? ' first-panel' : '') +
                (isLast  ? ' last-panel'  : '')
              }
            >
              <img src={imageSrc} className="bg-image" alt="" />

              <div
                className="dot"
                style={{
                  left: `${xPercent}%`,
                  top:  `${yPercent}%`
                }}
              />

              <div
                className="line"
                style={{
                  left:   `${xPercent}%`,
                  top:    `${yPercent}%`,
                  height: hasContent ? `${lineLength}px` : '0'
                }}
              />

              {hasContent && (
                <div
                  className={`highlight-content ${contentSide}`}
                  style={{
                    left: `${contentXPercent}%`,
                    top:  `${contentYPercent}%`
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