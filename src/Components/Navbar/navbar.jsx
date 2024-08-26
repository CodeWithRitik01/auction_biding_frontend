import { NavLink } from "react-router-dom";
import styles from "./navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../constants/config";
import axios from "axios";
import { actions, auctionSelector, getInitialStateAsync } from "../../redux/reducers/auction";
import { useEffect, useState } from "react";
import AuctionForm from "../AuctionForm/auctionForm";


function Navbar(){
    const dispatch = useDispatch();
    const [adminKey, setAdminKey] = useState()
    const {user} = useSelector(auctionSelector)
    const [loading, setLoading] = useState(true);
    
    console.log(user)

    useEffect(() => {
        const fetchUser = async () => {
            await dispatch(getInitialStateAsync());
            setLoading(false);
        };

        

        fetchUser();
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>; 
    }

    const handleLogout = async() =>{
        try {
            const data = await axios.get(`${server}/api/users/logout`, 
            { withCredentials: true, })

            dispatch(actions.userExists());
          

        } catch (error) {
            console.log(error)
        }
    }


       const updateUser = async (e)=>{
        e.preventDefault()
        const config = {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            }
          };
         try{
             const response = await axios.put(`${server}/api/users/makeadmin`,{
                key:adminKey
             },
             config
            )
         }catch(error){
            console.log(error)
         }
    }


    return (
        <div>
            <div className={styles.main}>
              <NavLink className={`${styles.logoDiv} ${styles.otherNav}`}>
                    <img className={styles.logo} src="https://cdn-icons-png.flaticon.com/128/2639/2639683.png" alt="Not found"/>
                    <h2>AUCTION BIDDING SYSTEM</h2>
                </NavLink>


   
                <div className={`${styles.otherLinksDiv} ${styles.otherNav}`}>
                    {
                    user ?(
                    user.isAdmin === true
                    ?
                    <div>
                        <NavLink to="additem">
                        <button className={styles.addItem}>Add item</button>
                        </NavLink>
                        <NavLink to="allusers">
                        <button className={styles.addItem}>All users</button>
                        </NavLink>
                    
                    </div>
         
                    :
                        <div className={styles.combineDiv}>
                            <form onSubmit={updateUser}>
                                <input className={styles.adminInput} onChange={(e) => setAdminKey(e.target.value)} placeholder="Enter admin key"/>
                                <button className={styles.adminSubmitButton} type="submit">submit</button>
                            </form>
                            <NavLink to="myitem" style={{marginLeft:"10px"}}>
                            <button className={styles.addItem}>My Items</button>
                            </NavLink>
                        </div>
                    ):
                    null
                    }
                    <NavLink to="">
                       <img onClick={handleLogout} className={styles.logout} src="https://cdn-icons-png.flaticon.com/128/3889/3889524.png" alt="Not found"/>
                    </NavLink>
                    {user ? (
                        <div className={`${styles.profileDiv} ${styles.otherNav}`}>
                        <img className={styles.profile} src="https://cdn-icons-png.flaticon.com/128/149/149071.png" alt="Not found"/>
                        <h2>{user.username}</h2>
                        </div>
                    )
                        :
                        null
                    }
           

                </div>
            </div>
        
            
        </div>
    )
}

export default Navbar;