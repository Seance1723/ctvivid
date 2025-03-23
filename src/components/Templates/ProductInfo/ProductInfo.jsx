import React from 'react';

const ProductInfo = React.forwardRef(({ onDetailsClick }, ref) => {
  return (
    <section ref={ref} className="product-info-section">
      <div className="container text-center py-5 my-5">
        <h2>Product Info</h2>
        <button className="btn btn-dark mt-3" onClick={onDetailsClick}>
          Product Details
        </button>
      </div>
    </section>
  );
});

export default ProductInfo;
