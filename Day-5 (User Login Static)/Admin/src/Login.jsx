import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const handelLogin = (() => {
        axios.post("http://localhost:8080/login", { password, email })
            .then((res) => {
                alert(res.data.message)

                if (res.data.message === "User LoggedIn !") {
                    navigate("/dashbord")
                }
                else {
                    alert(res.data.message)
                }
            })
            .catch((err) => {
                console.error(err);
                alert("Something went wrong. Please try again.");
            })
    })

    return (
        <div>
            <input type="text" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <input type="text" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            <button onClick={handelLogin}>LogIn</button>
        </div>
    )
}

export default Login
