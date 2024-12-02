import React from "react";
import { useState, useEffect } from "react";
import BarChart from "./Barchart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import Navbar from "./Navbar";
import AddModal from "./AddExpense/AddExpenseModal";
import { useNavigate } from "react-router-dom";
import logo from "../Components/assets/images/userlogo.png";
import "../Components/css/Dashboard.css";
import { useGlobalContext } from "../Context/GlobalContext";
import IncomeImage from "../Components/assets/images/DashIcons/Income.png";
import BalanceImg from "../Components/assets/images/DashIcons/balance.png";
import ExpenseImg from "../Components/assets/images/DashIcons/expense.png";
import SavingImg from "../Components/assets/images/DashIcons/savings.png";

import Avator from "./Avatar";
import DashContainer from "./DashContainer";
import DashCards from "./DashCards";
import TransactHistory from "./History/TransactHistory";

const Dashboard = () => {
  let data;
  let {
    getIncomes,
    TotalIncome,
    TotalExpense,
    TotalSavings,
    HighestSpends,
    TotalBalance,
    Expense,
    transactionHistory,
    Incomes,
  } = useGlobalContext();
  useEffect(() => {
    getIncomes();
    TotalIncome();
    TotalExpense();
    TotalSavings();
  }, []);
  let navigate = useNavigate();
  const [deleteAlert, setDeleteAlert] = useState({
    alertBox: false,
    deleteId: "",
  });
  const Logout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };
  let Labels =[];
  let Datas=[];
  Labels.push("Total Income" ,"Total Expense" ,"Total Balance")
  Datas.push(TotalIncome() ,TotalExpense(), TotalBalance());
  // console.log(Datas)
    let chartData = {
    labels: Labels,
    datasets: [
      {
        label: "All ExpenseData",
        data: Datas,
        backgroundColor: [
          'rgb(128, 219, 243)',
          'rgb(255, 99, 132)',
          'rgb(144, 238, 144)',
          'rgba(255, 205, 86, 0.2)',
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };
    // Chart options (optional)
    const options = {
      responsive: true, // Make the chart responsive
      plugins: {
        legend: {
          position: 'top', // Legend position
        },
        tooltip: {
          enabled: true, // Enable tooltips
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Months', // Title for X-axis
          },
        },
        y: {
          title: {
            display: true,
            text: 'Sales', // Title for Y-axis
          },
          beginAtZero: true, // Start Y-axis from 0
        },
      },
    };
  return (
    <>
      {/* //--------------------Delete Alert  Box Content ----------------------// */}

      {deleteAlert.alertBox && (
        <div className="deleteAlertBox">
          <span>
            <div className="deleteAlertBoxContent">
              <i class="fas fa-trash-alt"></i>
              <h4>Are you sure ?</h4>
              <div className="deleteAlertBoxbutton">
                <div className=" deleteAlertBoxcancelButton">
                  <button
                    className="btn btn-primary bc"
                    onClick={() =>
                      setDeleteAlert({
                        ...deleteAlert,
                        alertBox: false,
                      })
                    }
                  >
                    Cancel
                  </button>
                </div>
                <div className="deleteAlertBoxDeleteButton">
                  <button
                    className="btn btn-primary bc"
                    onClick={() => Logout()}
                  >
                    Yes , Logout !
                  </button>
                </div>
              </div>
            </div>
          </span>
        </div>
      )}

      <div className="App">
        <Navbar />
        <div className="dashHeader">
          <div className="row main">
            {/* <div className="col-lg-2 col-md-2 col-sm-12 sidebarSection">
          
          </div> */}
            <div className="buttonSection">
              {" "}
              <AddModal />
              {/* <button
                className="btn btn-primary Logoutbtn"
                onClick={() =>
                  setDeleteAlert({
                    ...deleteAlert,
                    alertBox: true,
                  })
                }
              >
              <img src={logo} width="40px" height="40px" />{" "}
              </button> */}
            </div>
            <div className="col-lg-12 col-md-9 col-sm-12 displayCountSec">
              <div className="dash1">
                <div className="row cardsection">
                  <div className="col-lg-6 col-md-6 col-sm-12 sec1">
                    <div className="row cardsection">
                      <div className="col-lg-6 col-md-6 col-sm-12 sec1">
                      <DashCards  img={BalanceImg} header="Total Balance" data={TotalBalance()}/>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 sec1">
                      <DashCards  img={IncomeImage} header="Total Income" data={TotalIncome()}/>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="col-lg-6 col-md-6 col-sm-12 sec1">
                    <div className="row cardsection">
                      <div className="col-lg-6 col-md-6 col-sm-12 sec1">
                        <DashCards  img={ExpenseImg} header="Total Expense" data={TotalExpense()}/>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 sec1">
                      <DashCards  img={SavingImg} header="Total Savings" data={TotalSavings()}/>
                      </div>
                      {/* <div className="col-lg-4 col-md-4 col-sm-12 sec1">
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">Highest Spends</h5>
                            <h2 class="card-subtitle mb-2 text-muted">
                              ₹{HighValue.Highvalue}
                            </h2>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>{" "}
                </div>
              </div>
              {/* ------------------------------------------- section 2 --------------------------------------------------- */}
              <div className="chartSection">
                <div className="row chartmain">
                  <div className="col-lg-6 col-md-6 col-sm-12 chartSec1">
                    <div className="chart1_main" style={{ height: "400px", width : "100%" }}>
                    <BarChart chartData={chartData} />
                    
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 chartSec2">
                    <TransactHistory/>
                    {/* <div className="chart1_main" style={{ height: "300px" }}> */}
                      {/* <LineChart chartData={userdata} /> */}
                    {/* </div> */}
                  </div>
                </div>
              </div>
              {/* ------------------------------------------- section 3 --------------------------------------------------- */}
              <div className="chartSection">
                <div className="row chartmain">
                  <div className="col-lg-3 col-md-3 col-sm-12 chartSec1">
                    <div className="chart1_main" style={{ height: "300px" }}>
                    <PieChart chartData={chartData} options={options} />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3col-sm-12 chartSec2">
                    <div className="chart1_main" style={{ height: "300px" }}>
                      <LineChart chartData={chartData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
