import React from "react";
// import NavBar from "./NavBar/_NavBar";
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar/Navbar";

const Layout = ({ loginStatus }) => {
  return (
    <>
      {/* <NavBar loginStatus={loginStatus} /> */}
      <Navbar loginStatus={loginStatus}/>
      <Outlet />
    </>
  );
};

export default Layout;
