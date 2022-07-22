import React, { memo, useState } from 'react';
import { Upload } from 'antd';

const Uploadimage = (props) => {
    const {uploadImageState, imageData} = props;

    const [fileList, setFileList] = useState([]);

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        uploadImageState(newFileList)
    };
    return (    
            <div className="d-flex" style={{ display: 'flex', alignItems: 'center'}}>
                {imageData && imageData.length > 0 && imageData.map((image) => (
                    <img style={{marginRight: '10px'}} key={image} src={image} alt="" width="80" />
                ))}
                {imageData && imageData.length > 0 && <img  width="80" src="https://cdn.pixabay.com/photo/2012/04/05/01/58/arrow-25864_640.png" alt="" />}
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                >
                   {fileList.length === 0 &&  '+ Upload'}
                </Upload>
            </div>
    );
}

export default memo(Uploadimage)