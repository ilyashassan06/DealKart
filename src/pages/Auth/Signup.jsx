import React from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "../../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

function Signup() {


  const navigate = useNavigate()
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
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
      );

      const user = userCredentials.user;

      await setDoc(doc(db,"users",user.uid),{
          name:data.name,
          email:data.email,
          role:"user"
      })

     navigate("/login")



   } catch (error) {
     console.error("Signup Error:", error);
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
        <h2 className="text-2xl font-bold text-center mb-6">
          Create your DealKart Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm font-medium">Full Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              className={`w-full mt-1 p-3 rounded-lg border
              ${theme === "dark"
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-50 border-gray-300"}`}
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>


          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>

            <input
              type="email"
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
              placeholder="Create password"
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


          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-full font-semibold hover:opacity-90 transition"
          >
            Create Account
          </button>

        </form>

        {/* Login Link */}
        <p className="text-sm text-center mt-6 text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-medium">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Signup;