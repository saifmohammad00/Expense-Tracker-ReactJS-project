import { useRef, useState } from "react";
import classes from "./SignUp.module.css";
import Header from "./Header";
import Welcome from "./Welcome";
const SignUp = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [isAuthenticated,setIsAuthentication]=useState(false);
    const [token,setToken]=useState("");
    const handleEmail = useRef();
    const handlePass = useRef();
    const handleCpass = useRef();
    const handleSubmit = async (event) => {
        event.preventDefault();
        let url="";
        if (isLogged) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCXKI5qRh1s9g_dLCgL3tyX-iJlbC8uGaI';
        }
        else {
            if (handleCpass.current.value !== handlePass.current.value) {
                alert("Passwords dont match");
                return;
            }
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCXKI5qRh1s9g_dLCgL3tyX-iJlbC8uGaI';
        }
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: handleEmail.current.value,
                    password: handlePass.current.value,
                    returnSecureToken: true,
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json();

            if (!response.ok) {
                let errormessage = data.error?.message || "Authentication Failed!";
                throw new Error(errormessage);
            }
            handleEmail.current.value = '';
            handlePass.current.value = '';
            if (!isLogged) {
                handleCpass.current.value = '';
                setIsLogged((prev)=>!prev);
            }else{
                setIsAuthentication(true);
                setToken(data.idToken);
            }
        } catch (error) {
            alert(error.message)
        }

    }
    return <>
        {isAuthenticated ? <Welcome newToken={token}/>: (<><Header/>
            <form className={classes.sign} onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <input type="email" id="email" placeholder="Email" ref={handleEmail} required />
            <input type="password" id="pass" placeholder="Password" ref={handlePass} required />
            {!isLogged && <input type="password" id="cpass" placeholder="Confirm Password" ref={handleCpass} required />}
            <button>{!isLogged ? "Sign Up" : "Login"}</button>
            <button type="button" onClick={() => setIsLogged(!isLogged)}>{!isLogged ? "Already Have an Account?Login" : "Back to Create Account"}</button>
        </form></>)}
    </>
}
export default SignUp;