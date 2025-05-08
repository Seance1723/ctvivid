// src/components/Templates/ProductInfo/ProductInfo.jsx

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './ProductInfo.scss';

const highlightsData = [
  {
    id: 'panel1',
    imageSrc: '/products/designers/vakra/vakra_01.png',
    dots: [
      {
        id: 'p1d1',
        xPercent: 20,
        yPercent: 30,
        title: 'Elegant Stitching',
        description: 'Precision hand-stitched seams.',
        thumbnail: '/products/highlight/thumb1.jpg',
        contentSide: 'right',
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
        thumbnail: '/products/highlight/vakra_02_01.jpg'
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
      }
    ]
  }
];

// Flatten panels → slides (one per dot)
const slides = highlightsData.flatMap(panel =>
  panel.dots.map(dot => ({
    ...dot,
    imageSrc: panel.imageSrc
  }))
);

export default function ProductInfo() {
  const [index, setIndex] = useState(0);
  const isAnimating     = useRef(false);
  const contentRefs     = useRef([]);
  const prevIndex       = useRef(0);

  // handle wheel → change index
  useEffect(() => {
    const onWheel = (e) => {
      if (isAnimating.current) return;
      const delta = e.deltaY;
      if (delta > 0 && index < slides.length - 1) {
        e.preventDefault();
        isAnimating.current = true;
        setIndex(i => i + 1);
      } else if (delta < 0 && index > 0) {
        e.preventDefault();
        isAnimating.current = true;
        setIndex(i => i - 1);
      }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [index]);

  // animate content on slide change
  useEffect(() => {
    const incoming  = contentRefs.current[index];
    const outgoing  = contentRefs.current[prevIndex.current];
    const direction = index > prevIndex.current ? 1 : -1;

    // zoom out outgoing
    if (outgoing) {
      gsap.to(outgoing, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in'
      });
    }

    // zoom in incoming
    if (incoming) {
      gsap.fromTo(incoming,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    }

    prevIndex.current = index;
  }, [index]);

  // reset animating flag after slide transition
  const onTransitionEnd = () => {
    isAnimating.current = false;
  };

  return (
    <div className="product-info-slider">
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

          return (
            <div className="slide" key={i}>
              <img src={imageSrc} className="bg-image" alt="" />

              <div
                className="dot"
                style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
              />

              {hasContent && (
                <div
                  className={`highlight-content ${contentSide}`}
                  style={{
                    left: contentSide === 'left' ? '5%' : '60%',
                    top: `${yPercent}%`
                  }}
                  ref={el => contentRefs.current[i] = el}
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
