import { useState, useRef, useEffect } from "react";
import axios from "axios";

const PartnerInfoModal = ({ partner, onClose, showDeleteButton = false }) => {
  const modalRef = useRef(null);
  const [editedPartner, setEditedPartner] = useState(partner);

  const handleCloseModal = () => {
    onClose();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedPartner({
      ...editedPartner,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`/api/partners/${partner._id}`, editedPartner);
      if (response.status === 200) {
        alert('Partner updated successfully');
        onClose();
      }
    } catch (error) {
      alert('Error updating partner');
      console.log(error.message);
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg w-70vw p-6">
        <button className="absolute top-4 right-4 text-xl text-gray-500" onClick={handleCloseModal}>
          &times;
        </button>
        {editedPartner.image && (
          <img src={`data:image/png;base64,${editedPartner.image}`} alt={editedPartner.name} className="w-full h-40 object-cover rounded-lg mb-4" />
        )}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">{editedPartner.name}</h2>
          <p className="text-gray-600">{editedPartner.type}</p>
        </div>
        <div className="mb-2">
          <h3 className="text-lg font-semibold mb-1">Name</h3>
          <input
            type="text"
            name="name"
            value={editedPartner.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-2">
          <h3 className="text-lg font-semibold mb-1">Type</h3>
          <input
            type="text"
            name="type"
            value={editedPartner.type}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-2">
          <h3 className="text-lg font-semibold mb-1">Address</h3>
          <input
            type="text"
            name="address"
            value={editedPartner.address || ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            placeholder="No address provided"
          />
        </div>
        <div className="mb-2">
          <h3 className="text-lg font-semibold mb-1">Contact</h3>
          <input
            type="text"
            name="contact"
            value={editedPartner.contact || ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            placeholder="No contact provided"
          />
        </div>
        <div className="mb-2">
          <h3 className="text-lg font-semibold mb-1">Email</h3>
          <input
            type="text"
            name="email"
            value={editedPartner.email || ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            placeholder="No email provided"
          />
        </div>
        <div className="mb-2">
          <h3 className="text-lg font-semibold mb-1">Website</h3>
          <input
            type="text"
            name="website"
            value={editedPartner.website || ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            placeholder="No website provided"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnerInfoModal;
