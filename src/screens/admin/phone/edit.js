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
  Spin,
  Typography,
  Upload,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import categoryAPI from "../../../api/category";
import { uploadIMG } from "../../../api/image";
import productAPI from "../../../api/product";
import "../../../common/firebase";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });
const { Option } = Select;
const { Title } = Typography;
const EditPhone = (props) => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState([]);
  const [phone, setPhone] = useState({});
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const getDataProduct = async () => {
    const { data } = await productAPI.read(slug);
    if (data) {
      setLoading(false);
      setPhone(data);
    }
  };

  const handleChange = ({ fileList: newFileList }) => setImageFile(newFileList);

  const getCategory = async () => {
    const { data } = await categoryAPI.getList();
    setCategories(data);
  };

  useEffect(() => {
    getDataProduct();
    getCategory();
  }, [slug]);

  const onFinish = async (values) => {
    let dataimgAll = null;
    if(imageFile.length > 0){
      dataimgAll = imageFile;
      const dataImg = await getBase64(dataimgAll[0].originFileObj);
      const { data: img } = await uploadIMG(dataImg);
      if(img && img.url){
        values.image = img.url;
        values.slug = slug;
        const { data } = await productAPI.update(values);
        if (data) {
          navigate("/admin/phone");
          message.success("Cập nhật thành công");
        }
      }
    }else{
      values.slug = slug;
      const { data } = await productAPI.update(values);
      if (data) {
        navigate("/admin/phone");
        message.success("Cập nhật thành công");
      }
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
      {loading ? (
        <Spin />
      ) : (
        <>
          <Row className="align-items-center justify-content-between mb-2">
            <Col>
              <Title level={3}>Cập nhật sản phẩm</Title>
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
                initialValues={phone}
                name="dynamic_form_nest_item"
                onFinish={onFinish}
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
                  <Input defaultValue={phone.title} />
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
                  <InputNumber value={phone.priceOld} />
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
                  <InputNumber value={phone.priceNew} />
                </Form.Item>
                <Form.Item
                  label="Danh mục sản phẩm"
                  name="category"
                  rules={[
                    {
                      required: true,
                      message: "Bạn phải chọn danh mục sản phẩm",
                    },
                  ]}
                >
                  <Select defaultValue={phone.category}>
                    {categories &&
                      categories.length > 0 &&
                      categories?.map((category) => (
                        <Option value={category._id}>{category.name}</Option>
                      ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Ảnh sản phẩm" name="image">
                  <div
                    className="d-flex"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {phone.image && (
                      <img
                        style={{ marginRight: "10px" }}
                        key={phone.image}
                        src={phone.image}
                        alt=""
                        width="80"
                      />
                    )}
                    {phone.image && (
                      <img
                        width="80"
                        src="https://cdn.pixabay.com/photo/2012/04/05/01/58/arrow-25864_640.png"
                        alt=""
                      />
                    )}
                    <Upload
                      listType="picture-card"
                      fileList={imageFile}
                      onChange={handleChange}
                    >
                      {imageFile.length >= 1 ? null : uploadButton}
                    </Upload>
                  </div>
                </Form.Item>
                <Form.Item label="Đặc điểm nổi bật" name="description">
                  <Input.TextArea defaultValue={phone.description} />
                </Form.Item>
                <Form.Item label="Mô tả dài" name="desc">
                  <Input.TextArea defaultValue={phone.desc} />
                </Form.Item>
                <Form.Item label="Mô tả ngắn" name="shortDesc">
                  <Input.TextArea defaultValue={phone.shortDesc} />
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
                    Cập nhật sản phẩm
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

EditPhone.propTypes = {};

export default EditPhone;
