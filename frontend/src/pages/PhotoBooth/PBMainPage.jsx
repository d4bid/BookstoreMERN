import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import FrameSelector from "../../components/PhotoBooth/FrameSelector";
import CaptureButton from "../../components/PhotoBooth/CaptureButton";
import GalleryButton from "../../components/PhotoBooth/GalleryButton";
import PreviewModal from "../../components/PhotoBooth/PreviewModal";
import BackButton from "../../components/BackButtonHome";
import Spinner from "../../components/Spinner";
import { useSnackbar } from "notistack";
import hytecLogo from "../../assets/hytecLogo.png";
import Timer from "../../components/PhotoBooth/Timer";
import CountdownVideo from "../../assets/Countdown.mp4"; //


const PBMainPage = () => {
  const webcamRef = useRef(null);

  const [selectedFrame, setSelectedFrame] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false); // Manage visibility of countdown timer
  const [showCaptureButton, setShowCaptureButton] = useState(true);
  const [showFrameSelector, setShowFrameSelector] = useState(true);
  const [showBackButton, setshowBackButton] = useState(true);
  const [showGalleryButton, setshowGalleryButton] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [flashVisible, setFlashVisible] = useState(false);

  useEffect(() => {
    const loadCamera = async () => {
      // Simulate camera loading delay (You can replace this with actual camera loading logic)
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    loadCamera();
  }, []);

  const handleSelectFrame = (frame) => {
    setSelectedFrame(frame);
  };
  const toggleFrameSelector = () => {
    setShowFrameSelector(prevState => !prevState);
  };
  const handleCapture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = image.width;
      canvas.height = image.height;

      // Draw the image onto the canvas
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Create a new canvas for flipped image
      const flippedCanvas = document.createElement("canvas");
      const flippedCtx = flippedCanvas.getContext("2d");

      flippedCanvas.width = canvas.width;
      flippedCanvas.height = canvas.height;

      // Flip the image horizontally
     // flippedCtx.translate(flippedCanvas.width, 0);
      //flippedCtx.scale(-1, 1);
      flippedCtx.drawImage(
        image,
        0,
        0,
        flippedCanvas.width,
        flippedCanvas.height
      );

      if (selectedFrame) {
        const frameCanvas = document.createElement("canvas");
        const frameCtx = frameCanvas.getContext("2d");

        frameCanvas.width = canvas.width;
        frameCanvas.height = canvas.height;

        const frameImage = new Image();
        frameImage.src = selectedFrame;

        frameImage.onload = () => {
          // Draw the flipped image onto the frame canvas
          frameCtx.drawImage(
            flippedCanvas,
            0,
            0,
            frameCanvas.width,
            frameCanvas.height
          );

          // Draw the frame on top of the flipped image
          frameCtx.drawImage(
            frameImage,
            0,
            0,
            frameCanvas.width,
            frameCanvas.height
          );

          const newImageSrc = frameCanvas.toDataURL("image/jpeg");
          setCapturedImage(newImageSrc);
          handleSaveImage(newImageSrc); // Save the image
          setIsPreviewOpen(true);
        };
      } else {
        const newImageSrc = flippedCanvas.toDataURL("image/jpeg");
        setCapturedImage(newImageSrc);
        handleSaveImage(newImageSrc); // Save the image
        setIsPreviewOpen(true);
      }
    };
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setShowFrameSelector(true);
  };

  const handleSaveImage = async (imageData) => {
    try {
      const response = await axios.post(
        "http://localhost:5555/photos/save-image",
        { imageData }
      );
      const { imagePath } = response.data;
      enqueueSnackbar(`Image saved successfully at /Desktop/PhotoBoothPhotos`, {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(`Failed to save image`, { variant: "error" });
    }
  };

  const handleCountdown = () => {
    setShowFrameSelector(false);
    setShowCountdown(true);
    setShowCaptureButton(false);
    setshowBackButton(false);
    setshowGalleryButton(false);
  };

  const handleCountdownEnd = () => {
    // Trigger flash effect
    setFlashVisible(true);
    //setFlashVisible(false);
    setTimeout(() => {
      setFlashVisible(false);
      handleCapture(); // Capture photo
      setShowFrameSelector(false);
      setShowCountdown(false); // Hide countdown timer
      setshowBackButton(true); // Make frame selector reappear
      setShowCaptureButton(true);
      setshowGalleryButton(true);
    }, 100); // Adjust the delay time as needed
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white-500">
        <Spinner /> {/* Centered Spinner */}
      </div>
    );
  }


  return (
    <div
      className="flex flex-col items-center justify-center bg-white-500"
      style={{ touchAction: "none", msTouchAction: "none", minHeight: "100vh" }}
    >
      {/* <div className="absolute top-0 left-0 mt-4 ml-4" style={{width:'10vw', height:'auto'}}>

      </div> */}

      <div className="flex-grow"></div>

      <div className="flex-grow" style={{ maxWidth: "40vw" }}>
        <img src={hytecLogo} alt="Photo Booth" />
      </div>

      <div className="flex flex-col items-center justify-start">
        <div
          className="relative mb-8"
          style={{ width: "80vw", maxWidth: "1536px" }}
        >
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="mb-4"
            style={{
              width: "100%",
              height: "auto",
              //transform: "scaleX(-1)",
              position: "relative",
            }}
          />

          {flashVisible && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "white",
                animation: "flashAnimation 2s linear",
              }}
            />
          )}

          {selectedFrame && (
            <img
              src={selectedFrame}
              alt="Selected Frame"
              className="absolute bottom-0 left-0 w-full h-full"
              style={{ width: "100%" }}
            />
          )}
        </div>
      </div>

      <div style={{ flex: 1 }}></div>
      {showCountdown && (
        <Timer durationInSeconds={7} onCountdownEnd={handleCountdownEnd} />
      )}

      {showFrameSelector && (
        <div className="mt-auto mb-8 ">
          <FrameSelector onSelectFrame={handleSelectFrame} />
        </div>
      )}
      <div style={{ flex: 1 }}></div>
      <div className="w-full flex items-center justify-between">
        {showBackButton && <BackButton destination="/home" />}
        <div className="flex-grow"></div>{" "}
        {/* Empty flex item to push the next component */}
        {showCaptureButton && <CaptureButton onCapture={handleCountdown} />}
        <div className="flex-grow"></div>{" "}
        {/* Empty flex item to push the last component */}
        {showGalleryButton && <GalleryButton toggleFrameSelector={toggleFrameSelector}/>}
         </div>

      {isPreviewOpen && (
        <PreviewModal
          imageSrc={capturedImage}
          onClose={handleClosePreview}
          onSave={handleSaveImage}
        />
      )}
    </div>
  );
};

export default PBMainPage;
