import { Button, Col, Form, Input, message, Row, Spin, Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../../common/firebase";
import {
  createCategory,
  readCategory,
  updateCategory,
} from "../../../features/categorySlide";
const { Title } = Typography;

const CategoryEdit = (props) => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category, loading } = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(readCategory(slug));
  }, [slug]);
  const onFinish = async (values) => {
    values.slug = slug;
    dispatch(updateCategory(values)).then((res) => {
      if (res.payload) {
        navigate("/admin/category");
        message.success("Cập nhật danh mục thành công");
      } else {
        message.error("Cập nhật danh mục thất bại");
      }
    });
  };

  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <>
          {" "}
          <Row className="align-items-center justify-content-between mb-2">
            <Col>
              <Title level={3}>Cập nhật danh mục</Title>
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
                initialValues={category}
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
                    Cập nhật danh mục
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col span={6}></Col>
          </Row>
        </>
      )}
    </>
  );
};

CategoryEdit.propTypes = {};

export default CategoryEdit;
