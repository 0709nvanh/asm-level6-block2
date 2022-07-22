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
} from "antd";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import categoryAPI from "../../../api/category";
import productAPI from "../../../api/product";
import "../../../common/firebase";
import UploadImage from "../../../common/uploadImage";
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
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const uploadImageState = useCallback((image) => {
    setImageFile(image);
  }, []);

  const getCategory = async () => {
    const { data } = await categoryAPI.getList();
    setCategories(data);
  };
  useEffect(() => {
    getCategory();
  }, []);

  const onFinish = async (values) => {
    const storage = getStorage();
    const uploadImagePromise = (image) => {
      return new Promise(function (resolve, reject) {
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadBytes(storageRef, image).then(async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadUrl);
        });
      });
    };
    const listImageUrl = [];
    for (let i = 0; i < imageFile.length; i++) {
      await uploadImagePromise(imageFile[i].originFileObj).then((response) => {
        listImageUrl.push(response);
      });
    }
    values.images = listImageUrl;
    const { data } = await productAPI.create(values);
    if (data) {
      navigate("/admin/phone");
      message.success("Thêm mới thành công");
    }
  };

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
                    <Option value={category._id}>{category.name}</Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item label="Ảnh sản phẩm" name="images">
              <UploadImage imageData={""} uploadImageState={uploadImageState} />
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
