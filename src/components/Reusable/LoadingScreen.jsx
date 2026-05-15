import React from 'react'

function LoadingScreen() {
  return (
   <div className="flex flex-col items-center justify-center h-screen bg-black text-white">

  {/* SPINNER */}
  <div className="relative w-16 h-16">

    <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>

    <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin"></div>

  </div>

  {/* TEXT */}
  <h2 className="mt-6 text-xl font-semibold tracking-wide">
    Loading
  </h2>

  {/* DOTS */}
  <div className="flex gap-1 mt-2">

    <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>

    <span
      className="w-2 h-2 bg-white rounded-full animate-bounce"
      style={{ animationDelay: "0.15s" }}
    ></span>

    <span
      className="w-2 h-2 bg-white rounded-full animate-bounce"
      style={{ animationDelay: "0.3s" }}
    ></span>

  </div>

</div>
  )
}

export default LoadingScreen