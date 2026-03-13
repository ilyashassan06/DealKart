import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "../../context/ThemeContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function MerchantLogin() {

  const [LoginError, setLoginError] = useState("")

  const { theme } = useTheme();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setLoginError(""); 

     try {
       const merchantCredentials = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const merchant =  merchantCredentials.user;
      
      const docref= doc(db,"merchant",merchant.uid);
      const docSnap = await getDoc(docref);
      
      if (docSnap.exists()) {


        const merchantData = docSnap.data();
      console.log(merchantData);
        if (merchantData.role === "merchant") {
        navigate("/merchant/dashboard");
      }

      else if (merchantData.role === "user") {
        alert("it is a user acount");
      }



      } else {
        console.log("no user doc found")
      }

     } catch (error) {
       if (
      error.code === "auth/invalid-credential" ||
      error.code === "auth/invalid-credential"
    ) {
      setLoginError("Incorrect email or password");
    } else {
      setLoginError(error.message);
    }
     }


    
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 
      ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
    >
      
      <div
        className={`w-full max-w-md p-8 rounded-2xl 
        ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow-sm`}
      >

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          Merchant Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>

            <input
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className={`w-full mt-1 p-3 rounded-lg border 
              ${theme === "dark"
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-50 border-gray-300"}`}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>


          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>

            <input
              type="password"
              autoComplete="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
              className={`w-full mt-1 p-3 rounded-lg border 
              ${theme === "dark"
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-50 border-gray-300"}`}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          
          {LoginError && (
  <p className="text-red-500 text-sm text-center">
    {LoginError}
  </p>
)}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-full font-semibold hover:opacity-90 transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default MerchantLogin;