import React from 'react'
import { useTheme } from "../../context/ThemeContext";

function ProductCard({ p }) {

  const { Theme } = useTheme();
  const isDark = Theme === "dark";

  const getDiscountPercent = (originalPrice, discountPrice) => {
    if (!originalPrice || !discountPrice || originalPrice === 0) return 0;

    const discount =
      ((originalPrice - discountPrice) / originalPrice) * 100;

    return Math.round(discount);
  };

  const originalPrice = p?.products?.price;
  const discountPrice = p?.products?.discountPrice;

  const discountPercent = getDiscountPercent(
    originalPrice,
    discountPrice
  );

  return (
    <div
      className={`w-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
        isDark
          ? "bg-gray-900 border border-gray-800 hover:border-gray-700"
          : "bg-white border border-gray-200 hover:border-gray-300"
      }`}
    >
      
      {/* IMAGE */}
      <div className="relative p-2">

        <img
          src={p?.products?.images?.[0]}
          alt={p?.products?.name}
          className="h-44 w-full object-cover rounded-xl"
        />

        {discountPercent > 0 && (
          <span className="absolute top-4 left-4 bg-black text-white text-[10px] px-2 py-1 rounded-full">
            {discountPercent}% OFF
          </span>
        )}

      </div>

      {/* CONTENT */}
      <div className="p-3 flex flex-col gap-1">

        <h3 className="text-sm font-semibold line-clamp-1">
          {p?.products?.name}
        </h3>

        <div className="flex items-center gap-2">

          <span className="text-lg font-bold">
            ₹{discountPrice}
          </span>

          <span className="text-xs line-through opacity-50">
            ₹{originalPrice}
          </span>

        </div>

        <div className="flex items-center text-xs opacity-70">
          ⭐⭐⭐⭐☆ <span className="ml-1">4.5</span>
        </div>

        <button
          className={`mt-2 w-full flex items-center justify-center gap-2 text-xs py-2 rounded-lg font-medium transition ${
            isDark
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          🛒 Add to Cart
        </button>

        <button
          className={`mt-2 w-full flex items-center justify-center gap-2 text-xs py-2 rounded-lg font-medium transition ${
            isDark
              ? "bg-gray-800 text-white hover:bg-gray-700"
              : "bg-gray-100 text-black hover:bg-gray-200"
          }`}
        >
          View Details
        </button>

      </div>
    </div>
  )
}

export default ProductCard