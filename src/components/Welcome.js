import { useEffect, useRef, useState } from "react";
import classes from "./Welcome.module.css"
import { useNavigate } from "react-router-dom";
import DailyExpenses from "./DailyExpenses";
const apiKey="";
const Welcome = (props) => {
    const [isClicked, setIsClicked] = useState(false);
    const handleName = useRef();
    const handleUrl = useRef();
    const handleButton = () => {
        setIsClicked(true);
    }
    const handleUpdate = async (event) => {
        try {
            const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`, {
                method: "POST",
                body: JSON.stringify({
                    idToken: props.newToken,
                    displayName: handleName.current.value,
                    photoUrl: handleUrl.current.value,
                    returnSecureToken: true,
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (isClicked && props.newToken) {
            async function getData() {
                try {
                    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
                        method: "POST",
                        body: JSON.stringify({
                            idToken: props.newToken,
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                    const data = await res.json();
                    handleName.current.value = data.users[0].displayName;
                    handleUrl.current.value = data.users[0].photoUrl;
                } catch (error) {
                    console.log(error);
                }
            }
            getData();
        }
    }, [isClicked,props.newToken])
    const handleVerify = async () => {
        try {
            const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`, {
                method: "POST",
                body: JSON.stringify({
                    requestType: "VERIFY_EMAIL",
                    idToken: props.newToken,
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    const Navigate = useNavigate();
    const handleLogout = (e) => {
        props.settkn(null);
        Navigate('/');
    }
    return <>
        {!isClicked && <div>
            <div className={classes.welcome}>
                <h1>Welcome to Expense Tracker!!!</h1>
                <p>Your profile is incomplete <button onClick={handleButton}>complete now</button></p>
            </div>
            <button type="button" onClick={handleLogout} >Logout</button>
            <hr />
            <button onClick={handleVerify} type="button">Verify Email Id</button>
            <DailyExpenses/>
        </div>}
        {isClicked && <div>
            <h1>Winners never quit,Quitters never win.</h1>
            <hr />
            <h1>Contact Details</h1>
            <form className={classes.contact}>
                <label htmlFor="name">Full Name:</label>
                <input type="text" id="name" ref={handleName} />
                <label htmlFor="url">Profile Photo Url:</label>
                <input type="url" id="url" ref={handleUrl} />
                <button onClick={handleUpdate} type="button">Update</button>
            </form>
        </div>}
    </>
}
export default Welcome;