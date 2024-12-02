import React, { useState ,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const View = () => {

const [data ,setData]=useState([]);
const UserID = useParams();
const getID = UserID.id;

useEffect(() => {
    getUser();
}, [])

    const getUser = async () => {
        try {
          // setIsLoading(true);
          const result = await axios.get("http://localhost:7000/users/AllUsers/" + getID);
          console.log(result.data);
    
          console.log(result, "users");
    
          // if (result.data) {
            let array = result.data;
          //   for (let i = 0; i < array.length; i++) {
          //     const element = array[i];
          //     element._id = i + 1;
          //   }
          setData(array);
            // console.log(array, "data");
            // setIsLoading(false);
          // }
        } catch (err) {
          console.log(err);
        }
      };
  return (
    <>
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
        <div class="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
          <h2 className="title_header">Details of User</h2>
          <div className="mb-2">
            <strong>Name :<p className="dataItems">{data.name}</p></strong>
          </div>
          <div className="mb-2">
            <strong>Age : <p className="dataItems">{data.age}</p></strong>
          </div>
          <div className="mb-2">
            <strong>Email :<p className="dataItems">{data.email}</p></strong>
          </div>
          <div className="mb-2">
            <strong>Mobile :<p className="dataItems">{data.mobile}</p></strong>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
