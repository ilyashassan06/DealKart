import React from "react";
import { useProducts } from "../../context/ProductsContext";
import { useTheme } from "../../context/ThemeContext";
import CardSlider from "../../components/Reusable/CardSlider";

function Home() {
  const { products } = useProducts();
  const { Theme } = useTheme();

  const isDark = Theme === "dark";

  const categories = [
    ...new Set(products.map((p) => p?.products?.category)),


  ];

  const randomThree = [...products]
  .sort(() => 0.5 - Math.random())
  .slice(0, 3);

  const getCategoryIcon = (category) => {
  const map = {
    Mobile: "📱",
    fashion: "👕",
    shoes: "👟",
    watch: "⌚",
    gym: "🏋️",
  };

  return map[category?.toLowerCase()] || "🛍️";
};

  return (
    <div
      className={`min-h-screen  ${
        isDark ? "bg-black text-white" : "bg-gray-50 text-black"
      }`}
    >
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-1">
        <div
          className={`rounded-2xl p-6 md:p-12 flex flex-col md:flex-row items-center justify-between ${
            isDark ? "bg-gray-900" : "bg-white"
          }`}
        >
          <div className="max-w-lg">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              FIND PRODUCTS <br /> THAT MATCHES <br /> YOUR VIBE
            </h1>

            <p className="mt-3 text-xl opacity-70">
              Browse through our diverse range of stylish clothing.
            </p>

            <button
              className={`mt-6 px-6 py-3 rounded-full text-sm font-semibold ${
                isDark
                  ? "bg-white text-black"
                  : "bg-black text-white"
              }`}
            >
              Shop Now
            </button>

            {/* Stats */}
            <div className="flex gap-6 mt-6 text-sm">
              <div>
                <p className="font-bold">200+</p>
                <p className="opacity-60">Brands</p>
              </div>
              <div>
                <p className="font-bold">2,000+</p>
                <p className="opacity-60">Products</p>
              </div>
              <div>
                <p className="font-bold">30,000+</p>
                <p className="opacity-60">Customers</p>
              </div>
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1201&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-full md:w-120 h-80 object-cover rounded-xl mt-6 md:mt-0"
          />
        </div>
      </section>

      {/* BRANDS */}
      <section className="border-y py-4 overflow-x-auto bg-black text-white">
        <div className=" text-sm flex justify-center gap-8 md:text-xl font-semibold opacity-70">
          {["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"].map(
            (b) => (
              <span key={b} className="shrink-0">
                {b}
              </span>
            )
          )}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <CardSlider
        title="NEW ARRIVALS"
        products={products.slice(0, 5)}
        isDark={isDark}
      />

      {/* TOP SELLING */}
      <CardSlider
        title="TOP SELLING"
        products={randomThree}
        isDark={isDark}
      />

      {/* BROWSE STYLE */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
  <h2 className="text-xl font-bold mb-6">BROWSE BY CATEGORY</h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {categories.map((c) => (
      <div
        key={c}
        className={`group rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
          isDark
            ? "bg-linear-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-gray-700"
            : "bg-linear-to-br from-white to-gray-100 border border-gray-200 hover:border-gray-300"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          
          {/* ICON (emoji or replace with icon lib) */}
          <span className="text-2xl mb-3">
            {getCategoryIcon(c)}
          </span>

          {/* NAME */}
          <span className="font-semibold text-sm tracking-wide">
            {c}
          </span>

          {/* subtle hover line */}
          <div className="w-0 group-hover:w-6 h-0.5 bg-current mt-2 transition-all" />
        </div>
      </div>
    ))}
  </div>
</section>
      
    </div>
  );
}


export default Home;