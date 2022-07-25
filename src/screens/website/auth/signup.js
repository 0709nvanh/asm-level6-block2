import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Typography } from "antd";
import "antd/dist/antd.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../../../features/userSlide";
import "./auth.css";

const Signup = (props) => {
  const { infoUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    dispatch(signupUser(values)).then((res) => {
      if (res.payload.user) {
        message.success("Đăng ký thành công, vui lòng đăng nhập");
        navigate("/login");
      } else {
        message.error("Đăng ký thất bại");
      }
    });
  };

  useEffect(() => {
    if (infoUser?.username) {
      if (infoUser.role === 1) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [infoUser?.username]);

  return (
    <div className="container p-5 m-5">
      <Typography.Title level={1} className="text-center my-2">
        Sign Up
      </Typography.Title>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your user name!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="user name"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign Up
          </Button>
          Or <Link to="/login">Login!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

Signup.propTypes = {};

export default Signup;
