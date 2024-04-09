import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Frames Card Button */}
        <Link to="/admin/frames" className="group">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4">Frames</h2>
            <p className="text-gray-700 text-lg">Manage Frames</p>
          </div>
        </Link>

        {/* Partners Card Button */}
        <Link to="/admin/partners" className="group">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4">Partners</h2>
            <p className="text-gray-700 text-lg">Manage Partners</p>
          </div>
        </Link>

        {/* Clients Card Button */}
        <Link to="/admin/clients" className="group">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4">Clients</h2>
            <p className="text-gray-700 text-lg">Manage Clients</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
