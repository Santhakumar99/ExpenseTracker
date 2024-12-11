import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import "../AddExpense/Expense.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Toastify from "../Toast/ToastNotification";
import { useGlobalContext } from "../../Context/GlobalContext";
const AddModal = () => {
  let { getIncomes } = useGlobalContext()
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [values, setValues] = useState({
    Name: "",
    Amount: "",
    Category: "",
    Type: "",
    Date: "",
    Description: "",
    Reference: "",
  });
  const [errors, setError] = useState({
    NameError: "",
    AmtError: "",
    CategoryError: "",
    TypeError: "",
    DateError: "",
    DescriptionError: "",
    ReferenceError: "",
  });

  const AddHandleProducts = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    for (let key in values) {
      if (!values[key]) {
        ValidateFields(key, values[key]);
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
        `http://localhost:7000/expenses/AddExpense`,
          { ...values, Userid: user._id }
      );
      getIncomes();
      if (Result) {
        console.log(Result);
        toast("Expense Added Successfully!!!", {
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
        setShow(false);
        navigate("/dashboard", { replace: true });
     
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      case "Name":
        if (!value) {
          error.NameError = "Name field is required";
        } else {
          error.NameError = "";
        }
        break;
      case "Amount":
        if (!value) {
          error.AmtError = "Amount field is required";
          // validForm.passwordValid = false;
        } else {
          error.AmtError = "";
          // validForm.passwordValid = true;
        }
        break;
      case "Category":
        if (!value) {
          error.CategoryError = "Category field is required";
        } else {
          error.CategoryError = "";
        }
        break;
      case "Type":
        if (!value) {
          error.TypeError = "Type field is required";
          // validForm.passwordValid = false;
        } else {
          error.TypeError = "";
          // validForm.passwordValid = true;
        }
        break;
      case "Date":
        if (!value) {
          error.DateError = "Date field is required";
        } else {
          error.DateError = "";
        }
        break;
      case "Description":
        if (!value) {
          error.DescriptionError = "Description field is required";
          // validForm.passwordValid = false;
        } else {
          error.DescriptionError = "";
          // validForm.passwordValid = true;
        }
        break;

      default:
        break;
    }

    // toCheckErrorsAndValid(validForm);
    setError({ ...error });
  };

  return (
    <>
    <Toastify />
      <button className="btn btn-primary addExpensebutton" onClick={handleShow}>
        Add Expense +{" "}
      </button>
      {show && (
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>Add Expense </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="expenseDetailsHead">
              {/* <h4>Expense Details</h4> */}
              <div className="formsection">
                <form onSubmit={AddHandleProducts}>
                  <div className="formfield">
                  {/* <label className="addExpenseLabel">Name</label> */}
                  <input
                    type="text"
                    id="Name"
                    name="Name"
                    value={values.Name}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control"
                    placeholder="Name"
                  />
                  </div>
                  {errors.NameError && (
                    <small className="email-error" style={{ color: "red" }}>
                      {errors.NameError}
                    </small>
                  )}
                  {/* <label>Amount</label> */}
                  <input
                    type="text"
                    id="Amount"
                    name="Amount"
                    value={values.Amount}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control"
                    placeholder="Amount"
                  />
                  {errors.AmtError && (
                    <small className="email-error" style={{ color: "red" }}>
                      {errors.AmtError}
                    </small>
                  )}
                  {/* <label>Category</label> */}
                  {/* <input
                    type="select"
                    id="Category"
                    name="Category"
                    value={values.Category}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control"
                    placeholder="Category"
                  /> */}
                  <select
                    class="form-control typeSelect"
                    aria-label="Select Type"
                    onChange={(e) => onChangeHandler(e)}
                    name="Category"
                  >
                    <option selected>Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Dress">Dress</option>
                    <option value="Travel">Travel</option>
                    <option value="Party">Party</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Food">Other</option>
                  </select>

                  {errors.CategoryError && (
                    <small className="email-error" style={{ color: "red" }}>
                      {errors.CategoryError}
                    </small>
                  )}
                  <select
                    class="form-control typeSelect"
                    aria-label="Select Type"
                    name="Type"
                    onChange={(e) => onChangeHandler(e)}

                  >
                    <option selected>Select Type</option>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                    <option value="Savings">Savings</option>
                  </select>
                  {errors.TypeError && (
                    <small className="email-error" style={{ color: "red" }}>
                      {errors.TypeError}
                    </small>
                  )}
                     <input
                    type="date"
                    id="Date"
                    name="Date"
                    value={values.Date}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control"
                    placeholder="Select Date"
                  />
                  {errors.DateError && (
                    <small className="email-error" style={{ color: "red" }}>
                      {errors.DateError}
                    </small>
                  )}
                  {/* <label>Description</label> */}
                  <input
                    type="select"
                    id="Description"
                    name="Description"
                    value={values.Description}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control"
                    placeholder="Description"
                  />
                  {errors.DescriptionError && (
                    <small className="email-error" style={{ color: "red" }}>
                      {errors.DescriptionError}
                    </small>
                  )}
                  {/* <label>Reference</label> */}
                  <input
                    type="select"
                    id="Reference"
                    name="Reference"
                    value={values.Reference}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control"
                    placeholder="Reference"
                  />
                  {errors.ReferenceError && (
                    <small className="email-error" style={{ color: "red" }}>
                      {errors.ReferenceError}
                    </small>
                  )}
                  <div className="actbtns">
                    <button className="sb-button" onClick={AddHandleProducts}>
                      Submit
                    </button>
                    <button className="Close-button" onClick={handleClose}>
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Understood</Button>
          </Modal.Footer> */}
        </Modal>
      )}
    </>
  );
};
export default AddModal;
