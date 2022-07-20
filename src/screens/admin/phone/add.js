import React, { useCallback, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import {Link} from 'react-router-dom'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
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
  const [fileList, setFileList] = useState([]);
  const [imageFile, setImageFile] = useState([]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
  };
  const uploadImageState = useCallback((image) => {
    setImageFile(image);
  }, []);

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

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
    values.image = listImageUrl;
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Row className="align-items-center justify-content-between mb-2">
        <Col span={4}>
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
              name="name"
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
              name="price-old"
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
              name="price-sale"
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
                <Option value="laptop">Laptop</Option>
                <Option value="Phone">phone</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Ảnh sản phẩm" name="image">
              <UploadImage imageData={""} uploadImageState={uploadImageState} />
            </Form.Item>
            <Form.Item label="Đặc điểm nổi bật" name="des">
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Mô tả dài" name="des-maxlength">
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Mô tả ngắn" name="des-minlength">
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
