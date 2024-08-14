import React from "react";
import { useRef, useState } from "react";
import classes from "./SignUp.module.css";
import { Link } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

const apiKey = "AIzaSyBhgtt13X-XTMRGPBIyOrHLXjaBhMyWnAo";

const SignUp = () => {
    const dispatch=useDispatch();
    const [isLogged, setIsLogged] = useState(false);
    const handleEmail = useRef();
    const handlePass = useRef();
    const handleCpass = useRef();
    const handleSubmit = async (event) => {
        event.preventDefault();
        let url = "";
        if (isLogged) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
        }
        else {
            if (handleCpass.current.value !== handlePass.current.value) {
                alert("Passwords dont match");
                return;
            }
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
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
                setIsLogged((prev) => !prev);
            } else {
                dispatch(authActions.login());
                dispatch(authActions.setToken(data.idToken));
            }
        } catch (error) {
            alert(error.message)
        }

    }
    return <form className={classes.sign} onSubmit={handleSubmit}>
            <h1>{isLogged ? "Login":"Sign Up"}</h1>
            <input type="email" id="email" placeholder="Email" ref={handleEmail} required />
            <input type="password" id="pass" placeholder="Password" ref={handlePass} required />
            {!isLogged && <input type="password" id="cpass" placeholder="Confirm Password" ref={handleCpass} required />}
            <Link to="/fp" style={{ marginBottom: "10px" }}>Forget password?</Link>
            <button>{!isLogged ? "Sign Up" : "Login"}</button>
            <button type="button" onClick={() => setIsLogged(!isLogged)}>{!isLogged ? "Already Have an Account?Login" : "New User? Sign Up"}</button>
        </form>
    
}
export default SignUp;