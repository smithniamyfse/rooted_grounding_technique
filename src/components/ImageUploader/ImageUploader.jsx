import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


function ImageUploader() {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const onFormSubmit = async (e) => {
        e.preventDefault();

        // Instead of directly making an axios call here, let's dispatch an action to keep the component clean.
        // The async request should be handled by the saga.
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
