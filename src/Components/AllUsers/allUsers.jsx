import { useSelector } from "react-redux"
import styles from "./allUsers.module.css"
import { auctionSelector } from "../../redux/reducers/auction"
function AllUsers(){
    const {users} = useSelector(auctionSelector)
    return (
        <div className={styles.main}>
        <h1>Users</h1>
        {users.map((data, key) =>(
            <div className={styles.userList}>
            <div className={styles.srNo}>
            <h3>{key+1}</h3>
            </div>
            <h3>{data.username}</h3>       
        </div>
        ))}
  
 

      </div>
    )
}

export default AllUsers