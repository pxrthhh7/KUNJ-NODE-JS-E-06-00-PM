import React, { useState } from "react";
import axios from 'axios'

const ProductForm = () => {

    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')

    const handelSubmit = ((e) => {
        e.preventDefault();

        axios.post("http://localhost:8080/productadd", { productName, productPrice })
            .then((res) => {
                alert(res.data.message)
            })
            .catch((err) => {
                alert(err)
            })

        setProductName('')
        setProductPrice('')

    })

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Add Product
                </h2>
                <form className="space-y-5" onSubmit={handelSubmit}>
                    {/* Product Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Product Name
                        </label>
                        <input
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            type="text"
                            placeholder="Enter product name"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Price
                        </label>
                        <input
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            type="number"
                            placeholder="Enter price"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                    >
                        Save Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
