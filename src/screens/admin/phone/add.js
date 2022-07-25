import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import categoryAPI from "../../../api/category";
import { uploadIMG } from "../../../api/image";
import productAPI from "../../../api/product";
import "../../../common/firebase";
import { getCategories } from "../../../features/categorySlide";
import { createProduct } from "../../../features/productSlide";
const { Option } = Select;
const { Title } = Typography;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });
const AddPhone = (props) => {
  const [imageFile, setImageFile] = useState([]);
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = ({ fileList: newFileList }) => setImageFile(newFileList);

  const getCategory = async () => {
    dispatch(getCategories());
  };
  useEffect(() => {
    getCategory();
  }, []);

  const onFinish = async (values) => {
    const dataImg = await getBase64(imageFile[0].originFileObj);
    const { data: img } = await uploadIMG(dataImg);
    if (img && img.url) {
      values.image = img.url;
      dispatch(createProduct(values)).then((res) => {
        if (res.payload) {
          navigate("/admin/phone");
          message.success("Thêm mới sản phẩm thành công");
        } else {
          message.error("Thêm mới sản phẩm thất bại");
        }
      });
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <>
      <Row className="align-items-center justify-content-between mb-2">
        <Col>
          <Title level={3}>Thêm mới sản phẩm</Title>
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
              label="Tên sản phẩm"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Bạn phải nhập tên sản phẩm!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Giá gốc"
              name="priceOld"
              rules={[
                {
                  required: true,
                  message: "Bạn phải nhập giá gốc sản phẩm",
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Giá khuyến mãi"
              name="priceNew"
              rules={[
                {
                  required: true,
                  message: "Bạn phải nhập giá khuyến mãi sản phẩm",
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Danh mục sản phẩm"
              name="category"
              rules={[
                { required: true, message: "Bạn phải chọn danh mục sản phẩm" },
              ]}
            >
              <Select defaultValue="lucy">
                <Option value="lucy" disabled>
                  Chọn danh mục
                </Option>
                {categories &&
                  categories.length > 0 &&
                  categories?.map((category) => (
                    <Option key={category._id} value={category._id}>
                      {category.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item label="Ảnh sản phẩm" name="image">
              <Upload
                listType="picture-card"
                fileList={imageFile}
                onChange={handleChange}
              >
                {imageFile.length >= 1 ? null : uploadButton}
              </Upload>
            </Form.Item>
            <Form.Item label="Đặc điểm nổi bật" name="description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Mô tả dài" name="desc">
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Mô tả ngắn" name="shortDesc">
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="danger" className="me-2" htmlType="submit">
                <Link to="/admin/phone">Hủy</Link>
              </Button>
              <Button type="primary" htmlType="submit">
                Thêm sản phẩm
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={6}></Col>
      </Row>
    </>
  );
};

AddPhone.propTypes = {};

export default AddPhone;
