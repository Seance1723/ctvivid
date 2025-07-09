// src/components/Templates/ProductInfo/ProductInfo.jsx

import React, { useState, useEffect, useRef } from 'react';
import './ProductInfo.scss';

const highlightsDataDesktop = [
  {
    id: 'panel1',
    imageSrc: '/products/designers/vakra/vakra_01.png',
    dots: [
      {
        id: 'p1d1',
        xPercent: 48,
        yPercent: 64,
        lineXPercent: 48,
        lineYPercent: 64,
        lineLength: 410,
        lineDirection: 'right',
        title: 'Silhouette',
        description:
          'A figure-flattering silhouette that accentuates curves and elongates the frame, evoking a sense of mystery and allure.',
        thumbnail: '',
        contentSide: 'right',
        contentWidth: 210,
        contentXPercent: 66,
        contentYPercent: 58
      }
    ]
  },
  {
    id: 'panel2',
    imageSrc: '/products/designers/vakra/image2.jpg',
    dots: [
      {
        id: 'p2d1',
        xPercent: 52,
        yPercent: 48,
        lineXPercent: 52,
        lineYPercent: 48,
        lineLength: 300,
        lineDirection: 'right',
        title: '',
        description: '',
        thumbnail: '/products/designers/vakra/vakra_02_01.png',
        contentSide: 'left',
        contentWidth: 160,
        contentXPercent: 70,
        contentYPercent: 35
      },
      {
        id: 'p2d2',
        xPercent: 45,
        yPercent: 54,
        lineXPercent: 20.5,
        lineYPercent: 54,
        lineLength: 370,
        lineDirection: 'left',
        title: 'Bell Sleeves',
        description:
          'Exaggerated bell sleeves add a touch of drama and movement, capturing the eye with every gesture.',
        thumbnail: '',
        contentSide: 'left',
        contentWidth: 280,
        contentXPercent: 20,
        contentYPercent: 48
      }
    ]
  },
  {
    id: 'panel3',
    imageSrc: '/products/designers/vakra/vakra_03.png',
    dots: [
      {
        id: 'p3d1',
        xPercent: 50,
        yPercent: 28,
        lineXPercent: 25,
        lineYPercent: 28,
        lineLength: 380,
        lineDirection: 'left',
        title: '',
        description: '',
        thumbnail: '/products/designers/vakra/vakra_03_01.png',
        contentSide: 'right',
        contentWidth: 160,
        contentXPercent: 16,
        contentYPercent: 22
      },
      {
        id: 'p3d2',
        xPercent: 55,
        yPercent: 26,
        lineXPercent: 55,
        lineYPercent: 26,
        lineLength: 472,
        lineDirection: 'right',
        title: 'Skull Lace Neckline',
        description:
          'A unique and striking detail, the skull lace adorns the neckline, resembling the traditional Indian skull necklace, adding an edge of danger.',
        thumbnail: '',
        contentSide: 'left',
        contentWidth: 300,
        contentXPercent: 70,
        contentYPercent: 20
      }
    ]
  },
  {
    id: 'panel4',
    imageSrc: '/products/designers/vakra/vakra_03.png',
    dots: [
      {
        id: 'p4d1',
        xPercent: 54,
        yPercent: 60,
        lineXPercent: 54,
        lineYPercent: 60,
        lineLength: 290,
        lineDirection: 'right',
        title: '',
        description: '',
        thumbnail: '/products/designers/vakra/vakra_03_02.png',
        contentSide: 'left',
        contentWidth: 210,
        contentXPercent: 72,
        contentYPercent: 42
      },
      {
        id: 'p4d2',
        xPercent: 46,
        yPercent: 64,
        lineXPercent: 15.5,
        lineYPercent: 64,
        lineLength: 460,
        lineDirection: 'left',
        title: 'Versatile Skirt',
        description:
          'The skirt is designed to be both bold and adaptable. It can be styled as a flowing, traditional garment or transformed into a more contemporary, indie look.',
        thumbnail: '',
        contentSide: 'right',
        contentWidth: 350,
        contentXPercent: 15,
        contentYPercent: 58
      }
    ]
  }
];

const highlightsDataMobile = [
  {
    id: 'panel1',
    imageSrc: '/products/designers/vakra/vakra_01.png',
    content: {
      title: 'Silhouette',
      description: 'A figure-flattering silhouette that accentuates curves and elongates the frame, evoking a sense of mystery and allure.',
      thumbnail: null
    }
  },
  {
    id: 'panel2',
    imageSrc: '/products/designers/vakra/image2.jpg',
    content: {
      title: 'Bell Sleeves',
      description: 'Exaggerated bell sleeves add a touch of drama and movement, captivating the eye with every gesture.',
      thumbnail: '/products/designers/vakra/vakra_02_01.png'
    }
  },
  {
    id: 'panel3',
    imageSrc: '/products/designers/vakra/vakra_03.png',
    content: {
      title: 'Skull Lace Neckline',
      description: 'A unique and striking detail, the skull lace adorns the neckline, resembling the traditional Indian skull necklace, adding an edge of danger.',
      thumbnail: '/products/designers/vakra/vakra_03_01.png'
    }
  },
  {
    id: 'panel4',
    imageSrc: '/products/designers/vakra/vakra_03.png',
    content: {
      title: 'Versatile Skirt',
      description: 'The skirt is designed to be both bold and adaptable. It can be styled as a flowing, traditional garment or transformed into a more contemporary, indie look.',
      thumbnail: '/products/designers/vakra/vakra_03_02.png'
    }
  }
];

export default function ProductInfo({
  onFirstPanelUp,
  onLastPanelDown,
  scrolling
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isModalOpen, setModalOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const prevIndex = useRef(0);
  const isAnimating = useRef(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const highlightsData = isMobile ? highlightsDataMobile : highlightsDataDesktop;

  const handleClick = () => {
    onLastPanelDown?.();
  };

  const handleExplore = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isModalOpen]);

  useEffect(() => {
    isAnimating.current = true;
    const timeout = setTimeout(() => {
      if (isAnimating.current) {
        isAnimating.current = false;
      }
    }, 1200);
    return () => clearTimeout(timeout);
  }, [index]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let aborted = false;
    let lastScrollTime = 0;
    let lastTouchTime = 0;
    const touchStartY = { current: 0 };

    const handler = (e) => {
      if (aborted) return;
      e.preventDefault();

      const now = Date.now();
      if (now - lastScrollTime < 1000) return;
      if (isAnimating.current) return;

      const d = e.deltaY;
      lastScrollTime = now;
      isAnimating.current = true;

      if (d > 0) {
        setIndex((i) => {
          if (i < highlightsData.length - 1) {
            return i + 1;
          } else {
            onLastPanelDown?.();
            isAnimating.current = false;
            return i;
          }
        });
      } else {
        setIndex((i) => {
          if (i > 0) {
            return i - 1;
          } else {
            onFirstPanelUp?.();
            isAnimating.current = false;
            return i;
          }
        });
      }
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const now = Date.now();
      if (now - lastTouchTime < 1000) return;
      if (isAnimating.current) return;

      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      if (Math.abs(deltaY) < 30) return;

      isAnimating.current = true;
      lastTouchTime = now;

      if (deltaY > 0) {
        setIndex((i) => {
          if (i < highlightsData.length - 1) {
            return i + 1;
          } else {
            onLastPanelDown?.();
            isAnimating.current = false;
            return i;
          }
        });
      } else {
        setIndex((i) => {
          if (i > 0) {
            return i - 1;
          } else {
            onFirstPanelUp?.();
            isAnimating.current = false;
            return i;
          }
        });
      }
    };

    el.addEventListener('wheel', handler, { passive: false });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      aborted = true;
      el.removeEventListener("wheel", handler);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  useEffect(() => {
    const slidesEls = containerRef.current.querySelectorAll('.slide');
    slidesEls[prevIndex.current]?.classList.remove('active');
    slidesEls[index]?.classList.add('active');
    prevIndex.current = index;
  }, [index]);

  const onTransitionEnd = () => {
    if (!isAnimating.current) return;
    isAnimating.current = false;
  };

  const renderDesktopSlide = (panel) => {
    return (
      <>
        {/* Background image */}
        <img src={panel.imageSrc} className="bg-image" alt="" />

        {/* Render each dot (and its line + content) */}
        {panel.dots.map(dot => {
          const {
            id,
            xPercent,
            yPercent,
            lineXPercent = xPercent,
            lineYPercent = yPercent,
            lineLength,
            lineDirection,
            title,
            description,
            thumbnail,
            contentSide,
            contentWidth,
            contentXPercent,
            contentYPercent
          } = dot;

          const hasContent = Boolean(title || description || thumbnail);

          // If line grows to the left, show content first, then line, then dot
          if (lineDirection === 'left') {
            return (
              <React.Fragment key={id}>
                {hasContent && (
                  <>
                    {/* --- Mobile: Separate Image Block --- */}
                    {isMobile && thumbnail && (
                      <div style={{ position: 'relative', width: '100%' }}>
                        <img
                          src={thumbnail}
                          alt=""
                          className="mobile-thumbnail"
                          style={{
                            width: '131px',
                            top: '43%',
                            left: '63%',
                            zIndex: 99,
                          }}
                        />
                      </div>
                    )}

                    {/* --- Common Text Content Block --- */}
                    <div 
                      className={`highlight-content ${contentSide}`}
                      style={{
                        width:  `${contentWidth}px`,
                        left: `${contentXPercent}%`,
                        top: isMobile ? '80%' : `${contentYPercent}%`,
                        position: 'absolute',
                        zIndex: 99,
                      }}
                    >
                      {/* Desktop: Render image inline with text */}
                      {!isMobile && thumbnail && <img src={thumbnail} alt="" />}
                      {title && <h4 style={isMobile ? { textAlign: 'center' } : {}}>{title}</h4>}
                      {description && <p>{description}</p>}
                    </div>
                  </>
                )}

                {/* Left‐growing line: right edge anchored at lineX%/lineY% */}
                <div
                  className="line left"
                  style={{
                    left: `${lineXPercent}%`,
                    top: `${lineYPercent}%`,
                    '--line-length': hasContent ? `${lineLength}px` : '0'
                  }}
                />

                {/* Dot at the center */}
                <div
                  className="dot"
                  style={{
                    left: `${xPercent}%`,
                    top: `${yPercent}%`
                  }}
                />
              </React.Fragment>
            );
          }

          // Otherwise (lineDirection === 'right'), show dot, then line, then content
          return (
            <React.Fragment key={id}>
              {/* Dot at the center */}
              <div
                className="dot"
                style={{
                  left: `${xPercent}%`,
                  top: `${yPercent}%`
                }}
              />

              {/* Right‐growing line: left edge anchored at lineX%/lineY% */}
              <div
                className="line right"
                style={{
                  left: `${lineXPercent}%`,
                  top: `${lineYPercent}%`,
                  '--line-length': hasContent ? `${lineLength}px` : '0'
                }}
              />

              {hasContent && (
                <div
                  className={`highlight-content ${contentSide}`}
                  style={{
                    width: `${contentWidth}px`,
                    left: `${contentXPercent}%`,
                    top: `${contentYPercent}%`,
                  }}
                >
                  {thumbnail && <img src={thumbnail} alt="" />}
                  {title && <h4 style={isMobile ? { textAlign: 'center' } : {}}>{title}</h4>}
                  {description && <p>{description}</p>}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </>
    );
  };

  const renderMobileSlide = (panel, panelIndex) => {
    const { content } = panel;
    const isLastPanel = panelIndex === highlightsData.length - 1;
    
    return (
      <div className="mobile-content-card">
        {/* Background Image - contained within card */}
        <img src={panel.imageSrc} className="bg-image" alt="" />
        
        {/* Mobile thumbnail overlay - positioned on right side over image */}
        {content?.thumbnail && (
          <div className="mobile-thumbnail-overlay">
            <img src={content.thumbnail} alt="" />
          </div>
        )}
        
        {/* Text content - positioned at bottom of card */}
        <div className="mobile-text-content">
          {content?.title && (
            <h2 className="mobile-title-animate">{content.title}</h2>
          )}
          {content?.description && (
            <p className="mobile-description-animate">{content.description}</p>
          )}
          
          {/* Buttons only on last panel */}
          {isLastPanel && (
            <div className="mobile-action-buttons">
              <button
                type="button"
                className="mobile-btn-outline"
                onClick={handleExplore}
              >
                Explore more
              </button>
              <button
                type="button"
                className="mobile-btn-filled"
                onClick={handleClick}
              >
                Add to cart
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="product-info-slider" ref={containerRef}>
      <div
        className="slides"
        style={{ transform: `translateY(-${index * 100}vh)` }}
        onTransitionEnd={onTransitionEnd}
      >
        {highlightsData.map((panel, i) => {
          const isFirst = i === 0;
          const isLast = i === highlightsData.length - 1;

          return (
            <div
              key={panel.id}
              className={`slide${isFirst ? ' first-panel' : ''}${isLast ? ' last-panel' : ''}`}
            >
              {isMobile ? renderMobileSlide(panel, i) : renderDesktopSlide(panel)}
            </div>
          );
        })}
      </div>

      {/* Desktop buttons */}
      {!isMobile && (
        <>
          <button
            type="button"
            className="cta cta-withArrowDark right_bottom"
            onClick={handleClick}
          >
            Add to Cart
          </button>

          {index === highlightsData.length - 1 && (
            <button
              type="button"
              className="cta cta-exploreMore left_bottom"
              onClick={handleExplore}
            >
              Explore More
            </button>
          )}
        </>
      )}

      {isModalOpen && (
        <>
          <div id="asuriModal" className="modal fade show" style={{ display: 'block', position: 'absolute' }} tabIndex="-1" role="dialog" aria-hidden="true">
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
                  <p>This is Vakra's Poochandi. This is Asuri.</p>
                  <p>No longer just a mother's cautionary tale, she stands before you now—confronting fear and desire. You do not merely fear her. You crave the danger she exudes with every step.</p>
                  <p>Delicate lace coils around her neck, studded with skulls—small, precise, like carnage worn as an afterthought. Crystals glint like fresh blood frozen mid-fall, suspended in the quiet aftermath of the kill. The air around her hangs heavy, thick with something slow and deliberate: the calm of a storm that has passed, its violence folded into something almost like grace.</p>
                  <p>Beyond the obvious, a chilling playfulness lingers—an apathetic intensity that dares you to look too long, too deep. If straying from the path is what delivers you to her, then so be it. She is a carnivorous bloom, offering exquisite beauty alongside the certainty of destruction.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}