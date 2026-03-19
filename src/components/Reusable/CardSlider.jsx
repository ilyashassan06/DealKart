import React from "react";

function CardSlider({ title, products, isDark }) {

 

  // 🔥 Function to calculate discount percentage
  const getDiscountPercent = (originalPrice, discountPrice) => {
    // If values are missing or invalid → return 0
    if (!originalPrice || !discountPrice || originalPrice === 0) return 0;

    // Formula: ((original - discount) / original) * 100
    const discount = ((originalPrice - discountPrice) / originalPrice) * 100;

    // Round to nearest integer (e.g., 29.6 → 30)
    return Math.round(discount);
  };

  return (
    <section className="md:w-[90%] w-full mx-auto px-4 md:px-6 py-10">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">
          {title}
        </h2>
        <button className="text-sm opacity-60 hover:opacity-100 transition">
          View All →
        </button>
      </div>

      {/* PRODUCTS */}
      <div className="flex gap-5 overflow-x-auto pb-3 scrollbar-hide">
        {products.map((p) => {

          // 🔥 Get prices from product
          const originalPrice = p?.products?.price;
          const discountPrice = p?.products?.discountPrice;

          // 🔥 Calculate discount %
          const discountPercent = getDiscountPercent(originalPrice, discountPrice);

          return (
            <div
              key={p.id}
              className={`shrink-0 w-55 rounded-xl overflow-hidden transition hover:-translate-y-1 ${
                isDark
                  ? "bg-gray-900 border border-gray-800 hover:shadow-lg"
                  : "bg-white border border-gray-200 hover:shadow-md"
              }`}
            >
              {/* IMAGE */}
              <div className="relative p-2">
                <img
                  src={p?.products?.images?.[0]}
                  alt={p?.products?.name}
                  className="h-44 w-full "
                />

                {/* 🔥 DISCOUNT BADGE (dynamic) */}
                {discountPercent > 0 && (
                  <span className="absolute top-2 left-2 bg-black text-white text-[10px] px-2 py-1 rounded-full">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-3 flex flex-col gap-1">
                
                {/* NAME */}
                <h3 className="text-sm font-semibold line-clamp-1">
                  {p?.products?.name}
                </h3>

                {/* PRICE */}
                <div className="flex items-center gap-2">
                  {/* 🔥 Discounted Price (main price) */}
                  <span className="text-lg font-bold">
                    ₹{discountPrice}
                  </span>

                  {/* 🔥 Original Price (cut) */}
                  <span className="text-xs line-through opacity-50">
                    ₹{originalPrice}
                  </span>
                </div>

                {/* RATING */}
                <div className="flex items-center text-xs opacity-70">
                  ⭐⭐⭐⭐☆ <span className="ml-1">4.5</span>
                </div>

                {/* BUTTON */}
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
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-orange-600 text-white hover:bg-gray-800"
                  }`}
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CardSlider;