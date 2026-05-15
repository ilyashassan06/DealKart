import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import UserLayout from "./Layout/UserLayout";
import MerchantLayout from "./Layout/MerchantLayout";
import MerchantProtectedRoute from "./components/ProtectedRoutes/MerchantProtectedRoute";

import Home from "./pages/User/Home";
import { useAuth } from "./context/UserAuthContext";
import LoadingScreen from "./components/Reusable/LoadingScreen";

const Login = lazy(() => import("./pages/Auth/Login"));
const Signup = lazy(() => import("./pages/Auth/Signup"));

const MerchantLogin = lazy(() => import("./pages/merchantAuth/MerchantLogin"));
const MerchantSignup = lazy(() => import("./pages/merchantAuth/MerchantSignup"));

const AddProduct = lazy(() => import("./pages/Merchant/AddProduct"));
const Dashboard = lazy(() => import("./pages/Merchant/Dashboard"));

const Products = lazy(() => import("./pages/User/Products"));
const Wishlist = lazy(() => import("./pages/User/Wishlist"));
const Cart = lazy(() => import("./pages/User/Cart"));
const Category = lazy(() => import("./pages/User/Category"));
const About = lazy(() => import("./pages/User/About"));
const Contact = lazy(() => import("./pages/User/Contact"));

function Loader() {


  
    return <LoadingScreen />;
  
}

function App() {
  const   {Loading}= useAuth()

   if (Loading) {
    return <Loader />;
  }

  return (
     <Suspense fallback={<Loader />}>
    <Routes>

      {/* AUTH ROUTES */}
      <Route path="/login" element={
      
          <Login />
       
      } />

      <Route path="/signup" element={
       
          <Signup />
       
      } />

      <Route path="/merchant/login" element={
        
          <MerchantLogin />
        
      } />

      <Route path="/merchant/signup" element={
        
          <MerchantSignup />
       
      } />

      {/* USER ROUTES */}
      <Route element={<UserLayout />}>

        <Route path="/" element={<Home />} />

        <Route path="/Cart" element={
          
            <Cart />
         
        } />

        <Route path="/Products" element={
         
            <Products />
          
        } />

        <Route path="/Category/:categoryName" element={
        
            <Category />
          
        } />

        <Route path="/Wishlist" element={
          
            <Wishlist />
         
        } />

        <Route path="/AboutUs" element={
          
            <About />
         
        } />

        <Route path="/ContactUs" element={
          
            <Contact />
         
        } />

      </Route>

      {/* MERCHANT ROUTES */}
      <Route
        path="/merchant"
        element={
          <MerchantProtectedRoute>
            <MerchantLayout />
          </MerchantProtectedRoute>
        }
      >

        <Route path="dashboard" element={
          
            <Dashboard />
          
        } />

        <Route path="add-product" element={
        
            <AddProduct />
          
        } />

      </Route>

    </Routes>
    </Suspense>
  );
}

export default App;