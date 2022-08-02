import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { readCategory } from "../../../features/categorySlide";
import { Col, Row, Select, Spin, Typography } from "antd";
import { getProducts } from "../../../features/productSlide";
import ProductComponent from "../../../components/product/productComponent";
const { Option } = Select;
const CategoryPage = (props) => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.categories);
  const { products, loading } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(readCategory(slug)).then((res) => {
      if (res?.payload?.category) {
        dispatch(
          getProducts({
            cateId: res?.payload?.category?._id
          })
        );
      }
    });
  }, [slug]);
  const handleChange = (value) => {
    dispatch(
      getProducts({
        cateId: category._id,
        sortByPrice: value
      })
    );
  };
  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <Typography.Title level={3} className="m-0">
              Danh mục: {category.name}
            </Typography.Title>
            <Select
              defaultValue=""
              style={{ width: 300 }}
              onChange={handleChange}
            >
              <Option value="">Tất cả</Option>
              <Option value="1">Giá tăng dần</Option>
              <Option value="-1">Giá giảm dần</Option>
            </Select>
          </div>
          <Row className="mt-2">
            {products &&
              products?.length > 0 &&
              products.map((item) => {
                {
                  return (
                    item.status && (
                      <Col
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        xl={6}
                        key={item._id}
                        className="pe-1 pb-2"
                      >
                        <ProductComponent product={item} />
                      </Col>
                    )
                  );
                }
              })}
          </Row>
        </div>
      )}
    </>
  );
};

CategoryPage.propTypes = {};

export default CategoryPage;
