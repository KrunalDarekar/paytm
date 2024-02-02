import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { currUserAtom} from "../state/atoms/currUser"
import { useNavigate } from "react-router-dom";

const Users = ({users, setFilter}) => {
    const [searchText, setSearchText] = useState("")
    const navigate = useNavigate()
    const setCurrUser = useSetRecoilState(currUserAtom)

    return (
        <div className="text-lg font-bold flex flex-col px-6">
            <p>Users</p>
            <input onChange={(e) => { 
                setFilter(e.target.value)
                setSearchText(e.target.value)}} type="text" placeholder="Search users..." className="border border-gray-400 text-base font-normal rounded py-1 px-2 mt-1 mb-4"/>
            <div>
                {
                    users.map( user => {
                        return <div key={user.userId} className="flex justify-between text-base font-medium my-2 py-1">
                            <div key={user.userId} className="flex items-center">
                                <div key={user.userId} className="flex border rounded-full min-w-10 min-h-10 justify-center items-center bg-slate-200 text-xl mr-2 font-normal"><div>{user.firstName[0].toUpperCase()}</div></div>
                                <p key={user.userId} >{user.firstName + " " + user.lastName}</p>
                            </div>
                            <button key={user.userId} onClick={ () => {
                                setCurrUser(user)
                                navigate("/sendmoney")
                            }} className="bg-black text-white rounded-lg px-3 py-1 hover:bg-gray-900 cursor-pointer font-normal text-sm">Send Money</button>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Users;