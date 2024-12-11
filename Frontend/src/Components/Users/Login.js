import React, { useState, useEffect } from "react";
import "../css/login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Context/GlobalContext";
// import { useNavigate } from 'react-router-dom';

const Login = () => {
  let s = JSON.parse(localStorage.getItem("user"));
  let { login } = useGlobalContext();
  useEffect(() => {
    // login();
  }, []); // Use the login function from context  const navigate = useNavigate();
  const [values, setValues] = useState({ name: "", password: "" });
  const [errors, setError] = useState({
    NameError: "",
    PassError: "",
    CatchError: "",
  });
  let navigate = useNavigate();

  const VerifyUser = async (e) => {
    e.preventDefault();
    for (let key in values) {
      if (!values[key]) {
        ValidateFields(key, values[key]);
      }
      // console.log(errors);
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
      // console.log(valuesObj);
      const Result = await axios.post(
        `http://localhost:7000/users/login`,
        valuesObj
      );

      if (Result && Result.data) {
        console.log("Logged in", Result?.data?.token);
        let token = Result?.data?.token.token;
        localStorage.setItem("token", token);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...Result.data.user, password: "" })
        );
        localStorage.setItem("UserID", Result.data.user._id);
        localStorage.setItem("UserName", Result.data.user.name);
        login(Result.data.user);
      }
      navigate("/", { replace: true });
      // }
    } catch (error) {
      errors.CatchError = error.response.data.message;
      setError({ ...errors });
    }
  };
  const RegUser = (e)=>{
    e.preventDefault();
    navigate("/RegUser");
  }
  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);
  const onChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    let inputvalues = values;
    ValidateFields(name, value);
    inputvalues[name] = value;
    setValues({ ...inputvalues });
  };
  const ValidateFields = (name, value) => {
    const error = errors;
    switch (name) {
      case "name":
        if (!value) {
          error.NameError = "Name field is required";
        } else {
          error.NameError = "";
        }
        break;
      case "password":
        if (!value) {
          error.PassError = "Password field is required";
          // validForm.passwordValid = false;
        } else {
          error.PassError = "";
          // validForm.passwordValid = true;
        }
        break;

      default:
        break;
    }

    // toCheckErrorsAndValid(validForm);
    setError({ ...error });
    console.log(error, "errors");
  };
  return (
    <>
      <div>
        <div className="login_Container">
          <h2 className="PageHeader">Expense Tracker</h2>
          <form>
            <h4 className="loginHeader">Login</h4>
            <div className="formfield">
              <label className="addExpenseLabel">User Name</label>
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
              <label className="addExpenseLabel">Password</label>
              <input
                type="password"
                id="UserPassword"
                name="password"
                value={values.password}
                onChange={(e) => onChangeHandler(e)}
                className="form-control"
                placeholder="Password"
              />
              {errors.PassError && (
                <small className="email-error" style={{ color: "red" }}>
                  {errors.PassError}
                </small>
              )}
              <div>
                {" "}
                {errors.CatchError && (
                  <small className="email-error" style={{ color: "red" }}>
                    {errors.CatchError}
                  </small>
                )}
              </div>
            </div>
            <div className="actBtn">
              <button type="button" className="btn btn-primary clrbbtn">
                Clear
              </button>
              <button
                type="button"
                className="btn btn-primary lgnsbbtn"
                onClick={VerifyUser}
              >
                Submit
              </button>
            </div>

            {/* <div>{Login()}</div> */}
          </form>

          <div className="reguser">
              <button className="new-user-button" id="newuser" onClick={RegUser}>New User ?<b className="signup">Sign Up</b></button>
            </div>
        </div>
      </div>
    </>
  );
};

export default Login;
