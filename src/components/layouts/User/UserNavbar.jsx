import React, { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { useAuth } from "../../../context/UserAuthContext";
import { CgProfile } from "react-icons/cg";
import { FaChevronUp } from "react-icons/fa";

function UserNavbar() {
  const { user } = useAuth();
  const [hover, sethover] = useState(false);

  const { Theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav
      className={`w-full border-b md:px-15 px-6 py-2 flex items-center justify-between
      ${
        Theme === "dark"
          ? "bg-gray-900 border-gray-700 text-gray-100"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      {/* Logo */}
      <h1
        onClick={() => {
          navigate("/")
          setMenuOpen(false)
        }}
        className="text-2xl md:text-3xl font-serif font-bold cursor-pointer"
      >
        <span className="text-3xl md:text-4xl text-red-600">D</span>
        eal
        <span className="text-3xl md:text-4xl text-red-600">K</span>
        art
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex text-xl items-center gap-8 font-medium">
  
  <NavLink
    to="/products"
    className={({ isActive }) =>
      `transition hover:opacity-70 ${
        isActive ? "text-red-600 font-semibold" : ""
      }`
    }
  >
    Products
  </NavLink>

  <NavLink
    to="/AboutUs"
    className={({ isActive }) =>
      `transition hover:opacity-70 ${
        isActive ? "text-red-600 font-semibold" : ""
      }`
    }
  >
    About Us
  </NavLink>

  <NavLink
    to="/ContactUs"
    className={({ isActive }) =>
      `transition hover:opacity-70 ${
        isActive ? "text-red-600 font-semibold" : ""
      }`
    }
  >
    Contact Us
  </NavLink>

</div>

      <div className="flex text-xl items-center gap-6">
         <button
         onClick={()=>navigate("/merchant/login")}
      className={`hidden md:flextext-sm font-semibold px-4 py-2 rounded-xl transition
      ${
        Theme === "dark"
          ? "bg-white text-black hover:bg-gray-200"
          : "bg-black text-white hover:bg-gray-800"
      }`}
    >
      Join as Merchant
    </button>

        <button
          onClick={() => navigate("/cart")}
          className="text-xl  hover:opacity-70"
        >
          🛒
        </button>

        {/* hover profile menu start */}
        <div className="hidden relative md:flex text-2xl gap-5 group">
          {/* Profile Button */}
          <button className="cursor-pointer flex items-center gap-1 font-medium hover:opacity-70 transition">
            <CgProfile />

            <span className="transition-transform duration-300 group-hover:rotate-180">
              <FaChevronUp size={15} />
            </span>
          </button>

          {/* Dropdown Menu */}
          <div
            className={`absolute top-full mt-2 right-0 w-60 p-4 flex flex-col gap-3 rounded-xl shadow-lg border z-50
    opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200
    ${
      Theme === "dark"
        ? "bg-gray-900 border-gray-700"
        : "bg-white border-gray-200"
    }`}
          >
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`px-4 py-2 w-full rounded-lg text-sm font-medium transition
      ${
        Theme === "dark"
          ? "bg-gray-800 hover:bg-gray-700"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
            >
              {Theme === "dark" ? "Light ☀️" : "Dark 🌙"}
            </button>

            {/* Login / Logout */}
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-black text-white text-sm hover:opacity-90 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-lg border border-gray-400 text-sm hover:bg-gray-100 transition"
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>
      {/* Mobile Menu */}
    {menuOpen && (
  <div
    className={`absolute top-14 left-1/2 -translate-x-1/2 w-full max-w-md
     p-3 flex flex-col gap-2 shadow-2xl border backdrop-blur-xl z-50
    transition-all duration-300
    ${
      Theme === "dark"
        ? "bg-gray-900/90 border-gray-700 text-white"
        : "bg-white/90 border-gray-200 text-black"
    }`}
  >

    {/* MENU ITEMS */}
    {[
      { name: "Products", path: "/products" },
      { name: "About Us", path: "/AboutUs" },
      { name: "Contact Us", path: "/ContactUs" },
      { name: "Merchant Dashboard", path: "/merchant/dashboard" },
    ].map((item) => (
      <NavLink
        key={item.name}
        to={item.path}
        onClick={() => setMenuOpen(false)}
        className={({ isActive }) =>
          `flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200
          ${
            isActive
              ? "bg-red-500 text-white shadow-md"
              : Theme === "dark"
              ? "hover:bg-gray-800"
              : "hover:bg-gray-100"
          }`
        }
      >
        <span className="font-medium">{item.name}</span>
        <span className="text-sm opacity-60">→</span>
      </NavLink>
    ))}

    {/* DIVIDER */}
    <div
      className={`my-2 h-px ${
        Theme === "dark" ? "bg-gray-700" : "bg-gray-200"
      }`}
    />

    {/* THEME TOGGLE */}
    <button
      onClick={()=>{
        toggleTheme();
        setMenuOpen(false)
      }}
      className={`flex items-center justify-between px-4 py-3 rounded-xl transition
      ${
        Theme === "dark"
          ? "hover:bg-gray-800"
          : "hover:bg-gray-100"
      }`}
    >
      <span className="font-medium">
        {Theme === "dark" ? "Light Mode ☀️" : "Dark Mode 🌙"}
      </span>
      <span className="text-sm opacity-60">⚙️</span>
    </button>

    {/* AUTH BUTTON */}
    <button
      onClick={() => {
        setMenuOpen(false);
        user ? handleLogout() : navigate("/login");
      }}
      className={`mt-2 py-3 rounded-xl font-semibold transition-all
      ${
        user
          ? "bg-red-500 text-white hover:bg-red-600"
          : Theme === "dark"
          ? "bg-white text-black hover:bg-gray-200"
          : "bg-black text-white hover:bg-gray-800"
      }`}
    >
      {user ? "Logout" : "Login"}
    </button>
  </div>
)}


    </nav>
  );
}

export default UserNavbar;
