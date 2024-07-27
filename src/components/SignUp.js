import { useRef } from "react";
import classes from "./SignUp.module.css";
const SignUp = () => {
    const handleEmail = useRef();
    const handlePass = useRef();
    const handleCpass = useRef();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA-UF4eQdtO41w6LL3EcjEC_VrWlhkLZbI', {
                method: "POST",
                body: JSON.stringify({
                    email: handleEmail.current.value,
                    password: handlePass.current.value,
                    returnSecureToken: true,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.ok) {
                console.log("User has Successfully Signed Up")
            }
            else {
                const data=await res.json();
                    let errormessage = data.error?.message || "Authentication Failed!";
                    alert(errormessage);
            }
        }catch(error){
            console.log(error,'catch block');
        }
    }
return <>
    <form className={classes.sign} onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <input type="email" id="email" placeholder="Email" ref={handleEmail} required />
        <input type="password" id="pass" placeholder="Password" ref={handlePass} required />
        <input type="password" id="cpass" placeholder="Confirm Password" ref={handleCpass} required />
        <button>Sign Up</button>
    </form>
</>
}
export default SignUp;