import React, { useRef, useState } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import FrameSelector from '../../components/PhotoBooth/FrameSelector';
import CaptureButton from '../../components/PhotoBooth/CaptureButton';
import PreviewModal from '../../components/PhotoBooth/PreviewModal';
import BackButton from '../../components/BackButtonHome';
import { useSnackbar } from 'notistack';

const PBMainPage = () => {
  const webcamRef = useRef(null);

  const [selectedFrame, setSelectedFrame] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSelectFrame = (frame) => {
    setSelectedFrame(frame);
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      if (selectedFrame) {
        const frameImage = new Image();
        frameImage.src = selectedFrame;

        frameImage.onload = () => {
          ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);

          const newImageSrc = canvas.toDataURL('image/jpeg');
          setCapturedImage(newImageSrc);
          setIsPreviewOpen(true);
        };
      } else {
        const newImageSrc = canvas.toDataURL('image/jpeg');
        setCapturedImage(newImageSrc);
        setIsPreviewOpen(true);
      }
    };
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  const handleSaveImage = async () => {
    try {
      const response = await axios.post('http://localhost:5555/photos/save-image', { imageData: capturedImage });
      const { imagePath } = response.data;
      enqueueSnackbar(`Image saved successfully at ${imagePath}`, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(`Failed to save image`, { variant: 'error' });
    }
  };

  const handleSendEmail = async () => {
    const email = prompt('Enter recipient email:');
    if (!email) return;

    const subject = 'Captured Image from Photo Booth';
    const text = 'Please find the captured image attached.';
    const imagePath = capturedImage;

    try {
      const response = await axios.post('http://localhost:5555/photos/send-email', {
        to: email,
        subject,
        text,
        imagePath,
      });
      enqueueSnackbar('Email sent successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to send email', { variant: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white-500">
      <h2>Photo Booth</h2>
      <div className="relative mb-4">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="mb-4"
          style={{ width: '100vw', height: 'auto', transform: 'scaleX(-1)' }}
        />
        {selectedFrame && (
          <img
            src={selectedFrame}
            alt="Selected Frame"
            className="absolute bottom-0 left-0 w-full h-full"
            style={{ width: '100%' }}
          />
        )}
      </div>
      <FrameSelector onSelectFrame={handleSelectFrame} />
      <CaptureButton onCapture={handleCapture} />
      {isPreviewOpen && (
        <PreviewModal
          imageSrc={capturedImage}
          onClose={handleClosePreview}
          onSave={handleSaveImage}
          onSendEmail={handleSendEmail}  // Passing handleSendEmail here
        />
      )}
       <BackButton destination="/home" />
    </div>

  );
};

export default PBMainPage;
