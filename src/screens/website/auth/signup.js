import { Button, Col, Form, Input, message, Row, Typography } from "antd";
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
    console.log(values);
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
    if (infoUser?.email && infoUser.status) {
      if (infoUser.role === 1) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }else{
      navigate("/login");
    }
  }, [infoUser?.email]);

  return (
    <div className="container p-5 m-5">
      <Typography.Title level={1} className="text-center my-2">
        Sign Up
      </Typography.Title>
      <Row className="container-login">
        <Col span={16} className="p-3">
          <Form className="login-form" onFinish={onFinish}>
            <Typography.Title level={4} className="m-0 ">
              Email
            </Typography.Title>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!"
                }
              ]}
            >
              <Input
                style={{ height: "40px" }}
                type="email"
                placeholder="Email"
              />
            </Form.Item>
            <Typography.Title level={4} className="m-0 ">
              Số điện thoại
            </Typography.Title>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  min: 10,
                  max: 13,
                  pattern: new RegExp(
                    "^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$"
                  ),
                  message: "Vui lòng nhập đúng số điện thoại"
                }
              ]}
            >
              <Input
                style={{ height: "40px" }}
                type="phone"
                placeholder="Phone"
              />
            </Form.Item>
            <Typography.Title level={4} className="m-0 ">
              Password
            </Typography.Title>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!"
                }
              ]}
            >
              <Input type="password" placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Đăng ký
              </Button>
            </Form.Item>
            <Typography.Title level={4} className="text-center">
              Hoặc đăng ký bằng
            </Typography.Title>
            <div className="d-flex align-items-center justify-content-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-facebook"
                viewBox="0 0 16 16"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
              <div className="icon-google">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-google"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                </svg>
              </div>
            </div>
          </Form>
          <Typography.Title level={3} className="text-center">
            - or -
          </Typography.Title>
          <div>
            <Typography.Text>
              Nếu bạn đã có tài khoản, vui lòng đăng nhập{" "}
              <Link to="/login">tại đây</Link>
            </Typography.Text>
          </div>
        </Col>
        <Col
          span={8}
          className="box-left d-flex align-items-center justify-content-center"
        >
          <img
            width={300}
            className="img"
            src="https://logos-world.net/wp-content/uploads/2022/04/Gartic-Phone-Logo.png"
            alt="Image"
          />
        </Col>
      </Row>
    </div>
  );
};

Signup.propTypes = {};

export default Signup;
