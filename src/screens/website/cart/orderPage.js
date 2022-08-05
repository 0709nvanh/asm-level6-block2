import React, { useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Button, Modal, Typography } from "antd";
import { CloseOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import "./order.css";
import { formatprice } from "../../../common/formatprice";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByUser, updateStatusOrder } from "../../../features/cartSlide";
const { confirm } = Modal;
const OrderPage = (props) => {
  const dispatch = useDispatch();
  const { infoUser } = useSelector((state) => state.users);
  const { orders } = useSelector((state) => state.carts);

  useEffect(() => {
    dispatch(getOrderByUser(infoUser._id));
  }, [infoUser._id]);

  const renderTime = (time) => {
    return moment(new Date(time), "MM-DD-YYYY HH:mm", true).format(
      "DD-MM-YYYY HH:mm"
    );
  };

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

  const renderStatus = (_id, status) => {
    if (status === 0) {
      return (
        <div className="d-flex align-items-center">
          <Button type="primary" onClick={() => showConfirm(1, _id)}>Xác nhận đơn hàng</Button>
          <Button type="danger ms-2" onClick={() => showConfirm(5, _id)}>Hủy đơn hàng</Button>
        </div>
      );
    } else if (status === 1) {  
      return <Button disabled>Hàng đang được đóng và chờ shop chuyển giao hàng cho ship</Button>;
    } else if (status === 2) {
      return (
        <div className="d-flex align-items-center">
          <Button type="primary" disabled className="btn btn-primary">
            Đang giao hàng
          </Button>
          <Button onClick={() => showConfirm(3, _id)} type="primary" className="btn btn-primary ms-2">
            Xác nhận đã nhận hàng
          </Button>
        </div>
      );
    } else if (status === 3) {
      return (
        <div className="d-flex align-items-center">
          <Button type="primary" disabled className="btn btn-primary">
            Đã nhận hàng
          </Button>
          <Button onClick={() => showConfirm(4, _id)} type="primary" className="btn btn-primary ms-2">
            Xác nhận hoàn thành đơn hàng
          </Button>
        </div>
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
  };

  const renderTotal = (order) => {
    let total = 0;
    if(order && order?.listCart && order?.listCart.length > 0){
        order.listCart.forEach(product => {
            total += Number(product.productId.priceNew) * Number(product.quantity)
        });
    }
    return formatprice(total)
  };

  return (
    <div className="container">
      <Typography.Title level={4} className="mt-2 mb-2 text-center ">
        Thông tin đơn hàng
      </Typography.Title>
      <div>
        {orders &&
          orders.length > 0 &&
          orders.map((order) => (
            <div key={order._id} className="order-wrapper mb-2">
              <div className="order-item">
                <Typography.Title level={5}>
                  Đơn hàng ngày: {renderTime(order?.createdAt)}
                </Typography.Title>
                {order?.listCart &&
                  order.listCart.map((cart) => (
                    <div className="mt-2 d-flex align-items-center justify-content-between">
                      <div className="order-item-image">
                        <img width={100} src={cart?.productId?.image} />
                      </div>
                      <div>
                        <Typography.Title level={5} className="m-0">
                          Tên sản phẩm: {cart?.productId?.title}
                        </Typography.Title>
                        <Typography.Text level={5} className="m-0 mt-2 mb-2">
                          Danh mục: {cart?.productId?.category?.name}
                        </Typography.Text>
                      </div>
                      <div>
                        <Typography.Text className="d-block">
                          Giá 1 sản phẩm:{" "}
                          <Typography.Text className=" text-red">
                            {formatprice(cart?.productId?.priceNew)}
                          </Typography.Text>
                        </Typography.Text>
                      </div>
                      <div>
                        <Typography.Text className="d-block">
                          <CloseOutlined
                            style={{ fontSize: "24px", fontWeight: "bold" }}
                          />
                        </Typography.Text>
                      </div>
                      <div>
                        <Typography.Text className="d-block">
                          Số lượng: {cart?.quantity}
                        </Typography.Text>
                      </div>
                      <div>
                        <Typography.Text className="d-block">
                          Thành tiền:{" "}
                          <Typography.Text className=" text-red">
                            {formatprice(
                              Number(cart?.quantity) *
                                Number(cart?.productId?.priceNew)
                            )}
                          </Typography.Text>
                        </Typography.Text>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="mt-2 align-items-center border-top-order d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <Typography.Title level={5} className="m-0 me-2">
                    Trạng thái đơn hàng:
                  </Typography.Title>
                  {renderStatus(order?._id, order?.status)}
                </div>
                <div className="d-flex align-items-center">
                  <Typography.Title level={5} className="m-0">
                    Tổng tiền đơn hàng:
                  </Typography.Title>
                  <Typography.Title level={5} className=" text-red m-0 ms-1">
                    {renderTotal(order)}
                  </Typography.Title>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

OrderPage.propTypes = {};

export default OrderPage;
