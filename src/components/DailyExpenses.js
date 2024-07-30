import classes from "./DailyExpenses.module.css";
import { useRef, useState } from "react";

const DailyExpenses=()=>{
    const enteredAmount=useRef();
    const enteredDes=useRef();
    const enteredCaterogy=useRef();
    const [expensesList,setList]=useState([]);
    const handleAddEX = (evnt) => {
        evnt.preventDefault();
        const a=enteredAmount.current.value;
        const b=enteredDes.current.value;
        const c=enteredCaterogy.current.value;
        const nid=Math.random();
        setList((prev)=>[...prev,{
            amount:a,
            des:b,
            cat:c,
            id:nid,
        }]);
        enteredAmount.current.value="";
        enteredDes.current.value="";
        enteredCaterogy.current.value="";
    };
    const List=expensesList.map(item=>{
        return <li key={item.id} className={classes.list}>
              <span>${item.amount} -</span>
              <span>{item.des} -</span>
              <span>{item.cat}</span>
        </li>
    })
    return <>
    <div className={classes.cont}>
        <h1>Expenses Form</h1>
        <form className={classes.exForm} onSubmit={handleAddEX}>
            <label htmlFor="amount">Amount Spent:</label>
            <input type="number" id="amount" ref={enteredAmount} required/>
            <label htmlFor="des">Description</label>
            <input type="text" id="des" ref={enteredDes} required/>
            <label htmlFor="category">Category:</label>
            <select id="category" ref={enteredCaterogy} required>
                <option value="">Select a Category</option>
                <option value="Food">Food</option>
                <option value="Shopping">Shopping</option>
                <option value="Electricity">Electricity</option>
                <option value="Petrol">Petrol</option>
            </select>
            <button type="submit">Add Expense</button>
        </form>
        <hr/>
        <h1>List of Expenses</h1>
        <ul>
            {List}
        </ul>
    </div>
    </>
}
export default DailyExpenses;