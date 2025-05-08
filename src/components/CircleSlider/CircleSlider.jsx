import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CircleSlider.scss';

gsap.registerPlugin(ScrollTrigger);

const images = [
    '/products/designers/Designer_01.png',
    '/products/designers/Designer_02.png',
    '/products/designers/Designer_03.png',
    '/products/designers/Designer_04.png',
    '/products/designers/Designer_05.png',
    '/products/designers/Designer_06.png',
];

export default function CircleSlider() {
  const wrapper = useRef(null);
  const slider  = useRef(null);

  useEffect(() => {
    const slides = gsap.utils.toArray('.circle-slide');
    const count  = slides.length;
    const vw     = window.innerWidth;
    const radius = vw / (2 * Math.tan(Math.PI / count));

    // position each slide around a circle
    slides.forEach((el,i) =>
      gsap.set(el, {
        rotationY: (360/count)*i,
        z: -radius
      })
    );

    // scrub-driven rotation on scroll
    gsap.to(slider.current, {
      rotationY: -360 * 2,
      ease: 'none',
      scrollTrigger: {
        trigger:   wrapper.current,
        start:     'top top',
        end:       'bottom top',
        scrub:     1,
        pin:       true,
        anticipatePin: 1
      }
    });
  }, []);

  return (
    <div className="circle-slider-wrapper" ref={wrapper}>
      <div className="circle-slider" ref={slider}>
        {images.map((src,i) =>
          <div key={i} className="circle-slide">
            <img src={src} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}
