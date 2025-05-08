import React from 'react';

import ProductHeroSection from '../../../components/Templates/ProductSlide/ProductSlide';
import ProductVideo from '../../../components/Templates/ProductVideo/productVideo';
import ProductInfo from '../../../components/Templates/ProductInfo/ProductInfo';
import ProductDetails from '../../../components/Templates/ProductDetails/ProductDetails';

const Designers = () => {
  return (
    <div className="designers-wrapper">
      <section className="designer-section">
        <ProductHeroSection />
      </section>
      <section className="designer-section">
        <ProductVideo />
      </section>
      <section className="designer-section">
        <ProductInfo />
      </section>
      <section className="designer-section">
        <ProductDetails />
      </section>
    </div>
  );
};

export default Designers;
