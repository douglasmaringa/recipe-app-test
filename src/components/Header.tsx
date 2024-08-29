import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">Recipe App</h1>
      <Link to="/favorites" className="flex items-center text-white hover:text-red-500">
        <FaHeart size={24} className="mr-2" />
        <span>Favorites</span>
      </Link>
    </header>
  );
};

export default Header;
