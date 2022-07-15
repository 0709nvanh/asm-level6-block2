import React, { memo, useState } from 'react';
import { Upload } from 'antd';

const Uploadimage = (props) => {
    const {uploadImageState, imageData} = props;
    let imageState = []
    if(imageData !== '' ){
        imageState = JSON.parse(imageData)
    }
    const [fileList, setFileList] = useState([]);

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        uploadImageState(newFileList)
    };
    return (    
            <div className="d-flex" style={{ display: 'flex', alignItems: 'center'}}>
                {imageState.length > 0 && imageState.map((image) => (
                    <img style={{marginRight: '10px'}} key={image} src={image} alt="" width="80" />
                ))}
                {imageState.length > 0 && <img  width="80" src="https://cdn.pixabay.com/photo/2012/04/05/01/58/arrow-25864_640.png" alt="" />}
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                >
                    {'+ Upload'}
                </Upload>
            </div>
    );
}

export default memo(Uploadimage)