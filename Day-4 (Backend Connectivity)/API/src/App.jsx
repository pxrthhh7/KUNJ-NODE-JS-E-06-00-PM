import React, { useState } from 'react'
import axios from 'axios'

const App = () => {

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")

  const handelAdd = (() => {
    try {
      axios.post('http://localhost:8080/send-data', { name, surname })
        .then(res => {
          console.log(res.data.message)
        })

    } catch (error) {
      console.log(error)
    }
  })

  return (
    <div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
      <button onClick={handelAdd}>Add</button>
    </div>
  )
}

export default App
