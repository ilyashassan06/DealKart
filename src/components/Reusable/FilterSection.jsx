import React from 'react'

function FilterSection(
    {
  isDark,
  categories,
  brands,
  selectedCategories,
  setSelectedCategories,
  selectedBrand,
  setselectedBrand,
  sort,
  setSort,
  maxPrice,
  setMaxPrice,
  highestPrice,
  handleReset,
}
) {
  return (
     <div
          className={`w-full lg:w-1/5 shrink-0 rounded-2xl p-4 lg:sticky lg:top-20 ${
            isDark
              ? "bg-gray-900 border border-gray-800"
              : "bg-white border border-gray-200"
          }`}
        >
          {/* HEADER */}
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-xl font-bold">Filters</h2>
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
                value={selectedCategories}
                onChange={(e) => setSelectedCategories(e.target.value)}
                className={`w-full rounded-lg px-3 py-2 text-sm outline-none ${
                  isDark
                    ? "bg-gray-900 border border-gray-700 text-white"
                    : "bg-white border border-gray-200 text-black"
                }`}
              >
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
                value={selectedBrand}
                onChange={(e) => setselectedBrand(e.target.value)}
                className={`w-full rounded-lg px-3 py-2 text-sm outline-none ${
                  isDark
                    ? "bg-gray-900 border border-gray-700 text-white"
                    : "bg-white border border-gray-200 text-black"
                }`}
              >
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
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
                value={sort}
                onChange={(e) => setSort(e.target.value)}
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

                <span>₹0 - ₹{maxPrice}</span>
              </div>

              <input
                type="range"
                min="0"
                max={highestPrice}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full cursor-pointer"
              />
            </div>

            {/* BUTTON */}
            <div className="min-w-[220px] md:min-w-0 flex items-end">
              <button
              onClick={handleReset}
                className={`w-full py-3 rounded-xl text-sm font-semibold transition ${
                  isDark
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
  )
}

export default FilterSection