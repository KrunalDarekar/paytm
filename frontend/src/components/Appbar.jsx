import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Appbar = ({firstName}) => {
    const [isClicked, setIsClicked] = useState(false)
    const navigate = useNavigate()

    return(
        <header className="flex justify-between items-center py-2 px-4 font-medium shadow text-lg">
            <div>PayTM App</div>
            <div className="flex items-center">
                <div>Hello</div>
                <div onClick={() => setIsClicked(!isClicked)} className="relative cursor-pointer flex border rounded-full min-w-12 min-h-12 justify-center items-center bg-slate-200 text-xl ml-2 font-normal">
                    <div>{firstName[0].toUpperCase()}</div>
                    {isClicked && 
                        <div className="flex flex-col justify-center absolute top-full right-0 min-w-24 min-h-6 bg-gray-700/50 mt-2 rounded text-xs text-white">
                            <div className="border-b border-white p-1 cursor-default">{firstName}</div>
                            <button className="p-1" onClick={() => {
                                localStorage.clear()
                                navigate('/signin')
                            }}>Sign out</button>
                        </div>
                    }
                </div>
            </div>
        </header>
    )
}

export default Appbar