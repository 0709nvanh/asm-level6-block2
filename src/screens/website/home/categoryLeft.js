import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'antd'
import { MobileOutlined, RightOutlined } from '@ant-design/icons'
const CategoryLeft = props => {
  return (
    <div className="pe-2">
        <div className='d-flex align-items-center justify-content-between mb-1'>
            <div className="d-flex align-items-center">
                <MobileOutlined style={{fontSize: '20px'}} />
                <Typography.Title className="m-0 ms-2" level={5}>Điện thoại</Typography.Title>
            </div>
            <RightOutlined style={{fontSize: '20px'}} />
        </div>
        <div className='d-flex align-items-center justify-content-between mb-1'>
            <div className="d-flex align-items-center">
                <MobileOutlined style={{fontSize: '20px'}} />
                <Typography.Title className="m-0 ms-2" level={5}>Laptop</Typography.Title>
            </div>
            <RightOutlined style={{fontSize: '20px'}} />
        </div>
        <div className='d-flex align-items-center justify-content-between mb-1'>
            <div className="d-flex align-items-center">
                <MobileOutlined style={{fontSize: '20px'}} />
                <Typography.Title className="m-0 ms-2" level={5}>Máy tính bảng</Typography.Title>
            </div>
            <RightOutlined style={{fontSize: '20px'}} />
        </div>
        <div className='d-flex align-items-center justify-content-between mb-1'>
            <div className="d-flex align-items-center">
                <MobileOutlined style={{fontSize: '20px'}} />
                <Typography.Title className="m-0 ms-2" level={5}>Âm thanh</Typography.Title>
            </div>
            <RightOutlined style={{fontSize: '20px'}} />
        </div>
        <div className='d-flex align-items-center justify-content-between mb-1'>
            <div className="d-flex align-items-center">
                <MobileOutlined style={{fontSize: '20px'}} />
                <Typography.Title className="m-0 ms-2" level={5}>Đồng hồ</Typography.Title>
            </div>
            <RightOutlined style={{fontSize: '20px'}} />
        </div>
        <div className='d-flex align-items-center justify-content-between mb-1'>
            <div className="d-flex align-items-center">
                <MobileOutlined style={{fontSize: '20px'}} />
                <Typography.Title className="m-0 ms-2" level={5}>Nhà thông minh</Typography.Title>
            </div>
            <RightOutlined style={{fontSize: '20px'}} />
        </div>
        <div className='d-flex align-items-center justify-content-between mb-1'>
            <div className="d-flex align-items-center">
                <MobileOutlined style={{fontSize: '20px'}} />
                <Typography.Title className="m-0 ms-2" level={5}>Phụ kiện</Typography.Title>
            </div>
            <RightOutlined style={{fontSize: '20px'}} />
        </div>
        <div className='d-flex align-items-center justify-content-between mb-1'>
            <div className="d-flex align-items-center">
                <MobileOutlined style={{fontSize: '20px'}} />
                <Typography.Title className="m-0 ms-2" level={5}>PC - Màn hình</Typography.Title>
            </div>
            <RightOutlined style={{fontSize: '20px'}} />
        </div>
        <div className='d-flex align-items-center justify-content-between mb-1'>
            <div className="d-flex align-items-center">
                <MobileOutlined style={{fontSize: '20px'}} />
                <Typography.Title className="m-0 ms-2" level={5}>Ti vi</Typography.Title>
            </div>
            <RightOutlined style={{fontSize: '20px'}} />
        </div>
    </div>
  )
}

CategoryLeft.propTypes = {}

export default CategoryLeft