import { useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";


const Header = () => {
    const dispatch=useDispatch();
    const isAuthenticated=useSelector(state=>state.auth.isAuthenticated);
    const Navigate = useNavigate();
    const handleLogout = (e) => {
        dispatch(authActions.logout());
        dispatch(authActions.setToken(""));
        Navigate('/');
    }
    return <header className={classes.header}>
        <h1>Expense Traker</h1>
        {isAuthenticated && <button type="button" onClick={handleLogout} >Logout</button>}
    </header>
}
export default Header;