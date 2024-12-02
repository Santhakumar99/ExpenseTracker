import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
const GlobalContext = React.createContext();
export const GlobalProvider = ({ children }) => {

  const [Transaction, setTransaction] = useState([]);
  const [user, setUser] = useState(null); // Holds user details
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks authentication status

  useEffect(() => {
    // Optionally, check if the user is already authenticated (e.g., with a token in localStorage)
    const savedUser = localStorage.getItem("users");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user"); // Remove from localStorage on logout
  };
  const login = (userDetails) => {
    // console.log(userDetails._id)
    localStorage.setItem("user", JSON.stringify(userDetails));
    localStorage.setItem("UserID", userDetails._id);
    localStorage.setItem("UserName", userDetails.name);
    return userDetails
  };
  const getIncomes = async () => {
  // console.log(login())
  const User = JSON.parse(localStorage.getItem("user"));
    const response = await axios.get(
      `http://localhost:7000/expenses/GetExpense?UserID=${User._id}`
    );
    console.log(response.data);
    setTransaction(response.data);
  };

  const TotalSavings = () => {
    // getIncomes();
    let data = Transaction;
    let totalSavings = 0;
    const ExpenseData = data.filter((item) => item.Type === "Savings");
    ExpenseData.forEach((Expense) => {
      totalSavings = totalSavings + Expense.Amount;
    });
    // console.log(totalSavings);
    return totalSavings;
  };
  const TotalIncome = () => {
    // getIncomes()
    let data = Transaction;
    let totalIncome = 0;
    const incomeData = data.filter((item) => item.Type === "Income");
    incomeData.forEach((income) => {
      totalIncome = totalIncome + income.Amount;
    });
    return totalIncome;
  };
  const Expense = () => {
    // getIncomes();
    let data = Transaction;
    let totalExpense = 0;
    const ExpenseData = data.filter((item) => item.Type === "Expense");
    ExpenseData.forEach((Expense) => {
      totalExpense = totalExpense + Expense.Amount;
    });
    // console.log(totalExpense);
    return totalExpense;
  };
  const TotalExpense = () => {
    let data = TotalSavings() + Expense();
    // console.log(data);
    return data;
  };

  const HighestSpends = () => {
    let data = Transaction;
    let Highvalue = 0,
      HighvalueName = "";
    const ExpenseData = data.filter((item) => item.Type === "Expense");
    const HighRow = ExpenseData.reduce((max, current) => {
      return current.Amount > max.Amount ? current : max;
    }, data[0]);
    // console.log(HighRow);
    Highvalue = HighRow ? HighRow.Amount : 0;
    HighvalueName = HighRow ? HighRow.Name : "";
    return { Highvalue, HighvalueName };
    // return Highvalue;
  };
  const TotalBalance = () => {
    let TotalIncomes = TotalIncome();
    let TotalExpenses = TotalExpense();
    let Balance = TotalIncomes - TotalExpenses;
    // console.log(Balance, "Balance");
    return Balance;
  };

  const transactionHistory = () => {
    const history = [...Transaction];
    history.sort((b) => {
      return new Date(b.createdAt);
    });
    // console.log(history, "history");
    return history.slice(-3);
  };

  return (
    <GlobalContext.Provider
      value={{
        // addIncome,
        getIncomes,
        TotalIncome,
        TotalExpense,
        Expense,
        TotalSavings,
        HighestSpends,
        TotalBalance,
        transactionHistory,
        user,
        isAuthenticated,
        login,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export default GlobalProvider;
