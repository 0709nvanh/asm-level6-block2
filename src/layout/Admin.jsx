import {
  LaptopOutlined,
  UserOutlined,
  PhoneOutlined,
  SearchOutlined,
  FileSearchOutlined,
  SoundOutlined,
  WindowsOutlined
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Row, Col, Input, Image, Avatar } from "antd";
import React from "react";
import { Link, Outlet } from "react-router-dom";
const { Header, Content, Sider } = Layout;
const dataMenu = [
  {
    title: "User",
    icon: UserOutlined,
    path: "user",
  },
  {
    title: "Danh mục",
    icon: WindowsOutlined,
    path: "category",
  },
  {
    title: "Điện thoại",
    icon: PhoneOutlined,
    path: "phone",
  },
  {
    title: "Laptop",
    icon: LaptopOutlined,
    path: "laptop",
  },
  {
    title: "Máy tính bảng",
    icon: FileSearchOutlined,
    path: "tablet",
  },
  {
    title: "Âm thanh",
    icon: SoundOutlined,
    path: "sound",
  },
];
const items2 = dataMenu.map((data) => {
  return {
    key: `${data.title}`,
    icon: React.createElement(data.icon),
    label: <Link to={data.path}>{data.title}</Link>,
  };
});

const App = () => (
  <Layout>
    <Header className="header bg-header" >
      <Row className="">
        <Col span={4}>
          <div className="">
            <img
              width={100}
              src="https://logos-world.net/wp-content/uploads/2022/04/Gartic-Phone-Logo.png"
              alt=""
            />
          </div>
        </Col>
        <Col span={12}>
          <Input
            size="large"
            placeholder="Tìm kiếm theo từ khóa"
            prefix={<SearchOutlined />}
          />
        </Col>
        <Col span={4}></Col>
        <Col span={4} className="align-items-center">
          <Avatar
            src={
              <Image
                src="https://joeschmoe.io/api/v1/random"
                style={{ width: 32 }}
              />
            }
          />
          <span className="m-0 ms-2 text-white">Xin chào, Nguyễn Vân Anh</span>
        </Col>
      </Row>
    </Header>
    <Layout style={{marginTop: '80px'}}>
      <Sider width={300} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{
            height: "100%",
            borderRight: 0,
          }}
          items={items2}
        />
      </Sider>
      <Layout
        style={{
          padding: "20px",
        }}
      >
        
        <Content
          className="site-layout-background"
          style={{
            padding: 20,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  </Layout>
);

export default App;
