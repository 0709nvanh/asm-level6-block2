import { Col, Row, Select, Space, Switch, Table, Tag, Typography } from "antd";
import React from "react";
import { PlusCircleOutlined, FormOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { formatprice } from "../../../common/formatprice";
const { Title } = Typography;
const { Option } = Select;

const data = [
  {
    key: '1',
    name: 'John Brown',
    price: 3223131213,
    des: 'New York No. 1 Lake Park',
    status: false,
  },
  {
    key: '2',
    name: 'Jim Green',
    price: 231213321,
    des: 'London No. 1 Lake Park',
    status: true,
  },
  {
    key: '3',
    name: 'Joe Black',
    price: 213213213,
    des: 'Sidney No. 1 Lake Park',
    status: false,
  },
];
const Phone = (props) => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      render: (text, index) => text,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Thành tiền',
      dataIndex: 'price',
      key: 'price',
      render: (price) => <span className="m-0">{formatprice(price)}</span>
    },
    {
      title: 'Mô tả',
      dataIndex: 'des',
      key: 'des',
    },
    {
      title: 'Ẩn hiện',
      key: 'status',
      dataIndex: 'status',
      render: (item) => (
        <>
          <Switch checked={item} onChange={onChange} />
        </>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      dataIndex: 'path',
      render: (item, key) => (
        <Link to={"/admin/phone-edit/" + key.key}><FormOutlined style={{ fontSize: "30px", color: "#08c" }} /></Link>
      ),
    },
  ];
  return (
    <>
      <Row className="align-items-center justify-content-between mb-2">
        <Col span={4}>
          <Title level={3}>Điện thoại</Title>
        </Col>
        <Col span={2}>
          <Link to="/admin/phone-add">
            <PlusCircleOutlined style={{ fontSize: "30px", color: "#08c" }} />
          </Link>
        </Col>
      </Row>
      <Row className="align-items-center mb-2">
        <Col span={4}>
          <Title level={4}>Bộ lọc</Title>
        </Col>
        <Col span={4}>
          <Title level={5}>Danh mục sản phẩm</Title>
        </Col>
        <Col span={6}>
          <Select
            defaultValue="laptop"
            style={{ width: '100%' }}
            onChange={handleChange}
          >
            <Option value="laptop">Laptop</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

Phone.propTypes = {};

export default Phone;
