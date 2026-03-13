import React from "react";
import { useTheme } from "../../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

function MerchantFooter() {
  const { Theme } = useTheme();
  const navigate = useNavigate();

  return (
    <footer
      className={`w-full border-t  ${
        Theme === "dark"
          ? "bg-gray-900 border-gray-700 text-gray-300"
          : "bg-white border-gray-200 text-gray-700"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold mb-3">
            <span className="text-red-600">DealKart</span> Merchant
          </h2>
          <p className="text-sm opacity-80">
            Manage your products, track sales, and grow your business with the
            DealKart merchant platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>

          <ul className="flex flex-col gap-2 text-sm">
            <li
              className="cursor-pointer hover:opacity-70 transition"
              onClick={() => navigate("/merchant/dashboard")}
            >
              Dashboard
            </li>

            <li
              className="cursor-pointer hover:opacity-70 transition"
              onClick={() => navigate("/merchant/products")}
            >
              Products
            </li>

            <li
              className="cursor-pointer hover:opacity-70 transition"
              onClick={() => navigate("/merchant/add-product")}
            >
              Add Product
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-3">Support</h3>

          <ul className="flex flex-col gap-2 text-sm">
            <li className="hover:opacity-70 transition cursor-pointer">
              Merchant Help
            </li>
            <li className="hover:opacity-70 transition cursor-pointer">
              Contact Support
            </li>
            <li className="hover:opacity-70 transition cursor-pointer">
              Terms & Conditions
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className={`border-t py-4 text-center text-sm ${
          Theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}
      >
        © {new Date().getFullYear()} DealKart Merchant. All rights reserved.
      </div>
    </footer>
  );
}

export default MerchantFooter;
