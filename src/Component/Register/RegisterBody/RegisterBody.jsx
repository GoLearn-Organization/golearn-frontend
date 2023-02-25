import React from "react";
import "./RegisterBody.css";
import { useNavigate } from "react-router-dom";
import MemoryKeys from "../../models/MemoryKeys";

const RegisterBody = ({ userRegistration, setUserRegistration }) => {
  const [firstName, ffunc] = React.useState("");
  const [lastName, lfunc] = React.useState("");
  const [userName, ufunc] = React.useState("");
  const [email, efunc] = React.useState("");
  const [password, pfunc] = React.useState("");
  const [role, selRole] = React.useState("");
  const [confirm, cfunc] = React.useState("");

  const navigate = useNavigate();

  /**
   * Function to handle user registration of a user (student)
   * @param {*} e is the sender of the event
   */
  const handleUserRegistration = async (e) => {
    e.preventDefault();

    let result = await fetch("https://golearn.up.railway.app/api/v1/auth", {
      method: "post",
      credencials: "include",
      body: JSON.stringify({ firstName, lastName, userName, email, password }),
      headers: {
        "content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    console.log(result);

    // Save to database
    localStorage.setItem(MemoryKeys.UserCredentials, result.data);

    let successful = result.success;
    let token = result.token;

    if (successful === false) {
      ///TODO: Replace next line with toast card
      document.getElementById("message").innerHTML =
        "There was an error while creating your account. Please try again.";
      document.getElementById("message").style.color = "red";
      return;
    } else if (successful === true) {
      document.getElementById("message").innerHTML =
        "Account created successfully!";
      document.getElementById("message").style.color = "green";
      setTimeout(() => {
        navigate("/profile");
      }, 3000);

      //   Save token
      localStorage.setItem(MemoryKeys.UserToken, token);

      //   document.getElementById("message").innerHTML = "You have successfully Registered";
    }
  };

  /**
   * Function to handle user registration of a user (student)
   * @param {*} e is the sender of the event
   */
  async function handlePublisherRegistration(e) {
    e.preventDefault();

    e.preventDefault();

    let result = await fetch("https://golearn.up.railway.app/api/v1/auth", {
      method: "post",
      credencials: "include",
      body: JSON.stringify({
        firstName,
        lastName,
        userName,
        email,
        password,
        role,
      }),
      headers: {
        "content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    console.log(result);

    // Save to database
    localStorage.setItem(MemoryKeys.UserCredentials, result.data);

    let successful = result.success;
    let token = result.token;

    if (successful === false) {
      ///TODO: Replace next line with toast card
      document.getElementById("message").innerHTML =
        "There was an error while creating your account. Please try again.";
      document.getElementById("message").style.color = "red";
      return;
    } else if (successful === true) {
      document.getElementById("message").innerHTML =
        "Account created successfully!";
      document.getElementById("message").style.color = "green";
      setTimeout(() => {
        navigate("/profile");
      }, 3000);

      //   Save token
      localStorage.setItem(MemoryKeys.UserToken, token);
    }
  }

  function valid_Call() {
    if (confirm === password) {
      document.getElementById("message").innerHTML = "Password match";
      document.getElementById("message").style.color = "green";
    } else {
      document.getElementById("message").innerHTML = "Password does not match";
      document.getElementById("message").style.color = "red";
    }
  }

  setTimeout(() => {
    valid_Call();
  });

  return (
    <div className="registerbody">
      <div className="sub-registerbody">
        {userRegistration ? (
          <form onSubmit={handleUserRegistration} action="/profile">
            <label htmlFor="">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) => ffunc(e.target.value)}
              required
            />

            <label htmlFor="">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => lfunc(e.target.value)}
              required
            />

            <label htmlFor="">User Name</label>
            <input
              type="text"
              placeholder="User Name"
              onChange={(e) => ufunc(e.target.value)}
              required
            />

            <label htmlFor="">E-mail</label>
            <input
              type="email"
              placeholder="E-mail"
              onChange={(e) => efunc(e.target.value)}
              required
            />

            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => pfunc(e.target.value)}
              required
            />

            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              id="com_password"
              onChange={(e) => cfunc(e.target.value)}
              required
            />

            <span id="message"></span>
            <input type="submit" value="Register" className="submit" />
          </form>
        ) : (
          <form onSubmit={handlePublisherRegistration} action="/profile">
            <label htmlFor="">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) => ffunc(e.target.value)}
              required
            />

            <label htmlFor="">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => lfunc(e.target.value)}
              required
            />

            <label htmlFor="">User Name</label>
            <input
              type="text"
              placeholder="User Name"
              onChange={(e) => ufunc(e.target.value)}
              required
            />

            <label htmlFor="">E-mail</label>
            <input
              type="email"
              placeholder="E-mail"
              onChange={(e) => efunc(e.target.value)}
              required
            />

            <label htmlFor="">Role</label>
            <input
              type="text"
              placeholder="Role"
              onChange={(e) => selRole(e.target.value)}
              required
            />

            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => pfunc(e.target.value)}
              required
            />

            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              id="com_password"
              onChange={(e) => cfunc(e.target.value)}
              required
            />

            <span id="message"></span>
            <input type="submit" value="Register" className="submit" />
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterBody;
