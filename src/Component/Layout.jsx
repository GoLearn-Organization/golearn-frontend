import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar/NavBar";

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
