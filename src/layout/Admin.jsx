import {
  LaptopOutlined, PhoneOutlined, UserOutlined, WindowsOutlined
} from "@ant-design/icons";
import {
  Avatar, Col, Dropdown, Image, Layout,
  Menu,
  Row
} from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/userSlide";
const { Header, Content, Sider } = Layout;
const dataMenu = [
  {
    title: "User",
    icon: UserOutlined,
    path: "user"
  },
  {
    title: "Danh mục",
    icon: WindowsOutlined,
    path: "category"
  },
  {
    title: "Sản phẩm",
    icon: PhoneOutlined,
    path: "phone"
  },
  {
    title: "Giỏ hàng",
    icon: LaptopOutlined,
    path: "cart"
  },
 
];
const items2 = dataMenu.map((data) => {
  return {
    key: `${data.title}`,
    icon: React.createElement(data.icon),
    label: <Link to={data.path}>{data.title}</Link>
  };
});

const Admin = () => {
  const { infoUser } = useSelector((state) => state.users);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  useEffect(() => {
    if (infoUser && infoUser?.role === 0) {
      navigate("/");
    } else if (!infoUser || !infoUser.email) {
      navigate("/login");
    }
  }, [infoUser]);
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
    <Layout>
      <Header style={{backgroundColor: '#00B0D7'}} className="header bg-header">
        <Row className="">
          <Col span={4}>
            <Link to="/" className="">
              <img
                width={100}
                src="https://logos-world.net/wp-content/uploads/2022/04/Gartic-Phone-Logo.png"
                alt=""
              />
            </Link>
          </Col>
          <Col span={12}></Col>
          <Col span={2}></Col>
          <Col span={6} className="align-items-center">
            <Dropdown overlay={menu} placement="bottom" arrow>
              <div className="d-flex align-items-center">
                <Avatar
                  src={
                    <Image
                      src="https://joeschmoe.io/api/v1/random"
                      style={{ width: 32 }}
                    />
                  }
                />
                <p className="m-0 ms-2 text-white">
                  Xin chào, {infoUser?.email}
                </p>
              </div>
            </Dropdown>
          </Col>
        </Row>
      </Header>
      <Layout style={{ marginTop: "80px" }}>
        <Sider width={300} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0
            }}
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            padding: "20px"
          }}
        >
          <Content
            className="site-layout-background"
            style={{
              padding: 20,
              margin: 0,
              minHeight: 280
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Admin;
