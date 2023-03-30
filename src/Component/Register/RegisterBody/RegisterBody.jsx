import React, { useState } from "react";
import "./RegisterBody.css";
import { useNavigate } from "react-router-dom";
import MemoryKeys from "../../models/MemoryKeys";

const RegisterBody = ({ userRegistration, setUserRegistration }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [firstName, ffunc] = React.useState("");
  const [lastName, lfunc] = React.useState("");
  const [userName, ufunc] = React.useState("");
  const [email, efunc] = React.useState("");
  const [password, pfunc] = React.useState("");
  // const [role, selRole] = React.useState("publisher");
  const role = "publisher";
  const [confirm, cfunc] = React.useState("");

  const navigate = useNavigate();

  /**
   * Function to handle user registration of a user (student)
   * @param {*} e is the sender of the event
   */
  const handleUserRegistration = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setMessage("");

    if (confirm === password) {
      setMessage("Password match");
      document.getElementById("message").style.color = "green";
    } else {
      setMessage("Password does not match");
      document.getElementById("message").style.color = "red";
    }

    let result = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/auth`,
      {
        method: "post",
        credencials: "include",
        body: JSON.stringify({
          firstName,
          lastName,
          userName,
          email,
          role: 'admin',
          password,
        }),
        headers: {
          "content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    console.warn(result);
    console.log(result);

    // Save to database
    localStorage.setItem(MemoryKeys.UserCredentials, result.data);

    let successful = result.success;
    let token = result.token;

    console.log(`${email} has already been used by another user`);

    if (successful === false) {
      setIsLoading(false);

      if (result.error === `${email} has already been used by another user`) {
        setMessage(
          "This email is taken. Please try again with a different email address."
        );
        // document.getElementById("message").innerHTML =
        //   "This email is taken. Please try again with a different email address.";
        document.getElementById("message").style.color = "red";
        return;
      }

      ///TODO: Replace next line with toast card
      setMessage(
        "There was an error while creating your account. Please try again."
      );
      document.getElementById("message").style.color = "red";
      return;
    } else if (successful === true) {
      setIsLoading(false);

      setMessage("Account created successfully!");
      document.getElementById("message").style.color = "green";

      setTimeout(() => {
        navigate("/profile");
      }, 3000);

      //   Save token
      localStorage.setItem(MemoryKeys.UserToken, token);
    }
  };

  /**
   * Function to handle user registration of a user (student)
   * @param {*} e is the sender of the event
   */
  async function handlePublisherRegistration(e) {
    e.preventDefault();

    e.preventDefault();

    let result = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/auth`,
      {
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
      }
    );
    result = await result.json();
    console.warn(result);
    console.log(result);

    // Save to database
    localStorage.setItem(MemoryKeys.UserCredentials, result.data);

    let successful = result.success;
    let token = result.token;

    if (successful === false) {
      ///TODO: Replace next line with toast card
      setMessage(
        "There was an error while creating your account. Please try again."
      );
      document.getElementById("message").style.color = "red";
      return;
    } else if (successful === true) {
      setMessage("Account created successfully!");
      document.getElementById("message").style.color = "green";
      setTimeout(() => {
        navigate("/profile");
      }, 3000);

      //   Save token
      localStorage.setItem(MemoryKeys.UserToken, token);
    }
  }

  // function valid_Call() {
  //   if (confirm === password) {
  //     setMessage('Password match');
  //     document.getElementById("message").style.color = "green";
  //   } else {
  //     setMessage('Password does not match');
  //     document.getElementById("message").style.color = "red";
  //   }
  // }

  // setTimeout(() => {
  //   valid_Call();
  // });

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

            <span id="message">{message}</span>
            {/* <input type="submit" value="Register" className="submit" /> */}
            <button type="submit" className="submit">
              {!isLoading ? (
                "Register"
              ) : (
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 50 50"
                  fill="#bbd9f8"
                >
                  <circle cx="25" cy="2.4" r="2.4"></circle>
                  <circle opacity="0.55" cx="25" cy="47.6" r="2.4"></circle>
                  <circle opacity="0.9" cx="13.7" cy="5.4" r="2.4"></circle>
                  <path
                    d="M38.4,43.4 C39,44.5 38.6,46 37.5,46.7 C36.4,47.3 34.9,46.9 34.2,45.8 C33.6,44.7 34,43.2 35.1,42.5 C36.2,41.9 37.7,42.3 38.4,43.4 Z"
                    opacity="0.45"
                  ></path>
                  <path
                    d="M6.6,11.6 C7.7,12.2 8.1,13.7 7.5,14.9 C6.9,16 5.4,16.4 4.2,15.8 C3.1,15.2 2.7,13.7 3.3,12.5 C4,11.3 5.5,11 6.6,11.6 Z"
                    opacity="0.8"
                  ></path>
                  <path
                    d="M45.8,34.2 C46.9,34.8 47.3,36.3 46.7,37.5 C46.1,38.6 44.6,39 43.4,38.4 C42.3,37.8 41.9,36.3 42.5,35.1 C43.1,34 44.6,33.5 45.8,34.2 Z"
                    opacity="0.35"
                  ></path>
                  <circle opacity="0.7" cx="2.4" cy="25" r="2.4"></circle>
                  <circle opacity="0.2" cx="47.6" cy="25" r="2.4"></circle>
                  <path
                    d="M4.2,34.2 C5.3,33.6 6.8,34 7.5,35.1 C8.1,36.2 7.7,37.7 6.6,38.4 C5.5,39 4,38.6 3.3,37.5 C2.6,36.4 3.1,34.9 4.2,34.2 Z"
                    opacity="0.65"
                  ></path>
                  <path
                    d="M43.4,11.6 C44.5,11 46,11.4 46.7,12.5 C47.3,13.6 46.9,15.1 45.8,15.8 C44.7,16.4 43.2,16 42.5,14.9 C41.9,13.8 42.3,12.3 43.4,11.6 Z"
                    opacity="0.1"
                  ></path>
                  <path
                    d="M11.6,43.4 C12.2,42.3 13.7,41.9 14.9,42.5 C16,43.1 16.4,44.6 15.8,45.8 C15.2,46.9 13.7,47.3 12.5,46.7 C11.4,46 11,44.5 11.6,43.4 Z"
                    opacity="0.6"
                  ></path>
                  <path
                    d="M34.2,4.2 C34.8,3.1 36.3,2.7 37.5,3.3 C38.6,3.9 39,5.4 38.4,6.6 C37.8,7.7 36.3,8.1 35.1,7.5 C34,6.9 33.5,5.4 34.2,4.2 Z"
                    fill="#212120"
                  ></path>
                </svg>
              )}
            </button>
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
              value="Publisher"
              // onChange={(e) => selRole(e.target.value)}
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
