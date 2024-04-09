import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import PartnerSingleCard from "../../components/Partners/PartnerSingleCard";
import AddPartnerModal from "./AddPartnerModal";

const PartnerList = () => {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedType, setSelectedType] = useState("all");
    const [showAddModal, setShowAddModal] = useState(false);  // Added state for modal
  
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
    }, []);
  
    const filteredPartners = selectedType === "all" ? partners : partners.filter(partner => partner.type === selectedType);
  
    const handleOpenAddModal = () => {
      setShowAddModal(true);
    };
  
    const handleCloseAddModal = () => {
      setShowAddModal(false);
    };
  
    return (
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-8">Partners List</h1>
          <div className="flex gap-x-4">
            <button
              className={`px-4 py-1 rounded-lg ${selectedType === 'all' ? 'bg-sky-600 text-white' : 'bg-sky-300'}`}
              onClick={() => setSelectedType("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-1 rounded-lg ${selectedType === 'company' ? 'bg-sky-600 text-white' : 'bg-sky-300'}`}
              onClick={() => setSelectedType("company")}
            >
              Company
            </button>
            <button
              className={`px-4 py-1 rounded-lg ${selectedType === 'academe' ? 'bg-sky-600 text-white' : 'bg-sky-300'}`}
              onClick={() => setSelectedType("academe")}
            >
              Academe
            </button>
          </div>
          {/* Replaced Link with onClick to open modal */}
          <MdOutlineAddBox className="text-sky-800 text-4xl cursor-pointer" onClick={handleOpenAddModal} />
        </div>
        {loading ? <Spinner /> : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredPartners.map(partner => <PartnerSingleCard key={partner._id} partner={partner} />)}
          </div>
        )}
        
        {/* AddPartnerModal */}
        {showAddModal && <AddPartnerModal onClose={handleCloseAddModal} />}
      </div>
    );
  };
  
  export default PartnerList;
