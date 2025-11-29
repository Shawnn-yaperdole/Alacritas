// src/Global/Menu.jsx
import React from "react";

const Menu = ({ isOpen, close, logout }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="menu-overlay" onClick={close}></div>}

      {/* Side Menu */}
      <div
        className={`side-menu transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } menu-slide-shadow`}
      >
        <button className="close-menu" onClick={close}>×</button>

        <button
          className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={logout}
        >
          Logout
        </button>

        <button className="py-2 px-4 bg-gray-200 rounded hover:bg-gray-300">
          Profile
        </button>

        <button className="py-2 px-4 bg-gray-200 rounded hover:bg-gray-300">
          Settings
        </button>
      </div>
    </>
  );
};

export default Menu;
