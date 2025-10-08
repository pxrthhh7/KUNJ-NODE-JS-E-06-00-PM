import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")

    const navigate = useNavigate()

    let handleLogIn = (() => {
        const users = JSON.parse(localStorage.getItem("users"))
        console.log(users)
        axios.post("http://localhost:8080/login", { email, password, users })
            .then((res) => {
                if (res.data.message === "Valid !") {
                    localStorage.setItem("username", JSON.stringify(res.data.name))
                    const token = Math.floor(Math.random() * 10000)
                    localStorage.setItem("token", token)
                    alert(res.data.message)
                    navigate("/dashbord")
                }
                else {
                    alert(res.data.message)
                }
            })
    })
    return (
        <div>
            <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} />
            <br />
            <input type="text" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />
            <br />
            <button onClick={handleLogIn}>Log In</button>
            <br />
            <Link to="/signup">if you dont have an account ?</Link>
        </div>
    )
}

export default Login
