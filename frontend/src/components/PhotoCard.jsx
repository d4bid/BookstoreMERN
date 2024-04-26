import React, { useState } from 'react';  // <-- Don't forget to import useState
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import PreviewModal from './PhotoBooth/PreviewModal'; // Import PreviewModal

const PhotoCard = ({ image, alt }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal open/close

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }} className="m-4 relative cursor-pointer text-left" onClick={handleCardClick}>
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
        </CardActionArea>
      </Card>
      {/* PreviewModal */}
      {isModalOpen && <PreviewModal imageSrc={`data:image/png;base64,${image}`} onClose={handleCloseModal} />}
    </>
  );
};

export default PhotoCard;
