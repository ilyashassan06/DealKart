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

      <div className=" flex text-xl items-center gap-6">
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
    className={`absolute top-13 left-1/2 -translate-x-1/2 w-full max-w-md
    p-4 flex flex-col shadow-xl border  z-50
    ${
      Theme === "dark"
        ? "bg-gray-900 border-gray-700 text-white"
        : "bg-white border-gray-200 text-black"
    }`}
  >

    <NavLink
      to="/products"
      onClick={() => setMenuOpen(false)}
      className={({ isActive }) =>
        `w-full text-center py-3 border-b ${
          Theme === "dark" ? "border-gray-700" : "border-gray-200"
        }
        ${isActive ? "text-red-600 font-semibold" : "hover:opacity-70"}`
      }
    >
      Products
    </NavLink>

    <NavLink
      to="/AboutUs"
      onClick={() => setMenuOpen(false)}
      className={({ isActive }) =>
        `w-full text-center py-3 border-b ${
          Theme === "dark" ? "border-gray-700" : "border-gray-200"
        }
        ${isActive ? "text-red-600 font-semibold" : "hover:opacity-70"}`
      }
    >
      About Us
    </NavLink>

    <NavLink
      to="/ContactUs"
      onClick={() => setMenuOpen(false)}
      className={({ isActive }) =>
        `w-full text-center py-3 border-b ${
          Theme === "dark" ? "border-gray-700" : "border-gray-200"
        }
        ${isActive ? "text-red-600 font-semibold" : "hover:opacity-70"}`
      }
    >
      Contact Us
    </NavLink>

    <button
      onClick={toggleTheme}
      className={`w-full py-3 border-b text-center transition
      ${
        Theme === "dark"
          ? "border-gray-700 hover:bg-gray-800"
          : "border-gray-200 hover:bg-gray-100"
      }`}
    >
      {Theme === "dark" ? "Light Mode ☀️" : "Dark Mode 🌙"}
    </button>

    {user ? (
      <button
        onClick={handleLogout}
        className="w-full py-3 text-center hover:opacity-80 transition"
      >
        Logout
      </button>
    ) : (
      <button
        onClick={() => navigate("/login")}
        className="w-full py-3 text-center hover:opacity-80 transition"
      >
        Login
      </button>
    )}

  </div>
)}


    </nav>
  );
}

export default UserNavbar;
