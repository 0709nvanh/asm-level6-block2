import React from "react";
import PropTypes from "prop-types";
import { Button, Col, Row, Typography } from "antd";
import './footer.css'
const Footer = ( props) => {
  return (
    <div className="container mt-2 pt-2 mb-2 pb-2">
      <Row>
        <Col span={6}>
          <Typography.Title level={4}>Tìm cửa hàng</Typography.Title>
          <Typography.Text className="d-block">
            Tìm cửa hàng gần nhất
          </Typography.Text>
          <Typography.Text className="d-block">Mua hàng từ xa</Typography.Text>
          <Typography.Text className="text-red d-block">
            Gặp trực tiếp cửa hàng gần nhất (Zalo hoặc gọi điện)
          </Typography.Text>
          <Typography.Title level={4}>Phương thức thanh toán</Typography.Title>
          <div className="me-2">
            <img className="image-footer" src="https://image.cellphones.com.vn/x35/media/logo/payment/alepay-logo.png" />
            <img className="image-footer" src="https://image.cellphones.com.vn/x35/media/logo/payment/zalopay-logo.png" />
            <img className="image-footer" src="https://image.cellphones.com.vn/x35/media/logo/payment/vnpay-logo.png" />
            <img className="image-footer" src="https://image.cellphones.com.vn/x35/media/logo/payment/moca-logo.png" />
            <img className="image-footer" src="https://image.cellphones.com.vn/x35/media/logo/payment/onepay-logo.png" />
            <img className="image-footer" src="https://image.cellphones.com.vn/x35/media/logo/payment/kredivo-logo.png" />
            <img className="image-footer" src="https://image.cellphones.com.vn/x35/media/logo/payment/mpos-logo.png" />
          </div>
        </Col>
        <Col span={6}>
          <Typography.Text className="d-block">
            Gọi mua hàng: 1800.2044 (8h00 - 22h00)
          </Typography.Text>
          <Typography.Text className="d-block">
            Gọi khiếu nại: 1800.2063 (8h00 - 21h30)
          </Typography.Text>
          <Typography.Text className="d-block">
            Gọi bảo hành: 1800.2064 (8h00 - 21h00)
          </Typography.Text>
          <Typography.Title level={4}>
            Đối tác dịch vụ bảo hành
          </Typography.Title>
          <div className="btn-baohanh">
            <p level={5} className="m-0 text-white">Đối tác dịch vụ bảo hành</p>
            <p level={5} className="m-0 text-white">Điện thoại - máy tính</p>
          </div>
          <div className="btn-baohanh bthn-baohanh">
            <p level={5} className="m-0 text-white">Trung tâm bảo hành ủy quyền</p>
            <p level={5} className="m-0 text-white">Apple</p>
          </div>
        </Col>
        <Col span={6}>
          <Typography.Text className="d-block">
            Mua hàng và thanh toán Online
          </Typography.Text>
          <Typography.Text className="d-block">
            Mua hàng trả góp Online
          </Typography.Text>
          <Typography.Text className="d-block">
            Tra thông tin đơn hàng
          </Typography.Text>
          <Typography.Text className="d-block">
            Tra điểm Smember
          </Typography.Text>
          <Typography.Text className="d-block">
            Tra thông tin bảo hành
          </Typography.Text>
          <Typography.Title level={4}>
            Tra cứu hoá đơn VAT điện tử
          </Typography.Title>
          <Typography.Text className="d-block">
            Trung tâm bảo hành chính hãng
          </Typography.Text>
          <Typography.Text className="d-block">
            Quy định về việc sao lưu dữ liệu
          </Typography.Text>
          <Typography.Text className="d-block text-red">
            Dịch vụ bảo hành điện thoại
          </Typography.Text>
        </Col>
        <Col span={6}>
          <Typography.Text className="d-block">
            Quy chế hoạt động
          </Typography.Text>
          <Typography.Text className="d-block">
            Chính sách Bảo hành
          </Typography.Text>
          <Typography.Text className="d-block">
            Liên hệ hợp tác kinh doanh
          </Typography.Text>
          <Typography.Text className="d-block">
            Khách hàng doanh nghiệp (B2B)
          </Typography.Text>
          <Typography.Text className="d-block text-red">
            Ưu đãi thanh toán
          </Typography.Text>
          <Typography.Text className="d-block">Tuyển dụng</Typography.Text>
        </Col>
      </Row>
    </div>
  );
};

Footer.propTypes = {};

export default Footer;
