import React from "react";
import PropTypes from "prop-types";
import "./style.css";
const ProductImage = (props) => {
  const { image } = props;
  return (
    <div className="wrapper-image">
      <img src={image} className="img-responsive image-border" alt="Image" />
      <div className="d-flex align-items-center justify-content-between img-bottom-wrapper">
        <img
          src="https://cdn2.cellphones.com.vn/50x/media/catalog/product/p/m/pms_1655902524.25473594_1_1.png"
          className="image-border2"
          alt="Image"
        />
        <img
          src="https://cdn2.cellphones.com.vn/50x/media/catalog/product/p/m/pms_1655902524.25473594_1_1.png"
          className="image-border2"
          alt="Image"
        />
        <img
          src="https://cdn2.cellphones.com.vn/50x/media/catalog/product/p/m/pms_1655902524.25473594_1_1.png"
          className="image-border2"
          alt="Image"
        />
        <img
          src="https://cdn2.cellphones.com.vn/50x/media/catalog/product/p/m/pms_1655902524.25473594_1_1.png"
          className="image-border2"
          alt="Image"
        />
        <img
          src="https://cdn2.cellphones.com.vn/50x/media/catalog/product/p/m/pms_1655902524.25473594_1_1.png"
          className="image-border2"
          alt="Image"
        />
      </div>
      
    </div>
  );
};

ProductImage.propTypes = {};

export default ProductImage;
