'use client'

import { useState } from "react"

export default function UsersForm() {

    const [users, setUsers] = useState([]);
    // const [loading, setLoading] = useState(false);
    const [fd, setFd] = useState({
        name: '',
        location: '',
        age: 0,
    })

    function handleSubmit(e) {
        e.preventDefault()

        let newUser =  {
            name: fd.name,
            location: fd.location,
            age: fd.age,
            id: Date.now()
        }

        setUsers((prev) => ([
            ...prev,
            newUser
        ]))

        setFd({
        name: '',
        location: '',
        age: 0,
    })

    console.log(newUser)
    }

    return (
        <>
        <form>

        <h1>form</h1>

        <div>
            <label htmlFor="name">Name</label>
        <input type="text" 
        id="name"
        placeholder="Name"
        value={fd.name}
        onChange={(e) => setFd((prev) => ({
            ...prev,
            name: e.target.value,
        }))}
        />
        </div>

        <div>
            <label htmlFor="location">Location</label>
        <input type="text" 
        id="location"
        placeholder="location"
        value={fd.location}
        onChange={(e) => setFd((prev) => ({
            ...prev,
            location: e.target.value,
        }))}
        />
        </div>

        <div>
            <label htmlFor="age">Age</label>
        <input type="number" 
        id="age"
        placeholder="age"
        value={fd.age}
        onChange={(e) => setFd((prev) => ({
            ...prev,
            age: e.target.value,
        }))}
        />
        </div>

        <button onClick={handleSubmit}>Submit</button>

        </form>

        <div>
            <ol>
                {users.map((item) => (
                <li key={item.id}>
                    <span>{item.name}</span>
                    <span>{item.location}</span>
                    <span>{item.age}</span>
                </li>
            ))}
            </ol>
        </div>
        </>
    )

}