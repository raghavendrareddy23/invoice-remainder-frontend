import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const username = sessionStorage.getItem('Username');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center">Welcome to Your Dashboard, {username}</h1>
        <div className="flex flex-col space-y-4">
          <Link
            to="/create-invoice"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg text-center transition duration-300 ease-in-out"
          >
            Create Invoice
          </Link>
          <Link
            to="/invoice-dashboard"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg text-center transition duration-300 ease-in-out"
          >
            View Invoices
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
