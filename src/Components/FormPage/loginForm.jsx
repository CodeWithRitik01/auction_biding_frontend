import { lazy, useEffect, useState } from "react";
import styles from "./login.module.css"
import axios from "axios"
import { server } from "../../constants/config";
import { useDispatch, useSelector } from "react-redux";
import { actions, auctionSelector, getInitialStateAsync } from "../../redux/reducers/auction";

const Home  = lazy(() => import('../Home/home'))


function Login(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showSignup, setShowSignUp] = useState(false);
    const [email, setEmail] = useState("")
    const dispatch = useDispatch();
    const {user, users} = useSelector(auctionSelector)
    const [loading, setLoading] = useState(true);

    const handleLogin = async (e) =>{
        e.preventDefault();
        const config = {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            }
          };

          try{
            const data = axios.post(`${server}/api/users/login`, {
                username,
                password
            },
            config
             )
             .then((response) =>{
                
                dispatch(actions.userExists(response.data.user))
             }) 
            
           
          }catch(error){
            console.error('error', error)
          }
       
       

        setUsername("")
        setEmail("")
        setPassword("")
    }



    const handleSignUp =(e) =>{
        e.preventDefault();
        const config = {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            }
          };

        axios.post(`${server}/api/users/signup`, {
            username,
            email,
            password
        },
        config)
        .then((response) =>{
            dispatch(actions.addUser(response.data))
            console.log(response.data)
        })
        .catch((error) => {
            console.error('error', error)
        })

        setUsername("")
        setEmail("")
        setPassword("")
    }

   console.log(user)

    return (
        <div>

        {
            user
             ?
                 <Home />
             :
             <div>
             {
                 showSignup ?
                 <div className={styles.main}>
                     <h1>Sign Up</h1>
                     <div className={styles.formOutterDiv}>
                     <form className={styles.formDiv} onSubmit={handleSignUp}>
                         <label>Enter Username</label>
                         <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="username"/>
                         <label>Enter Email</label>
                         <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email"/>
                         <label>Enter Password</label>
                         <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password"/>
                         <button type="submit">Submit</button>
                     </form>           
                     </div>
                 </div>
 
                 :
 
                 <div className={styles.main}>
                     <h1>Login</h1>
                     <div className={styles.formOutterDiv}>
                     <form onSubmit={handleLogin} className={styles.formDiv}>
                         <label>Enter Username</label>
                         <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="username"/>
                         <label>Enter Password</label>
                         <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password"/>
                         <button type="submit">Submit</button>
             
                         <h3 className={styles.redirecth3} onClick={() => setShowSignUp(true)}>Or Sign Up instead!</h3>
             
                     </form>
             
                     </div>
                 </div>
             }
             </div>
 

        }
        </div>
     
           

    )
}

export default Login;