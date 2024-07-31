import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../store/expense";
import classes from "./DailyExpenses.module.css";
import { useEffect, useRef, useState } from "react";

const DailyExpenses = () => {
    const dispatch=useDispatch();
    const totalExpense=useSelector(state=>state.expense.expense);
    const enteredAmount = useRef();
    const enteredDes = useRef();
    const enteredCaterogy = useRef();
    const [expensesList, setList] = useState([]);
    const [editingExpense,setEditingExpense]=useState(null);
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
                for(const expense of loadedExpenses){
                    dispatch(expenseActions.add(+expense.amount));
                }
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
            dispatch(expenseActions.add(+newExpense.amount));
            enteredAmount.current.value = "";
            enteredDes.current.value = "";
            enteredCaterogy.current.value = "";
        } catch (error) {
            console.log(error.message);
        }
    };
    const handleDelete=async(item)=>{
          try{
            const res=await fetch(`https://reactdemoproject-dafd3-default-rtdb.asia-southeast1.firebasedatabase.app/Expenses/${item.id}.json`,{
                method:"DELETE",
              })
              if(!res.ok){
                throw new Error("failed to delete expense");
              }
              dispatch(expenseActions.remove(+item.amount));
              setList((prev)=>prev.filter(expense=>expense.id!==item.id));
              console.log("Expense deleted successfully")

          }catch(error){
            console.log(error.message);
          }
          
    }
    const updateExpense=async(evnt)=>{
        evnt.preventDefault();
        if(!editingExpense){
          return;
        }
        const updatedExpense={
            amount:enteredAmount.current.value,
            description:enteredDes.current.value,
            category:enteredCaterogy.current.value,
        }
        try{
             const res=await fetch(`https://reactdemoproject-dafd3-default-rtdb.asia-southeast1.firebasedatabase.app/Expenses/${editingExpense.id}.json`,{
                method:"PUT",
                body:JSON.stringify(updatedExpense),
                headers:{
                    'Content-Type':'application/json'
                }
             })
             if(!res.ok){
                throw new Error("failed to edit expense");
             }
             dispatch(expenseActions.remove(+editingExpense.amount));
             dispatch(expenseActions.add(+updatedExpense.amount));
             setList((prev)=>prev.map(expense=>expense.id===editingExpense.id?{id:expense.id,...updatedExpense}:expense));
             setEditingExpense(null);
             enteredAmount.current.value="";
             enteredDes.current.value="";
             enteredCaterogy.current.value="";
        }catch(error){
            console.log(error.message);
        }
    }
    const handleEdit=async(item)=>{
        setEditingExpense(item);
        enteredAmount.current.value=item.amount;
        enteredDes.current.value=item.description;
        enteredCaterogy.current.value=item.category
    }
    const List = expensesList.map(item => {
        return <li key={item.id} className={classes.list}>
            <span>${item.amount} -</span>
            <span>{item.description} -</span>
            <span>{item.category}</span>
            <span><button type="button" onClick={()=>handleEdit(item)}>Edit</button></span>
            <span><button type="button" onClick={()=>handleDelete(item)}>Delete</button></span>
        </li>
    })
    return <>
        <div className={classes.cont}>
            <h1>Expenses Form</h1>
            <form className={classes.exForm} onSubmit={editingExpense? updateExpense:handleAddEX}>
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
                <button type="submit">{editingExpense?"Update Expense":"Add Expense"}</button>
            </form>
            <hr />
            <h1>List of Expenses</h1>
            <ul>
                {List}
            </ul>
            <h1>Total Expense: ${totalExpense}</h1>
        </div>
    </>
}
export default DailyExpenses;