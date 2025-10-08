import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

const Signup = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handelSignup = ((e) => {
        e.preventDefault();
        if (name && email && password) {
            axios.post("http://localhost:8080/signup", { name, email, password })
                .then((res) => {
                    alert(res.data.message)
                })
                .catch((err) => {
                    alert(err)
                })
        }
        else {
            alert("Plz Add Value !")
        }
        setName('')
        setEmail('')
        setPassword('')
    })

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Create Account
                </h2>
                <form className="space-y-5" onSubmit={handelSignup}>
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Sign Up
                    </button>

                    <p className="text-sm text-gray-600 text-center mt-4">
                        Already have an account?{" "}
                        <Link to='/login' className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>

                    <p className="text-sm text-gray-600 text-center mt-4">
                        Enter Product Data : {" "}
                        <Link to='/productform' className="text-blue-600 hover:underline">
                            Product Form
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
};

export default Signup;
