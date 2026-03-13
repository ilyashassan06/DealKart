import { Routes, Route } from "react-router-dom";

import UserLayout from "./Layout/UserLayout";
import MerchantLayout from "./Layout/MerchantLayout";

import Home from "./pages/User/Home";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

import MerchantLogin from "./pages/merchantAuth/MerchantLogin";
import MerchantSignup from "./pages/merchantAuth/MerchantSignup";

import AddProduct from "./pages/Merchant/AddProduct";
import Dashboard from "./pages/Merchant/Dashboard";
import Products from "./pages/User/Products";
import Wishlist from "./pages/User/Wishlist";
import Cart from "./pages/User/Cart";
import Category from "./pages/User/Category";
import About from "./pages/User/About";
import Contact from "./pages/User/Contact";
import MerchantProtectedRoute from "./components/ProtectedRoutes/MerchantProtectedRoute";

function App() {
  return (
    <Routes>
      {/* AUTH ROUTES (NO NAVBAR) */}

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/merchant/login" element={<MerchantLogin />} />
      <Route path="/merchant/signup" element={<MerchantSignup />} />

      {/* USER ROUTES (WITH USER NAVBAR) */}

      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Category/:categoryName" element={<Category />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/AboutUs" element={<About />} />
        <Route path="/ContactUs" element={<Contact />} />
      </Route>

      {/* MERCHANT ROUTES (WITH MERCHANT NAVBAR) */}

      <Route
        path="/merchant"
        element={
          <MerchantProtectedRoute>
            <MerchantLayout />
          </MerchantProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add-product" element={<AddProduct />} />
      </Route>
    </Routes>
  );
}

export default App;
