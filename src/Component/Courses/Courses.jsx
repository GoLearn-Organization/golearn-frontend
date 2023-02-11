import React from "react";
import Fetch from "./Fetch/Fetch";
import Classes from "./Classes/Classes";

const Courses = ({ loginStatus }) => {
  return (
    <>
      <Fetch />
      <Classes loginStatus={loginStatus} />
    </>
  );
};

export default Courses;
