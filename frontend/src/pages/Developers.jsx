import React from 'react';
import BackButton from '../components/BackButtonHome';


const AdminPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="flex-grow"></div>
      <h1 className="text-3xl font-bold mb-8">About the developers</h1>

      <div className="flex-grow"></div>
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
          <h2 className="text-base lg:text-xl text-black font-semibold mt-2 lg:mt-4">Developed by SMU OJT: Cabrito, D., & Lejao, K.P., & Macalalay, J.C. </h2>

          <div className="flex-grow"></div>

          <BackButton destination="/home" />
        </div>
      </div>
  );
};

export default AdminPage;
