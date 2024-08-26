import { useEffect, useState } from "react"
import styles from "./home.module.css"
import { useDispatch, useSelector } from "react-redux"
import { auctionSelector, getInitialAuctionAsync, getInitialStateAsync } from "../../redux/reducers/auction";
import axios from "axios";
import { server } from "../../constants/config";
function Home(){
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

    const deleteAuctionItem = async (id) =>{
        try {
        
            const {data} =await axios.delete(`${server}/api/auction/item/${id}`, config);

             dispatch(getInitialAuctionAsync());
           
            return data
        } catch (error) {
            console.error(error)
        }
    }

    const handleBidSubmit = async(e,aucId) =>{
        e.preventDefault()
        try {
            const bidAmountInt = parseInt(bidAmount);
            const { data } = await axios.put(
                `${server}/api/auction/update/${aucId}/${user.username}`,
                { amount: bidAmountInt }, 
                config
            );
            window.location.reload();
            
        } catch (error) {
            console.error(error)
        }
    }

    const filteredAuction = user.isAdmin ? auctions : auctions.filter((data) => data.isActive === true);

   return(
    <div>
        <h1 style={{textAlign:'center'}}>Items live in auction</h1>
        <div className={styles.main}>
            
            {
                filteredAuction.length === 0 
                ?
                <h1 style={{position:"absolute", left:"40%"}}>No live auction at this moment</h1>
                :
        
                filteredAuction.map((data, key) => (
                    <div className={styles.Card} key={key}>
                        <div className={styles.top}>
                            <h3 className={styles.nameHeading}>{data.name}</h3>
                            {data.isActive ? (
                                <p style={{ color: "red" }}>Live</p>
                            ) : null}
                            {user.isAdmin ? (
                                <img className={styles.deleteButton} onClick={() => deleteAuctionItem(data._id)} src="https://cdn-icons-png.flaticon.com/128/10727/10727988.png" alt="Delete" />
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
                                <h3 style={{ margin: "0px", color: "gray" }}>Current Bid</h3>
                                <p style={{ margin: "0px" }}>Rs.{data.heighestBid.amount}</p>
                            </div>
                        </div>
                        {!user.isAdmin && data.isActive && (
                            <form onSubmit={(e)=>handleBidSubmit(e,data._id)} className={styles.bidForm}>
                                <input onChange={(e) =>setBidAmount(e.target.value)} placeholder="Enter amount to bid" />
                                <button type="submit">Bid</button>
                            </form>
                        )}
                    </div>
                ))
            }
        </div>
    </div>
   
   )
}

export default Home