import React, { useState, useEffect } from "react";
import { AiOutlineTrophy } from "react-icons/ai";
import Modal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";

{/* change image here */}
import us from "../assets/us.jpg";


Modal.setAppElement("#root");

const CompletionButton = ({ destination }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {

    const img = new Image();
    img.src = "path_to_your_image";
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };

    return () => {
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
          overlay: {
            background: "rgba(0, 0, 0, 0.5)"
          },
          content: {
            width: imageDimensions.width > 0 ? `${imageDimensions.width}px` : "80%",
            height: imageDimensions.height > 0 ? `${imageDimensions.height}px` : "50%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            border: "none",
          },
        }}
      >
        <AnimatePresence>
          {modalIsOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <img src={us} alt="Image" style={{ display: "block", margin: "0", padding: "0" }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>
    </div>
  );
};

export default CompletionButton;
