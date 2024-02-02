import { useEffect, useState } from "react"
import Appbar from "./Appbar"
import Balance from "./Balance"
import Users from "./Users"
import axios from "axios"

const Dashboard = () => {
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState("")
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:3000/api/v1/user/bulk?filter=${filter}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`
                }
              }
            );
            setUsers(response.data.users);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
      
        fetchData(); // Call the async function immediately
      
    }, [filter]);

    useEffect( () => {
        const fetchBalance = async () => {
            try {
              const response = await axios.get(
                `http://localhost:3000/api/v1/account/balance`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                  }
                }
              );
              setBalance(response.data.balance)
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        }
        fetchBalance()

    },[])


    return (
        <div>
            <Appbar firstName={localStorage.getItem("username")}/>
            <Balance balance={balance} />
            <Users users={users} setFilter={setFilter}/>
        </div>
    )
}

export default Dashboard