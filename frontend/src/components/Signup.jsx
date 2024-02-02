import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmitClick = async(e) => {
        try {
            e.preventDefault()
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username,
                firstName,
                lastName,
                password
            })
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('username', username)
            navigate("/dashboard")
        } catch(err) {
            alert(err.response.data.message)
        }
    }


    return (
        <div className="font-sans flex items-center justify-center h-screen bg-gray-300">
            <form action="post" className="inline-flex flex-col border rounded-lg p-4 bg-white whitespace-normal max-w-80 text-sm">
                <h1 className="self-center font-bold text-3xl">Sign Up</h1>
                <h3 className="text-gray-500 mt-2 mb-3 text-center text-base">Enter your information to create an account</h3>
                <label htmlFor="first-name" className="font-semibold">First Name</label>
                <input onChange={(e) => { setFirstName(e.target.value)}} type="text" name="firstName" id="first-name" placeholder="John" className="border border-gray-400 rounded py-1 px-2 mt-1 mb-2"/>
                <label htmlFor="last-name" className="font-semibold">Last Name</label>
                <input onChange={(e) => { setLastName(e.target.value)}} type="text" name="lastName" id="last-name " placeholder="Doe" className="border border-gray-400 rounded py-1 px-2 mt-1 mb-2"/>
                <label htmlFor="email" className="font-semibold">Email</label>
                <input onChange={(e) => { setUsername(e.target.value)}} type="text" name="email" id="email" placeholder="johndoe@email.com" className="border border-gray-400 rounded py-1 px-2 mt-1 mb-2"/>
                <label htmlFor="password" className="font-semibold">Password</label>
                <input onChange={(e) => { setPassword(e.target.value)}} type="password" name="password" id="password" className="border border-gray-400 rounded py-1 px-2 mt-1 mb-2"/>
                <input onClick={handleSubmitClick} type="submit" value="Sign Up" className="bg-black text-white rounded py-2 hover:bg-gray-900 cursor-pointer my-2"/>
                <p className="font-semibold text-center">Already have an account <Link className="underline" to="/Signin">login</Link></p>
            </form>
        </div>
    )
}

export default Signup;