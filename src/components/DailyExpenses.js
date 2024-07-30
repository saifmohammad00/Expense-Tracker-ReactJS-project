import classes from "./DailyExpenses.module.css";
import { useEffect, useRef, useState } from "react";

const DailyExpenses = () => {
    const enteredAmount = useRef();
    const enteredDes = useRef();
    const enteredCaterogy = useRef();
    const [expensesList, setList] = useState([]);
    useEffect(()=>{
        const fetchExpenses=async()=>{
            try{
                 const res=await fetch(`https://reactdemoproject-dafd3-default-rtdb.asia-southeast1.firebasedatabase.app/Expenses.json`);
                 if(!res.ok){
                    throw new Error("failed to get expenses")
                 }
                 const data=await res.json();
                 const loadedExpenses = [];

                for (const key in data) {
                    loadedExpenses.push({
                        id: key,
                        ...data[key],
                    });
                }
                setList(loadedExpenses);
            }catch(error){
                 console.log(error.message);
            }
        }
        fetchExpenses();
    },[])
    const handleAddEX = async (evnt) => {
        evnt.preventDefault();
        const newExpense = {
            amount: enteredAmount.current.value,
            description: enteredDes.current.value,
            category: enteredCaterogy.current.value,
        }
        try {
            const res = await fetch(`https://reactdemoproject-dafd3-default-rtdb.asia-southeast1.firebasedatabase.app/Expenses.json`, {
                method: 'POST',
                body: JSON.stringify(newExpense),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if(!res.ok){
                throw new Error("failed to add Expense")
            }
            const data=await res.json();
            setList((prev) => [...prev, {id:data.name,...newExpense}]);
            enteredAmount.current.value = "";
            enteredDes.current.value = "";
            enteredCaterogy.current.value = "";
        } catch (error) {
            console.log(error.message);
        }
    };
    const List = expensesList.map(item => {
        return <li key={item.id} className={classes.list}>
            <span>${item.amount} -</span>
            <span>{item.description} -</span>
            <span>{item.category}</span>
        </li>
    })
    return <>
        <div className={classes.cont}>
            <h1>Expenses Form</h1>
            <form className={classes.exForm} onSubmit={handleAddEX}>
                <label htmlFor="amount">Amount Spent:</label>
                <input type="number" id="amount" ref={enteredAmount} required />
                <label htmlFor="des">Description</label>
                <input type="text" id="des" ref={enteredDes} required />
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
            <hr />
            <h1>List of Expenses</h1>
            <ul>
                {List}
            </ul>
        </div>
    </>
}
export default DailyExpenses;