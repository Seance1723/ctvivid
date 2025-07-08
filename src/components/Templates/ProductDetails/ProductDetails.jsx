// src/components/Templates/ProductDetails/ProductDetails.jsx

import React, { useEffect, useState } from 'react';
import {
  IconStarFilled,
  IconStar,
  IconStarHalfFilled
} from '@tabler/icons-react';

import Footer from '../../Footer/Footer';

const ProductDetails = React.forwardRef(({ onScrollUp }, ref) => {
  const [activeImage, setActiveImage] = useState('/products/designers/productDetails/thumbActive.jpg');

  const mobileImages = [
    '/products/designers/productDetails/thumbail_image_1_new.JPG',
    '/products/designers/productDetails/thumbnail_image_2_new.JPG',
    '/products/designers/productDetails/thumbnail_image_3_new.JPG',
    '/products/designers/productDetails/thumbail_image_1_new.JPG',
    '/products/designers/productDetails/thumbnail_image_5_new.jpg'
  ];

  const [mobileImageIndex, setMobileImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  const handleTouchEnd = (endX) => {
    if (touchStartX === null) return;
    const deltaX = touchStartX - endX;
    const threshold = 30;

    if (deltaX > threshold && mobileImageIndex < mobileImages.length - 1) {
      setMobileImageIndex(mobileImageIndex + 1); // swipe left
    } else if (deltaX < -threshold && mobileImageIndex > 0) {
      setMobileImageIndex(mobileImageIndex - 1); // swipe right
    }

    setTouchStartX(null); // reset
  };

  // ✅ Enhanced scroll detection for both desktop and mobile
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let touchStartY = 0;

    const handleWheel = (e) => {
      if (e.deltaY < 0) {
        e.preventDefault();
        onScrollUp?.();
      } else {
        e.preventDefault(); // swallow downward scroll
      }
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const deltaY = touchStartY - e.touches[0].clientY;
      if (deltaY < -30) {
        // Swipe down → Scroll up
        onScrollUp?.();
      }
    };

    node.addEventListener('wheel', handleWheel, { passive: false });
    node.addEventListener('touchstart', handleTouchStart, { passive: true });
    node.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      node.removeEventListener('wheel', handleWheel);
      node.removeEventListener('touchstart', handleTouchStart);
      node.removeEventListener('touchmove', handleTouchMove);
    };
  }, [ref, onScrollUp]);

  return (
    <section
      id="productDetails"
      ref={ref}
      className="product-details-section py-5"
    >
      <div className="container">
        <div className="row align-items-top">
          {/* LEFT COL */}
          <div className="product-images col-md-7 d-none d-md-flex gap-3">
            <div className="thumbs d-none d-md-flex flex-column gap-2">
              {/* Thumbnails */}
              <img
                src="/products/designers/productDetails/productThumb_01.png"
                alt="thumb1"
                onClick={() => setActiveImage('/products/designers/productDetails/thumbail_image_1_new.JPG')}
                className="thumbnail-clickable"
              />
              <img
                src="/products/designers/productDetails/productThumb_02.png"
                alt="thumb2"
                onClick={() => setActiveImage('/products/designers/productDetails/thumbnail_image_2_new.JPG')}
                className="thumbnail-clickable"
              />
              <img
                src="/products/designers/productDetails/productThumb_03.png"
                alt="thumb3"
                onClick={() => setActiveImage('/products/designers/productDetails/thumbnail_image_3_new.JPG')}
                className="thumbnail-clickable"
              />
              <img
                src="/products/designers/productDetails/productThumb_04.png"
                alt="thumb4"
                onClick={() => setActiveImage('/products/designers/productDetails/thumbnail_image_4_new.JPG')}
                className="thumbnail-clickable"
              />
              <img
                src="/products/designers/productDetails/productThumb_05.png"
                alt="thumb5"
                onClick={() => setActiveImage('/products/designers/productDetails/thumbnail_image_5_new.jpg')}
                className="thumbnail-clickable"
              />
            </div>
            <div className="main-image flex-grow-1">
              <img
                src={activeImage}
                alt="main"
                className="img-fluid"
              />
            </div>
          </div>

          {/* Mobile Image Slider */}
          <div className="d-block d-md-none mobile-slider">
            <div
              className="mobile-image-wrapper"
              onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
              onTouchEnd={(e) => handleTouchEnd(e.changedTouches[0].clientX)}
            >
              <img
                src={mobileImages[mobileImageIndex]}
                alt={`slide-${mobileImageIndex}`}
                className="img-fluid"
              />
            </div>

            {/* Dots */}
            <div className="dots text-center mt-2">
              {mobileImages.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === mobileImageIndex ? 'active' : ''}`}
                  onClick={() => setMobileImageIndex(index)}
                ></span>
              ))}
            </div>
          </div>

          {/* RIGHT COL */}
          <div className="product-intro-sec col-md-5">
            {/* Breadcrumb */}
            <p className="breadcrumb d-none d-md-block">
              <ul>
                <li>Designer</li>
                <li>Vakra</li>
                <li>Asuri</li>
              </ul>
            </p>
            <p className="breadcrumb d-block d-md-none" style={{ marginBottom: '2px' }}>
              Designer &gt;&gt; Vakra &gt;&gt; <span style={{ fontWeight: 500 }}>Asuri</span>
            </p>

            <h2 className="productName d-none d-md-block">ASURI – The Fierce Elegance</h2>
            <h2 className="productName d-block d-md-none" style={{ fontWeight: 500, marginBottom: '0px' }}>Asuri</h2>
            <p className="d-block d-md-none text-muted" style={{ fontSize: '14px', marginBottom: '4px' }}>
              Lorem Ipsum dolor et sum
            </p>

            <p className="text-muted productIntro d-none d-md-block">
              Unveil your inner goddess with ASURI, a designer statement piece
              that merges contemporary grace with traditional craftsmanship.
              Tailored from a luxurious silk-blend fabric, ASURI flows
              effortlessly with every step, featuring hand-embroidered details
              that whisper bold sophistication.
            </p>

            <div className="rating d-flex align-items-center gap-1 d-none d-md-flex">
              <IconStarFilled />
              <IconStarFilled />
              <IconStarFilled />
              <IconStarFilled />
              <IconStar />
            </div>

            <h6 className="mt-4 d-none d-md-block">Size &amp; Fit</h6>
            <h6 className="mt-4 d-block d-md-none">Size &amp; Fit Guide</h6>

            <div className="d-flex gap-3 align-items-center mt-2">
              <select className="form-select input-qty" aria-label="Quantity Selection">
                <option value="" defaultValue>Qty</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <select className="input-designs form-select" aria-label="Design Selection">
                <option>Design A</option>
                <option>Design B</option>
              </select>
            </div>

            <div className="mt-4 d-flex gap-3">
              <button className="cta cta-primary">Buy Now</button>
              <button className="cta cta-primary-outline">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      {/* Footer always visible at the bottom */}
      <Footer className="floating-footer pt-3 pb-2" />
    </section>
  );
});

export default ProductDetails;
