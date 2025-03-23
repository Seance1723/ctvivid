import React, { useRef } from 'react';
import ProductHeroSection from '../../../components/Templates/ProductSlide/ProductSlide';
import ProductVideo from '../../../components/Templates/ProductVideo/productVideo';
import ProductInfo from '../../../components/Templates/ProductInfo/ProductInfo';
import ProductDetails from '../../../components/Templates/ProductDetails/ProductDetails';

const Designers = () => {
  const videoRef = useRef(null);
  const infoRef = useRef(null);
  const detailsRef = useRef(null);

  const scrollTo = (ref) => {
    ref?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <ProductHeroSection onAddToCartClick={() => scrollTo(videoRef)} />
      <ProductVideo ref={videoRef} onViewInfoClick={() => scrollTo(infoRef)} />
      <ProductInfo ref={infoRef} onDetailsClick={() => scrollTo(detailsRef)} />
      <ProductDetails ref={detailsRef} />
    </>
  );
};

export default Designers;