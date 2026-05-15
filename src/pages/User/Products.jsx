import React, { useEffect, useMemo } from "react";
import { useProducts } from "../../context/ProductsContext";
import { useTheme } from "../../context/ThemeContext";
import CardSlider from "../../components/Reusable/CardSlider";
import ProductCard from "../../components/Reusable/ProductCard";
import { useState } from "react";
import FilterSection from "../../components/Reusable/FilterSection";

function Products() {
 
  const { products } = useProducts();
  const { Theme } = useTheme();
  const [selectedCategories, setSelectedCategories] = useState("All");
  const [selectedBrand, setselectedBrand] = useState("All");
  const [sort, setSort] = useState("recommended");
  const [maxPrice, setMaxPrice] = useState(0);
  const isDark = Theme === "dark";

  const categories = [
    "All",
    ...new Set(products.map((p) => p?.products?.category)),
  ];
  const brands = ["All", ...new Set(products.map((p) => p?.products?.brand))];

  const highestPrice = Math.max(
    ...products.map((p) => p?.products?.discountPrice),
  );

  useEffect(() => {
   setMaxPrice(highestPrice)
  }, [highestPrice])



  const filteredProduct = useMemo(() => {
    let filtered = [...products]
     
    if(selectedCategories!=="All"){
      filtered=filtered.filter((p)=>p?.products?.category===selectedCategories)
    }
    if(selectedBrand!=="All"){
      filtered=filtered.filter((p)=>p?.products?.brand===selectedBrand)
    }

     filtered = filtered.filter(
    (p) =>
      p?.products?.discountPrice <= maxPrice
  );

  switch (sort) {
    case "low-high":
      filtered.sort(
        (a, b) =>
          a.products.discountPrice -
          b.products.discountPrice
      );
      break;

    case "high-low":
      filtered.sort(
        (a, b) =>
          b.products.discountPrice -
          a.products.discountPrice
      );
      break;

    case "latest":
      filtered.sort(
        (a, b) =>
          b.products.createdAt -
          a.products.createdAt
      );
      break;

    default:
      break;
  }

    return filtered;
  }, [products,selectedCategories,selectedBrand,maxPrice,sort])

  const handleReset =()=>{
    setSelectedCategories("All");
  setselectedBrand("All");
  setSort("recommended");
  setMaxPrice(highestPrice);

  }

  

  console.log(filteredProduct);

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-black text-white" : "bg-gray-50 text-black"
      }`}
    >
      <div className="max-w-7xl pt-7 mx-auto flex flex-col lg:flex-row items-start gap-6 px-4 md:px-6">
        {/* FILTER */}
        {/* FILTER */}
       <FilterSection
       handleReset={handleReset}
  isDark={isDark}
  categories={categories}
  brands={brands}
  selectedCategories={selectedCategories}
  setSelectedCategories={setSelectedCategories}
  selectedBrand={selectedBrand}
  setselectedBrand={setselectedBrand}
  sort={sort}
  setSort={setSort}
  maxPrice={maxPrice}
  setMaxPrice={setMaxPrice}
  highestPrice={highestPrice}
/>

        {/* PRODUCTS */}
        <div
          className="p-3 w-full min-w-0 flex-1 grid gap-4
grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filteredProduct.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
