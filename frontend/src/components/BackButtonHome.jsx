import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ destination }) => {
  return (
    <div className="flex">
      <Link
        to={destination}
        className="bg-white text-red-500 rounded-lg flex items-center justify-center"
      >
        <button className="bg-white text-red-500 rounded-full p-4 flex items-center justify-center" style={{ width: '20vw', height: '20vw', padding: '2rem', margin: '0 10px' }}>
          <BsArrowLeft className="h-10 sm:h-12 md:h-16 lg:h-20 xl:h-23 w-auto" />
        </button>
      </Link>
    </div>
  );
};

export default BackButton;
