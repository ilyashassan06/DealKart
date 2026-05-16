import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProducts } from '../../context/ProductsContext'
import { useTheme } from '../../context/ThemeContext';
import ProductCard from '../../components/Reusable/ProductCard';
import FilterSection from '../../components/Reusable/FilterSection';

function Category() {
   const { Theme } = useTheme();
    const {categoryName} = useParams()
    const {products}=useProducts();
      const isDark = Theme === "dark";
        const [selectedCategories, setSelectedCategories] = useState("All");
        const [selectedBrand, setselectedBrand] = useState("All");
        const [sort, setSort] = useState("recommended");
        const [maxPrice, setMaxPrice] = useState(0);
   
    // console.log(products)
    const selectedCategory = products.filter((p)=>p?.products?.category===categoryName);


        const categories = [
          categoryName,
        ];
      const brands = ["All", ...new Set(products.map((p) => p?.products?.brand))];
    
      const highestPrice = Math.max(
        ...products.map((p) => p?.products?.discountPrice),
      );
    
      useEffect(() => {
       setMaxPrice(highestPrice)
      }, [highestPrice])
    
    
    
      const filteredProduct = useMemo(() => {
        let filtered = [...selectedCategory]
         
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
    // console.log(selectedCategory)

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
          {filteredProduct.map((c) => (
            <ProductCard key={c.id} p={c} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Category