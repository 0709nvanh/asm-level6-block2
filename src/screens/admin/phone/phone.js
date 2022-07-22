import {
  Col,
  message,
  Row,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { PlusCircleOutlined, FormOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { formatprice } from "../../../common/formatprice";
import productAPI from "../../../api/product";
import categoryAPI from "../../../api/category";
const { Title } = Typography;
const { Option } = Select;

const data = [
  {
    key: "1",
    name: "John Brown",
    price: 3223131213,
    des: "New York No. 1 Lake Park",
    status: false,
  },
  {
    key: "2",
    name: "Jim Green",
    price: 231213321,
    des: "London No. 1 Lake Park",
    status: true,
  },
  {
    key: "3",
    name: "Joe Black",
    price: 213213213,
    des: "Sidney No. 1 Lake Park",
    status: false,
  },
];
const Phone = (props) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const getData = async () => {
    const { data: productList } = await productAPI.getList({ time: -1 });
    setProducts(productList);
  };
  const getCategory = async () => {
    const { data } = await categoryAPI.getList();
    setCategories(data);
  };
  useEffect(() => {
    getData();
    getCategory();
  }, []);
  const handleChange = async (value) => {
    const { data } = await productAPI.getList({ cateId: value });
    if(data){
      setProducts(data)
    }
  };

  const updateStatus = async (product) => {
    const dataNew = { ...product, status: !product.status };
    const { data: productUpdate } = await productAPI.update(dataNew);
    if (productUpdate) {
      message.success("Thay đổi trạng thái thành công!");
      getData();
    }
  };

  const onChange = (data) => {
    if (
      window.confirm("Bạn có chắc chắn muốn đổi trạng thái sản phẩm không?")
    ) {
      updateStatus(data);
    }
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "_id",
      key: "_id",
      render: (text, data, number) => number + 1,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (category) => <a>{category.name}</a>,
    },
    {
      title: "Giá cũ",
      dataIndex: "priceOld",
      key: "priceOld",
      render: (price) => <span className="m-0">{formatprice(price)}</span>,
    },
    {
      title: "Giá mới",
      dataIndex: "priceNew",
      key: "priceNew",
      render: (price) => <span className="m-0">{formatprice(price)}</span>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ẩn hiện",
      key: "status",
      dataIndex: "status",
      render: (item, data) => (
        <>
          <Switch checked={item} onChange={() => onChange(data)} />
        </>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      dataIndex: "path",
      render: (item, key) => (
        <Link to={"/admin/phone-edit/" + key.slug}>
          <FormOutlined style={{ fontSize: "30px", color: "#08c" }} />
        </Link>
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
            defaultValue="lucy"
            style={{ width: "100%" }}
            onChange={handleChange}
          >
            <Option value="lucy" disabled>
              Chọn danh mục
            </Option>
            {categories &&
              categories.length > 0 &&
              categories?.map((category) => (
                <Option value={category._id}>{category.name}</Option>
              ))}
          </Select>
        </Col>
      </Row>
      <Table columns={columns} dataSource={products} />
    </>
  );
};

Phone.propTypes = {};

export default Phone;
