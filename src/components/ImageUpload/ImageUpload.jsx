import axios from 'axios';
import React, { useState } from 'react';

function ImageUpload() {
    const [file, setFile] = useState(null);

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file);
        const response = await axios.post('/api/image/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data.fileUrl);
    };

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <form onSubmit={onFormSubmit}>
            <input type="file" name="image" onChange={onFileChange} />
            <button type="submit">Upload</button>
        </form>
    );
}

export default ImageUpload;
