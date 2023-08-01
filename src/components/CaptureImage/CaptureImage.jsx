import React, { useRef, useEffect, useState } from "react";
import './CaptureImage.css';

function CaptureImage() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = () => {
    navigator.mediaDevices.getUserMedia({
      video: { width: 1920, height: 1080 },
    })
    .then(stream => {
        let video = videoRef.current; 
        video.srcObject = stream;
        video.play();
    })
    .catch(err => {
        console.error(err);
    })
  };

  const takePhoto = () => {
    const width = 414;
    const height = width / (16/9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width; 
    photo.height = height;

    let ctx = photo.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);

    setHasPhoto(true);
  }

  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext('2d');
    
    ctx.clearRect(0, 0, photo.width, photo.height);

    setHasPhoto(false);

  }

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <section className="capture-image-container">
      <div className="camera">
        <video ref={videoRef}></video>
        <button onClick={takePhoto}>SNAP!</button>
      </div>
      <div className={"result " + (hasPhoto ? "hasPhoto" : "")}>
        <canvas ref={photoRef}></canvas>
        <button onClick={closePhoto}>CLOSE!</button>
      </div>
    </section>
  );
}

export default CaptureImage;





// ** VERSION 5 **
// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// function CaptureImage() {
//   const videoRef = useRef(null);
//   const [streaming, setStreaming] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const imageUrls = useSelector((state) => state.image);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const width = 320;
//   let height = 0;

//   const dispatch = useDispatch();
//   let imageCapture;

//   useEffect(() => {
//     startup();
//     return () => {
//       if(videoRef.current && videoRef.current.srcObject){
//         const tracks = videoRef.current.srcObject.getTracks();
//         tracks.forEach(track => track.stop());
//       }
//     };
//   }, []);

//   const startup = async () => {
//     setLoading(true);
//     if(!videoRef.current) return;
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
//     videoRef.current.srcObject = stream;
//     videoRef.current.onloadedmetadata = (e) => {
//       videoRef.current.play().catch((err) => {
//         console.error("Play video error:", err);
//       });
//     };

//     const track = stream.getVideoTracks()[0];
//     imageCapture = new ImageCapture(track);

//     videoRef.current.addEventListener(
//       "canplay",
//       (ev) => {
//         if (!streaming) {
//           height = videoRef.current.videoHeight / (videoRef.current.videoWidth / width);
//           if (isNaN(height)) {
//             height = width / (4 / 3);
//           }
//           videoRef.current.setAttribute("width", width);
//           videoRef.current.setAttribute("height", height);
//           setStreaming(true);
//           setLoading(false);
//         }
//       },
//       false
//     );
//   };

//   const takePicture = async () => {
//     if (!imageCapture) {
//       console.log('Start camera first');
//       return;
//     }

//     imageCapture.takePhoto().then(blob => {
//       const imgUrl = URL.createObjectURL(blob);
//       console.log("Image Data URL: ", imgUrl);
//       setCapturedImage(imgUrl);
//       const formData = new FormData();
//       formData.append('image', blob);
//       dispatch({ type: 'UPLOAD_IMAGE', payload: formData });
//     }).catch(error => console.error('Error capturing photo', error));
//   };

//   useEffect(() => {
//     dispatch({ type: 'FETCH_USER_IMAGE' });
//   }, [dispatch]);

//   return (
//     <div>
//       <div>
//         <button onClick={takePicture} disabled={loading || !streaming}>Take a photo</button>
//         <video ref={videoRef}>Video stream not available.</video>
//         {imageUrls.map((url, i) => (
//           <img key={i} src={url} alt="Uploaded" />
//         ))}
//         {capturedImage && <img src={capturedImage} alt="Captured" />}
//       </div>
//     </div>
//   );
// }

// export default CaptureImage;

// ** VERSION 4 **
// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// function CaptureImage() {
//   const videoRef = useRef(null);
//   const [streaming, setStreaming] = useState(false);
//   const imageUrls = useSelector((state) => state.image);
//   const [capturedImage, setCapturedImage] = useState(null); // state for the user's captured image
//   const width = 320;
//   let height = 0;

//   const dispatch = useDispatch();

//   useEffect(() => {
//     startup();
//   }, []);

//   const startup = () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: false })
//       .then((stream) => {
//         videoRef.current.srcObject = stream;
//         videoRef.current.onloadedmetadata = (e) => {
//           videoRef.current.play().then(() => {
//             console.log("Video is playing"); // Check if video is playing
//           }).catch((err) => {
//             console.error("Play video error:", err);
//           });
//         };
//       })
//       .catch((err) => {
//         console.error("An error occurred: ", err);
//       });

//     videoRef.current.addEventListener(
//       "canplay",
//       (ev) => {
//         if (!streaming) {
//           height = videoRef.current.videoHeight / (videoRef.current.videoWidth / width);
//           if (isNaN(height)) {
//             height = width / (4 / 3);
//           }
//           videoRef.current.setAttribute("width", width);
//           videoRef.current.setAttribute("height", height);
//           setStreaming(true);
//         }
//       },
//       false
//     );
//   };

//   const takePicture = async () => { // make this function async
//     console.log("Take picture button clicked"); // Check if the button click is working
//     const canvas = document.createElement("canvas");
//     const context = canvas.getContext("2d");
//     if (width && height) {
//       canvas.width = width;
//       canvas.height = height;
//       context.drawImage(videoRef.current, 0, 0, width, height);

//       const imgUrl = canvas.toDataURL("image/png");
//       console.log("Image Data URL: ", imgUrl); // Log the image data URL
//       setCapturedImage(imgUrl); // set the imgUrl to state
//       const blob = await fetch(imgUrl).then(r => r.blob());

//       const formData = new FormData();
//       formData.append('image', blob);

//       dispatch({ type: 'UPLOAD_IMAGE', payload: formData });
//     }
//   };

//   useEffect(() => {
//     dispatch({ type: 'FETCH_IMAGES' }); // Fetches all the images for the user
//   }, [dispatch]);

//   return (
//     <div>
//       <div>
//         <button onClick={takePicture}>Take a photo</button>
//         <video ref={videoRef}>Video stream not available.</video>
//         {/* Render the user's captured image */}
//         {/* Display the uploaded images */}
//       {imageUrls.map((url, i) => (
//         <img key={i} src={url} alt="Uploaded" />
//       ))}
//         {capturedImage && <img src={capturedImage} alt="Captured" />}
//       </div>
//     </div>
//   );
// }

// export default CaptureImage;

// ** VERSION 3 **
// import React, { useEffect, useRef } from "react";

// function CaptureImage() {
//     const videoRef = useRef(null);

//     useEffect(() => {
//       getVideo();
//     }, [videoRef]);

//     const getVideo = () => {
//         navigator.mediaDevices
//           .getUserMedia({ video: { width: 300 } })
//           .then(stream => {
//             let video = videoRef.current;
//             video.srcObject = stream;
//             video.onloadedmetadata = function(e) {
//               let playPromise = video.play();

//               if (playPromise !== undefined) {
//                 playPromise
//                   .then(() => {
//                     // Automatic playback started!
//                     // Any additional actions can go here.
//                   })
//                   .catch(error => {
//                     // Auto-play was prevented
//                     // Additional handling can go here.
//                     console.error("Video play failed.", error);
//                   });
//               }
//             };
//           })
//           .catch(err => {
//             console.error("error:", err);
//           });
//       };

//       const takePhoto = () => {
//         let photo = photoRef.current;
//         let strip = stripRef.current;
//         let video = videoRef.current;
//         let ctx = photo.getContext("2d");

//         const width = 320;
//         const height = 240;
//         photo.width = width;
//         photo.height = height;

//         const data = photo.toDataURL("image/jpeg");

//         const link = document.createElement("a");
//         link.href = data;
//         link.setAttribute("download", "myWebcam");
//         link.innerHTML = `<img src='${data}' alt='thumbnail'/>`;
//         strip.insertBefore(link, strip.firstChild);
//       };

//     return (
//       <div>
//         <div>
//         <button onClick={() => takePhoto()}>Take a photo</button>
//           <video ref={videoRef} />
//         </div>
//       </div>
//     );
//   };

// export default CaptureImage;

// ** VERSION 2 - SCRAPPED react-camera-pro library **
// import React, { useEffect, useRef, useState } from "react";
// import styled, { css } from "styled-components";
// import { Camera } from "react-camera-pro";
// import './CaptureImage.css';

// const Wrapper = styled.div`
//   position: fixed;
//   width: 100%;
//   height: 100%;
//   z-index: 1;
// `;

// const Control = styled.div`
//   position: fixed;
//   display: flex;
//   right: 0;
//   width: 20%;
//   min-width: 130px;
//   min-height: 130px;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.8);
//   z-index: 10;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 50px;
//   box-sizing: border-box;
//   flex-direction: column-reverse;

//   @media (max-aspect-ratio: 1/1) {
//     flex-direction: row;
//     bottom: 0;
//     width: 100%;
//     height: 20%;
//   }

//   @media (max-width: 400px) {
//     padding: 10px;
//   }
// `;

// const Button = styled.button`
//   outline: none;
//   color: white;
//   opacity: 1;
//   background: transparent;
//   background-color: transparent;
//   background-position-x: 0%;
//   background-position-y: 0%;
//   background-repeat: repeat;
//   background-image: none;
//   padding: 0;
//   text-shadow: 0px 0px 4px black;
//   background-position: center center;
//   background-repeat: no-repeat;
//   pointer-events: auto;
//   cursor: pointer;
//   z-index: 2;
//   filter: invert(100%);
//   border: none;

//   &:hover {
//     opacity: 0.7;
//   }
// `;

// const TakePhotoButton = styled(Button)`
//   background: url("https://img.icons8.com/ios/50/000000/compact-camera.png");
//   background-position: center;
//   background-size: 50px;
//   background-repeat: no-repeat;
//   width: 80px;
//   height: 80px;
//   border: solid 4px black;
//   border-radius: 50%;

//   &:hover {
//     background-color: rgba(0, 0, 0, 0.3);
//   }
// `;

// const ChangeFacingCameraButton = styled(Button)`
//   background: url(https://img.icons8.com/ios/50/000000/switch-camera.png);
//   background-position: center;
//   background-size: 40px;
//   background-repeat: no-repeat;
//   width: 40px;
//   height: 40px;
//   padding: 40px;
//   &:disabled {
//     opacity: 0;
//     cursor: default;
//     padding: 60px;
//   }
//   @media (max-width: 400px) {
//     padding: 40px 5px;
//     &:disabled {
//       padding: 40px 25px;
//     }
//   }
// `;

// const ImagePreview = styled.div`
//   width: 120px;
//   height: 120px;
//   background-size: contain;
//   background-repeat: no-repeat;
//   background-position: center;

//   ${({ $image }) =>
//     $image &&
//     css`
//       background-image: url(${$image});
//     `}

//   @media (max-width: 400px) {
//     width: 50px;
//     height: 120px;
//   }
// `;

// const FullScreenImagePreview = styled.div`
//   width: 100%;
//   height: 100%;
//   z-index: 100;
//   position: absolute;
//   background-color: black;
//   background-size: contain;
//   background-repeat: no-repeat;
//   background-position: center;

//   ${({ $image }) =>
//     $image &&
//     css`
//       background-image: url(${$image});
//     `}
// `;

// function CaptureImage() {
//   const [numberOfCameras, setNumberOfCameras] = useState(0);
//   const [image, setImage] = useState(null);
//   const [showImage, setShowImage] = useState(false);
//   const camera = useRef(null);
//   const [devices, setDevices] = useState([]);
//   const [activeDeviceId, setActiveDeviceId] = useState(undefined);

//   useEffect(() => {
//     (async () => {
//       const devices = await navigator.mediaDevices.enumerateDevices();
//       const videoDevices = devices.filter((i) => i.kind == "videoinput");
//       setDevices(videoDevices);
//     })();
//   }, []);

//   return (
//     <Wrapper>
//       {showImage ? (
//         <FullScreenImagePreview
//           $image={image}
//           onClick={() => {
//             setShowImage(!showImage);
//           }}
//         />
//       ) : (
//         <Camera
//           ref={camera}
//           aspectRatio="cover"
//           numberOfCamerasCallback={(i) => setNumberOfCameras(i)}
//           videoSourceDeviceId={activeDeviceId}
//           errorMessages={{
//             noCameraAccessible:
//               "No camera device accessible. Please connect your camera or try a different browser.",
//             permissionDenied:
//               "Permission denied. Please refresh and give camera permission.",
//             switchCamera:
//               "It is not possible to switch camera to different one because there is only one video device accessible.",
//             canvas: "Canvas is not supported.",
//           }}
//           videoReadyCallback={() => {
//             console.log("Video feed ready.");
//           }}
//         />
//       )}
//       <Control>
//         <select
//           onChange={(event) => {
//             setActiveDeviceId(event.target.value);
//           }}
//         >
//           {devices.map((d) => (
//             <option key={d.deviceId} value={d.deviceId}>
//               {d.label}
//             </option>
//           ))}
//         </select>
//         <ImagePreview
//           $image={image}
//           onClick={() => {
//             setShowImage(!showImage);
//           }}
//         />
//         <TakePhotoButton
//           onClick={() => {
//             if (camera.current) {
//               const photo = camera.current.takePhoto();
//               console.log(photo);
//               setImage(photo);
//             }
//           }}
//         />
//         <ChangeFacingCameraButton
//           disabled={numberOfCameras <= 1}
//           onClick={() => {
//             if (camera.current) {
//               const result = camera.current.switchCamera();
//               console.log(result);
//             }
//           }}
//         />
//       </Control>
//     </Wrapper>
//   );
// }

// export default CaptureImage;

// ** VERSION 1 **
// import React, { useState, useRef } from "react";
// import {Camera} from "react-camera-pro";

// function CaptureImage() {
//   const camera = useRef(null);
//   const [image, setImage] = useState(null);

//   return (
//     <div>
//       <Camera ref={camera} />
//       <button onClick={() => setImage(camera.current.takePhoto())}>Take photo</button>
//       <img src={image} alt='Taken photo'/>
//     </div>
//   );
// }

// export default CaptureImage;
