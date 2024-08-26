import { lazy, useEffect, useState } from "react";
import styles from "./autionForm.module.css"
import axios from "axios"
import { server } from "../../constants/config";
import { useDispatch, useSelector } from "react-redux";
import { actions, auctionSelector } from "../../redux/reducers/auction";
import { useNavigate } from "react-router-dom";

const Home  = lazy(() => import('../Home/home'))


function AuctionForm(){
    const dispatch = useDispatch()
    const [itemName, setItemName] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("");
    const [startPrice, setStartPrice] = useState("");
    const navigate = useNavigate()
 


    const submitForm =(e) =>{
         e.preventDefault()
         const config = {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            }
          };

          try{
            const data = axios.post(`${server}/api/auction/additem`, {
                name:itemName,
                startTime:startDate,
                endTime:endDate,
                startPrice: startPrice
            },
            config
             )
      
           setItemName('')
           setStartDate('')
           setEndDate('')
           setStartDate('')
           navigate("/", { replace: true })

           window.location.reload()
          }catch(error){
            console.error('error', error)
          }
    }

    return (
        <div>
            <div className={styles.main}>
                <h1>Create Auction Event</h1>
                <div className={styles.formOutterDiv}>
                <form className={styles.formDiv} onSubmit={submitForm}>
                    <input value={itemName} onChange={(e)=>setItemName(e.target.value)} placeholder="Enter Item Name"/>
                    <input type="datetime-local"  value={startDate} onChange={(e)=>setStartDate(e.target.value)} placeholder="Enter start time"/>
                    <input type="datetime-local" value={endDate} onChange={(e)=>setEndDate(e.target.value)} placeholder="Enter End time"/>
                    <input value={startPrice} onChange={(e) => setStartPrice(e.target.value)} placeholder="Enter starting price"/>
                    <button type="submit">Submit</button>
                </form>           
                </div>
            </div>
        </div>
     
           

    )
}

export default AuctionForm;