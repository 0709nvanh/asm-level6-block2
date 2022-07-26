import { FormOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Col, message, Row, Switch, Table, Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import categoryAPI from "../../../api/category";
import { getCategories } from "../../../features/categorySlide";
const { Title } = Typography;
const Category = (props) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const getCategory = async () => {
    dispatch(getCategories());
  };
  useEffect(() => {
    getCategory();
  }, []);
  const updateStatus = async (cate) => {
    const dataNew = { _id: cate._id, status: !cate.status };
    const { data } = await categoryAPI.updateStatus(dataNew);
    if (data) {
      message.success("Thay đổi trạng thái thành công!");
      dispatch(getCategories());
    }
  };

  const onChange = (data) => {
    if (
      window.confirm("Bạn có chắc chắn muốn đổi trạng thái danh mục không?")
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
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
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
        <Link to={"/admin/category-edit/" + key.slug}>
          <FormOutlined style={{ fontSize: "30px", color: "#08c" }} />
        </Link>
      ),
    },
  ];
  return (
    <>
      <Row className="align-items-center justify-content-between mb-2">
        <Col span={4}>
          <Title level={3}>Danh mục</Title>
        </Col>
        <Col span={2}>
          <Link to="/admin/category-add">
            <PlusCircleOutlined style={{ fontSize: "30px", color: "#08c" }} />
          </Link>
        </Col>
      </Row>
      <Table columns={columns} dataSource={categories} />
    </>
  );
};

Category.propTypes = {};

export default Category;
