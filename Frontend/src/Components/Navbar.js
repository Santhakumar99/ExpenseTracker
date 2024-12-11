import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../App.css";
import { IconContext } from "react-icons";
import AddModal from "./AddExpense/AddExpenseModal";
import { useNavigate } from "react-router-dom";
import logo from "../Components/assets/images/userlogo.png";
import ProfileIcon from "./Profile";
import { useGlobalContext } from '../Context/GlobalContext'

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  let userName = localStorage.getItem("UserName");
  const {user, isAuthenticated, logout } = useGlobalContext()
  const showSidebar = () => setSidebar(!sidebar);
  let navigate = useNavigate();
  const [deleteAlert, setDeleteAlert] = useState({
    alertBox: false,
    deleteId: "",
  });

  const Logout = () => {
    // logout()
    localStorage.removeItem("user");
    localStorage.removeItem("UserID");
    navigate("/login", { replace: true });
  };
  return (
    <>
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
      <IconContext.Provider value={{ color: "undefined" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <h3 className="nav-header">Expense Tracker</h3>
          <div className="Usrname">
            <div className="modalsec">
              {/* <AddModal /> */}
            </div>
            <div className="namesec">
              {/* <ProfileIcon/> */}
              {userName}</div>
            <div className="btsec">
           
          <button
            className="btn btn-primary Logoutbtn"
            onClick={() =>
              setDeleteAlert({
                ...deleteAlert,
                alertBox: true,
              })
            }
          >
            <img src={logo} width="40px" height="40px" />{" "}
          </button>
        </div>
          </div>
        </div>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
