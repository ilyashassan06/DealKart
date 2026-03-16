import React from "react";
import { useProducts } from "../../context/ProductsContext";
import { useTheme } from "../../context/ThemeContext";

function Home() {
  const { products, loadingProducts } = useProducts();
  const { Theme } = useTheme();
  console.log(products)

  if (loadingProducts) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading products...
      </div>
    );
  }

  /* --------- GET UNIQUE CATEGORIES --------- */

  const categories = [...new Set(products.map((p) => p.products.category))];

  console.log(categories,"cats")

  return (
    <div
      className={`min-h-screen ${
        Theme === "dark"
          ? "bg-gray-950 text-white"
          : "bg-gray-50 text-black"
      }`}
    >

      {/* ---------------- HERO BANNER ---------------- */}

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div
          className={`rounded-2xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 ${
            Theme === "dark"
              ? "bg-gray-900"
              : "bg-white shadow-sm"
          }`}
        >
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Discover Amazing Products
            </h1>

            <p className="mt-4 opacity-70">
              Shop the latest products from trusted merchants on DealKart.
              Best prices. Best quality.
            </p>

            <button className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:opacity-90 transition">
              Start Shopping
            </button>
          </div>

          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da"
            className="w-full md:w-100 rounded-xl object-cover"
          />
        </div>
      </section>

      {/* ---------------- CATEGORY SLIDERS ---------------- */}

      <section className="max-w-7xl mx-auto px-6 pb-16 space-y-14">

        {categories.map((category) => {

          const categoryProducts = products.filter(
            (p) => p.products.category === category
          );
            console.log(categoryProducts,"catp")
          return (
            <div key={category}>

              {/* CATEGORY TITLE */}

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold capitalize">
                  {category}
                </h2>

                <button className="text-sm underline opacity-70 hover:opacity-100">
                  View All
                </button>
              </div>

              {/* PRODUCTS SLIDER */}

              <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">

                {categoryProducts.map((p) => (
                  <div
                    key={p.id}
                    className={`min-w-55 rounded-xl border p-4 transition hover:shadow-md ${
                      Theme === "dark"
                        ? "bg-gray-900 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >

                    {/* IMAGE */}

                    <img
                      src={p.products.images?.[0]}
                      alt={p.products.name}
                      className="h-40 w-full object-cover rounded-lg"
                    />

                    {/* INFO */}

                    <h3 className="mt-3 font-semibold line-clamp-1">
                      {p.products.name}
                    </h3>

                    <p className="text-sm opacity-70 line-clamp-2">
                      {p.products.description}
                    </p>

                    <div className="flex justify-between items-center mt-3">

                      <span className="font-bold">
                        ₹{p.products.price}
                      </span>

                      <button className="text-sm px-3 py-1 bg-black text-white rounded-md hover:opacity-90">
                        Add
                      </button>

                    </div>

                  </div>
                ))}

              </div>
            </div>
          );
        })}
      </section>

    </div>
  );
}

export default Home;