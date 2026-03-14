import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { db, auth } from "../../firebase/firebase";
import { doc, setDoc, arrayUnion } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function AddProduct() {

  const navigate = useNavigate();
  const { Theme } = useTheme();
  const [loading, setLoading] = useState(false);

  const [productData, setProductData] = useState({
    name: "",
    shortDescription: "",
    fullDescription: "",
    brand: "",
    price: "",
    discountPrice: "",
    stock: "",
    sku: "",
    category: "",
    subcategory: "",
    tags: "",
    images: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + productData.images.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    setProductData((prev) => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index) => {
    const newImages = [...productData.images];
    newImages.splice(index, 1);

    setProductData((prev) => ({
      ...prev,
      images: newImages
    }));
  };

  const uploadToCloudinary = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "dealkart");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dznsgojy6/image/upload",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async () => {
    try {
      if (!productData.name || !productData.price) {
        alert("Product name and price required");
        return;
      }

      setLoading(true);

      const merchantId = auth.currentUser.uid;

      const imageUrls = [];

      for (let image of productData.images) {
        const url = await uploadToCloudinary(image);
        imageUrls.push(url);
      }

      const finalProduct = {
        ...productData,
        images: imageUrls,
        createdAt: new Date()
      };

      const merchantRef = doc(db, "merchant", merchantId);

      await setDoc(
        merchantRef,
        {
          products: arrayUnion(finalProduct)
        },
        { merge: true }
      );

      alert("Product Added Successfully");
      navigate("/merchant/dashboard")

      setProductData({
        name: "",
        shortDescription: "",
        fullDescription: "",
        brand: "",
        price: "",
        discountPrice: "",
        stock: "",
        sku: "",
        category: "",
        subcategory: "",
        tags: "",
        images: []
      });

      setLoading(false);

    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const card =
    Theme === "dark"
      ? "bg-gray-900 border-gray-700 text-gray-100"
      : "bg-white border-gray-200 text-gray-900";

  const input =
    Theme === "dark"
      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
      : "bg-white border-gray-300 text-black placeholder-gray-500";

  return (
    <div className={`min-h-screen p-6 ${Theme === "dark" ? "bg-gray-950" : "bg-gray-100"}`}>

      <div className="max-w-6xl mx-auto space-y-6">

        <h1 className="text-2xl font-bold">Add Product</h1>

        {/* PRODUCT INFO */}

        <div className={`p-6 rounded-xl border shadow-sm ${card}`}>
          <h2 className="font-semibold mb-5 text-lg">Product Information</h2>

          <div className="space-y-4">

            <input
              name="name"
              placeholder="Product Name"
              value={productData.name}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black ${input}`}
            />

            <input
              name="shortDescription"
              placeholder="Short Description"
              value={productData.shortDescription}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black ${input}`}
            />

            <textarea
              rows="4"
              name="fullDescription"
              placeholder="Full Description"
              value={productData.fullDescription}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black ${input}`}
            />

            <input
              name="brand"
              placeholder="Brand"
              value={productData.brand}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black ${input}`}
            />
          </div>
        </div>

        {/* PRODUCT IMAGES */}

        <div className={`p-6 rounded-xl border shadow-sm ${card}`}>
          <h2 className="font-semibold mb-5 text-lg">Product Images</h2>

          <div className={`border-2 border-dashed rounded-xl p-10 text-center transition ${
              Theme === "dark" ? "border-gray-600 hover:border-gray-500" : "border-gray-300 hover:border-gray-400"
          }`}>

            <p className="mb-4 text-sm opacity-80">Drag & Drop Images Here</p>

            <input
              type="file"
              multiple
              onChange={handleImageChange}
              id="upload"
              className="hidden"
            />

            <label
              htmlFor="upload"
              className="px-5 py-2 border rounded-lg cursor-pointer font-medium transition hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Upload Image
            </label>

          </div>

          <div className="flex gap-4 mt-6 flex-wrap">

            {productData.images.map((img, index) => (
              <div key={index} className="relative">

                <img
                  src={URL.createObjectURL(img)}
                  className="w-20 h-20 rounded-lg object-cover border"
                />

                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-black text-white text-xs px-2 rounded-full"
                >
                  ✕
                </button>

              </div>
            ))}

          </div>
        </div>

        {/* PRICING */}

        <div className={`p-6 rounded-xl border shadow-sm ${card}`}>
          <h2 className="font-semibold mb-5 text-lg">Pricing & Inventory</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              name="price"
              placeholder="Price"
              value={productData.price}
              onChange={handleChange}
              className={`p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black ${input}`}
            />

            <input
              name="discountPrice"
              placeholder="Discount Price"
              value={productData.discountPrice}
              onChange={handleChange}
              className={`p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black ${input}`}
            />

            <input
              name="stock"
              placeholder="Stock Quantity"
              value={productData.stock}
              onChange={handleChange}
              className={`p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black ${input}`}
            />

            <input
              name="sku"
              placeholder="SKU"
              value={productData.sku}
              onChange={handleChange}
              className={`p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black ${input}`}
            />
          </div>
        </div>

        {/* CATEGORY */}

        <div className={`p-6 rounded-xl border shadow-sm ${card}`}>
          <h2 className="font-semibold mb-5 text-lg">Category & Tags</h2>

          <div className="space-y-4">

            <input
              name="category"
              placeholder="Category"
              value={productData.category}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black ${input}`}
            />

            <input
              name="subcategory"
              placeholder="Subcategory"
              value={productData.subcategory}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black ${input}`}
            />

            <input
              name="tags"
              placeholder="fashion, shoes, electronics"
              value={productData.tags}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black ${input}`}
            />

          </div>
        </div>

        {/* BUTTONS */}

        <div className="flex justify-end gap-4">

          <button
          onClick={()=>navigate("/merchant/dashboard")}
            className="px-6 py-2 border rounded-lg font-medium transition hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Go Back To Dashboard
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg font-medium bg-black text-white hover:opacity-90 transition"
          >
            {loading ? "Uploading..." : "Publish Product"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default React.memo(AddProduct);
