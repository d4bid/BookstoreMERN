import React from 'react';
import { Link } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import BackButton from '../../components/BackButtonHome'; // Assuming BackButton is in the same directory

const AdminPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">

      <div className="flex-grow"></div>
      <div className="relative flex flex-col">
        <div className="relative flex flex-col items-center ">
          <button
            className="bg-white-500 text-white rounded-full p-4 flex items-center justify-center"
            style={{
              width: '15vw',
              height: '15vw',
              backgroundImage: 'url("../../src/assets/SMU.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
          </button>
          <h2 className="text-base lg:text-xl text-black font-semibold mt-2 lg:mt-4">Developed by: </h2>

          <h1 className=" text-black  mt-2 lg:mt-4">David Cabrito </h1>
          <h1 className=" text-black mt-2 lg:mt-4">Kyle Lejao</h1>
          <h1 className=" text-black mt-2 lg:mt-4">JC Macalalay</h1>
        </div>
      </div>
      <div className="flex-grow"></div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Frames Card Button */}
        <Link to="/admin/frames" className="group">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4">Frames</h2>
            <p className="text-gray-700 text-lg">Manage Frames</p>
          </div>
        </Link>

        {/* Slideshow Images Card Button */}
        <Link to="/admin/slideshow" className="group">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4">Slideshow</h2>
            <p className="text-gray-700 text-lg">Manage Slideshow</p>
          </div>
        </Link>

        {/* Partners Card Button
        <Link to="/admin/partners" className="group">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4">Partners</h2>
            <p className="text-gray-700 text-lg">Manage Partners</p>
          </div>
        </Link> */}

        {/* Gallery Card Button */}
        <Link to="/admin/gallery" className="group">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
            <p className="text-gray-700 text-lg">Manage Gallery</p>
          </div>
        </Link>

        {/* Visitor Log Card Button */}
        <Link to="/admin/visitors" className="group">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4">Visitor Log</h2>
            <p className="text-gray-700 text-lg">View Visitor Log</p>
          </div>
        </Link>

        {/* <Link to="/admin/frames" className="group">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4">XXXXXX</h2>
            <p className="text-gray-700 text-lg">xxxxxx</p>
          </div>
        </Link> */}
      </div>

      <div className="flex-grow"></div>
      <div className="flex-grow"></div>
      <div className="flex-grow"></div>

      <div className='w-full flex flex-wrap'>
        <BackButton className="absolute top-0 left-0 mt-4 ml-4" destination="/" />
        <div className="flex"></div>
        <div className="flex"></div>
      </div>

    </div>
  );
};

export default AdminPage;
