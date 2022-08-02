import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  SearchOutlined,
  EnvironmentOutlined,
  ShoppingOutlined,
  CarOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Button, Col, Dropdown, Input, Menu, message, Row, Typography } from "antd";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { getListUser, logoutUser } from "../../features/userSlide";
const Header = (props) => {
  const { infoUser } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (infoUser?._id) {
      dispatch(getListUser);
    } else {
      navigate("/login");
    }
    if (infoUser && infoUser.status === false) {
      message.error(
        "Tài khoản của bạn bị mất hết quyền truy cập, vui lòng đăng nhập lại"
      );
      navigate("/login");
    }
  }, [infoUser?._id]);
  const onLogout = () => {
    dispatch(logoutUser())
  }
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              Thông tin tài khoản
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a onClick={onLogout}>
              Đăng xuất
            </a>
          ),
        },
      ]}
    />
  );
  return (
    <div className="container-fluid header">
      <Row className="container align-items-center">
        <Col xs={4} sm={4} md={4} lg={4} xl={4}>
          <div className="logo-header">
            <img
              width={100}
              className="img"
              src="https://logos-world.net/wp-content/uploads/2022/04/Gartic-Phone-Logo.png"
              alt="Image"
            />
          </div>
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
          <Input placeholder="Tìm kiếm" prefix={<SearchOutlined />} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} xl={12} className="ps-2">
          <Row className="align-items-center">
            <Col span={6} className="d-flex align-items-center">
              <CarOutlined
                style={{ fontSize: "25px", color: "white", marginRight: "5px" }}
              />
              <Typography.Title className="text-white m-0" level={5}>
                Tra cứu đơn hàng
              </Typography.Title>
            </Col>
            <Col span={6} className="d-flex">
              <ShoppingOutlined
                style={{ fontSize: "25px", color: "white", marginRight: "5px" }}
              />
              <Typography.Title className="text-white m-0" level={5}>
                Giỏ hàng
              </Typography.Title>
            </Col>
            {infoUser?.username ? (
              <Col span={12}>
                <Dropdown overlay={menu} placement="bottom" arrow>
                  <div className="d-flex align-items-center">
                    <UserOutlined
                      style={{ fontSize: "20px" }}
                      className="site-form-item-icon text-white"
                    />
                    <Typography.Title
                      level={4}
                      style={{
                        color: "white",
                        marginLeft: 10,
                        marginBottom: 0
                      }}
                    >
                      Xin chào, {infoUser?.username}
                    </Typography.Title>
                  </div>
                </Dropdown>
              </Col>
            ) : (
              <Col span={12} className="d-flex">
                <Link to="/login">
                  <Button type="white" className="me-2" danger>
                    Đăng nhập
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button type="primary">Đăng ký</Button>
                </Link>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

Header.propTypes = {};

export default Header;
