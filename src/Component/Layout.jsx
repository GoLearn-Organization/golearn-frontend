import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar/NavBar";

const Layout = ({ loginStatus,courses }) => {
  return (
    <>
      {/* <NavBar loginStatus={loginStatus} /> */} 
      <Navbar loginStatus={loginStatus} courses={courses} />
      <Outlet />
    </>
  );
};

export default Layout;
