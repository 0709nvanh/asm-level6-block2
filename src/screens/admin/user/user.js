import { Col, message, Row, Select, Switch, Table, Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListUser, updateStatusUser } from "../../../features/userSlide";
const { Title } = Typography;
const { Option } = Select;
const User = (props) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getListUser());
  }, []);

  const onChange = (values) => {
    if (
      window.confirm("Bạn có chắc chắn muốn đổi trạng thái tài khoản không?")
    ) {
      const data = {
        status: !values.status,
        _id: values._id,
      };
      dispatch(updateStatusUser(data))
        .then((res) => {
          if(res.payload){
            message.success("Thay đổi trạng thái thành công");
            dispatch(getListUser());
          }
        })
        .catch((err) => {
          message.error("Thay đổi trạng thái thất bại");
        });
    }
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "_id",
      key: "_id",
      render: (text, data, number) => number + 1,
    },
    {
      title: "Tên tài khoản",
      dataIndex: "username",
      key: "username",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Trạng thái hoạt động",
      dataIndex: "status",
      key: "status",
      render: (item, data) => (
        <>
          <Switch checked={item} onChange={() => onChange(data)} />
        </>
      ),
    },
  ];
  return (
    <>
      <Row className="align-items-center justify-content-between mb-2">
        <Col span={4}>
          <Title level={3}>Tài khoản</Title>
        </Col>
      </Row>
      <Table columns={columns} dataSource={users} />
    </>
  );
};

User.propTypes = {};

export default User;
