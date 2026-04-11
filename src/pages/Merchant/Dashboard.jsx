import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { db, auth } from "../../firebase/firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";

function Dashboard() {
  const { Theme } = useTheme();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);




 /* ---------------- FETCH MERCHANT DATA ---------------- */
useEffect(() => {
  const fetchMerchantProducts = async () => {
    try {
      const merchantId = auth.currentUser.uid;

      // Query products where merchantId matches current user
      const q = query(
        collection(db, "products"),
        where("merchantId", "==", merchantId)
      );

      const querySnapshot = await getDocs(q);

      const merchantProducts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(merchantProducts);
      console.log(products)
    } catch (err) {
      console.log(err);
    }
  };

  fetchMerchantProducts();
}, []);


  /* ---------------- Delte product ---------------- */

  const handleDelete = async (id)=>{
    try {
       const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    await deleteDoc(doc(db,"products",id))
    setProducts(prev => prev.filter(p => p.id !== id));
      console.log("Deleted successfully");
    } catch (error) {
      
    }

  }


  const totalProducts = products.length;

  /* ---------------- UI ---------------- */

  return (
    <div
      className={`min-h-screen p-6 md:p-10 ${
        Theme === "dark" ? "bg-gray-950 text-white" : "bg-gray-50 text-black"
      }`}
    >
      {/* Title */}
      <h1 className="text-3xl font-bold mb-8">Merchant Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* Total Products */}
        <div
          className={`p-6 rounded-xl border shadow-sm ${
            Theme === "dark"
              ? "bg-gray-900 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <p className="text-sm opacity-70">Total Products</p>
          <h2 className="text-2xl font-bold mt-2">{totalProducts}</h2>
        </div>

        {/* Orders (future) */}
        <div
          className={`p-6 rounded-xl border shadow-sm ${
            Theme === "dark"
              ? "bg-gray-900 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <p className="text-sm opacity-70">Total Orders</p>
          <h2 className="text-2xl font-bold mt-2">0</h2>
        </div>

        {/* Revenue (future) */}
        <div
          className={`p-6 rounded-xl border shadow-sm ${
            Theme === "dark"
              ? "bg-gray-900 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <p className="text-sm opacity-70">Revenue</p>
          <h2 className="text-2xl font-bold mt-2">₹0</h2>
        </div>

      </div>

      {/* Add Product */}
      <div
        className={`p-6 mb-10 rounded-xl border flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${
          Theme === "dark"
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div>
          <h2 className="text-xl font-semibold">Add New Product</h2>
          <p className="text-sm opacity-70">
            Start selling by adding your first product.
          </p>
        </div>

        <button
          onClick={() => navigate("/merchant/add-product")}
          className="px-6 py-3 bg-black text-white rounded-lg hover:opacity-90 transition"
        >
          + Add Product
        </button>
      </div>

      {/* Recent Products */}
<div
  className={`p-4 sm:p-6 rounded-2xl border shadow-sm ${
    Theme === "dark"
      ? "bg-gray-900 border-gray-800 text-gray-100"
      : "bg-white border-gray-200 text-gray-900"
  }`}
>
  {/* Header */}
  <div className="flex items-center justify-between mb-5">
    <h2 className="text-lg sm:text-xl font-semibold">
      Recent Products
    </h2>

    <button
      onClick={() => navigate("/merchant/products")}
      className="text-xs sm:text-sm underline hover:opacity-70"
    >
      View All
    </button>
  </div>

  {/* ---------------- MOBILE VIEW ---------------- */}
  <div className="space-y-3 sm:hidden">
    {products.length === 0 ? (
      <p className="text-sm opacity-60">No products yet</p>
    ) : (
      products.slice(-5).reverse().map((product) => (
        <div
          key={product.id}
          className={`p-4 rounded-xl border ${
            Theme === "dark"
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >
          {/* Top */}
          <div className="flex items-center gap-3 mb-3">
            {product.images?.[0] && (
              <img
                src={product.images[0]}
                className="w-12 h-12 rounded-lg object-cover"
              />
            )}

            <div className="flex-1">
              <p className="font-medium text-sm">
                {product.name}
              </p>
              <p className="text-xs opacity-60">
                ₹{product.price}
              </p>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-medium ${
                product.stock < 5
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              Stock: {product.stock}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="px-3 py-1 text-xs rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(product.id)}
                className="px-3 py-1 text-xs rounded-lg border text-red-500 border-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))
    )}
  </div>

  {/* ---------------- DESKTOP TABLE ---------------- */}
  <div className="hidden sm:block overflow-x-auto">
    <table className="w-full text-sm">
      
      <thead>
        <tr
          className={`text-xs uppercase ${
            Theme === "dark"
              ? "text-gray-400 border-b border-gray-700"
              : "text-gray-500 border-b border-gray-200"
          }`}
        >
          <th className="py-3 text-left">Product</th>
          <th className="py-3 text-left">Price</th>
          <th className="py-3 text-left">Stock</th>
          <th className="py-3 text-right">Actions</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
        {products.slice(-5).reverse().map((product) => (
          <tr key={product.id}>
            <td className="py-4">
              <div className="flex items-center gap-3">
                {product.images?.[0] && (
                  <img
                    src={product.images[0]}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                )}
                {product.name}
              </div>
            </td>

            <td>₹{product.price}</td>

            <td>{product.stock}</td>

            <td className="text-right">
              <div className="flex justify-end gap-2">
                <button onClick={() => handleEdit(product)} className="border-2 p-1 rounded">✏️</button>
                <button onClick={() => handleDelete(product.id)} className="border-2 p-1 rounded">🗑️</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  </div>
</div>

    </div>
  );
}

export default Dashboard;
