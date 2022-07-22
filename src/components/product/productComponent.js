import React from "react";
import PropTypes from "prop-types";
import { formatprice } from "../../common/formatprice";
import { Card, Typography } from "antd";
const { Meta } = Card;
const ProductComponent = (props) => {
  const { product } = props;
  return (
    <Card
          hoverable
          style={{
            width: "100%",
            marginRight: "10px",
            marginBottom: "10px",
            borderRadius: 8,
          }}
          cover={<img style={{height: '280px', objectFit: 'cover', padding: 10}} alt="example" src={product.images[0]} />}
        >
          <Meta title={product.title} description={product.description} />
          <div className="d-flex align-items-center justify-content-between">
            <Typography.Title
              className="m-0"
              style={{ color: "red", fontSize: 14 }}
              level={5}
            >
              {formatprice(product.priceNew)}
            </Typography.Title>
            <Typography.Title style={{ fontSize: 12 }} className="m-0 text-decorate" level={5}>
              {formatprice(product.priceOld)}
            </Typography.Title>
          </div>
        </Card>
  );
};

ProductComponent.propTypes = {
  product: PropTypes.object,
};

export default ProductComponent;
