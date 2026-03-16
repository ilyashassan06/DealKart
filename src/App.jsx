import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import UserLayout from "./Layout/UserLayout";
import MerchantLayout from "./Layout/MerchantLayout";
import MerchantProtectedRoute from "./components/ProtectedRoutes/MerchantProtectedRoute";

import Home from "./pages/User/Home";
import { useAuth } from "./context/UserAuthContext";

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


  return (
    <div className="flex items-center justify-center h-screen">
      Loading...
    </div>
  );
}

function App() {
  const   {Loading}= useAuth()

   if (Loading) {
    return <Loader />;
  }

  return (
    <Routes>

      {/* AUTH ROUTES */}
      <Route path="/login" element={
        <Suspense fallback={<Loader />}>
          <Login />
        </Suspense>
      } />

      <Route path="/signup" element={
        <Suspense fallback={<Loader />}>
          <Signup />
        </Suspense>
      } />

      <Route path="/merchant/login" element={
        <Suspense fallback={<Loader />}>
          <MerchantLogin />
        </Suspense>
      } />

      <Route path="/merchant/signup" element={
        <Suspense fallback={<Loader />}>
          <MerchantSignup />
        </Suspense>
      } />

      {/* USER ROUTES */}
      <Route element={<UserLayout />}>

        <Route path="/" element={<Home />} />

        <Route path="/Cart" element={
          <Suspense fallback={<Loader />}>
            <Cart />
          </Suspense>
        } />

        <Route path="/Products" element={
          <Suspense fallback={<Loader />}>
            <Products />
          </Suspense>
        } />

        <Route path="/Category/:categoryName" element={
          <Suspense fallback={<Loader />}>
            <Category />
          </Suspense>
        } />

        <Route path="/Wishlist" element={
          <Suspense fallback={<Loader />}>
            <Wishlist />
          </Suspense>
        } />

        <Route path="/AboutUs" element={
          <Suspense fallback={<Loader />}>
            <About />
          </Suspense>
        } />

        <Route path="/ContactUs" element={
          <Suspense fallback={<Loader />}>
            <Contact />
          </Suspense>
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
          <Suspense fallback={<Loader />}>
            <Dashboard />
          </Suspense>
        } />

        <Route path="add-product" element={
          <Suspense fallback={<Loader />}>
            <AddProduct />
          </Suspense>
        } />

      </Route>

    </Routes>
  );
}

export default App;