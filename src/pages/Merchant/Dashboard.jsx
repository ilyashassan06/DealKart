import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { db, auth } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

function Dashboard() {
  const { Theme } = useTheme();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  /* ---------------- FETCH MERCHANT DATA ---------------- */

  useEffect(() => {
    const fetchMerchantData = async () => {
      try {
        const merchantId = auth.currentUser.uid;

        const merchantRef = doc(db, "merchant", merchantId);
        const merchantSnap = await getDoc(merchantRef);

        if (merchantSnap.exists()) {
          const data = merchantSnap.data();
          setProducts(data.products || []);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchMerchantData();
  }, []);

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
        className={`p-6 rounded-xl border ${
          Theme === "dark"
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recent Products</h2>

          <button
            onClick={() => navigate("/merchant/products")}
            className="text-sm underline hover:opacity-70"
          >
            View All
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">

            <thead>
              <tr
                className={`border-b ${
                  Theme === "dark"
                    ? "border-gray-700"
                    : "border-gray-200"
                }`}
              >
                <th className="py-3">Product</th>
                <th className="py-3">Price</th>
                <th className="py-3">Stock</th>
              </tr>
            </thead>

            <tbody>

              {products.length === 0 ? (
                <tr>
                  <td className="py-3">No products yet</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              ) : (
                products.slice(-5).reverse().map((product, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      Theme === "dark"
                        ? "border-gray-800"
                        : "border-gray-100"
                    }`}
                  >
                    <td className="py-3 flex items-center gap-3">

                      {product.images?.[0] && (
                        <img
                          src={product.images[0]}
                          className="w-10 h-10 object-cover rounded"
                        />
                      )}

                      {product.name}

                    </td>

                    <td>₹{product.price}</td>

                    <td>{product.stock}</td>
                  </tr>
                ))
              )}

            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
