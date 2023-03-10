import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
// import Navbar from "./Components/Navbar"
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Detail from "./Routes/Detail";
// import Footer from "./Components/Footer";
import "./index.css";
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import App from "./App";
import {ThemeProvider} from "./hooks/useTheme";
import { AuthProvider } from "./hooks/useAuth";

const root = ReactDOM.createRoot(document.getElementById("root"));

const routerApp = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [{
      path: '',
      loader: () => redirect('/home')
    },
    {
      path: 'home',
      element: <Home />
    },
    {
      path: 'login',
      element: <Login />
    },
    {
      path: 'dentist/:matricula',
      element: <Detail />
    },
    {
      path: "/",
      loader: () => redirect("/home")
    }]
  }
])

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router = {routerApp}/>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);