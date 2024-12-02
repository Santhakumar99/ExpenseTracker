import React, { useEffect, useState } from "react";
import axios from "axios";
// import add from "../components/images/add.png";
import view from "../Components/assets/images/view.png";
import edit from "../Components/assets/images/edit.png";
import Delete from "../Components/assets/images/delete.png";
import "../Components/css/style.css";
import { Link } from "react-router-dom";
const Users = () => {
    const [user, setUser] = useState([]);
  useEffect(() => {
    // axios.get("http://localhost:7400/users/AllUsers").then(res=>setUser(res.data)).catch(err=>console.log(err));
    getUser();
  }, []);

  const getUser = async () => {
    try {
      // setIsLoading(true);
      const result = await axios.get("http://localhost:7000/users/allusers");
      console.log(result.data);

      console.log(result, "users");

      // if (result.data) {
        let array = result.data;
      //   for (let i = 0; i < array.length; i++) {
      //     const element = array[i];
      //     element._id = i + 1;
      //   }
        setUser(array);
        // console.log(array, "data");
        // setIsLoading(false);
      // }
    } catch (err) {
      console.log(err);
    }
  };
  const DeleteUser = (id) => {
    const confirm = window.confirm("Would You Like to Delete ?");
    if (confirm) {
      try {
        // setIsLoading(true);
        const result = axios.delete("http://localhost:7000/users/deleteUser/" + id);
        getUser();
        console.log(result.data);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>      <div className="d-flex flex-column  align-items-center">
    <h2>List of Users</h2>
    <div class="w-90 rounded bg-white border shadow p-5">
      <div className="d-flex justify-content-end">
        <Link to="/users/create">
          <button className="btn btn-sm btn-success">ADD +</button>
        </Link>
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            {/* <th scope="col">ID</th> */}
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile</th>
            <th scope="col">View</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {user.map((d, i) => (
            <tr key={i}>
              {/* <td>{d._id}</td> */}
              <td>{d.name}</td>
              <td>{d.age}</td>
              <td>{d.email}</td>
              <td>{d.mobile}</td>
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
                  onClick={(e) => DeleteUser(d._id)}
                >
                  <img src={Delete} width={"30px"}></img>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div></>

  )
}

export default Users