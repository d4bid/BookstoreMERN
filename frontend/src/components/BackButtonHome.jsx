import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ destination }) => {
  return (
    <div className="flex">
      <Link
        to={destination}
        className="bg-white text-red-500 rounded-lg flex items-center justify-center"
        style={{ padding: "0.5rem 1rem" }} // Adjust padding as needed
      >
        <BsArrowLeft className="text-4xl lg:text-6xl" /> {/* Adjust icon size */}
      </Link>
    </div>
  );
};

export default BackButton;
