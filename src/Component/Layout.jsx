import React from "react";
import NavBar from "./NavBar/NavBar";
import { Outlet } from "react-router-dom";

const Layout = ({ loginStatus }) => {
  return (
    <>
      <NavBar loginStatus={loginStatus} />
      <Outlet />
    </>
  );
};

export default Layout;
