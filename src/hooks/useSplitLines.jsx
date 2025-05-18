// src/hooks/useSplitLines.js

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import your UMD build of SplitText
import SplitText from '../utils/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function useSplitLines(selector = '.split-lines') {
  useEffect(() => {
    // find all matching elements
    const elements = Array.from(document.querySelectorAll(selector));
    const splits = [];

    elements.forEach(el => {
      // if we’d previously split this element, revert it first
      if (el._splitInstance) {
        el._splitInstance.revert();
      }
      // split into lines
      const split = SplitText.create(el, { type: 'lines' });
      el._splitInstance = split;
      splits.push(split);

      // animate each line as it scrolls into view
      gsap.from(split.lines, {
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
        rotationX: -100,
        transformOrigin: '50% 50% -160px',
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.25,
      });
    });

    // cleanup on unmount or re-run
    return () => {
      splits.forEach(split => split.revert());
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [selector]);
}
