import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function ImageUploader() {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const onFormSubmit = (e) => { 
        e.preventDefault();
        dispatch({ type: 'UPLOAD_IMAGE_REQUEST', payload: file });
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

export default ImageUploader;

