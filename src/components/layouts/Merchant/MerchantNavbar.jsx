import React, { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { useAuth } from "../../../context/MerchantAuthContext";

function MerchantNavbar() {
  const { merchant } = useAuth();
  const { Theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/merchant-login");
  };

  return (
    <nav
      className={`w-full border-b md:px-15 px-6 py-3 flex items-center justify-between
      ${
        Theme === "dark"
          ? "bg-gray-900 border-gray-700 text-gray-100"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      {/* Logo */}
      <h1
        onClick={() => navigate("/merchant/dashboard")}
        className="text-2xl font-serif font-bold cursor-pointer"
      >
        <span className="text-red-600">DealKart</span> Merchant
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-full text-sm font-medium transition
          ${
            Theme === "dark"
              ? "bg-gray-800 hover:bg-gray-700"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {Theme === "dark" ? "Light ☀️" : "Dark 🌙"}
        </button>

        {/* Merchant Name */}
        {merchant && (
          <span className="text-sm font-medium border-l pl-4">
            {merchant.name}
          </span>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-full bg-black text-white text-sm hover:opacity-90 transition"
        >
          Logout
        </button>

      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
     {menuOpen && (
  <div
    className={`absolute top-14 left-0 w-full flex flex-col shadow-xl border-t z-50
    ${
      Theme === "dark"
        ? "bg-gray-900 border-gray-700 text-white"
        : "bg-white border-gray-200 text-black"
    }`}
  >

    <button
      onClick={() => {
        navigate("/merchant/dashboard");
        setMenuOpen(false);
      }}
      className={`w-full py-4 border-b text-center transition
      ${
        Theme === "dark"
          ? "border-gray-700 hover:bg-gray-800"
          : "border-gray-200 hover:bg-gray-100"
      }`}
    >
      Dashboard
    </button>

    <button
      onClick={() => {
        navigate("/merchant/products");
        setMenuOpen(false);
      }}
      className={`w-full py-4 border-b text-center transition
      ${
        Theme === "dark"
          ? "border-gray-700 hover:bg-gray-800"
          : "border-gray-200 hover:bg-gray-100"
      }`}
    >
      Products
    </button>

    <button
      onClick={() => {
        navigate("/merchant/add-product");
        setMenuOpen(false);
      }}
      className={`w-full py-4 border-b text-center transition
      ${
        Theme === "dark"
          ? "border-gray-700 hover:bg-gray-800"
          : "border-gray-200 hover:bg-gray-100"
      }`}
    >
      Add Product
    </button>

    <button
       onClick={() => {
    toggleTheme();
     setMenuOpen(false);
  }}
      className={`w-full py-4 border-b text-center transition
      ${
        Theme === "dark"
          ? "border-gray-700 hover:bg-gray-800"
          : "border-gray-200 hover:bg-gray-100"
      }`}
    >
      {Theme === "dark" ? "Light Mode ☀️" : "Dark Mode 🌙"}
    </button>

    <button
      onClick={handleLogout}
      className={`w-full py-4 text-center transition
      ${
        Theme === "dark"
          ? "hover:bg-gray-800"
          : "hover:bg-gray-100"
      }`}
    >
      Logout
    </button>

  </div>
)}

    </nav>
  );
}

export default MerchantNavbar;
