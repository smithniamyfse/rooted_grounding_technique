import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import AccessDeviceSwitch from "../AccessDeviceSwitch/AccessDeviceSwitch";
import "./CaptureImage.css";

function CaptureImage() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [cameraAccess, setCameraAccess] = useState(false);

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
        if (video) {
          video.srcObject = stream;
          video.oncanplay = function () {
            video.play().catch((err) => {
              console.log("The video could not be played:", err);
            });
          };
        } else {
          console.error("Video element not ready");
        }
      })
      .catch((err) => {
        console.error(err);
        console.log("Camera permission was denied");
        setCameraAccess(false); // Set the camera access to false
      });
  };

  const toggleCameraAccess = (allowAccess) => {
    if (allowAccess) {
      getVideo(); // Enable camera
    } else {
      const video = videoRef.current;
      if (video && video.srcObject) {
        const tracks = video.srcObject.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
        video.srcObject = null;
      }
    }
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
      }, "image/png");
    });
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      console.error("No file selected for upload");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    const result = await dispatch({ type: "UPLOAD_IMAGE", payload: formData });
    if (result.type === "UPLOAD_IMAGE_SUCCESS") {
      dispatch({
        type: "SET_CURRENT_EVENT_ID",
        payload: result.payload.eventId,
      });
      dispatch({ type: "SAVE_IMAGE_URL", payload: result.payload.imageUrl });
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
      <div className="capture-image-center">
        <FormGroup>
          <FormControlLabel
            control={
              <AccessDeviceSwitch
                checked={cameraAccess}
                onChange={() => {
                  const newCameraAccess = !cameraAccess;
                  setCameraAccess(newCameraAccess);
                  toggleCameraAccess(newCameraAccess);
                }}
              />
            }
            label="Camera Access"
          />
        </FormGroup>
        <div className="camera">
          <video ref={videoRef}></video>
          {/* <Button
            variant="outlined"
            onClick={handleSnap}
            sx={{
              "& .MuiButton-startIcon": { margin: "0px" },
              minWidth: 0,
              backgroundColor: "#000000",
            }}
          > */}
          <IconButton
                variant="outlined"
                onClick={handleSnap}
                sx={{
                    backgroundColor: "#32a852",
                  }}
                >
            <PhotoCameraIcon />
            </IconButton>
         {/* </Button> */}
          {/* <button onClick={handleSnap}>SNAP!</button> */}
        </div>
        <div className={"result " + (hasPhoto ? "hasPhoto" : "")}>
          <canvas ref={photoRef}></canvas>
          {/* <button onClick={closePhoto}>CLOSE!</button> */}
        </div>
      </div>
    </section>
  );
}
export default CaptureImage;
