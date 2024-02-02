import Signin from "./components/Signin"
import Signup from "./components/Signup"
import Dashboard from "./components/Dashboard"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { RecoilRoot } from "recoil"
import SendMoney from "./components/SendMoney"

function App() {

  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={localStorage.getItem("token") ? <Dashboard/> : <Signup/>}/>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sendmoney" element={<SendMoney />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  )

  // return (
  //   <div className="font-sans flex items-center justify-center h-screen bg-gray-300">
  //       <Signin/>
  //   </div>
  // )
}

export default App
