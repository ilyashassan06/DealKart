import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Login() {

  const [LoginError, setLoginError] = useState("")

  const { theme } = useTheme();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setLoginError("")
    try {
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        )

        const user = userCredentials.user;
        const docref= doc(db,"users",user.uid)
        const docSnap = await getDoc(docref);

        if(docSnap.exists()){

          const userData = docSnap.data();
          console.log(userData )
           if (userData.role === "user") {
        navigate("/");
      }

      else if (userData.role === "merchant") {
        alert("it is a merchant acount");
      }

        }else{
          console.log("no user found")
        }


    } catch (error) {
      if(error.code === "auth/invalid-credential"){
        setLoginError("Invalid Email or Password")
      }else{
        setLoginError(error)
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
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to DealKart
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

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-full font-semibold hover:opacity-90 transition"
          >
            Login
          </button>

        </form>

        {/* Signup Link */}
        <p className="text-sm text-center mt-6 text-gray-500">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-black font-medium">
            Sign up
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;