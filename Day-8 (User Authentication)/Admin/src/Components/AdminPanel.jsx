import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import axios from "axios";

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "" , 
        productImgUrl : ""
    });
    const [productImageFile,setProductImageFile] = useState(null)
    const [productList, setProductList] = useState([])
    const [editIndex, setEditIndex] = useState(null)

    // Fetch users
    useEffect(() => {
        axios.get("http://localhost:8080/admin")
            .then((res) => {
                // alert(res.data.message);
                setUsers(res.data.allUsers);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Fetch Product
    useEffect(() => {
        axios.get("http://localhost:8080/productList")
            .then((res) => {
                // alert(res.data.message)
                setProductList(res.data.products)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const normalUsers = users.filter((user) => user.role === "User");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImage = ((e)=>{
        let file = e.target.files[0]
        setProductImageFile(file)
    })
    
    let cloud = "ddlvy9tcc"
    let preset = "new_project"

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!product.name || !product.price || !product.description ) {
            alert("Please fill all fields!");
            return;
        }

        let formData = new FormData()
        formData.append("file",productImageFile)
        formData.append("upload_preset",preset)

        let res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud}/image/upload` , formData)

        let imageUrl = res.data.secure_url

        axios.post("http://localhost:8080/addProduct", { product ,  imageUrl})
            .then((res) => {
                alert(res.data.message || "Product added successfully!");
                setProduct({ name: "", price: "", description: "" ,  productImgUrl : ""  });
            })
            .catch((err) => {
                console.error(err);
                alert("Error adding product");
            });
    };

    const handleDelete = ((id) => {
        axios.delete("http://localhost:8080/deleteProduct", { data: { id } })
            .then((res) => {
                alert(res.data.message)
                setProductList(prevProduct => prevProduct.filter(prod => prod._id !== id))
            })
            .catch((err) => {
                console.log(err)
            })
    })

    const handelEdit = ((index) => {
        setEditIndex(index)
        setProduct({
            name: productList[index].productName,
            price: productList[index].productPrice,
            description: productList[index].productDescription
        });
    })

    const handelSave = ((id) => {
        axios.post("http://localhost:8080/editProduct", { product, id })
            .then((res) => {
                alert(res.data.message);
                const updatedProduct = res.data.updatedProduct;
                setProductList(prevList =>
                    prevList.map(item =>
                        item._id === id ? updatedProduct : item
                    )
                );
                setProduct({ name: "", price: "", description: "" });
                setEditIndex(null)
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    alert(err.response.data.message);
                } else {
                    alert("Server error!");
                }
            });
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#C6E2FF] via-[#FFD6E8] to-[#C8F7C5] p-6 flex justify-center items-center">
            <div className="w-full max-w-6xl bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/60">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
                    Admin Panel
                </h2>

                {/* ---------- Add Product Form ---------- */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-gradient-to-r from-[#81D4FA]/20 to-[#F48FB1]/20 rounded-xl p-6 mb-10 shadow-inner"
                >
                    <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                        Add Product
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            placeholder="Product Name"
                            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            placeholder="Price"
                            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                        <input
                            type="text"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                        <label className="flex items-center justify-center w-full col-span-1 md:col-span-3 cursor-pointer">
                            <div className="w-full p-4 border-2 border-dashed border-blue-300 rounded-lg bg-white hover:bg-blue-50 transition flex flex-col items-center">
                                <span className="text-gray-700 font-medium mb-1">Choose Product Image</span>
                                <span className="text-sm text-gray-400">Click to upload (JPG, PNG)</span>
                            </div>

                            {/* Hidden File Input */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e)=>handleImage(e)}
                                className="hidden"
                            />
                        </label>
                    </div>

                    {/* Add Product Btn */}
                    <div className="flex justify-center mt-5">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-gradient-to-r from-[#81D4FA] to-[#F48FB1] text-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-0.5"
                        >
                            Add Product
                        </button>
                    </div>
                </form>

                {/* ---------- User List Table ---------- */}
                <div className="overflow-x-auto mb-10">
                    <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
                        <thead className="bg-gradient-to-r from-[#81D4FA] to-[#F48FB1] text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Email</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white text-gray-700">
                            {normalUsers.map((user, index) => (
                                <tr
                                    key={user.id}
                                    className={`border-b border-gray-200 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        } hover:bg-[#F8F9FA] transition`}
                                >
                                    <td className="px-4 py-3 font-medium">{user.name}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ---------- Product List (List Format - UI Only) ---------- */}
                <div className="mt-10">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                        Product List
                    </h3>

                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
                            <thead className="bg-gradient-to-r from-[#81D4FA] to-[#F48FB1] text-white">
                                <tr>
                                    <th className="px-4 py-3 text-left">Product Name</th>
                                    <th className="px-4 py-3 text-left">Price (₹)</th>
                                    <th className="px-4 py-3 text-left">Description</th>
                                    <th className="px-4 py-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white text-gray-700">
                                {productList.map((element, index) => (
                                    <tr
                                        key={element._id}
                                        className={`border-b border-gray-200 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                            } hover:bg-[#F8F9FA] transition`}
                                    >
                                        {
                                            editIndex === index ?

                                                (
                                                    <>
                                                        <td className="px-4 py-3 font-medium">
                                                            <input required value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} type="text" className="px-4 py-1 outline-none border-2" />
                                                        </td>
                                                        <td className="px-4 py-3 font-medium">
                                                            <input required value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} type="text" className="px-4 py-1 outline-none border-2" />
                                                        </td>
                                                        <td className="px-4 py-3 font-medium">
                                                            <input required value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} type="text" className="px-4 py-1 outline-none border-2" />
                                                        </td>
                                                    </>
                                                )
                                                :
                                                (
                                                    <>
                                                        <td className="px-4 py-3 font-medium">{element.productName}</td>
                                                        <td className="px-4 py-3">₹{element.productPrice}</td>
                                                        <td className="px-4 py-3 text-gray-600">{element.productDescription}</td>
                                                    </>
                                                )
                                        }



                                        <td className="px-4 py-3 text-center space-x-3">
                                            <button onClick={() =>
                                                editIndex === index ?
                                                    handelSave(element._id)
                                                    :
                                                    handelEdit(index)
                                            }
                                                className="px-4 py-1 cursor-pointer bg-gradient-to-r from-[#81D4FA] to-[#4FC3F7] text-white rounded-md text-sm shadow hover:shadow-lg transition-transform hover:-translate-y-0.5">
                                                {
                                                    editIndex === index ? "Save" : "Edit"
                                                }
                                            </button>
                                            <button onClick={() => handleDelete(element._id)} className="px-4 py-1 cursor-pointer bg-gradient-to-r from-[#F48FB1] to-[#F06292] text-white rounded-md text-sm shadow hover:shadow-lg transition-transform hover:-translate-y-0.5">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
