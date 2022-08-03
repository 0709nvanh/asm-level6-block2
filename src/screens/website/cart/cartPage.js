import React from "react";
import PropTypes from "prop-types";
import { Col, InputNumber, Row, Typography } from "antd";
import {
  LeftOutlined,
  CloseOutlined,
  MinusOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./style.css";
import { formatprice } from "../../../common/formatprice";

const CartPage = (props) => {
  const onChangeQuantity = () => {};
  return (
    <div className="container">
      <Row className="mb-2">
        <Col span={2}>
          <Link to="/" className="d-flex align-items-center">
            <LeftOutlined />
            <Typography.Title level={4} className="m-0 ms-1 d-block">
              Trở về
            </Typography.Title>
          </Link>
        </Col>
        <Col span={22}>
          <Typography.Title level={3} className="text-center m-0">
            Giỏ hàng
          </Typography.Title>
        </Col>
      </Row>
      <div className="cart-wrapper">
        <div className="icon-remove">
          <CloseOutlined style={{ fontSize: 18 }} />
        </div>
        <Row>
          <Col span={8}>
            <img
              style={{ width: "100%" }}
              src="https://cdn2.cellphones.com.vn/358x/media/catalog/product/8/0/800x800-1-640x640-5_2.png"
            />
          </Col>
          <Col span={16} className="cart-right">
            <div className="d-flex align-items-center justify-content-between">
              <Typography.Title level={4}>
                Samsung Galaxy S22-Đen
              </Typography.Title>
            </div>
            <div className="d-flex align-items-center">
              <Typography.Title level={5} className="d-block m-0 text-red me-2">
                {formatprice(12000000)}
              </Typography.Title>
              <Typography.Title
                level={5}
                className="d-block m-0 me-2 text-decorate"
              >
                {formatprice(12000000)}
              </Typography.Title>
            </div>
            <div className="d-flex align-items-center">
              <Typography.Title level={5} className="d-block m-0 me-2">
                Chọn số lượng
              </Typography.Title>
              <div className="d-flex align-items-center">
                <span className="btn-over-cart">
                  <MinusOutlined />
                </span>
                <InputNumber max={10} onChange={onChangeQuantity} />
                <span className="btn-over-cart">
                  <PlusOutlined />
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

CartPage.propTypes = {};

export default CartPage;
