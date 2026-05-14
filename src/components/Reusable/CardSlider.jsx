import React from "react";
import ProductCard from "./ProductCard";
import SliderProductCard from "./SliderProductCard";

function CardSlider({ title, products, isDark }) {

 


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
 <div className="flex gap-5 overflow-x-auto pb-3 scrollbar-hide">
    {products.map((p) => (
    <SliderProductCard key={p.id} p={p} isDark={isDark} />
  ))}
    </div>
    </section>
  );
}

export default CardSlider;