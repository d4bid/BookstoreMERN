import React from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

const FrameCard = ({ frame, onDelete }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <img
        src={`data:image/jpeg;base64,${frame.image}`}
        alt={frame.name}
        className="w-full h-40 object-cover mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{frame.name}</h2>
      <div className="flex justify-between items-center">
        <Link to={`/frames/${frame._id}`}>
          <BsInfoCircle className="text-sky-800 text-2xl mr-2 hover:text-sky-600" />
        </Link>
        <Link to={`/frames/edit/${frame._id}`}>
          <AiOutlineEdit className="text-sky-800 text-2xl mr-2 hover:text-sky-600" />
        </Link>
        <button onClick={onDelete}>
          <AiOutlineDelete className="text-sky-800 text-2xl hover:text-sky-600" />
        </button>
      </div>
    </div>
  );
};

export default FrameCard;
