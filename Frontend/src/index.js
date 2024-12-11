import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// import React from "react";
// import { createRoot } from "react-dom/client";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   Link,
//   Outlet,
//   createRoutesFromElements,
//   Navigate
// } from "react-router-dom";

// import { useNavigate } from "react-router-dom";
// import Dashboard from "./Components/Dashboard";                                                                                                                                                    
// import "./App.css";
// import Users from "./Components/Users";
// import View from "./Components/UserView";
// import Create from "./Components/UserCreate";
// import Update from "./Components/UserUpdate";
// import Login from "./Components/Users/Login";
// // import Contact from "./routes/Contact";
// // let navigate = useNavigate();
// const AppLayout = () => (


//   <>
    
//     <Outlet />
//   </>   
// );
// const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     children: [
//       {
//         path: "/",
//         element: (
//           <ProtectedRoutes>
//             <Dashboard />
//           </ProtectedRoutes>
//         ),
//       },
//       {
//         path: "/login",
//         element: <Login />,
//       },
//       {
//         path: "/dashboard",
//         element: <Dashboard />,
//       },
//       {
//         path: "/users",
//         element: <Users />,
//       },
//       {
//         path: "/users/create",
//         element: <Create />,
//       },
//       {
//         path: "/users/view/:id",
//         element: <View />,
//       },
//       {
//         path: "/users/update/:id",
//         element: <Update />,
//       },
//     ],
//   },
// ]);
// export function ProtectedRoutes(props) {
//   if (localStorage.getItem("user")) {
//     return props.children;
//   } else {
//     return <Navigate to="/login" />;
//     // return navigate("/login", { replace: true });
//   }
// }
// createRoot(document.getElementById("root")).render(
  
//   <RouterProvider router={router} />
// );
