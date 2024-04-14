import { useState } from "react";
import PartnerInfoModal from "../../components/Partners/PartnerInfoModal";

const PartnerSingleCard = ({ partner, isAdmin = false }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl cursor-pointer" onClick={handleOpenModal}>
      {partner.image && (
        <img src={`data:image/png;base64,${partner.image}`} alt={partner.name} className="w-full h-40 object-cover rounded-lg mb-2" />
      )}
      <div className="flex justify-start items-center gap-x-2">
        <h2 className="my-1">{partner.name}</h2>
      </div>
      {showModal && <PartnerInfoModal partner={partner} onClose={handleCloseModal} isAdmin={isAdmin} />}
    </div>
  );
};

export default PartnerSingleCard;
