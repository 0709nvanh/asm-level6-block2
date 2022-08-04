import React, { useEffect, useTransition } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  SearchOutlined,
  EnvironmentOutlined,
  ShoppingOutlined,
  CarOutlined,
  UserOutlined
} from "@ant-design/icons";
import {
  Button,
  Col,
  Dropdown,
  Input,
  Menu,
  message,
  Row,
  Spin,
  Typography
} from "antd";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { getListUser, logoutUser } from "../../features/userSlide";
import { searchProductsHeader } from "../../features/productSlide";
import { formatprice } from "../../common/formatprice";
const Header = (props) => {
  const { infoUser } = useSelector((state) => state.users);
  const { productsHeader } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    if (infoUser?._id) {
      dispatch(getListUser);
    } else {
      navigate("/login");
    }
    if (infoUser && infoUser.status === false) {
      message.error(
        "Tài khoản của bạn bị mất quyền truy cập, vui lòng đăng nhập lại"
      );
      navigate("/login");
    }
  }, [infoUser?._id]);
  const onLogout = () => {
    dispatch(logoutUser());
  };

  const menu2 = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              Thông tin tài khoản
            </a>
          )
        },
        {
          key: "2",
          label: <Link to="/admin">Truy cập quản trị</Link>
        },
        {
          key: "3",
          label: <a onClick={onLogout}>Đăng xuất</a>
        }
      ]}
    />
  );
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              Thông tin tài khoản
            </a>
          )
        },
        {
          key: "2",
          label: <a onClick={onLogout}>Đăng xuất</a>
        }
      ]}
    />
  );

  const onHandelSearch = (e) => {
    const keySearch = e.target.value;
    startTransition(() => {
      dispatch(searchProductsHeader(keySearch));
    });
  };
  return (
    <div className="container-fluid header">
      <Row className="container align-items-center">
        <Col xs={4} sm={4} md={4} lg={4} xl={4}>
          <Link to="/" className="logo-header">
            <img
              width={100}
              className="img"
              src="https://logos-world.net/wp-content/uploads/2022/04/Gartic-Phone-Logo.png"
              alt="Image"
            />
          </Link>
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
          <Input
            placeholder="Tìm kiếm"
            onKeyUp={onHandelSearch}
            prefix={<SearchOutlined />}
          />
          <div className='box-search-wrapper'>
            <div className="box-search-result">
              {productsHeader && productsHeader.length > 0 ? (
                <>
                  {productsHeader.map((product) => (
                    <Link
                      to={"/" + product.category.slug + "/" + product.slug}
                      key={product._id}
                      className="box-search-item"
                    >
                      <div className="box-search-image me-2">
                        <img
                          width={100}
                          height={100}
                          style={{ objectFit: "cover" }}
                          src={product?.image}
                        />
                      </div>
                      <div className="box-search-content">
                        <Typography.Title className="m-0" level={5}>
                          {product?.title}
                        </Typography.Title>
                        <div>
                          Giá sản phẩm:
                          <Typography.Text className="text-red m-0 ms-1 me-2">
                            {formatprice(product?.priceNew)}
                          </Typography.Text>
                        </div>

                        <Typography.Text className="m-0" level={5}>
                          Danh mục : {product?.category?.name}
                        </Typography.Text>
                      </div>
                    </Link>
                  ))}
                </>
              ) : (
                <div className="d-flex align-items-center text-center justify-content-center">
                  <Typography.Text className="text-center mt-2 pt-2">
                    Không tìm thấy kết quả
                  </Typography.Text>
                </div>
              )}
            </div>
            <Link to="" className="link-search">
                Xem tất cả
            </Link>
          </div>
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
            {infoUser?.email ? (
              <Col span={12}>
                <Dropdown
                  overlay={infoUser?.role === 1 ? menu2 : menu}
                  placement="bottom"
                  arrow
                >
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
                      Xin chào, {infoUser?.email}
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
