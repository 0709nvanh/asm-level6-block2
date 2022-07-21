import React from "react";
import { Carousel } from "antd";
import PropTypes from "prop-types";
import imgBanner from "../../../common/img/Rectangle.png";
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const imgResize = {
  objectFit: "cover",
};

const CarouselCusturm = (props) => {
  return (
    <Carousel autoplay>
      <div>
        <img
          style={{ objectFit: "cover", width: "100%" }}
          src={imgBanner}
          alt="Image"
        />
      </div>
      <div>
        <img
          style={{ objectFit: "cover", width: "100%" }}
          src={imgBanner}
          alt="Image"
        />
      </div>
      <div>
        <img
          style={{ objectFit: "cover", width: "100%" }}
          src={imgBanner}
          alt="Image"
        />
      </div>
      <div>
        <img
          style={{ objectFit: "cover", width: "100%" }}
          src={imgBanner}
          alt="Image"
        />
      </div>
    </Carousel>
  );
};

CarouselCusturm.propTypes = {};

export default CarouselCusturm;
