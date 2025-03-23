import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Autoplay } from 'swiper/modules';

import 'swiper/css';

const productHeroImages = [
  '/products/designers/Designer_01.png',
  '/products/designers/Designer_02.png',
  '/products/designers/Designer_03.png',
  '/products/designers/Designer_04.png',
  '/products/designers/Designer_05.png',
  '/products/designers/Designer_06.png',
];

const ProductHeroSection = ({ onAddToCartClick }) => {
  const swiperRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [visibleSlides, setVisibleSlides] = useState([0, 1, 2]);

  const handleClick = (realIndex) => {
    if (!visibleSlides.includes(realIndex)) return;
    setExpandedIndex((prev) => (prev === realIndex ? null : realIndex));
  };

  const handleMouseEnter = () => swiperRef.current?.swiper?.autoplay?.stop();
  const handleMouseLeave = () => swiperRef.current?.swiper?.autoplay?.start();

  useEffect(() => {
    const updateVisibleSlides = () => {
      const current = swiperRef.current?.swiper?.realIndex || 0;
      setVisibleSlides([current, current + 1, current + 2]);
    };
    updateVisibleSlides();
    window.addEventListener('resize', updateVisibleSlides);
    return () => window.removeEventListener('resize', updateVisibleSlides);
  }, []);

  return (
    <section className="product-hero-section">
      <Swiper
        ref={swiperRef}
        modules={[Mousewheel, Autoplay]}
        grabCursor={true}
        slidesPerView={'auto'}
        spaceBetween={0}
        loop={true}
        loopedSlides={productHeroImages.length}
        speed={600}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        mousewheel={{ thresholdDelta: 30 }}
        className="hero-swiper"
        onSlideChange={(swiper) => {
          const i = swiper.realIndex;
          setExpandedIndex(null);
          setVisibleSlides([i, i + 1, i + 2]);
        }}
      >
        {productHeroImages.map((img, realIndex) => {
          const isExpanded = expandedIndex === realIndex;
          const isVisible = visibleSlides.includes(realIndex);

          let width = 'calc(100vw / 3)';
          if (isExpanded) {
            width = 'calc((100vw / 3) + 220px)';
          } else if (expandedIndex !== null && isVisible) {
            width = 'calc((100vw / 3) - 110px)';
          }

          return (
            <SwiperSlide
              key={realIndex}
              style={{ width }}
              className={`hero-slide ${isExpanded ? 'expanded' : ''}`}
              data-swiper-slide-index={realIndex}
              onClick={(e) => {
                const clickedRealIndex = parseInt(
                  e.currentTarget.dataset.swiperSlideIndex,
                  10
                );
                handleClick(clickedRealIndex);
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="slide-inner">
                <img src={img} alt={`Hero ${realIndex}`} className="hero-image" />
                {isExpanded && (
                  <button className="add-to-cart-btn" onClick={onAddToCartClick}>
                    Add to Cart
                  </button>
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default ProductHeroSection;