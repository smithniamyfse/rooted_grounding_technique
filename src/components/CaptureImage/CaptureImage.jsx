import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import "./CaptureImage.css";

function CaptureImage() {
    const videoRef = useRef(null);
    const photoRef = useRef(null);
  
    const [hasPhoto, setHasPhoto] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
  
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (selectedFile) {
            handleSubmit();
        }
    }, [selectedFile]);

    const getVideo = () => {
        navigator.mediaDevices
          .getUserMedia({
            video: { width: 1920, height: 1080 },
          })
          .then((stream) => {
            let video = videoRef.current;
            if(video){
              video.srcObject = stream;
              video.oncanplay = function () {
                video.play().catch((err) => {
                  console.log("The video could not be played:", err);
                });
              };
            }
            else {
              console.error("Video element not ready");
            }
          })
          .catch((err) => {
            console.error(err);
          });
    };

    const takePhoto = () => {
        return new Promise((resolve, reject) => {
            const width = 414;
            const height = width / (16 / 9);
        
            let video = videoRef.current;
            let photo = photoRef.current;
        
            photo.width = width;
            photo.height = height;
        
            let ctx = photo.getContext("2d");
            ctx.drawImage(video, 0, 0, width, height);
        
            photo.toBlob((blob) => {
                console.log("Blob size before upload: ", blob.size);
                setSelectedFile(blob);
                setIsUploading(true);
                resolve();
            }, 'image/png');
        });
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            console.error('No file selected for upload');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        const result = await dispatch({ type: 'UPLOAD_IMAGE', payload: formData });
        if (result.type === 'UPLOAD_IMAGE_SUCCESS') {
            dispatch({ type: 'SET_CURRENT_EVENT_ID', payload: result.payload.eventId });
        }
        setSelectedFile(null);
        setIsUploading(false); 
    };

    const handleSnap = async () => {
        await takePhoto();
    };

    const closePhoto = () => {
        let photo = photoRef.current;
        let ctx = photo.getContext("2d");

        ctx.clearRect(0, 0, photo.width, photo.height);

        setHasPhoto(false);
    };

    useEffect(() => {
        getVideo();
        return () => {
            const video = videoRef.current;
            if (video && video.srcObject) {
                const tracks = video.srcObject.getTracks();
                tracks.forEach((track) => {
                    track.stop();
                });
                video.srcObject = null;
            }
        };
    }, [dispatch]);

    return (
        <section className="capture-image-container">
            <div className="camera">
                <video ref={videoRef}></video>
                <button onClick={handleSnap}>SNAP!</button>
            </div>
            <div className={"result " + (hasPhoto ? "hasPhoto" : "")}>
                <canvas ref={photoRef}></canvas>
                <button onClick={closePhoto}>CLOSE!</button>
            </div>
            <br />
        </section>
    );
}

export default CaptureImage;

// import React, { useRef, useEffect, useState } from "react";
// import { useDispatch } from 'react-redux';
// import { HashRouter as Router, Route, Link, useHistory } from 'react-router-dom';
// import "./CaptureImage.css";

// function CaptureImage() {
//     const videoRef = useRef(null);
//     const photoRef = useRef(null);
  
//     const [hasPhoto, setHasPhoto] = useState(false);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [isUploading, setIsUploading] = useState(false);
  
//     const dispatch = useDispatch();

//     const history = useHistory();

//     useEffect(() => {
//         if (selectedFile && isUploading) {
//           handleSubmit();
//         }
//       }, [selectedFile, isUploading]);


//   const getVideo = () => {
//     navigator.mediaDevices
//       .getUserMedia({
//         video: { width: 1920, height: 1080 },
//       })
//       .then((stream) => {
//         let video = videoRef.current;
//         if(video){
//           video.srcObject = stream;
//           video.oncanplay = function () {
//             video.play().catch((err) => {
//               console.log("The video could not be played:", err);
//             });
//           };
//         }
//         else {
//           console.error("Video element not ready");
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   const takePhoto = () => {
//     return new Promise((resolve, reject) => {
//       const width = 414;
//       const height = width / (16 / 9);
  
//       let video = videoRef.current;
//       let photo = photoRef.current;
  
//       photo.width = width;
//       photo.height = height;
  
//       let ctx = photo.getContext("2d");
//       ctx.drawImage(video, 0, 0, width, height);
  
//       photo.toBlob((blob) => {
//         console.log("Blob size before upload: ", blob.size);
//         setSelectedFile(blob, handleSubmit);
//         setIsUploading(true);
//         resolve();
//       }, 'image/png');
//     });
//   };

//   const handleSubmit = async () => {
//     if (!selectedFile) {
//       console.error('No file selected for upload');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('image', selectedFile);
//     const result = await dispatch({ type: 'UPLOAD_IMAGE', payload: formData });
//     if (result.type === 'UPLOAD_IMAGE_SUCCESS') {
//         dispatch({ type: 'SET_CURRENT_EVENT_ID', payload: result.payload.eventId });
//     }
//     setSelectedFile(null);
//     setIsUploading(false); 
//   };

//   const handleSnap = async () => {
//     await takePhoto();
//   };

//   const closePhoto = () => {
//     let photo = photoRef.current;
//     let ctx = photo.getContext("2d");

//     ctx.clearRect(0, 0, photo.width, photo.height);

//     setHasPhoto(false);
//   };

//   useEffect(() => {
//     getVideo();
//     return () => {
//       const video = videoRef.current;
//       if (video && video.srcObject) {
//         const tracks = video.srcObject.getTracks();
//         tracks.forEach((track) => {
//           track.stop();
//         });
//         video.srcObject = null;
//       }
//     };
//   }, [dispatch]);

//   const goToSee = () => {
//     history.push("/first-see")
//   };

//   return (
//     <section className="capture-image-container">
//       <div className="camera">
//         <video ref={videoRef}></video>
//         <button onClick={handleSnap}>SNAP!</button>
//       </div>
//       <div className={"result " + (hasPhoto ? "hasPhoto" : "")}>
//         <canvas ref={photoRef}></canvas>
//         <button onClick={closePhoto}>CLOSE!</button>
//       </div>
//       <br />
//     </section>
//   );
// }

// export default CaptureImage;

/*
import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./CaptureImage.css";

function CaptureImage({ setImageUploaded }) {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  // Fetch the currentEventId from the Redux store.
  const currentEventId = useSelector((store) => store.eventEntries.currentEventId);

  const takePhoto = async () => {
    const width = 414;
    const height = width / (16 / 9);
    const video = videoRef.current;
    const photo = photoRef.current;
    photo.width = width;
    photo.height = height;
    const ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    const blob = await new Promise(resolve => photo.toBlob(resolve, "image/png"));
    setSelectedFile(blob);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
        console.error("No file selected for upload");
        return;
    }
    
    const formData = new FormData();
    formData.append("image", selectedFile);
    dispatch({ type: "UPLOAD_IMAGE", payload: formData });
    setSelectedFile(null);
    setImageUploaded(true);
  };

  const handleSnap = async () => {
    await takePhoto();
    if (!currentEventId) {
        dispatch({ type: 'CREATE_NEW_EVENT' });
    }
    handleSubmit();
  };

  const closePhoto = () => {
    const photo = photoRef.current;
    const ctx = photo.getContext("2d");
    ctx.clearRect(0, 0, photo.width, photo.height);
    setHasPhoto(false);
  };

  useEffect(() => {
    const getVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: { width: 1920, height: 1080 } })
        .then((stream) => {
          const video = videoRef.current;
          if(video) { // Ensure videoRef is available
            video.srcObject = stream;
            video.oncanplay = function() {
              video.play().catch(err => console.log("The video could not be played:", err));
            };
          }
        })
        .catch(console.error);
    };

    getVideo();
    return () => {
      const video = videoRef.current;
      if (video && video.srcObject) {
        const tracks = video.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        video.srcObject = null;
      }
    };
  }, []);

  return (
    <section className="capture-image-container">
      <div className="camera">
        <video ref={videoRef}></video>
        <button onClick={handleSnap} disabled={!videoRef.current}>SNAP!</button>
      </div>
      <div className={"result " + (hasPhoto ? "hasPhoto" : "")}>
        <canvas ref={photoRef}></canvas>
        <button onClick={closePhoto}>CLOSE!</button>
      </div>
    </section>
  );
}

export default CaptureImage;
*/


// import React, { useRef, useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import "./CaptureImage.css";

// function CaptureImage({ setImageUploaded }) {
//   const videoRef = useRef(null);
//   const photoRef = useRef(null);
//   const [hasPhoto, setHasPhoto] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const dispatch = useDispatch();

//   // Fetch the currentEventId from the Redux store.
//   const currentEventId = useSelector((store) => store.eventEntries.currentEventId);
  
//   // Fetch the uploadedImage from the Redux store.
//   const uploadedImage = useSelector((store) => store.image);

//   const takePhoto = async () => {
//     const width = 414;
//     const height = width / (16 / 9);
//     const video = videoRef.current;
//     const photo = photoRef.current;
//     photo.width = width;
//     photo.height = height;
//     const ctx = photo.getContext("2d");
//     ctx.drawImage(video, 0, 0, width, height);
//     const blob = await new Promise(resolve => photo.toBlob(resolve, "image/png"));
//     setSelectedFile(blob);
//     return new Promise((resolve) => {
//         setSelectedFile(blob);
//         resolve();
//     });
//   };

//   const handleSubmit = async () => {
//     if (!selectedFile) {
//         console.error("No file selected for upload");
//         return;
//     }
    
//     console.log("Dispatching UPLOAD_IMAGE action"); // Added log
//     const formData = new FormData();
//     formData.append("image", selectedFile);
//     dispatch({ type: "UPLOAD_IMAGE", payload: formData });
//     setSelectedFile(null);
//     setImageUploaded(true);
//   };

//   const handleSnap = async () => {
//     await takePhoto().then(() => {
//         if (!currentEventId) {
//             dispatch({ type: 'CREATE_NEW_EVENT' });
//         }
//         handleSubmit();
//     });
//   };

//   const closePhoto = () => {
//     const photo = photoRef.current;
//     const ctx = photo.getContext("2d");
//     ctx.clearRect(0, 0, photo.width, photo.height);
//     setHasPhoto(false);
//   };

//   useEffect(() => {
//     const getVideo = () => {
//       navigator.mediaDevices
//         .getUserMedia({ video: { width: 1920, height: 1080 } })
//         .then((stream) => {
//           const video = videoRef.current;
//           if(video) { // Ensure videoRef is available
//             video.srcObject = stream;
//             video.oncanplay = function() {
//               video.play().catch(err => console.log("The video could not be played:", err));
//             };
//           }
//         })
//         .catch(console.error);
//     };

//     getVideo();
//     return () => {
//       const video = videoRef.current;
//       if (video && video.srcObject) {
//         const tracks = video.srcObject.getTracks();
//         tracks.forEach((track) => track.stop());
//         video.srcObject = null;
//       }
//     };
//   }, []);

//   return (
//     <section className="capture-image-container">
//       <div className="camera">
//         <video ref={videoRef}></video>
//         <button onClick={handleSnap} disabled={!videoRef.current}>SNAP!</button>
//       </div>
//       <div className={"result " + (hasPhoto ? "hasPhoto" : "")}>
//         <canvas ref={photoRef}></canvas>
//         <button onClick={closePhoto}>CLOSE!</button>
//       </div>
//       {/* This is just an example on how to display the uploaded image URL. Adjust as necessary. */}
//       {uploadedImage && uploadedImage.image_url && <img src={uploadedImage.image_url} alt="Uploaded" />}
//     </section>
//   );
// }

// export default CaptureImage;


// import React, { useRef, useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import "./CaptureImage.css";

// function CaptureImage({ setImageUploaded, currentEventId }) {
//   const videoRef = useRef(null);
//   const photoRef = useRef(null);
//   const [hasPhoto, setHasPhoto] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [eventCreated, setEventCreated] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const dispatch = useDispatch();

//   const takePhoto = async () => {
//     const width = 414;
//     const height = width / (16 / 9);
//     const video = videoRef.current;
//     const photo = photoRef.current;
//     photo.width = width;
//     photo.height = height;
//     const ctx = photo.getContext("2d");
//     ctx.drawImage(video, 0, 0, width, height);
//     const blob = await new Promise(resolve => photo.toBlob(resolve, "image/png"));
//     console.log("Blob size before upload: ", blob.size);
//     setSelectedFile(blob);
//   };

// //   const handleSubmit = async () => {
// //     setIsLoading(true);
// //     if (!selectedFile) return;

// //     if (!eventCreated) {
// //       setEventCreated(true);
// //     }
// //     setIsLoading(false);
// //     const formData = new FormData();
// //     formData.append("image", selectedFile);
// //     dispatch({ type: "UPLOAD_IMAGE", payload: formData });
// //     setSelectedFile(null);
// //     setImageUploaded(true);
// //   };

// const handleSubmit = async () => {
//     if (!selectedFile) {
//         console.error("No file selected for upload");
//         return;
//     }
    
//     const formData = new FormData();
//     formData.append("image", selectedFile);
//     dispatch({ type: "UPLOAD_IMAGE", payload: formData });
//     setSelectedFile(null);
//     setImageUploaded(true);
// };


// //   const handleSnap = () => {
// //     takePhoto();
// //   };

// const handleSnap = async () => {
//     await takePhoto();
//     if (!currentEventId) {
//         dispatch({ type: 'CREATE_NEW_EVENT' });
//     }
//     handleSubmit();
// };


//   const closePhoto = () => {
//     const photo = photoRef.current;
//     const ctx = photo.getContext("2d");
//     ctx.clearRect(0, 0, photo.width, photo.height);
//     setHasPhoto(false);
//   };

//   useEffect(() => {
//     const getVideo = () => {
//       navigator.mediaDevices
//         .getUserMedia({ video: { width: 1920, height: 1080 } })
//         .then((stream) => {
//           const video = videoRef.current;
//           video.srcObject = stream;
//           video.oncanplay = function() {
//             video.play().catch(err => console.log("The video could not be played:", err));
//           };
//         })
//         .catch(console.error);
//     };

//     getVideo();
//     return () => {
//       const video = videoRef.current;
//       if (video && video.srcObject) {
//         const tracks = video.srcObject.getTracks();
//         tracks.forEach((track) => track.stop());
//         video.srcObject = null;
//       }
//     };
//   }, []);

//   return (
//     <section className="capture-image-container">
//       <div className="camera">
//         <video ref={videoRef}></video>
//         <button onClick={handleSnap} disabled={isLoading}>SNAP!</button>
//       </div>
//       <div className={"result " + (hasPhoto ? "hasPhoto" : "")}>
//         <canvas ref={photoRef}></canvas>
//         <button onClick={closePhoto}>CLOSE!</button>
//       </div>
//     </section>
//   );
// }

// export default CaptureImage;

// import React, { useRef, useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import "./CaptureImage.css";

// function CaptureImage({ setImageUploaded }) {
//   const videoRef = useRef(null);
//   const photoRef = useRef(null);
//   const [hasPhoto, setHasPhoto] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [eventCreated, setEventCreated] = useState(false);  // New state
//   const [isLoading, setIsLoading] = useState(false);
//   const dispatch = useDispatch();

//   const takePhoto = async () => {
//     const width = 414;
//     const height = width / (16 / 9);
//     const video = videoRef.current;
//     const photo = photoRef.current;
//     photo.width = width;
//     photo.height = height;
//     const ctx = photo.getContext("2d");
//     ctx.drawImage(video, 0, 0, width, height);
//     const blob = await new Promise(resolve => photo.toBlob(resolve, "image/png"));
//     console.log("Blob size before upload: ", blob.size);
//     setSelectedFile(blob);
//   };

//   const handleSubmit = async () => {
//     setIsLoading(true);
//     if (!selectedFile) return;

//     if (!eventCreated) {
//       setEventCreated(true);  // Set event as created
//     }
//     setIsLoading(false);
//     const formData = new FormData();
//     formData.append("image", selectedFile);
//     dispatch({ type: "UPLOAD_IMAGE", payload: formData });
//     setSelectedFile(null);  // Reset selected file
//     setImageUploaded(true); // Set image as uploaded

//   };

//   useEffect(() => {
//     if (selectedFile) {
//       handleSubmit();
//     }
//   }, [selectedFile]);

//   const handleSnap = () => {
//     takePhoto();
//   };

//   const closePhoto = () => {
//     const photo = photoRef.current;
//     const ctx = photo.getContext("2d");
//     ctx.clearRect(0, 0, photo.width, photo.height);
//     setHasPhoto(false);
//   };

//   useEffect(() => {
//     const getVideo = () => {
//       navigator.mediaDevices
//         .getUserMedia({ video: { width: 1920, height: 1080 } })
//         .then((stream) => {
//           const video = videoRef.current;
//           video.srcObject = stream;
//           video.play().catch(err => console.log("The video could not be played:", err));
//         })
//         .catch(console.error);
//     };

//     getVideo();
//     return () => {
//       const video = videoRef.current;
//       if (video && video.srcObject) {
//         const tracks = video.srcObject.getTracks();
//         tracks.forEach((track) => track.stop());
//         video.srcObject = null;
//       }
//     };
//   }, []);

  

//   return (
//     <section className="capture-image-container">
//       <div className="camera">
//         <video ref={videoRef}></video>
//         <button onClick={handleSnap} disabled={isLoading}>SNAP!</button>
//       </div>
//       <div className={"result " + (hasPhoto ? "hasPhoto" : "")}>
//         <canvas ref={photoRef}></canvas>
//         <button onClick={closePhoto}>CLOSE!</button>
//       </div>
//     </section>
//   );
// }

// export default CaptureImage;

// import React, { useRef, useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import "./CaptureImage.css";

// function CaptureImage() {
//   const videoRef = useRef(null);
//   const photoRef = useRef(null);
//   const uniqueToken = uuidv4();  // Using 'uuid' library

//   const response = await dispatch({
//     type: 'UPLOAD_IMAGE',
//     payload: {
//         selectedFile,
//         token: uniqueToken  // Add this
//     },
//   });

//   const currentEventId = useSelector((store) => store.eventEntries.currentEventId);
//   const [hasPhoto, setHasPhoto] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [eventCreated, setEventCreated] = useState(false);  // New state
//   const [isLoading, setIsLoading] = useState(false);
//   const dispatch = useDispatch();

//   const takePhoto = async () => {
//     const width = 414;
//     const height = width / (16 / 9);
//     const video = videoRef.current;
//     const photo = photoRef.current;
//     photo.width = width;
//     photo.height = height;
//     const ctx = photo.getContext("2d");
//     ctx.drawImage(video, 0, 0, width, height);
//     const blob = await new Promise(resolve => photo.toBlob(resolve, "image/png"));
//     console.log("Blob size before upload: ", blob.size);
//     setSelectedFile(blob);
//   };

//   const handleSubmit = async () => {
//     setIsLoading(true);
//     if (!selectedFile) return;

//     if (!eventCreated) {
//       setEventCreated(true);  // Set event as created
//     }
//     setIsLoading(false);
//     const formData = new FormData();
//     formData.append("image", selectedFile);
//     dispatch({ type: "UPLOAD_IMAGE", payload: formData });
//     setSelectedFile(null);  // Reset selected file
//   };

//   useEffect(() => {
//     if (selectedFile) {
//       handleSubmit();
//     }
//   }, [selectedFile]);

//   const handleSnap = () => {
//     takePhoto();
//   };

//   const closePhoto = () => {
//     const photo = photoRef.current;
//     const ctx = photo.getContext("2d");
//     ctx.clearRect(0, 0, photo.width, photo.height);
//     setHasPhoto(false);
//   };

//   useEffect(() => {
//     const getVideo = () => {
//       navigator.mediaDevices
//         .getUserMedia({ video: { width: 1920, height: 1080 } })
//         .then((stream) => {
//           const video = videoRef.current;
//           video.srcObject = stream;
//           video.play().catch(err => console.log("The video could not be played:", err));
//         })
//         .catch(console.error);
//     };

//     getVideo();
//     return () => {
//       const video = videoRef.current;
//       if (video && video.srcObject) {
//         const tracks = video.srcObject.getTracks();
//         tracks.forEach((track) => track.stop());
//         video.srcObject = null;
//       }
//     };
//   }, []);

//   return (
//     <section className="capture-image-container">
//       <div className="camera">
//         <video ref={videoRef}></video>
//         <button onClick={handleSnap} disabled={isLoading}>SNAP!</button>
//       </div>
//       <div className={"result " + (hasPhoto ? "hasPhoto" : "")}>
//         <canvas ref={photoRef}></canvas>
//         <button onClick={closePhoto}>CLOSE!</button>
//       </div>
//     </section>
//   );
// }

// export default CaptureImage;



// ** VERSION 1 **
// import React, { useRef, useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   HashRouter as Router,
//   Route,
//   Link,
//   useHistory,
// } from "react-router-dom";
// import "./CaptureImage.css";

// function CaptureImage() {
//   const videoRef = useRef(null);
//   const photoRef = useRef(null);

//   const currentEventId = useSelector(
//     (store) => store.eventEntries.currentEventId
//   );

//   const [hasPhoto, setHasPhoto] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);

//   const dispatch = useDispatch();

//   const history = useHistory();

// //   useEffect(() => {
// //     if (selectedFile && isUploading) {
// //       handleSubmit();
// //     }
// //   }, [selectedFile, isUploading]);

//   const getVideo = () => {
//     navigator.mediaDevices
//       .getUserMedia({
//         video: { width: 1920, height: 1080 },
//       })
//       .then((stream) => {
//         let video = videoRef.current;
//         if (video) {
//           video.srcObject = stream;
//           video.oncanplay = function () {
//             video.play().catch((err) => {
//               console.log("The video could not be played:", err);
//             });
//           };
//         } else {
//           console.error("Video element not ready");
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

// //   const takePhoto = () => {
// //     return new Promise((resolve, reject) => {
// //       const width = 414;
// //       const height = width / (16 / 9);

// //       let video = videoRef.current;
// //       let photo = photoRef.current;

// //       photo.width = width;
// //       photo.height = height;

// //       let ctx = photo.getContext("2d");
// //       ctx.drawImage(video, 0, 0, width, height);

// //       photo.toBlob((blob) => {
// //         console.log("Blob size before upload: ", blob.size);
// //         setSelectedFile(blob, handleSubmit);
// //         setIsUploading(true);
// //         resolve();
// //       }, "image/png");
// //     });
// //   };

// const takePhoto = () => {
//     return new Promise((resolve, reject) => {
//       const width = 414;
//       const height = width / (16 / 9);
  
//       let video = videoRef.current;
//       let photo = photoRef.current;
  
//       photo.width = width;
//       photo.height = height;
  
//       let ctx = photo.getContext("2d");
//       ctx.drawImage(video, 0, 0, width, height);
  
//       photo.toBlob((blob) => {
//         console.log("Blob size before upload: ", blob.size);
//         setSelectedFile(blob);
//         setIsUploading(true);
//         resolve();
//       }, "image/png");
//     });
//   };
  
//   // Add this useEffect
//   useEffect(() => {
//     if (selectedFile && isUploading) {
//       handleSubmit();
//     }
//   }, [selectedFile, isUploading]);
  

//   const handleSubmit = async () => {
//     if (!selectedFile) {
//       console.error("No file selected for upload");
//       return;
//     }

//     // If there's no current event ID, create a new event entry
//     if (!currentEventId) {
//       dispatch({ type: 'CREATE_NEW_EVENT' });
//     }

//     const formData = new FormData();
//     formData.append("image", selectedFile);
//     const result = await dispatch({ type: "UPLOAD_IMAGE", payload: formData });
//     if (result.type === "UPLOAD_IMAGE_SUCCESS") {
//       dispatch({
//         type: "SET_CURRENT_EVENT_ID",
//         payload: result.payload.eventId,
//       });
//     }
//     setSelectedFile(null);
//     setIsUploading(false);
//   };

//   const handleSnap = async () => {
//     await takePhoto();
//   };

//   const closePhoto = () => {
//     let photo = photoRef.current;
//     let ctx = photo.getContext("2d");

//     ctx.clearRect(0, 0, photo.width, photo.height);

//     setHasPhoto(false);
//   };

//   useEffect(() => {
//     getVideo();
//     return () => {
//       const video = videoRef.current;
//       if (video && video.srcObject) {
//         const tracks = video.srcObject.getTracks();
//         tracks.forEach((track) => {
//           track.stop();
//         });
//         video.srcObject = null;
//       }
//     };
//   }, [dispatch]);

// //   const goToSee = () => {
// //     history.push("/first-see");
// //   };

//   return (
//     <section className="capture-image-container">
//       <div className="camera">
//         <video ref={videoRef}></video>
//         <button onClick={handleSnap}>SNAP!</button>
//       </div>
//       <div className={"result " + (hasPhoto ? "hasPhoto" : "")}>
//         <canvas ref={photoRef}></canvas>
//         <button onClick={closePhoto}>CLOSE!</button>
//       </div>
//       <br />
//     </section>
//   );
// }

// export default CaptureImage;
