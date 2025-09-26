import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Dashboard = () => {

    const username = JSON.parse(localStorage.getItem("username"))

    useEffect(() => {
        axios.get("http://localhost:8080/dashbord")
            .then((res) => {
                alert(res.data.message)
            })
            .catch((err) => {
                console.log(err)
            })
    })

    return (
        <div>
            <h1>Hello , {username}</h1>
        </div>
    )
}

export default Dashboard
