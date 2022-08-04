import React from "react";
import PropTypes from "prop-types";
import { Button, Col, InputNumber, message, Row, Typography } from "antd";
import {
  LeftOutlined,
  CloseOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { formatprice } from "../../../common/formatprice";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrder,
  decreateCart,
  increateCart,
  removeAllCart,
  removeCart,
} from "../../../features/cartSlide";

const CartPage = (props) => {
  const { infoUser } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { carts } = useSelector((state) => state.carts);
  const onBack = () => {
    navigate(-1);
  };

  const onRemoveCart = (_id) => {
    dispatch(removeCart(_id));
    message.success("Xoá sản phẩm trong giỏ hàng thành công");
  };

  const onDecreateCart = (_id) => {
    dispatch(decreateCart(_id));
  };

  const onIncreateCart = (_id) => {
    dispatch(increateCart(_id));
  };

  let total = 0;

  if (carts && carts.length > 0) {
    carts.forEach((cart) => {
      total += cart.priceNew * cart.quantity;
    });
  }

  const onSubmitCart = () => {
    if (infoUser?.email) {
      const data = {
        userId: infoUser._id,
        listCart: carts.map((cart) => ({
          productId: cart._id,
          quantity: cart.quantity,
        })),
      };
      dispatch(addOrder(data)).then((res) => {
        if (res.payload) {
          message.success("Đặt hàng thành công");
          dispatch(removeAllCart());
        }
      });
    } else {
      message.error("vui lòng đăng nhập hoặc đăng ký để đặt hàng.");
      navigate("/login");
    }
  };

  return (
    <div className="container-cart">
      <Row className="mb-2">
        <Col span={8}>
          <div onClick={onBack} className="d-flex align-items-center cusou">
            <LeftOutlined />
            <Typography.Title level={4} className="m-0 ms-1 d-block">
              Trở về
            </Typography.Title>
          </div>
        </Col>
        <Col span={14}>
          <Typography.Title level={3} className=" m-0 ms-2">
            Giỏ hàng
          </Typography.Title>
        </Col>
      </Row>
      {carts &&
        carts.length > 0 &&
        carts.map((cart) => (
          <div key={cart._id} className="cart-wrapper">
            <div
              className="icon-remove cusou"
              onClick={() => onRemoveCart(cart._id)}
            >
              <CloseOutlined style={{ fontSize: 18 }} />
            </div>
            <Row>
              <Col span={4}>
                <img style={{ width: "100%" }} src={cart.image} />
              </Col>
              <Col span={2}></Col>
              <Col span={16} className="cart-right">
                <div className="d-flex align-items-center justify-content-between">
                  <Typography.Title level={4}>{cart.title}</Typography.Title>
                </div>
                <div className="d-flex align-items-center">
                  <Typography.Title
                    level={5}
                    className="d-block m-0 text-red me-2"
                  >
                    {formatprice(cart.priceNew)}
                  </Typography.Title>
                  <Typography.Title
                    level={5}
                    className="d-block m-0 me-2 text-decorate"
                  >
                    {formatprice(cart.priceOld)}
                  </Typography.Title>
                </div>
                <div className="d-flex align-items-center mt-2">
                  <Typography.Title level={5} className="d-block m-0 me-2">
                    Số lượng
                  </Typography.Title>
                  <div className="d-flex align-items-center">
                    <span
                      onClick={() => onDecreateCart(cart._id)}
                      className="btn-over-cart"
                    >
                      <MinusOutlined />
                    </span>
                    <InputNumber
                      max={10}
                      disabled={true}
                      value={cart.quantity}
                    />
                    <span
                      onClick={() => onIncreateCart(cart._id)}
                      className="btn-over-cart"
                    >
                      <PlusOutlined />
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        ))}
      {carts && carts.length > 0 && (
        <>
          <div className="d-flex mt-2 align-items-center justify-content-between">
            <Typography.Title level={5}>Tổng tiền tạm tính</Typography.Title>
            <Typography.Title className="text-red" level={5}>
              {formatprice(total)}
            </Typography.Title>
          </div>
          <div>
            <Button
              onClick={onSubmitCart}
              style={{ width: "100%", height: "40px" }}
              type="danger"
            >
              Tiến hành đặt hàng
            </Button>
          </div>
        </>
      )}
      {carts && carts.length === 0 && (
        <Typography.Title level={5} className="text-center mt-2 mb-2">
          Không có sản phẩm nào trong giỏ hàng
        </Typography.Title>
      )}
      <Link to="/">
        <Button style={{ width: "100%", height: "40px", marginTop: "10px" }}>
          Chọn thêm sản phẩm khác
        </Button>
      </Link>
    </div>
  );
};

CartPage.propTypes = {};

export default CartPage;
