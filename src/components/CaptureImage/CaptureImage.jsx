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
            dispatch({ type: 'SAVE_IMAGE_URL', payload: result.payload.imageUrl });
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