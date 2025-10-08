import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Signup = () => {

    let [name, setName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")

    let handleSignUp = (() => {
        if (name, email, password) {
            axios.post("http://localhost:8080/signup", { name, email, password })
                .then((res) => {
                    localStorage.setItem("users", JSON.stringify(res.data.users))
                    console.log(res.data.users)
                    alert(res.data.message)
                })
        }
        else {
            alert("Plz Add a Value !")
        }

        setName("")
        setEmail("")
        setPassword("")
    })

    return (
        <div>
            <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} />
            <br />
            <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} />
            <br />
            <input type="text" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />
            <br />
            <button onClick={handleSignUp}>SignUp</button>
            <br />
            <Link to="/">if you have an account ?</Link>
        </div>
    )
}

export default Signup
