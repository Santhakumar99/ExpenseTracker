import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../css/Reguser.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegUser = () => {
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    mobile: "",
  });
  let navigate = useNavigate();
  const [errors, setError] = useState({
    NameError: "",
    EmailError: "",
    PassError: "",
    MobileError: "",
  });
  // const onSubmit = (data) => {
  //   console.log(data);
  // };
  // your form submit function which will invoke after successful validation
  //-------------------validation-----------------------
  const validateDetails = (name, value) => {
    const error = errors;
    let passRegx =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

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
        }
        // validForm.emailValid = false;
        else if (!passRegx.test(value)) {
          error.PassError = "Please enter a Valid Password";
          // validForm.emailValid = false;
        } else {
          error.PassError = "";
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

      case "mobile":
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
  const AddHandleProducts = async (e) => {
    e.preventDefault();
    for (let key in values) {
      if (!values[key]) {
        validateDetails(key, values[key]);
      }
      console.log(errors);
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
      const Result = await axios.post(
        `http://localhost:7000/users/userCreate`,
        valuesObj
      );

      if (Result) {
        console.log(Result);
        // setProducts(Result);
        toast("Register Successfully! Login Again!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log("121");
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const signIn = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  return (
    <>
      <ToastContainer />
      <div className="Reg_Header">
        <div className="d-flex flex-column justify-content-center align-items-center bg-light">
          {/* <h2>Add Users</h2> */}
        </div>
        <div className="login_Container">
          <h2 className="PageHeader">Expense Tracker</h2>
          <form>
            <h4 className="loginHeader">Register</h4>
            <div className="labelData">
              <label className="reg_label">Name</label>
            </div>
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
            <div className="labelData">
              <label>Password</label>
            </div>

            <input
              type="Password"
              id="Password"
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
            <div className="labelData">
              <label> Email</label>
            </div>
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
            <div className="labelData">
              <label> Mobile</label>
            </div>
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

            <button className="sb-button" onClick={AddHandleProducts}>
              Submit
            </button>

            {/* <div>{Login()}</div> */}
          </form>

          <div className="reguser">
            <button className="new-user-button" id="newuser" onClick={signIn}>
              Already User ?<b className="signup">Sign In</b>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegUser;
