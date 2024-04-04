import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import FrameCard from "../../components/Frames/FrameCard";
import AddFrameModal from "./AddFrameModal"; // Import the modal component
import EditFrameModal from './EditFrameModal';
import ConfirmDialog from '../../components/ConfirmDialog'; // Import the ConfirmDialog component

const FrameList = () => {
  const [frames, setFrames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFrameId, setSelectedFrameId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmFrameId, setConfirmFrameId] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchFrames();
    window.addEventListener('newFrameAdded', fetchFrames); // Listen to 'newFrameAdded' event
    return () => {
      window.removeEventListener('newFrameAdded', fetchFrames); // Cleanup
    };
  }, []);

  const fetchFrames = async () => {
    try {
      const response = await axios.get("http://localhost:5555/frames");
      setFrames(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setConfirmFrameId(id); // Set the frame ID to be deleted
    setIsConfirmOpen(true); // Open the confirmation dialog
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5555/frames/${confirmFrameId}`);
      setFrames(frames.filter((frame) => frame._id !== confirmFrameId));
      setLoading(false);
      setIsConfirmOpen(false); // Close the confirmation dialog
    } catch (error) {
      console.log(error);
      setLoading(false);
      setIsConfirmOpen(false); // Close the confirmation dialog
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false); // Close the confirmation dialog without deleting
  };

  const handleEdit = (id) => {
    setSelectedFrameId(id);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Frames List</h1>
        <div className="flex space-x-4">
          <button onClick={() => setIsAddModalOpen(true)}>
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </button>
        </div>
      </div>
      {isAddModalOpen && <AddFrameModal onClose={handleCloseAddModal} />}
      {isEditModalOpen && <EditFrameModal frameId={selectedFrameId} onClose={handleCloseEditModal} />}
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {frames.map((frame) => (
            <FrameCard
              key={frame._id}
              frame={frame}
              onDelete={() => handleDelete(frame._id)}
              onEdit={handleEdit} // Pass the handleEdit function
            />
          ))}
        </div>
      )}

      {/* ConfirmDialog component */}
      <ConfirmDialog
        title="Confirm Delete"
        message="Are you sure you want to delete this frame?"
        isOpen={isConfirmOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default FrameList;
