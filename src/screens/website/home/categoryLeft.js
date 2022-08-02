import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";
import { MobileOutlined, RightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../../../features/categorySlide";
const CategoryLeft = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className="pe-2">
      {categories &&
        categories.length > 0 &&
        categories.map((category) => (
          <Link to={category.slug}
            key={category._id}
            className="d-flex align-items-center justify-content-between mb-1"
          >
            <div className="d-flex align-items-center">
              <MobileOutlined style={{ fontSize: "20px" }} />
              <Typography.Title className="m-0 ms-2" level={5}>
                {category.name}
              </Typography.Title>
            </div>
            <RightOutlined style={{ fontSize: "20px" }} />
          </Link>
        ))}
    </div>
  );
};

CategoryLeft.propTypes = {};

export default CategoryLeft;
