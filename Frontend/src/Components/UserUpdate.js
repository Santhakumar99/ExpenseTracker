import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { useForm } from "react-hook-form";
import "../create.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Update = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
  });
  const [errors, setError] = useState({
    NameError: "",
    EmailError: "",
    AgeError: "",
    MobileError: "",
  });
  //-------------------validation-----------------------
  const validateDetails = (name, value) => {
    const error = errors;
    switch (name) {
      case "name":
        if (!value) {
          error.NameError = "Name field is required";
        } else {
          error.NameError = "";
        }
        break;
      case "age":
        if (!value) {
          error.AgeError = "Age field is required";
          // validForm.passwordValid = false;
        } else {
          error.AgeError = "";
          // validForm.passwordValid = true;
        }
        break;
      case "email":
        if (!value) {
          error.EmailError = "Email field is required";
          // validForm.emailValid = false;
        } else if (
          !/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(
            value
          )
        ) {
          error.EmailError = "Please enter a Valid Email Address";
          // validForm.emailValid = false;
        } else {
          error.EmailError = "";
          // validForm.emailValid = true;
        }
        break;

      case "phone":
        if (!value) {
          error.MobileError = "";
        } else if (value.length < 10) {
          error.MobileError = "Phone Number must have 10 digits";
        } else if (value.length > 10) {
          error.MobileError = "Phone Number have 10 digits only";
        } else {
          error.MobileError = "";
        }
        break;

      default:
        break;
    }

    // toCheckErrorsAndValid(validForm);
    setError({ ...error });
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let inputValues = values;
    validateDetails(name, value);
    inputValues[name] = value;
    setValues({ ...inputValues });
  };
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const UserID = useParams();
  const getID = UserID.id;

  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      // setIsLoading(true);
      const result = await axios.get(
        "http://localhost:7000/users/allusers/" + getID
      );
      console.log(result.data);

      console.log(result, "users");

      // if (result.data) {
      let array = result.data;
      //   for (let i = 0; i < array.length; i++) {
      //     const element = array[i];
      //     element._id = i + 1;
      //   }
      setValues(array);
      // console.log(array, "data");
      // setIsLoading(false);
      // }
    } catch (err) {
      console.log(err);
    }
  };
  const UpdateHandleProducts = async (e) => {
    e.preventDefault();
    for (let key in values) {
      if (!values[key]) {
        validateDetails(key, values[key]);
      }
      console.log(errors)
    }
    for (let key in errors) {
      if (errors[key]) {
        return;
      }
    }
    try {
      let vals = values;
      const valuesObj = {
        ...vals,
      };
      console.log(valuesObj);
      const Result = await axios.put(
        "http://localhost:7000/users/userUpdate/" + getID,
        valuesObj
      );

      if (Result) {
        console.log(Result);
        // setProducts(Result);
        toast("User updated Successfully!!!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/users", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {" "}
      <div className="CHead">
        <div className="d-flex flex-column justify-content-center align-items-center ">
          <h2>Update User</h2>
        </div>
        <div className="formsection">
        <div className="formsection">
          <form >
            <label> Name</label>
            <input
              type="text"
              id="Name"
              name="name"
              value={values.name}
              onChange={(e) => onChangeHandler(e)}
              className="form-control"
              placeholder="Name"
            />
            {errors.NameError && (
              <small className="email-error" style={{ color: "red" }}>
                {errors.NameError}
              </small>
            )}
            <label> Age</label>
            <input
              type="text"
              id="Age"
              name="age"
              value={values.age}
              onChange={(e) => onChangeHandler(e)}
              className="form-control"
              placeholder="Age"
            />
            {errors.AgeError && (
              <small className="email-error" style={{ color: "red" }}>
                {errors.AgeError}
              </small>
            )}
            <label> Email</label>
            <input
              type="text"
              id="Email"
              name="email"
              value={values.email}
              onChange={(e) => onChangeHandler(e)}
              className="form-control"
              placeholder="Email"
            />
            {errors.EmailError && (
              <small className="email-error" style={{ color: "red" }}>
                {errors.EmailError}
              </small>
            )}
            <label> Mobile</label>
            <input
              type="text"
              id="Mobile"
              name="mobile"
              value={values.mobile}
              onChange={(e) => onChangeHandler(e)}
              className="form-control"
              placeholder="Mobile"
            />
            {errors.MobileError && (
              <small className="email-error" style={{ color: "red" }}>
                {errors.MobileError}
              </small>
            )}
            <button className="sb-button" onClick={UpdateHandleProducts} >Submit</button>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
