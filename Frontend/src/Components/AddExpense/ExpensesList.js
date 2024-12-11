import axios from "axios";
import React, { useEffect, useState } from "react";
import view from "../assets/images/view.png";
import edit from "../assets/images/edit.png";
import Delete from "../assets/images/delete.png";
import "../css/style.css";
import { Link } from "react-router-dom";
const ExpensesList = () => {
  const [Expense, setAllExpense] = useState([{}]);
  useEffect(() => {
    GetAllExpense();
  }, []);
  const UserID = localStorage.getItem('UserID');
  const Users = localStorage.getItem('user');

  const GetAllExpense = async () => {
    let data = await axios.get(
      `${process.env.REACT_APP_URL}/expenses/GetExpense?UserID=${UserID}`
    );
    console.log(Users);
    setAllExpense(data.data);
  };

  return (
    <div>
      <div className="d-flex flex-column  align-items-center">
    <h2>List of Expenses</h2>
    <div class="w-90 rounded bg-white border shadow p-5">
      <div className="d-flex justify-content-end">
        {/* <Link to="/users/create">
          <button className="btn btn-sm btn-success">ADD +</button>
        </Link> */}
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            {/* <th scope="col">ID</th> */}
            <th scope="col">Name</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th scope="col">Type</th>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">View</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {Expense.map((d, i) => (
            <tr key={i}>
              {/* <td>{d._id}</td> */}
              <td>{d.Name}</td>
              <td>{d.Amount}</td>
              <td>{d.Category}</td>
              <td>{d.Type}</td>
              <td>{d.Date}</td>
              <td>{d.Description}</td>
              <td>
                {/* <button className="act-btn">
                  <img src={view} width={"30px"}></img>
                </button> */}
                <Link to={`/users/view/${d._id}`}  className="act-btn"> <img src={view} width={"30px"}></img></Link>
              </td>
              <td>
              <Link to={`/users/update/${d._id}`}  className="act-btn"> <img src={edit} width={"30px"}></img></Link>
                {/* <button className="act-btn">
                  <img src={edit} width={"30px"}></img>
                </button> */}
              </td>
              <td>
                <button
                  className="act-btn"
                  // onClick={(e) => DeleteUser(d._id)}
                >
                  <img src={Delete} width={"30px"}></img>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
    </div>
  );
};

export default ExpensesList;
