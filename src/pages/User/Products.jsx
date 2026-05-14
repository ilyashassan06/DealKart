import React from 'react'
import { useProducts } from '../../context/ProductsContext'
import { useTheme } from "../../context/ThemeContext";
import CardSlider from '../../components/Reusable/CardSlider';
import ProductCard from '../../components/Reusable/ProductCard';

function Products() {

  const { products } = useProducts();
  const { Theme } = useTheme();

  const categories = [
    ...new Set(products.map((p) => p?.products?.category)),


  ];

  const isDark = Theme === "dark";

  console.log(products)

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-black text-white" : "bg-gray-50 text-black"
      }`}
    >
      
      <div className='max-w-7xl pt-7 mx-auto flex flex-col lg:flex-row items-start gap-6 px-4 md:px-6'>

        {/* FILTER */}
        {/* FILTER */}
<div
  className={`w-full lg:w-1/5 shrink-0 rounded-2xl p-4 lg:sticky lg:top-20 ${
    isDark
      ? "bg-gray-900 border border-gray-800"
      : "bg-white border border-gray-200"
  }`}
>

  {/* HEADER */}
  <div className="flex items-center justify-between mb-4">
    
    <h2 className="text-lg font-bold">
      Filters
    </h2>

    <button
      className={`text-xs px-3 py-1 rounded-full transition ${
        isDark
          ? "bg-gray-800 hover:bg-gray-700"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      Reset
    </button>

  </div>

  {/* MOBILE + TABLET */}
 <div className="w-full flex overflow-x-auto md:grid md:grid-cols-2 md:overflow-visible lg:flex lg:flex-col gap-3">

    {/* CATEGORY */}
    <div
      className={`min-w-[220px] md:min-w-0 rounded-xl p-3 ${
        isDark
          ? "bg-black border border-gray-800"
          : "bg-gray-50 border border-gray-200"
      }`}
    >

      <label className="text-sm font-semibold mb-2 block opacity-80">
        Category
      </label>

      <select
        className={`w-full rounded-lg px-3 py-2 text-sm outline-none ${
          isDark
            ? "bg-gray-900 border border-gray-700 text-white"
            : "bg-white border border-gray-200 text-black"
        }`}
      >
        <option value="">All Categories</option>

        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

    </div>

    {/* BRAND */}
    <div
      className={`min-w-[220px] md:min-w-0 rounded-xl p-3 ${
        isDark
          ? "bg-black border border-gray-800"
          : "bg-gray-50 border border-gray-200"
      }`}
    >

      <label className="text-sm font-semibold mb-2 block opacity-80">
        Brand
      </label>

      <select
        className={`w-full rounded-lg px-3 py-2 text-sm outline-none ${
          isDark
            ? "bg-gray-900 border border-gray-700 text-white"
            : "bg-white border border-gray-200 text-black"
        }`}
      >
        <option value="">All Brands</option>
        <option value="nike">Nike</option>
        <option value="adidas">Adidas</option>
        <option value="puma">Puma</option>
        <option value="zara">Zara</option>
      </select>

    </div>

    {/* SORT */}
    <div
      className={`min-w-[220px] md:min-w-0 rounded-xl p-3 ${
        isDark
          ? "bg-black border border-gray-800"
          : "bg-gray-50 border border-gray-200"
      }`}
    >

      <label className="text-sm font-semibold mb-2 block opacity-80">
        Sort By
      </label>

      <select
        className={`w-full rounded-lg px-3 py-2 text-sm outline-none ${
          isDark
            ? "bg-gray-900 border border-gray-700 text-white"
            : "bg-white border border-gray-200 text-black"
        }`}
      >
        <option value="">Recommended</option>
        <option value="low-high">Price: Low to High</option>
        <option value="high-low">Price: High to Low</option>
        <option value="latest">Latest</option>
        <option value="popular">Most Popular</option>
      </select>

    </div>

    {/* PRICE */}
    <div
      className={`min-w-[220px] md:min-w-0 rounded-xl p-3 ${
        isDark
          ? "bg-black border border-gray-800"
          : "bg-gray-50 border border-gray-200"
      }`}
    >

      <div className="flex items-center justify-between mb-2">
        
        <label className="text-sm font-semibold opacity-80">
          Price Range
        </label>

        <span className="text-xs opacity-60">
          ₹500 - ₹5000
        </span>

      </div>

      <input
        type="range"
        min="500"
        max="5000"
        className="w-full cursor-pointer"
      />

    </div>

    {/* BUTTON */}
    <div className="min-w-[220px] md:min-w-0 flex items-end">

      <button
        className={`w-full py-3 rounded-xl text-sm font-semibold transition ${
          isDark
            ? "bg-white text-black hover:bg-gray-200"
            : "bg-black text-white hover:bg-gray-800"
        }`}
      >
        Apply Filters
      </button>

    </div>

  </div>
</div>

        {/* PRODUCTS */}
       <div className='p-3 w-full min-w-0 flex-1 grid gap-4
grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}

        </div>

      </div>

    </div>
  )
}

export default Products