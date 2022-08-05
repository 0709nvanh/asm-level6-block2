import { SearchOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Table,
  Typography
} from "antd";
import React, { useEffect, useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatprice } from "../../../common/formatprice";
import { getListOrder, updateStatusOrder } from "../../../features/cartSlide";
import { searchProducts } from "../../../features/productSlide";
const { Title } = Typography;
const { Option } = Select;
const { confirm } = Modal;

const CartAdmin = (props) => {
  const [isPending, startTransition] = useTransition();
  const { orders } = useSelector((state) => state.carts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListOrder());
  }, []);
  const updateStatus = (status, _id) => {
    dispatch(updateStatusOrder({ status, _id }));
  };

  const showConfirm = (status, _id) => {
    confirm({
      title: "Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng không?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        updateStatus(status, _id);
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "_id",
      key: "_id",
      render: (text, data, number) => number + 1
    },
    {
      title: "Email khách hàng",
      dataIndex: "userId",
      key: "email",
      render: (user, data) => <span className="m-0">{user?.email}</span>
    },
    {
      title: "Số điện thoại",
      dataIndex: "userId",
      key: "phone",
      render: (user, data) => <span className="m-0">{user?.phone}</span>
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (price, data) => {
        let total = 0;
        if (data && data.listCart && data.listCart.length > 0) {
          data.listCart.forEach((item) => {
            total += Number(item.quantity) * Number(item?.productId?.priceNew);
          });
        }
        return <span className="m-0">{formatprice(total)}</span>;
      }
    },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "totalCart",
      key: "totalCart",
      render: (cart, data) => (
        <div className="m-0 text-center">{data.listCart.length}</div>
      )
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      key: "status",
      render: (status, data) => {
        if (status === 0) {
          return <Button disabled={true}>Chưa xác nhận</Button>;
        } else if (status === 1) {
          return (
            <Button onClick={() => showConfirm(2, data._id)}>
              Đã xác nhận, chuyển giao hàng
            </Button>
          );
        } else if (status === 2) {
          return (
            <Button disabled={true} type="primary" className="btn btn-primary">
              Đã chuyển giao hàng, chờ nhận hàng
            </Button>
          );
        } else if (status === 3) {
          return (
            <Button disabled={true} type="primary" className="btn btn-primary">
              Đã giao hàng, chờ xác nhận hoàn thành
            </Button>
          );
        } else if (status === 4) {
          return (
            <Button disabled={true} type="success" className="btn btn-success">
              Hoàn thành
            </Button>
          );
        } else {
          return (
            <Button disabled={true} type="danger">
              Đã hủy đơn hàng
            </Button>
          );
        }
      }
    },
    {
      title: "Xem chi tiết",
      key: "action",
      dataIndex: "path",
      render: (item, key) => (
        <Link to={"/admin/cart/" + key._id}>Xem chi tiết</Link>
      )
    }
  ];
  return (
    <>
      <Title className="text-center mt-2 mb-2" level={3}>
        Quản lý đơn hàng
      </Title>

      <Table columns={columns} dataSource={orders} />
    </>
  );
};

CartAdmin.propTypes = {};

export default CartAdmin;
