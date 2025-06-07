// src/components/Templates/ProductSlide/Designer.jsx

import React, { useRef, useEffect, useState } from 'react';
import './ProductSlide.scss';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const productHeroImages = [
  '/products/designers/Designer_01.png',
  '/products/designers/Designer_02.png',
  '/products/designers/Designer_03.png',
  '/products/designers/Designer_04.png',
  '/products/designers/Designer_05.png',
  '/products/designers/Designer_06.png',
];

const taglines = [
  "What draws one to touch a burning flame?",
  "Dancing scarlet embers draw attention.",
  "A primal urge stirs within—to touch, to capture.",
  "Even as the searing heat radiates, the finger inches closer.",
  "The touch reveals the void, the nothingness.",
  "Phantom flames lick the burning flesh, a pretty lesson etched in pain.",
];

const clamp = (v, min, max) => (v < min ? min : v > max ? max : v);

export default function Designer() {
  const [isModalOpen, setModalOpen] = useState(false);
  const containerRef = useRef(null);
  const trackRef    = useRef(null);
  const tagRef      = useRef(null);

  const handleExplore = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDetails = () => {
    const sliderSection = containerRef.current.closest('.onepage-section');
    if (!sliderSection) return;
    const sections = Array.from(document.querySelectorAll('.onepage-section'));
    const idx = sections.indexOf(sliderSection);
    if (idx !== -1 && idx < sections.length - 1) {
      const nextSection = sections[idx + 1];

      // Animate current section sliding left and next section sliding in from right
      gsap.set(nextSection, { x: '100%' });
      const tl = gsap.timeline({
        onComplete: () => {
          // After animation, ensure next section's video plays
          const vid = nextSection.querySelector('video');
          if (vid) {
            vid.currentTime = 0;
            vid.play();
          }
        }
      });
      tl.to(sliderSection, {
        x: '-100%',
        duration: 0.5,
        ease: 'power2.in'
      });
      tl.to(nextSection, {
        x: '0%',
        duration: 0.5,
        ease: 'power2.out'
      }, '<');
    }
  };

  // ──────────── ADD THIS AT COMPONENT SCOPE ────────────
  const handleMouseClick = () => {
    const sliderSection = containerRef.current.closest('.onepage-section');
    if (!sliderSection) return;
    const sections = Array.from(document.querySelectorAll('.onepage-section'));
    const idx = sections.indexOf(sliderSection);
    if (idx !== -1 && idx < sections.length - 1) {
      sections[idx + 1].scrollIntoView({ behavior: 'smooth' });
    }
  };

  // add/remove body.modal-open when modal toggles
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isModalOpen]);

  useEffect(() => {
    const container    = containerRef.current;
    const track        = trackRef.current;
    const originals    = Array.from(track.children);
    const visibleCount = 3;
    const slideCount   = originals.length;
    // Ensure each slide is 50% of the viewport width
    const slideW       = window.innerWidth * 0.5;

    // infinite clones
    originals.slice(-visibleCount).forEach(s => {
      const c = s.cloneNode(true); c.classList.add('clone');
      track.insertBefore(c, track.firstChild);
    });
    originals.slice(0, visibleCount).forEach(s => {
      const c = s.cloneNode(true); c.classList.add('clone');
      track.appendChild(c);
    });

    // size & initial offset
    const slides     = Array.from(track.children);
    const totalCount = slides.length;
    gsap.set(track, { width: totalCount * slideW });
    slides.forEach(s => gsap.set(s, { width: slideW }));
    // Initial offset: half of last clone, full first, half of second
    const initialOffset = -(((visibleCount - 1) * slideW) + slideW / 2);
    gsap.set(track, { x: initialOffset });

    // wrap logic
    const rightThresh = -(visibleCount - 1) * slideW;
    const leftThresh  = -(visibleCount + slideCount - 1) * slideW;
    const wrapTrack = () => {
      const x = gsap.getProperty(track, 'x');
      if (x > rightThresh) gsap.set(track, { x: x - slideCount * slideW });
      else if (x < leftThresh) gsap.set(track, { x: x + slideCount * slideW });
    };

    // UPDATED ZOOM EFFECT
    const updateScale = () => {
      const viewportWidth = container.getBoundingClientRect().width;
      const slidesNow = Array.from(track.children);

      slidesNow.forEach(slide => {
        const img = slide.querySelector('img');
        const { left: c, right: d, width: w } = slide.getBoundingClientRect();
        let scale = 1;

        // Exiting to the left: c < 0 && d > 0
        if (c < 0 && d > 0) {
          const progress = clamp(-c / w, 0, 1);
          scale = 1 + 2 * progress; // 1 → 3 as slide leaves left
        }
        // Exiting to the right: c < viewport && d > viewport
        else if (c < viewportWidth && d > viewportWidth) {
          const progress = clamp((d - viewportWidth) / w, 0, 1);
          scale = 1 + 2 * progress; // 1 → 3 as slide leaves right
        }
        // Entering from the left: c < 0 && d > 0 (same as exiting left but reverse)
        else if (c < 0 && d > 0) {
          const progress = clamp((-c) / w, 0, 1);
          scale = 3 - 2 * progress; // 3 → 1 as slide enters from left
        }
        // Entering from the right: c < viewport && d > viewport (same as exiting right but reverse)
        else if (c < viewportWidth && d > viewportWidth) {
          const progress = clamp((d - viewportWidth) / w, 0, 1);
          scale = 3 - 2 * progress; // 3 → 1 as slide enters from right
        }

        gsap.set(img, { scale });
      });
    };

    // classes & taglines
    const updateTaglines = num => {
      const items = tagRef.current.children;
      Array.from(items).forEach(li => li.classList.remove('active'));
      const idx = (num - 1) % taglines.length;
      items[idx]?.classList.add('active');
    };
    const updateClasses = () => {
      const x     = gsap.getProperty(track, 'x');
      const raw   = -x / slideW;
      const leftI = Math.round(raw - 0.5);
      const prevI   = (leftI + totalCount) % totalCount;
      const activeI = (leftI + 1 + totalCount) % totalCount;
      const nextI   = (leftI + 2 + totalCount) % totalCount;
      slides.forEach(s => s.classList.remove('prev', 'active', 'next'));
      slides[prevI].classList.add('prev');
      slides[activeI].classList.add('active');
      slides[nextI].classList.add('next');
      const activeSlide = track.querySelector('.slide.active');
      const num = activeSlide?.dataset.slideNumber;
      if (num) updateTaglines(+num);
    };

    // Draggable
    const [draggable] = Draggable.create(track, {
      type: 'x',
      cursor: 'grab',
      onDrag:   () => { wrapTrack(); updateScale(); updateClasses(); },
      onRelease:() => { wrapTrack(); updateScale(); updateClasses(); }
    });

    // wheel scrolling
    track.onwheel = e => {
      e.preventDefault();
      const cur = gsap.getProperty(track, 'x');
      const tgt = cur - e.deltaY * 1.5;
      gsap.to(track, {
        x: tgt,
        duration: 0.3,
        ease: 'none',
        onUpdate: () => { wrapTrack(); updateScale(); updateClasses(); }
      });
    };

    // init
    updateScale(); updateClasses();

    return () => {
      track.onwheel = null;
      draggable.kill();
    };
  }, []);

  return (
    <>
      <div className="product-slide onepage-section position-relative" ref={containerRef}>
        <div className="tagline-container">
          <img className="brand_logo" src="/products/designers/vakra_logo.png" alt="Vakra Logo" />
          <ul className="taglines" ref={tagRef}>
            {taglines.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
          <button className="explore-more" onClick={handleExplore}>
            Explore More
          </button>
        </div>
        <button type="button" className="cta cta-outlineDefault right_bottom" onClick={handleExplore}>
          Product details
        </button>
        <div className="slide-track" ref={trackRef}>
          {productHeroImages.map((src, i) => (
            <div className="slide" key={i} data-slide-number={i + 1}>
              <img src={src} alt={`Designer ${i + 1}`} />
            </div>
          ))}
        </div>
        <div className="mouse" onClick={handleMouseClick}></div>
      </div>

      {isModalOpen && (
        <>
          <div id="asuriModal" className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
                <div className="modal-body">
                  <h5>Title: Asuri (Demoness)</h5>
                  <h5>Creator: Vakra</h5>
                  <h5>Year: 2024</h5>
                  <p className="mt-3">Poochandi—a nameless dread spun to terrorize wayward children. The story warps with every tongue that tells it, its true form lost to generations of terrified whispers.</p>
                  <p>This is Vakra’s Poochandi. This is Asuri.</p>
                  <p>No longer just a mother’s cautionary tale, she stands before you now—confronting fear and desire. You do not merely fear her. You crave the danger she exudes with every step.</p>
                  <p>Delicate lace coils around her neck, studded with skulls—small, precise, like carnage worn as an afterthought. Crystals glint like fresh blood frozen mid-fall, suspended in the quiet aftermath of the kill. The air around her hangs heavy, thick with something slow and deliberate: the calm of a storm that has passed, its violence folded into something almost like grace.</p>
                  <p>Beyond the obvious, a chilling playfulness lingers—an apathetic intensity that dares you to look too long, too deep. If straying from the path is what delivers you to her, then so be it. She is a carnivorous bloom, offering exquisite beauty alongside the certainty of destruction.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
}
