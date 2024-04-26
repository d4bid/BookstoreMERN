import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import PreviewModal from './PhotoBooth/PreviewModal'; // Import PreviewModal
import { MdCheck } from "react-icons/md";

const PhotoCard = ({ image, alt, checklistMode, onSelectImage, isSelected }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (!checklistMode) {
      setIsModalOpen(true);
    } else {
      onSelectImage();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }} className="m-4 relative cursor-pointer text-left" onClick={handleClick}>
        <CardActionArea>
          {image && (
            <CardMedia
              component="img"
              height="140"
              image={`data:image/png;base64,${image}`}
              alt={alt}
              className="border-2 border-gray-400 w-40 h-40 object-cover mb-2 mx-auto"
            />
          )}
          {checklistMode && isSelected && (
            <div className="absolute top-2 right-2 bg-green-500 rounded-full h-6 w-6 flex justify-center items-center text-white">
              <MdCheck className="h-4 w-4" />
            </div>
          )}
        </CardActionArea>
      </Card>
      {isModalOpen && <PreviewModal imageSrc={`data:image/png;base64,${image}`} onClose={handleCloseModal} />}
    </>
  );
};

export default PhotoCard;
