import { useRecoilValue } from "recoil"
import { currUserAtom} from "../state/atoms/currUser"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


const SendMoney = () => {
    const user = useRecoilValue(currUserAtom)
    const [amount, setAmount] = useState("")
    const navigate = useNavigate()

    const handleClick = async() => {
        const res = await axios.post("http://localhost:3000/api/v1/account/transfer", {
            to : user._id,
            amount
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        alert(res.data.message)
        navigate('/dashboard')
    }

    return (
        <div className="font-sans flex items-center justify-center h-screen bg-gray-300">
            <div className="inline-flex flex-col border rounded-lg p-4 bg-white whitespace-normal min-w-60 text-sm">
                <div className="text-center text-3xl font-bold mb-4">Send Money</div>
                <div className="flex items-center py-2">
                    <div className="flex border rounded-full min-w-10 min-h-10 justify-center items-center bg-green-500 text-xl mr-2 font-normal text-white">{user.firstName[0].toUpperCase()}</div>
                    <div className="text-lg font-medium">{`to ${user.firstName} ${user.lastName}`}</div>
                </div>
                <div className="text-xs font-medium">Amount (in Rs)</div>
                <input onChange={(e) => { setAmount(parseInt(e.target.value))}} type="text" placeholder="Search users..." className="border border-gray-400 text-sm font-normal rounded py-1 px-2 my-2"/>
                <button onClick={handleClick} className="bg-green-500 text-white rounded px-3 py-1 hover:bg-green-400 cursor-pointer font-normal text-sm">Send money</button>
            </div>
        </div>
    )
}

export default SendMoney