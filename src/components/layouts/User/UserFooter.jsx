import React from "react";
import { useTheme } from "../../../context/ThemeContext";

function UserFooter() {
  const { Theme } = useTheme();
  const isDark = Theme === "dark";

  return (
    <footer
      className={` border-t ${
        isDark
          ? "bg-black border-gray-800 text-gray-300"
          : "bg-white border-gray-200 text-gray-700"
      }`}
    >
      {/* TOP CTA */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div
          className={`rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-4 ${
            isDark ? "bg-gray-900" : "bg-black text-white"
          }`}
        >
          <h3 className="font-semibold text-sm md:text-base">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h3>

          <div className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-full text-black text-sm outline-none"
            />
            <button className="px-5 py-2 rounded-full bg-white text-black text-sm font-medium hover:opacity-90 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* LOGO */}
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-xl font-bold mb-3">DealKart</h2>
          <p className="text-sm opacity-60 leading-relaxed">
            Your one-stop shop for trending products at the best prices.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h4 className="font-semibold mb-3 text-sm">Company</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li className="hover:opacity-100 cursor-pointer">About</li>
            <li className="hover:opacity-100 cursor-pointer">Careers</li>
            <li className="hover:opacity-100 cursor-pointer">Blog</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm">Help</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li className="hover:opacity-100 cursor-pointer">Support</li>
            <li className="hover:opacity-100 cursor-pointer">FAQs</li>
            <li className="hover:opacity-100 cursor-pointer">Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm">Legal</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li className="hover:opacity-100 cursor-pointer">Privacy</li>
            <li className="hover:opacity-100 cursor-pointer">Terms</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm">Follow</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li className="hover:opacity-100 cursor-pointer">Instagram</li>
            <li className="hover:opacity-100 cursor-pointer">Twitter</li>
            <li className="hover:opacity-100 cursor-pointer">Facebook</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div
        className={`border-t ${
          isDark ? "border-gray-800" : "border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs opacity-60">
          <p>© 2026 DealKart. All rights reserved.</p>

          <div className="flex gap-4">
            <span className="cursor-pointer hover:opacity-100">
              Privacy Policy
            </span>
            <span className="cursor-pointer hover:opacity-100">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default UserFooter;