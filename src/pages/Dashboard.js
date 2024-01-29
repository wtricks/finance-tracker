import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Cards from "../Components/Cards";
import AddExpense from "../Components/Modals/AddExpense";
import AddIncome from "../Components/Modals/AddIncome";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth ,db} from "../firebase";
import { type } from "@testing-library/user-event/dist/type";
import TransactionsTable from "../Components/TransactionsTable.js";
import ChartComponent from "../Components/Charts/index.js";
import NoTransactions from "../Components/NoTransaction/NoTransactions.js";



const Dashboard = () => {
  const [transactions,setTransactions] =useState([]);
  const [loading,setLoading]=useState(false);
  const [user]=useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income,setIncome]=useState(0);
  const [expense, setExpense] = useState(0);
  const [totalbalance,setTotalBalance] = useState(0);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };
  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };
  
   
  const onFinish = (values,type) => {
     const newTransction={
      type:type,
      date:values.date.format("YYYY-MM-DD"),
      amount:parseFloat(values.amount),
      tag:values.tag,
      name:values.name,
    };
    addTransction(newTransction);
  };
  
  const addTransction=async(transaction , many)=>{
     try{
      const docRef=await addDoc(
        collection(db,`users/${user.uid}/transactions`),
        transaction
      )
      console.log("Doc written Id,",docRef.id);
      if(!many) toast.success("Transaction Added Successfully!");
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance();
        //  await fetchTransactions();
     }
     catch(err){
       console.log(err);
       if(!many) toast.error("Couldnot add transaction!");
      }
    }
    useEffect(()=>{
      if(user && transactions.length===0){
        fetchTransactions();
      }
    },[user]);

    useEffect(()=>{
      calculateBalance();
    },[transactions]);
  
    const calculateBalance = () => {
      let incomeTotal = 0;
      let expensesTotal = 0;

      transactions.forEach((transaction) => {
      //  console.log("Transactions:", transactions);
        if (transaction.type === "income") {
          incomeTotal =incomeTotal + transaction.amount;
        } 
        else if (transaction.type === "reset") {
          setIncome(0);
          setExpense(0);
          setTotalBalance(0);
        }
         else {
          expensesTotal =expensesTotal + transaction.amount;
        }
      });
      setIncome(incomeTotal);
      setExpense(expensesTotal);
      // console.log(expensesTotal)
      setTotalBalance(incomeTotal - expensesTotal);
    };

    async function fetchTransactions(){
      setLoading(true);
      // console.log(user);
      if(user){
        const querySnapshot = await getDocs(collection(db,`users/${user.uid}/transactions`));
        let transactionsArray = [];
        querySnapshot.forEach((doc)=>{
          transactionsArray.push(doc.data());
        });
        setTransactions(transactionsArray);
        // console.log("Transactions Array>",transactionsArray);
        toast.success("Transactions Fetched!");
      }
      setLoading(false);
  }

  const shortTransactions = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  })

  const resetBalance = () => {
    const newBalanceTransaction = {
      type: "reset", // You can use a specific type for resetting the balance
      date: new Date().toISOString(),
      amount: 0, // Set the amount to 0 to reset the balance
      tag: "Reset Balance", // You can customize the tag
      name: "Reset Balance", // You can customize the name
    };
  
    // Add the reset balance transaction
    addTransction(newBalanceTransaction, true);
  };

    return (
      <div>
      <Header />
      <>
      {loading ? (
        <p>Loading...</p>
          ) : (
        <>
          <Cards
            income={income}
            expense={expense}
            totalbalance={totalbalance}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
            resetBalance={resetBalance}
          />
          {transactions.length!=0 ? <ChartComponent shortTransactions={shortTransactions}/> :<NoTransactions /> }
          <AddExpense
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <AddIncome
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
          <TransactionsTable 
          transactions={transactions}
          fetchTransactions={fetchTransactions}
          addTransction={addTransction}
          />
        </>
      )}

      </>
     
    </div>
  );
};

export default Dashboard;
