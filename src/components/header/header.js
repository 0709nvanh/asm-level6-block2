import React from 'react'
import PropTypes from 'prop-types'
import { SearchOutlined, EnvironmentOutlined, ShoppingOutlined, CarOutlined } from '@ant-design/icons';
import { Col, Input, Row, Typography } from 'antd'
import './header.css'
const Header = props => {
  return (
    <div className='container-fluid header'>
        <Row className='container align-items-center'>
            <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                <div className='logo-header'>
                    <img width={100} className='img' src="https://logos-world.net/wp-content/uploads/2022/04/Gartic-Phone-Logo.png" alt="Image" />
                </div>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                <Input placeholder="Tìm kiếm" prefix={<SearchOutlined />} />
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} className="ps-2">
                <Row className="align-items-center">
                    <Col span={6}>
                        <Typography.Title className="text-white m-0" level={5}>Gói mua hàng</Typography.Title>
                        <Typography.Text className="text-white">1800.1999</Typography.Text>
                    </Col>
                    <Col span={6} className="d-flex align-items-center">
                        <EnvironmentOutlined style={{ fontSize: "25px", color: "white", marginRight: '5px' }} />
                        <Typography.Title className="text-white m-0" level={5}>Cửa hàng gần bạn</Typography.Title>
                    </Col>
                    <Col span={6} className="d-flex align-items-center">
                        <CarOutlined style={{ fontSize: "25px", color: "white", marginRight: '5px' }} />
                        <Typography.Title className="text-white m-0" level={5}>Tra cứu đơn hàng</Typography.Title>
                    </Col>
                    <Col span={6} className="d-flex">
                        <ShoppingOutlined style={{ fontSize: "25px", color: "white", marginRight: '5px' }} />
                        <Typography.Title className="text-white m-0" level={5}>Giỏ hàng</Typography.Title>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
  )
}

Header.propTypes = {}

export default Header