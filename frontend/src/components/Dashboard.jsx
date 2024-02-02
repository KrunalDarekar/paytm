import { useEffect, useState } from "react"
import Appbar from "./Appbar"
import Balance from "./Balance"
import Users from "./Users"
import axios from "axios"

function useDebounce (value, ms) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect( () => {
    const timer = setTimeout( () => {
      setDebouncedValue(value)
    }, ms)

    return () => {
      clearTimeout(timer)
    }
  }, [value])

  return debouncedValue;
}

const Dashboard = () => {
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState("")
    const [balance, setBalance] = useState(0)
    const debouncedFilter = useDebounce(filter, 500)

    useEffect(() => {
        const fetchData = async () => {
          try {
            console.log(`from dashboard ${debouncedFilter}`)
            const response = await axios.get(
              `http://localhost:3000/api/v1/user/bulk?filter=${debouncedFilter}`,
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
      
        fetchData();
      
    }, [debouncedFilter]);

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