import {
    Button,
    Col,
    Form,
    Input, message,
    Row, Typography
} from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../../../common/firebase";
import { createCategory } from "../../../features/categorySlide";
const { Title } = Typography;

const CategoryAdd = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    dispatch(createCategory(values)).then((res) => {
      if (res.payload) {
        navigate("/admin/category");
        message.success("Thêm mới danh mục thành công");
      } else {
        message.error("Thêm mới danh mục thất bại");
      }
    });
  };

  return (
    <>
      <Row className="align-items-center justify-content-between mb-2">
        <Col>
          <Title level={3}>Thêm mới danh mục</Title>
        </Col>
      </Row>
      <Row>
        <Col span={4}></Col>
        <Col span={12}>
          <Form
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Tên danh mục"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Bạn phải nhập tên danh mục!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="danger" className="me-2" htmlType="submit">
                <Link to="/admin/category">Hủy</Link>
              </Button>
              <Button type="primary" htmlType="submit">
                Thêm danh mục
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={6}></Col>
      </Row>
    </>
  );
};

CategoryAdd.propTypes = {};

export default CategoryAdd;
