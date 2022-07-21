import { Col, Row } from 'antd'
import React from 'react'
import Accessory from './accessory'
import CarouselCusturm from './CarouselCusturm'
import CategoryLeft from './categoryLeft'
import ProductNew from './productNew'

const HomePage = props => {
  return (
    <div className="container">
        <Row className="mt-2">
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                <CategoryLeft />
            </Col>
            <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                <CarouselCusturm />
            </Col>
        </Row>
        <ProductNew />
        <Accessory />
    </div>
  )
}

HomePage.propTypes = {}

export default HomePage