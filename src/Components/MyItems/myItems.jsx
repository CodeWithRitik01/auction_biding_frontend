import { useEffect, useState } from "react"
import styles from "../Home/home.module.css"
import { useDispatch, useSelector } from "react-redux"
import { auctionSelector, getInitialAuctionAsync, getInitialStateAsync } from "../../redux/reducers/auction";
import axios from "axios";
import { server } from "../../constants/config";
function MyItems(){
    const dispatch = useDispatch();
    const {auctions, user} = useSelector(auctionSelector)
    const [loading , setLoading] = useState(true);
    const [bidAmount, setBidAmount] = useState("");

    useEffect(() =>{
        const fetchAuction = async() =>{
            await dispatch(getInitialAuctionAsync());
            setLoading(false)
        }
        fetchAuction()
    },[dispatch])

    const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      };

    if(loading){
        return <div>Loading...</div>
    }





    const filteredAuction =  auctions.filter((data) => data.finally.finalHolder === user.username);

   return(
    <div>
        
        <div className={styles.main}>
            
            {
                filteredAuction.length === 0 
                ?
                <h1 style={{position:"absolute", left:"40%"}}>No purchased item</h1>
                :
                <div>
                <h1 style={{textAlign:'center'}}>My Items</h1>
                <div className={styles.main}>
                {filteredAuction.map((data, key) => (
                <div className={styles.Card} key={key}>
                    <div className={styles.top}>
                        <h3 className={styles.nameHeading}>{data.name}</h3>
                        {data.isActive ? (
                            <p style={{ color: "red" }}>Live</p>
                        ) : null}
                    </div>
                    <div className={styles.dateDiv}>
                        <div>
                            <h3 style={{ margin: "0px", color: "gray" }}>Start Time</h3>
                            <p style={{ margin: "0px" }}>{data.startTime.slice(0, 10)}</p>
                            <p style={{ margin: "0px" }}>{data.startTime.slice(11, 19)}</p>
                        </div>
                        <div>
                            <h3 style={{ margin: "0px", color: "gray" }}>End Time</h3>
                            <p style={{ margin: "0px" }}>{data.endTime.slice(0, 10)}</p>
                            <p style={{ margin: "0px" }}>{data.endTime.slice(11, 19)}</p>
                        </div>
                    </div>
    
                    <div className={styles.dateDiv} style={{marginTop:"20px"}}>
                        <div>
                            <h3 style={{ margin: "0px", color: "gray" }}>Start Amount</h3>
                            <p style={{ margin: "0px" }}>Rs.{data.startPrice}</p>
                            
                        </div>
                        <div>
                            <h3 style={{ margin: "0px", color: "gray" }}>Purchased price</h3>
                            <p style={{ margin: "0px" }}>Rs.{data.finally.finalAmount}</p>
                        </div>
                    </div>
            
                </div>
            ))}
            </div>
                </div>

            }
        </div>
    </div>
   
   )
}

export default MyItems