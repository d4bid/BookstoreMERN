import React from "react";
import ImageGallery from "./Admin/Gallery/ImageGallery";

const UserGallery = () => {
  return (
    <div>
      <ImageGallery isAdmin={false} toDestination="/photobooth" />
    </div>
  );
};

export default UserGallery;
