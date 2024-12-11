import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Users/Login";
import Users from "./Components/Users";
import Create from "./Components/UserCreate";
import View from "./Components/UserView";
import Update from "./Components/UserUpdate";
import ExpensesList from "./Components/AddExpense/ExpensesList";
import { GlobalProvider } from "./Context/GlobalContext";
import RegUser from "./Components/Users/RegUser";

// import HomePage from "./pages/HomePage";
// import Register from "./pages/Register";
// import Login from "./pages/Login";

function App() {
  return (
    <>
      <GlobalProvider>
      {/* <Login /> */}
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <Dashboard />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoutes>
                  <Users />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/users/create"
              element={
                <ProtectedRoutes>
                  <Create />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/users/view/:id"
              element={
                <ProtectedRoutes>
                  <View />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/users/update/:id"
              element={
                <ProtectedRoutes>
                  <Update />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoutes>
                  <Dashboard />
                </ProtectedRoutes>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/RegUser" element={<RegUser />} />
            <Route
              path="/expenses"
              element={
                <ProtectedRoutes>
                  <ExpensesList />
                </ProtectedRoutes>
              }
            />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  );
}

export function ProtectedRoutes(props) {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
