import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProductVideo = React.forwardRef(({ onViewInfoClick }, ref) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: videoRef.current,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('Play interrupted:', err);
          });
        }
      },
      onEnterBack: () => {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('Play interrupted:', err);
          });
        }
      },
      onLeave: () => {
        videoRef.current.pause();
      },
      onLeaveBack: () => {
        videoRef.current.pause();
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section ref={ref} className="product-video-section">
      <video
        ref={videoRef}
        src="/products/designers/video/DesignersVideo.mp4"
        className="video-player"
        muted
        playsInline
        preload="auto"
      />
      <button className="view-info-btn" onClick={onViewInfoClick}>
        View Info
      </button>
    </section>
  );
});

export default ProductVideo;
