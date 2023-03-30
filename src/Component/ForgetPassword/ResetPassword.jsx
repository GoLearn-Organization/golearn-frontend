import React from "react";
import { useLocation } from "react-router-dom";
import BlogHead from "../Blog/BlogHead/BlogHead";
import "./Forget.css";

const Forget = () => {
  let [password, efunc] = React.useState("");
  let [confirmPassword, setConfirmPassword] = React.useState("");
  let [errorMessage, setErrorMessage] = React.useState("");

  const location = useLocation();

  const token = new URLSearchParams(location.search).get("token");

  const sendPassword = async (e) => {
    setErrorMessage("");

    e.preventDefault();

    if(!password || !confirmPassword) {
      document.getElementById("alert").style.display = "flex";
      document.getElementById("alert").style.backgroundColor = "#ffd9d9";      
      document.getElementById("message").style.color = "red";
      setErrorMessage("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      document.getElementById("alert").style.display = "flex";
      document.getElementById("alert").style.backgroundColor = "#ffd9d9";
      document.getElementById("message").style.color = "red";
      setErrorMessage("Please input matching password");
      return;
    }

    let result = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/resetpassword/${token}`,
      {
        method: "PUT",
        credencials: "include",
        body: JSON.stringify({ password }),
        headers: {
          "content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    console.warn(result);
    console.log(result);
    console.log(password);

    if (result.success === true) {
      // document.getElementById("message").innerHTML = `${result.msg}`;
      setErrorMessage(result.msg);
      document.getElementById("message").style.color = "green";
      document.getElementById("message").style.textAlign = "center";
      document.getElementById("message").style.textTransform = "lowercase";
      localStorage.setItem("reset", result.token);

      document.getElementById("alert").style.display = "flex";
      document.getElementById("alert").style.backgroundColor = "#a0f7a0";
      document.getElementById("alert").style.border = "1px solid green";
    } else if (result.success === false) {
      // document.getElementById("message").innerHTML = `${result.error}`;
      setErrorMessage(result.error);
      document.getElementById("message").style.color = "red";
      document.getElementById("message").style.textAlign = "center";
      document.getElementById("message").style.textTransform = "lowercase";

      document.getElementById("alert").style.display = "flex";
      document.getElementById("alert").style.backgroundColor = "#f79494";
      document.getElementById("alert").style.border = "1px solid red";
    }
  };

  return (
    <>
      <BlogHead
        title="Reset Password"
        nav1="Home"
        nav2=" Reset Password"
        link="/resetpassword"
        link2="/"
      />
      <div className="forget">
        <div className="sub-forget">
          <p>Please input your new password below</p>
          {console.log("token: ", token)}
          <form onSubmit={sendPassword}>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                efunc(e.target.value);
                setErrorMessage("");
              }}
              placeholder="Input your password"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrorMessage("");
              }}
              placeholder="Confirm password"
            />
            <input className="submit" type="submit" value="Reset Password" />
            <div id="alert" className="alert">
              <span id="message" style={{margin: 0}}>{errorMessage}</span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Forget;
