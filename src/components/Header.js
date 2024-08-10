import { useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import { premiumActions } from "../store/theme";


const Header = () => {
    const newTheme=useSelector(state=>state.premium.theme);
    const dispatch=useDispatch();
    const isAuthenticated=useSelector(state=>state.auth.isAuthenticated);
    const ispremium=useSelector(state=>state.premium.ispremium);
    const totalExpense=useSelector(state=>state.expense.expense);
    const Navigate = useNavigate();
    const handleLogout = (e) => {
        dispatch(authActions.logout());
        dispatch(authActions.setToken(""));
        Navigate('/');
    }
    const handleTheme=()=>{
          dispatch(premiumActions.change());
    }
    return <header className={classes.header}>
        <h1>Expense Traker</h1>
        {(ispremium && totalExpense>=1000 && isAuthenticated) && <button type="button" onClick={handleTheme} >{newTheme ? "Switch to dark theme":"Switch to light theme"}</button>}
        {isAuthenticated && <button type="button" onClick={handleLogout} >Logout</button>}
    </header>
}
export default Header;