import React, { useState, useEffect } from "react";
import { AiOutlineTrophy } from "react-icons/ai";
import Modal from "react-modal";
import us from "../assets/under_dev.png"
// Set the app element
Modal.setAppElement("#root");

const CompletionButton = ({ destination }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Fetch image dimensions
    const img = new Image();
    img.src = "path_to_your_image";
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };

    return () => {
      // Clean up function to close the modal when the component unmounts
      setModalIsOpen(false);
    };
  }, []);

  return (
    <div className="flex">
      <button
        className="bg-white text-red-500 rounded-full p-4 flex items-center justify-center"
        style={{ width: "20vw", height: "20vw", padding: "2rem", margin: "0 10px" }}
        onClick={() => setModalIsOpen(true)}
      >
        <AiOutlineTrophy className="h-10 sm:h-12 md:h-16 lg:h-20 xl:h-23 w-auto" />
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            width: imageDimensions.width > 0 ? `${imageDimensions.width}px` : "80%",
            height: imageDimensions.height > 0 ? `${imageDimensions.height}px` : "50%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img src={us} alt="Image" style={{ display: "block", margin: "auto" }} />
        </div>
      </Modal>
    </div>
  );
};

export default CompletionButton;
