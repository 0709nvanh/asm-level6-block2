import React from "react";
import PropTypes from "prop-types";
import { Row, Typography } from "antd";
import AccessoryComponent from "../../../components/accessory/AccessoryComponent";
const listAccess = [
  {
    id: 1,
    title: "Nổi bật",
    image:
      "https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-1644.svg",
    background: "rgb(255, 163, 163)",
  },
  {
    id: 2,
    title: "Nổi bật",
    image:
      "https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-1644.svg",
    background: "rgb(255, 163, 163)",
  },
  
  
];
const Accessory = (props) => {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-1">
        <Typography.Title className="mt-2" level={3}>
          Phụ kiện
        </Typography.Title>
        <Typography.Title className="mt-2" level={5}>
          Xem tất cả
        </Typography.Title>
      </div>
      <Row>
        {listAccess &&
          listAccess?.length > 0 &&
          listAccess.map((item) => (
            <AccessoryComponent key={item.id} accessory={item} />
          ))}
      </Row>
    </div>
  );
};

Accessory.propTypes = {};

export default Accessory;
