import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../../components/Spinner";
import { MdOutlineAddBox } from "react-icons/md";
import PartnerSingleCard from "../../../components/Partners/PartnerSingleCard";
import AddPartnerModal from "./AddPartnerModal";
import BackButton from "../../../components/BackButtonHome"; // Import BackButton component
import PartnerInfoModal from "../../../components/Partners/PartnerInfoModal";

const PartnerList = ({ isAdmin = true, hideAddButton = false, backDestination = "/admin/" }) => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [activePartner, setActivePartner] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/partners")
      .then((response) => {
        setPartners(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    // Listen for newPartnerAdded and partnerUpdated events
    const updatePartners = () => {
      axios
        .get("http://localhost:5555/partners")
        .then((response) => {
          setPartners(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    window.addEventListener('newPartnerAdded', updatePartners);
    window.addEventListener('partnerUpdated', updatePartners);

    // Cleanup the event listeners
    return () => {
      window.removeEventListener('newPartnerAdded', updatePartners);
      window.removeEventListener('partnerUpdated', updatePartners);
    };
  }, []);

  const filteredPartners = selectedType === "all" ? partners : partners.filter(partner => partner.type === selectedType);

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleOpenModal = (partner) => {
    setActivePartner(partner);
  };

  const handleCloseModal = () => {
    setActivePartner(null);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <BackButton destination={backDestination} />
        <div className="flex gap-x-4">
          <button
            className={`px-4 py-1 rounded-lg ${selectedType === 'all' ? 'bg-red-600 text-white' : 'bg-red-300'}`}
            onClick={() => setSelectedType("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-1 rounded-lg ${selectedType === 'company' ? 'bg-red-600 text-white' : 'bg-red-300'}`}
            onClick={() => setSelectedType("company")}
          >
            Company
          </button>
          <button
            className={`px-4 py-1 rounded-lg ${selectedType === 'academe' ? 'bg-red-600 text-white' : 'bg-red-300'}`}
            onClick={() => setSelectedType("academe")}
          >
            Academe
          </button>
        </div>
        {!hideAddButton && <MdOutlineAddBox className="text-sky-800 text-4xl cursor-pointer" onClick={handleOpenAddModal} />}
      </div>
      {loading ? <Spinner /> : (
        <div className="grid grid-cols-1 md:grid-cols-4">
          {filteredPartners.map(partner => (
            <PartnerSingleCard 
              key={partner._id} 
              partner={partner} 
              isAdmin={isAdmin} 
              onOpenModal={() => handleOpenModal(partner)}
            />
          ))}
        </div>
      )}
      {showAddModal && <AddPartnerModal onClose={handleCloseAddModal} />}
      {activePartner && <PartnerInfoModal partner={activePartner} onClose={handleCloseModal} isAdmin={isAdmin} />}
    </div>
  );
};

export default PartnerList;