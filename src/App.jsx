
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {

  const [users,setUsers]=useState([])

  useEffect(()=>{
    fetch("http://localhost:5000/users")
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      setUsers(data)
    })
  },[])

  const handleAddToUser = event =>{
    event.preventDefault();
    const form=event.target;
    const name=form.name.value;
    const email=form.email.value;
    const newUser={name,email};
    console.log(newUser)

    fetch("http://localhost:5000/users", {
      method: 'POST',
      headers:{
        "content-type": "application/json"
      },
      body:JSON.stringify(newUser)
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      const newUser=[...users, data]
      setUsers(newUser)
      form.reset()
    })
  }
  

  return (
    <>

      <h1>Users management system</h1>
      <h3>Total Users: {users.length}</h3>

      <form onSubmit={handleAddToUser}>
        <input type="text" name="name" id="" placeholder='name' />
        <br />
        <input type="email" name="email" id=""  placeholder='email'/>
        <br />
        <input type="submit" value="Add User" />
      </form>

      <div>
        {
          users.map(user=> <p key={user.id}>{user.id}: {user.name} {user.email}</p>)
        }
      </div>



    </>
  )
}

export default App
