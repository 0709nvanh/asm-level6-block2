import { Col, Modal, Row, Select, Table, Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { formatprice } from "../../../common/formatprice";
import { getOrderById } from "../../../features/cartSlide";
const { Title } = Typography;
const { Option } = Select;
const { confirm } = Modal;

const CartDetail = (props) => {
  const { order } = useSelector((state) => state.carts);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderById(id));
  }, []);
  const columns = [
    {
      title: "STT",
      dataIndex: "_id",
      key: "_id",
      render: (text, data, number) => number + 1
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productId",
      key: "title",
      render: (product, data) => <span className="m-0">{product.title}</span>
    },
    {
      title: "Giá sản phẩm",
      dataIndex: "productId",
      key: "priceNew",
      render: (product, data) => (
        <span className="m-0">{formatprice(product?.priceNew)}</span>
      )
    },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "quantity",
      key: "quantity"
    },
    {
      title: "Thành tiền",
      dataIndex: "totalCart",
      key: "totalCart",
      render: (cart, data) => (
        <div className="m-0">
          {formatprice(Number(data.quantity) * Number(data.productId.priceNew))}
        </div>
      )
    }
  ];
  return (
    <>
      <Row className="align-items-center justify-content-between mb-2">
        <Col span={4}>
          <Title level={3}>Chi tiết đơn hàng</Title>
        </Col>
      </Row>
      <Table columns={columns} dataSource={order?.listCart} />
    </>
  );
};

CartDetail.propTypes = {};

export default CartDetail;
