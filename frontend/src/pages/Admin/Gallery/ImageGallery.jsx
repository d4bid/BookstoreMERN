import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../../components/Spinner";
import PhotoCard from "../../../components/PhotoCard"; // Import the PhotoCard component

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchImages();
    window.addEventListener('newImagesAdded', fetchImages);
    return () => {
      window.removeEventListener('newImagesAdded', fetchImages);
    };
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:5555/photos"); // Changed the API endpoint
      setImages(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Gallery</h1>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {images.map((image) => (
            <div
              key={image._id}
              className="flex justify-center"
            >
              <PhotoCard
                image={image.image}
                alt={image.alt} // Assuming the alt text is stored in the image object
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
