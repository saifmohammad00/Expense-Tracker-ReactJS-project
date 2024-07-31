import { Link } from "react-router-dom";
import classes from "./Fpassword.module.css"
import { useRef } from "react";
const apiKey="";
const Fpassword=()=>{
    const enteredEmail=useRef();
    const handleFpass=async(event)=>{
        event.preventDefault();
         try{
            const res=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,{
                method:"POST",
                body:JSON.stringify({
                     requestType:"PASSWORD_RESET",
                     email:enteredEmail.current.value,
                }),
                headers:{
                    'Content-Type':'application/json'
                }
             })
             const data=await res.json();
         }catch(error){
            console.log(error);
         }
    }
    return <div className={classes.fpassword}>
        <label>Enter the email with which you have registered</label>
        <input type="email" ref={enteredEmail}/>
        <button type="button" onClick={handleFpass}>Send Link</button>
        <Link to="/">Already a user? Login</Link>
    </div>
}
export default Fpassword;