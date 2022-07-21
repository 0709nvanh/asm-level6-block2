import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Col, Row, Typography } from "antd";
import ProductComponent from "../../../components/product/productComponent";
import productAPI from "../../../api/product";

const ProductNew = (props) => {
  const [products, setProducts] = useState([]);
  const getData = async () => {
    const { data } = await productAPI.getList({ time: -1 });
    setProducts(data)
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-1">
        <Typography.Title className="mt-2" level={3}>
          ĐIỆN THOẠI NỔI BẬT NHẤT
        </Typography.Title>
        <Typography.Title className="mt-2" level={5}>
          Xem tất cả
        </Typography.Title>
      </div>
      <Row>
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
  );
};

ProductNew.propTypes = {};

export default ProductNew;
