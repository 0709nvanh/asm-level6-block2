import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Typography } from "antd";
import "antd/dist/antd.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../features/userSlide";
import "./auth.css";
const Login = () => {
  const { infoUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    dispatch(loginUser(values)).then((res) => {
      if (res.payload.user && res.payload.user.status === true) {
        message.success("Đăng nhập thành công !");
        if (res.payload.user.role === 1) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }else if(res.payload.user.status === false) {
        message.error(res.payload.message);
      }else {
        message.error("Đăng nhập thất bại");
      }
    });
  };
  useEffect(() => {
    if (infoUser?.username && infoUser.status) {
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
        Login
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
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            type="email"
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
            Log in
          </Button>
          Or <Link to="/signup">register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

Login.propTypes = {};

export default Login;
