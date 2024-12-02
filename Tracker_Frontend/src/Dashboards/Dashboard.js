import React from "react";
import { useState, useEffect } from "react";
import BarChart from "./Barchart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import Navbar from "./Navbar";
import { useGlobalContext } from '../Context/GlobalContext'

import AddModal from "./AddExpense/AddExpenseModal";

const Dashboard = () => {
  const {totalExpenses,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()
  
  React.useEffect(() => {
    getIncomes()
    // getExpenses()
}, [])
  let userdata = {
    labels: ["santha", "kumar", "sk"],
    datasets: [
      {
        label: "Users Gained",
        data: [45, 67, 89],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
  return (
    <>
      <div className="App">
        <div className="dashHeader">
          <div className="row main">
            {/* <div className="col-lg-2 col-md-2 col-sm-12 sidebarSection">
          
          </div> */}
            <div className="buttonSection">
              {" "}
              <AddModal/>
              {/* <button className="btn btn-primary addbutton">Add + </button> */}
            </div>
            {/* <addModal S={}/> */}
            <div className="col-lg-12 col-md-9 col-sm-12 displayCountSec">
              {/* <Navbar visible={ navVisible } show={ showNavbar } /> */}
              <div className="row cardsection">
                <div className="col-lg-3 col-md-3 col-sm-12 sec1">
                  <div class="card active">
                    <div class="card-body">
                      <h5 class="card-title">Total Income</h5>
                      <h6 class="card-subtitle mb-2 text-muted">₹30000</h6>
                      <p class="card-text">All Section</p>
                      {/* <a href="#" class="card-link">
                      Card link
                    </a>
                    <a href="#" class="card-link">
                      Another link
                    </a> */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 sec1">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Total Expense</h5>
                      <h6 class="card-subtitle mb-2 text-muted">₹24000</h6>
                      <p class="card-text">All Section</p>
                      {/* <a href="#" class="card-link">
                      Card link
                    </a>
                    <a href="#" class="card-link">
                      Another link
                    </a> */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 sec1">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Total Savings</h5>
                      <h6 class="card-subtitle mb-2 text-muted">₹2000</h6>
                      <p class="card-text">Smart Deposit</p>
                      {/* <a href="#" class="card-link">
                      Card link
                    </a>
                    <a href="#" class="card-link">
                      Another link
                    </a> */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 sec1">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Most Spends</h5>
                      <h6 class="card-subtitle mb-2 text-muted">₹11000</h6>
                      <p class="card-text">EMI Pay</p>
                      {/* <a href="#" class="card-link">
                      Card link
                    </a>
                    <a href="#" class="card-link">
                      Another link
                    </a> */}
                    </div>
                  </div>
                </div>
              </div>
              {/* ------------------------------------------- section 2 --------------------------------------------------- */}
              <div className="chartSection">
                <div className="row chartmain">
                  <div className="col-lg-6 col-md-6 col-sm-12 chartSec1">
                    <div className="chart1_main" style={{ height: "300px" }}>
                      <BarChart chartData={userdata} />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 chartSec2">
                    <div className="chart1_main" style={{ height: "300px" }}>
                      <LineChart chartData={userdata} />
                    </div>
                  </div>
                </div>
              </div>
              {/* ------------------------------------------- section 3 --------------------------------------------------- */}
              <div className="chartSection">
                <div className="row chartmain">
                  <div className="col-lg-6 col-md-6 col-sm-12 chartSec1">
                    <div className="chart1_main" style={{ height: "300px" }}>
                      <BarChart chartData={userdata} />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 chartSec2">
                    <div className="chart1_main" style={{ height: "300px" }}>
                      <LineChart chartData={userdata} />
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
