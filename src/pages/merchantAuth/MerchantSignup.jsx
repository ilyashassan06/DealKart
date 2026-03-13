import React from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "../../context/ThemeContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";

function MerchantSignup() {

  const { theme } = useTheme();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
   try {
     const merchantCredentials =  await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const merchant = merchantCredentials.user;

    await setDoc(doc(db,"merchant",merchant.uid),{
      name:data.ownerName,
      storeName:data.storeName,
      email:data.email,
      role:"merchant"
    })

    console.log(merchant)
   } catch (error) {
    
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

        <h2 className="text-2xl font-bold text-center mb-6">
          Merchant Signup
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Store Name */}
          <div>
            <label className="text-sm font-medium">Store Name</label>

            <input
              type="text"
              placeholder="Enter store name"
              {...register("storeName", { required: "Store name is required" })}
              className={`w-full mt-1 p-3 rounded-lg border
              ${theme === "dark"
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-50 border-gray-300"}`}
            />

            {errors.storeName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.storeName.message}
              </p>
            )}
          </div>
          {/* Owner Name */}
          <div>
            <label className="text-sm font-medium">Owner Name</label>

            <input
              type="text"
              placeholder="Enter store name"
              {...register("ownerName", { required: "Store name is required" })}
              className={`w-full mt-1 p-3 rounded-lg border
              ${theme === "dark"
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-50 border-gray-300"}`}
            />

            {errors.storeName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.storeName.message}
              </p>
            )}
          </div>


          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>

            <input
              type="email"
              placeholder="Enter email"
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
              placeholder="Enter password"
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


          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium">Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm password"
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match"
              })}
              className={`w-full mt-1 p-3 rounded-lg border
              ${theme === "dark"
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-50 border-gray-300"}`}
            />

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-full font-semibold hover:opacity-90 transition"
          >
            Create Merchant Account
          </button>

        </form>

      </div>

    </div>
  );
}

export default MerchantSignup;