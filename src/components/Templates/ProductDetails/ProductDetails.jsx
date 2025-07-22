// src/components/Templates/ProductDetails/ProductDetails.jsx
import React, { useEffect, useState } from 'react';
import {
  IconStarFilled,
  IconStar,
  IconStarHalfFilled
} from '@tabler/icons-react';
import Footer from '../../Footer/Footer';
import './ProductDetails.scss'; // Import the SCSS file

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
    <>
      <style jsx>{`
        /* Mobile-only styles for exact design copy */
        @media (max-width: 767px) {
          html {
            scroll-behavior: smooth;
            overflow-x: hidden;
          }

        /* Desktop button fixes */
        @media (min-width: 768px) {
          .product-intro-sec .mt-4.d-flex.gap-3 {
            display: flex !important;
            gap: 12px !important;
            width: 100% !important;
          }
          
          .cta {
            flex: 1 !important;
            display: inline-block !important;
            text-align: center !important;
            padding: 12px 20px !important;
            border-radius: 8px !important;
            font-size: 14px !important;
            font-weight: 500 !important;
            transition: all 0.3s ease !important;
            cursor: pointer !important;
            white-space: nowrap !important;
            box-sizing: border-box !important;
          }
          
          .cta-primary {
            background: #333 !important;
            color: white !important;
            border: 1px solid #333 !important;
            text-decoration: none !important;
          }
          
          .cta-primary:hover {
            background: #444 !important;
            color: white !important;
          }
          
          .cta-primary-outline {
            background: white !important;
            color: #333 !important;
            border: 1px solid #333 !important;
            text-decoration: none !important;
          }
          
          .cta-primary-outline:hover {
            background: #333 !important;
            color: white !important;
          }
        }

        /* Small phones - iPhone SE, etc */
        @media (max-width: 375px) and (max-height: 667px) {
          .mobile-hero-section {
            height: 40vh !important;
            max-height: 300px !important;
          }
          
          .mobile-content {
            padding: 12px 16px 12px !important;
          }
          
          .mobile-product-title {
            font-size: 22px !important;
          }
        }

        /* Standard phones - iPhone 12, etc */
        @media (min-width: 376px) and (max-width: 414px) {
          .mobile-hero-section {
            height: 42vh !important;
            max-height: 350px !important;
          }
        }

        /* Large phones - iPhone 12 Pro Max, etc */
        @media (min-width: 415px) and (max-width: 767px) {
          .mobile-hero-section {
            height: 45vh !important;
            // max-height: 400px !important;
          }
          
          // .mobile-content {
          //   padding: 20px 24px 20px !important;
          // }
        }

        /* Landscape orientation */
        @media (orientation: landscape) and (max-width: 767px) {
          .mobile-hero-section {
            height: 60vh !important;
            max-height: 350px !important;
          }
          
          .mobile-content {
            padding: 12px 20px 12px !important;
          }
          
          .mobile-rating {
            margin-bottom: 16px !important;
          }
          
          .mobile-size-title {
            margin-bottom: 10px !important;
          }
          
          .mobile-dropdowns {
            margin-bottom: 16px !important;
          }
        }

          body {
            overflow-x: hidden;
          }

          .product-details-section {
            padding: 0 !important;
            margin: -5px 0px 0px 0px !important;
          }

          .product-details-section .container {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
          }

          .product-details-section .container .row {
            margin: 0 !important;
          }

          .mobile-product-view {
            width: 100vw;
            min-height: 50vh;
            background: white;
            position: relative;
            overflow-x: hidden;
            display: flex;
            flex-direction: column;
            
          }

          /* Mobile Hero Section - Responsive height for all screens */
          .mobile-hero-section {
            width: 100vw;
            height: 45vh;
            max-height: 400px;
            min-height: 280px;
            position: relative;
            overflow: hidden;
          }

          .mobile-hero-container {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          .mobile-hero-image {
            width: 100%;
            height: 100%;
            position: relative;
          }

          .mobile-hero-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            display: block;
                    margin-top: 0px;
          }

          /* Brand Overlay - REMOVED */

          /* Mobile Dots - Bottom of image exactly like design */
          .mobile-dots {
            position: absolute;
            bottom: 16px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 6px;
            z-index: 10;
          }

          .mobile-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            transition: background 0.3s ease;
          }

          .mobile-dot.active {
            background: white;
          }

          .mobile-dot.filled {
            background: rgba(255, 255, 255, 0.8);
          }

          /* Scroll Indicator - REMOVED */

          /* Mobile Content Section */
          .mobile-content-section {
            width: 100vw;
            background: white;
            position: relative;
            flex: 1;
            // padding-bottom: 20px;
          }

          .mobile-content {
            padding: 6px 10px 8px 10px;;
            max-width: 100%;
          }

          /* Mobile Breadcrumb - exact match */
          .mobile-breadcrumb {
            font-size: 10px;
            color: #999;
            margin: 0 0 2px 0;
            font-weight: 400;
            
          }

          .breadcrumb-highlight {
            font-weight: 500;
            color: #333;
          }

          /* Mobile Product Title - exact match */
          .mobile-product-title {
            font-size: 14px;
            font-weight: 500;
            color: #333;
            margin: 0 0 0 0;
            line-height: 1.2;
          }

          /* Mobile Product Subtitle - exact match */
          .mobile-product-subtitle {
            font-size: 14px;
            color: #999;
            margin: 0 0 0 0;
            line-height: 1.4;
          }

          /* Mobile Rating - compact spacing */
          .mobile-rating {
            display: flex;
            align-items: center;
            gap: 4px;
            margin-bottom: 20px;
          }

          .mobile-stars {
            display: flex;
            gap: 2px;
          }

          .mobile-stars svg {
            width: 14px;
            height: 14px;
            color: #ddd;
          }

          .mobile-rating-text {
            font-size: 14px;
            color: #999;
            margin-left: 8px;
          }

          /* Mobile Size Title - compact spacing */
          .mobile-size-title {
            font-size: 12px;
            font-weight: 500;
            color: #333;
            margin-bottom: 4px;
          }

          /* Mobile Dropdowns - compact spacing */
          .mobile-dropdowns {
            display: flex;
            gap: 12px;
            margin-bottom: 10px;
          }

          .mobile-select {
            flex: 1;
            padding: 5px 5px;
            border: 1px solid #ddd;
            border-radius: 12px;
            font-size: 15px;
            color: #999;
            background: white;
            appearance: none;
            cursor: pointer;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
            background-position: right 16px center;
            background-repeat: no-repeat;
            background-size: 16px;
            padding-right: 48px;
            // min-height: 52px;
          }

          .mobile-select:focus {
            outline: none;
            border-color: #999;
          }

          /* Mobile Action Buttons - compact spacing */
          .mobile-buttons {
            display: flex;
            gap: 12px;
            margin-bottom: 0;
            padding: 0 4px;
          }

          .mobile-btn {
            flex: 1;
            padding: 5px 5px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            min-height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .mobile-btn-primary {
            background: #333;
            color: white;
          }

          .mobile-btn-primary:hover {
            background: #444;
            transform: translateY(-1px);
          }

          .mobile-btn-secondary {
            background: white;
            color: #333;
            border: 1px solid #333;
          }

          .mobile-btn-secondary:hover {
            background: #333;
            color: white;
            transform: translateY(-1px);
          }
            @media (max-width: 767px) {
  .floating-footer {
    position: absolute;
    bottom: 0;
    z-index: 1000;
    border-top: 1px solid #ccc;
    margin-top:0px;
  }

  // .mobile-content-section {
  //   padding-bottom: 70px; /* adjust for footer height */
  // }
}


          /* Mobile Footer Section - REMOVED */
        }
      `}</style>

      <section
        id="productDetails"
        ref={ref}
        className="product-details-section py-5"
      >
        <div className="container">
          <div className="row align-items-top">
            {/* LEFT COL - Desktop Only */}
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

            {/* RIGHT COL - Desktop Only */}
            <div className="product-intro-sec col-md-5 d-none d-md-block">
              {/* Breadcrumb */}
              <p className="breadcrumb">
                <ul>
                  <li>Designer</li>
                  <li>Vakra</li>
                  <li>Asuri</li>
                </ul>
              </p>

              <h2 className="productName">ASURI – The Fierce Elegance</h2>

              <p className="text-muted productIntro">
                Unveil your inner goddess with ASURI, a designer statement piece
                that merges contemporary grace with traditional craftsmanship.
                Tailored from a luxurious silk-blend fabric, ASURI flows
                effortlessly with every step, featuring hand-embroidered details
                that whisper bold sophistication.
              </p>

              {/* <div className="rating d-flex align-items-center gap-1">
                <IconStarFilled />
                <IconStarFilled />
                <IconStarFilled />
                <IconStarFilled />
                <IconStar />
              </div> */}

              {/* <h6 className="mt-4">Size &amp; Fit</h6> */}

              {/* <div className="d-flex gap-3 align-items-center mt-2">
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
              </div> */}

              {/* <div className="mt-4 d-flex gap-3" >
                <button className="cta cta-primary">Buy Now</button>
                <button className="cta cta-primary-outline">Add to Cart</button>
              </div> */}
              {/* <div className="mt-4 d-flex gap-3 flex-wrap">
                <button className="cta cta-primary">Buy Now</button>
                <button className="cta cta-primary-outline" style={{ marginLeft: '11.5%' }}>Add to Cart</button>
              </div> */}

              <div className="mt-4 d-flex gap-3 flex-wrap">
                <button className="cta cta-primary-outline" style={{ marginTop: '25px' }} >Contact Us</button>
              </div>
            



            </div>
          </div>
        </div>

        {/* Mobile View - Complete New Design with Smooth Scroll */}
        <div className="mobile-product-view d-block d-md-none">
          {/* Mobile Hero Section - Full Viewport */}
          <div className="mobile-hero-section" id="mobile-hero">
            <div className="mobile-hero-container">
              <div
                className="mobile-hero-image"
                onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
                onTouchEnd={(e) => handleTouchEnd(e.changedTouches[0].clientX)}
              >
                <img
                  src={mobileImages[mobileImageIndex]}
                  alt={`slide-${mobileImageIndex}`}
                />
                {/* VIVIDARA Brand Overlay - REMOVED */}
                <div className="mobile-dots">
                  {mobileImages.map((_, index) => (
                    <span
                      key={index}
                      className={`mobile-dot ${index === mobileImageIndex ? 'active' : index < mobileImageIndex ? 'filled' : ''}`}
                      onClick={() => setMobileImageIndex(index)}
                    ></span>
                  ))}
                </div>
                {/* Scroll Down Indicator - REMOVED */}
              </div>
            </div>
          </div>

          {/* Mobile Content Section */}
          <div className="mobile-content-section" id="mobile-content">
            <div className="mobile-content">
              {/* Mobile Breadcrumb */}
              {/* <p className="mobile-breadcrumb">
                Designer &gt;&gt; Vakra &gt;&gt; <span className="breadcrumb-highlight">Asuri</span>
              </p> */}

              {/* Mobile Product Info */}
              
              {/* <h1 className="mobile-product-title">Asuri</h1>
              <p className="mobile-product-subtitle">Lorem Ipsum dolor et sum</p> */}
              <div className="d-flex d-sm-block align-items-center gap-2">
  {/* <h1 className="mobile-product-title mb-0">Asuri</h1> */}
  {/* <p className="mobile-product-subtitle mb-0">Lorem Ipsum dolor et sum</p> */}
</div>


              {/* Mobile Rating */}
              {/* <div className="mobile-rating">
                <div className="mobile-stars">
                  <IconStarFilled />
                  <IconStarFilled />
                  <IconStarFilled />
                  <IconStarFilled />
                  <IconStarFilled />
                </div>
                <span className="mobile-rating-text">** Review</span>
              </div> */}
              <div className="mobile-rating d-none d-md-flex">
              <div className="mobile-stars">
                <IconStarFilled />
                <IconStarFilled />
                <IconStarFilled />
                <IconStarFilled />
                <IconStarFilled />
              </div>
              <span className="mobile-rating-text">** Review</span>
            </div>

              <p className="mobile-breadcrumb">
                Designer &gt;&gt; Vakra &gt;&gt; <span className="breadcrumb-highlight">Asuri</span>
              </p>
              <h2 className="productNameMobile">ASURI – The Fierce Elegance</h2>
                  <p className="productIntroMobile">
                Unveil your inner goddess with ASURI, a designer statement piece
                that merges contemporary grace with traditional craftsmanship.
                Tailored from a luxurious silk-blend fabric, ASURI flows
                effortlessly with every step, featuring hand-embroidered details
                that whisper bold sophistication.
              </p>

                <button className="mobile-btn1 mobile-btn-primary1">Contact Us</button>



              {/* Mobile Size & Fit */}
              {/* <h3 className="mobile-size-title">Size & Fit Guide</h3> */}
{/*               
              <div className="mobile-dropdowns">
                <select className="mobile-select">
                  <option>Qty</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
                <select className="mobile-select">
                  <option>Dropdown Placeholder</option>
                  <option>Design A</option>
                  <option>Design B</option>
                </select>
              </div> */}

              {/* Mobile Action Buttons */}
              {/* <div className="mobile-buttons">
                <button className="mobile-btn mobile-btn-primary">Buy Now</button>
                <button className="mobile-btn mobile-btn-secondary">Add to Cart</button>
              </div> */}
            </div>
          </div>
        </div>

        {/* Desktop Footer - REMOVED VIVIDARA */}
        <Footer className="floating-footer pt-3 pb-2" />
      </section>
    </>
  );
});

export default ProductDetails;