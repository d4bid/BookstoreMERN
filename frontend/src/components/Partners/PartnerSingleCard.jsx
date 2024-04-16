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
    <div className="rounded-full px-4 py-2 m-4 relative cursor-pointer text-center" onClick={handleOpenModal}>
      {partner.image && (
        <img src={`data:image/png;base64,${partner.image}`} alt={partner.name} className="border-2 border-gray-400 w-40 h-40 object-cover rounded-full mb-2 mx-auto" />
      )}
      <div className="flex justify-center items-center gap-x-2">
        <h2 className="text-2xl">{partner.name}</h2>
      </div>
      {showModal && <PartnerInfoModal partner={partner} onClose={handleCloseModal} isAdmin={isAdmin} />}
    </div>
  );
};

export default PartnerSingleCard;
