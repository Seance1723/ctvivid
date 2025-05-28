// src/components/Templates/ProductDetails/ProductDetails.jsx
import React, { useEffect } from 'react';
import {
  IconStarFilled,
  IconStar,
  IconStarHalfFilled
} from '@tabler/icons-react';

const ProductDetails = React.forwardRef(({ onScrollUp }, ref) => {
  // catch wheel-up and call back to parent
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const handleWheel = (e) => {
      if (e.deltaY < 0) {
        e.preventDefault();
        onScrollUp?.();
      } else {
        // swallow downward scroll so it doesn't glitch
        e.preventDefault();
      }
    };
    node.addEventListener('wheel', handleWheel, { passive: false });
    return () => node.removeEventListener('wheel', handleWheel);
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
          <div className="product-images col-md-7 d-flex gap-3">
            <div className="thumbs d-flex flex-column gap-2">
              {/* Thumbnails */}
              <img
                src="/products/designers/productDetails/productThumb_01.png"
                alt="thumb1"
              />
              <img
                src="/products/designers/productDetails/productThumb_02.png"
                alt="thumb2"
              />
              <img
                src="/products/designers/productDetails/productThumb_03.png"
                alt="thumb3"
              />
              <img
                src="/products/designers/productDetails/productThumb_04.png"
                alt="thumb4"
              />
              <img
                src="/products/designers/productDetails/productThumb_05.png"
                alt="thumb5"
              />
            </div>
            <div className="main-image flex-grow-1">
              <img
                src="/products/designers/productDetails/thumbActive.jpg"
                alt="main"
                className="img-fluid"
              />
            </div>
          </div>

          {/* RIGHT COL */}
          <div className="product-intro-sec col-md-5">
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

            <div className="rating d-flex align-items-center gap-1">
              <IconStarFilled />
              <IconStarFilled />
              <IconStarFilled />
              <IconStarFilled />
              <IconStar />
            </div>

            <h6 className="mt-4">Size &amp; Fit</h6>

            <div className="d-flex gap-3 align-items-center mt-2">
              <select
                className="form-select input-qty"
                aria-label="Quantity Selection"
              >
                <option value="" selected>
                  Qty
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <select
                className="input-designs form-select"
                aria-label="Design Selection"
              >
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
    </section>
  );
});

export default ProductDetails;
