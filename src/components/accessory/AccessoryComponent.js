import React from "react";
import PropTypes from "prop-types";
import "./AccessoryComponent.css";
import { Link } from "react-router-dom";
import { Typography } from "antd";

const AccessoryComponent = (props) => {
  const { accessory } = props;
  return (
    <div
      className="item-categories-outer"
      style={{ backgroundColor: accessory.background }}
    >
      <Typography.Title className=" m-0 text-white " level={5}>
        {accessory.title}
      </Typography.Title>
      <img src={accessory.image} />
    </div>
  );
};

AccessoryComponent.propTypes = {
  accessory: PropTypes.object,
};

export default AccessoryComponent;
