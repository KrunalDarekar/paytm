import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleSubmitClick = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username,
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
                <h1 className="self-center font-bold text-3xl">Sign In</h1>
                <h3 className="text-gray-500 mt-2 mb-3 text-center text-base">Enter your credentials to access your account</h3>
                <label htmlFor="email" className="font-semibold">Email</label>
                <input onChange={(e) => { setUsername(e.target.value)}} type="text" name="email" id="email" placeholder="johndoe@email.com" className="border border-gray-400 rounded py-1 px-2 mt-1 mb-2"/>
                <label htmlFor="password" className="font-semibold">Password</label>
                <input onChange={(e) => { setPassword(e.target.value)}} type="password" name="password" id="password" className="border border-gray-400 rounded py-1 px-2 mt-1 mb-2"/>
                <input onClick={handleSubmitClick} type="submit" value="Sign In" className="bg-black text-white rounded py-2 hover:bg-gray-900 cursor-pointer my-2"/>
                <p className="font-semibold text-center">Don't have an account? <Link to="/Signup" className="underline">Sign Up</Link></p>
            </form>
        </div>
    )
}

export default Signin;