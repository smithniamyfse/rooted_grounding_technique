import React, { useState, useEffect } from 'react';  
import { useDispatch, useSelector } from 'react-redux'; 

function ImageUploader() {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user); 
    const images = useSelector((state) => state.image.images);

    useEffect(() => {
      if (user.id) { 
        dispatch({ type: 'FETCH_IMAGES', payload: user.id }); 
      }
    }, [dispatch, user.id]); 

    const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'UPLOAD_IMAGE_REQUEST', payload: { file, userId: user.id } });
    };

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <>
        <div className="image-upload-container">
        <form onSubmit={onFormSubmit}>
            <input type="file" name="image" onChange={onFileChange} />
            <button type="submit">Upload</button>
        </form>
        </div>
         <div className="display-uploaded-images">
           <ul>
           {images.map((image, index) => {
             return (
               <li key={index}>
                 <img src={image} alt={`uploaded ${index}`} />
               </li>
             );
           })}
           </ul>
        </div>
        </>
    );
}

export default ImageUploader;






// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';

// function ImageUploader() {
//     const [file, setFile] = useState(null);
//     const dispatch = useDispatch();

//     const onFormSubmit = (e) => { 
//         e.preventDefault();
//         dispatch({ type: 'UPLOAD_IMAGE_REQUEST', payload: file });
//     };

//     const onFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     return (
//         <>
//         <div className="image-upload-container">
//         <form onSubmit={onFormSubmit}>
//             <input type="file" name="image" onChange={onFileChange} />
//             <button type="submit">Upload</button>
//         </form>
//         </div>
//          <div className="display-uploaded-images">
//            <ul>
//            {images.map((image) => {
//              return (
//                <li key={image.id}>
//                  <img src={image.image_url} />
//                </li>
//              )
//            }
//            </>
//            </ul>
//                </div>
//     );
// }

// export default ImageUploader;

