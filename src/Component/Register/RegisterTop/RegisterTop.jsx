import React from "react";
import "../../Blog/BlogHead/BlogHead";
import { Link } from "react-router-dom";

const RegisterTop = ({ userRegistration, setUserRegistration }) => {
  return (
    <div className="bloghead">
      <div className="sub-bloghead">
        <div className="text">
          <h1>
            {userRegistration
              ? "Student Registration"
              : "Publisher Registration"}
          </h1>
          {/* {userRegistration ? (
            <p onClick={() => setUserRegistration(false)}>
              Register as a publisher
            </p>
          ) : (
            <p onClick={() => setUserRegistration(true)}>
              Register as a student
            </p>
          )} */}
          <Link to="/login">
            <p>Login instead</p>
          </Link>
          {/* <span>
            <a href="/">Home</a> /
            <a href="/register">
              <Link to="/register"> Registration</Link>
            </a>
          </span> */}
          <a className="homeRedirect" href="/" rel="noreferrer">
            Back to homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterTop;
