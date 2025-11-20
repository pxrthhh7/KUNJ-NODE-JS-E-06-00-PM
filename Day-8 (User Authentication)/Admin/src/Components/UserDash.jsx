import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const UserDash = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "User";
  const token = Cookies.get("token");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    axios.get("http://localhost:8080/productList")
      .then((res) => {
        setProducts(res.data.products)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#C6E2FF] via-[#FFD6E8] to-[#C8F7C5] p-4">

      <div className="relative w-full max-w-3xl bg-white/85 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/60 text-center">

        {/* LOGOUT BUTTON TOP RIGHT */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 px-4 py-1 rounded-lg cursor-pointer bg-gradient-to-r from-[#81D4FA] via-[#A5D6A7] to-[#F48FB1] text-white font-semibold shadow-md hover:opacity-90 transition duration-200"
        >
          Logout
        </button>

        {/* WELCOME */}
        <h1 className="text-4xl font-semibold text-gray-800 mb-3">
          Welcome, <span className="text-[#5C6BC0]">{userName}</span> 👋
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          You are successfully logged in with a valid session token.
        </p>

        {/* PRODUCT SECTION */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md p-4 hover:scale-105 transition-transform duration-300"
            >
              <img
                src={item.productImageUrl}
                alt={item.productName}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-700">{item.productName}</h3>
              <p className="text-gray-600 text-sm mb-2">₹{item.productPrice}</p>
              <button className="w-full bg-gradient-to-r from-[#81D4FA] to-[#F48FB1] text-white py-1 rounded-lg shadow-md hover:opacity-90">
                View
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default UserDash;
