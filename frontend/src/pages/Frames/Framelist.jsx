import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox } from "react-icons/md";
import FrameCard from "../../components/Frames/FrameCard";

const FrameList = () => {
  const [frames, setFrames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("card");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/frames")
      .then((response) => {
        setFrames(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5555/frames/${id}`);
      setFrames(frames.filter((frame) => frame._id !== id));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Frames List</h1>
        <Link to="/frames/add">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "card" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {frames.map((frame) => (
            <FrameCard
              key={frame._id}
              frame={frame}
              onDelete={() => handleDelete(frame._id)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default FrameList;
