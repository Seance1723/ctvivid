import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './highlights.scss';

gsap.registerPlugin(ScrollTrigger);

const hotspotsData = [
  {
    id: 1,
    x: '30%',      // horizontal position on image
    y: '20%',      // vertical position on image
    side: 'right', // 'left' or 'right' for text
    title: 'Silhouette',
    description: 'A figure-flattering curve that accentuates and elongates the frame.'
  },
  {
    id: 2,
    x: '70%',
    y: '35%',
    side: 'left',
    title: 'Texture',
    description: 'Intricate crocheted details for depth and dimension.'
  },
  {
    id: 3,
    x: '50%',
    y: '75%',
    side: 'right',
    title: 'Ruffles',
    description: 'Playful ruffles that add a touch of drama.'
  },
  // …etc
];

export default function ProductHighlights() {
  const containerRef = useRef();
  const itemsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${hotspotsData.length * window.innerHeight}`,
        pin: true,
        scrub: 0.5,
      }
    });

    hotspotsData.forEach((_, i) => {
      const el = itemsRef.current[i];
      tl.fromTo(el.querySelector('.marker'),
        { scale: 0, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out(1.7)' }
      )
      .fromTo(el.querySelector('.content'),
        { x: el.dataset.side === 'right' ? 50 : -50, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.5 },
        '<+0.2'
      )
      .to(el.querySelectorAll('.marker, .content'),
        { autoAlpha: 0, duration: 0.3 },
        '+=0.7'
      );
    });

    return () => ScrollTrigger.clear();
  }, []);

  return (
    <div className="product-highlights" ref={containerRef}>
      <img
        className="product-img"
        src="/products/designers/vakra/vakra.png"
        alt="Product"
      />

      {hotspotsData.map((hotspot, i) => (
        <div
          key={hotspot.id}
          className="hotspot-item"
          data-side={hotspot.side}
          ref={el => itemsRef.current[i] = el}
          style={{ top: hotspot.y, left: hotspot.x }}
        >
          <div className="marker" />
          <div className={`content ${hotspot.side}`}>
            <h3>{hotspot.title}</h3>
            <p>{hotspot.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
