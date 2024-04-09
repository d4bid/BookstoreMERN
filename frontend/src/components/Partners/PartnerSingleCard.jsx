import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";

const PartnerSingleCard = ({ partner }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl">
      {partner.image && (
        <img src={`data:image/png;base64,${partner.image}`} alt={partner.name} className="w-full h-40 object-cover rounded-lg mb-2" />
      )}
      <h4 className="my-2 text-gray-500">{partner._id}</h4>
      <div className="flex justify-start items-center gap-x-2">
        <BiUserCircle className="text-red-300 text-2xl" />
        <h2 className="my-1">{partner.name}</h2>
      </div>
      {partner.address && (
        <div className="flex justify-start items-center gap-x-2">
          <BsInfoCircle className="text-red-300 text-2xl" />
          <p className="my-1">{partner.address}</p>
        </div>
      )}
      <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
        <Link to={`/partners/details/${partner._id}`}>
          <BsInfoCircle className="text-2xl text-blue-800 hover:text-black" />
        </Link>
        <Link to={`/partners/edit/${partner._id}`}>
          <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
        </Link>
        <Link to={`/partners/delete/${partner._id}`}>
          <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
        </Link>
      </div>
      {
        showModal && (
          <PartnerModal partner={partner} onClose={() => setShowModal(false)} />
        )
      }
    </div>
  );
};

export default PartnerSingleCard;
