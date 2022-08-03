import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { readProduct } from "../../../features/productSlide";
import { Button, Col, Row, Typography } from "antd";
import ProductImage from "./productImage";
import { formatprice } from "../../../common/formatprice";
import { ShoppingCartOutlined } from "@ant-design/icons";
import ProductComponent from "../../../components/product/productComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const ProductPage = (props) => {
  const { slug } = useParams();
  const { product, products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onShowCart = () => {
    navigate("/cart");
  };
  useEffect(() => {
    dispatch(readProduct(slug));
  }, [slug]);
  const productNew =
    products &&
    products.length > 0 &&
    products.filter((item) => item.slug !== slug);
  return (
    <div className="container">
      <Typography.Title level={3}>{product?.title}</Typography.Title>
      <Row>
        <Col span={8}>
          <ProductImage image={product?.image} />
        </Col>
        <Col span={16} className="ps-2">
          <Typography.Title level={3}>{product?.title}</Typography.Title>
          <div className="d-flex align-items-center mb-2">
            <Typography.Title
              className="m-0 me-2"
              style={{ color: "red", marginRight: "10px" }}
              level={4}
            >
              Giá mới: {product?.priceNew && formatprice(product?.priceNew)}
            </Typography.Title>
            <Typography.Title className="m-0 text-decorate" level={5}>
              Giá cũ: {product?.priceOld && formatprice(product?.priceOld)}
            </Typography.Title>
          </div>
          <Typography.Text level={3}>
            Danh mục sản phẩm: {product?.category.name}
          </Typography.Text>
          <Typography.Text className="mt-2 mb-2 d-block">
            Mô tả sản phẩm: {product?.shortDesc}
          </Typography.Text>
          <Link to="/cart">
            <Button style={{ width: "300px", height: "40px" }} type="primary">
              Mua ngay
            </Button>
          </Link>
          <div className="d-flex align-items-center mt-2">
            <Link to="/cart" className="iconCart">
              <ShoppingCartOutlined style={{ color: "red" }} />
            </Link>
            <Button
              style={{ width: "250px", height: "40px", marginLeft: "10px" }}
              type="primary"
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        </Col>
      </Row>
      <Typography.Title level={3} className="mt-2 mb-2">
        Sản phẩm cùng loại
      </Typography.Title>
      <Swiper
        pagination={{
          type: "progressbar"
        }}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10
          }
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {productNew &&
          productNew?.length > 0 &&
          productNew.map((item) => {
            {
              return (
                item.status && (
                  <SwiperSlide key={item._id}>
                    <ProductComponent product={item} />
                  </SwiperSlide>
                )
              );
            }
          })}
      </Swiper>
      <div className="wrapper-desc mt-2">
        <Typography.Title level={4} className="text-red text-center">
          ĐẶC ĐIỂM NỔI BẬT
        </Typography.Title>
        <Typography.Text>{product?.description}</Typography.Text>
      </div>
      <div className="mt-2">
        <Typography.Text>{product?.desc}</Typography.Text>
      </div>
    </div>
  );
};

ProductPage.propTypes = {};

export default ProductPage;
