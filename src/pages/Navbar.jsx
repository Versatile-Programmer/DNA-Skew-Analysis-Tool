// Navbar.js
import React from 'react';

const Navbar = ({ options, onOptionSelect }) => {
  return (
    <div className="bg-gray-800 p-4 flex justify-center space-x-4">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onOptionSelect(option)}
          className="text-white bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default Navbar;
