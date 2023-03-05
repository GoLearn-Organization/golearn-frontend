import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import logo from "./img/GoLearnFull Color.png";
import { RiArrowDownSLine } from "react-icons/ri";
import { HiOutlineUserCircle } from "react-icons/hi";
import useResponsive from "../custom-hooks/UseResponsive";
import { BsThreeDots } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUser, FaTimes } from "react-icons/fa";
import { useState } from "react";

const NavBar = ({ loginStatus }) => {
  // console.log(window.innerWidth);

  const onMobile = useResponsive();

  const [dropdown, dropdownFunct] = useState(false);

  function dropdownOpen() {
    dropdownFunct(!dropdown);
  }

  function dropdownClose() {
    dropdownFunct(!dropdown);
  }

  return (
    <>
      {!onMobile && (
        <div className="navbar">
          {/* <div className="sub-navbar"> */}
          <div className="logo-search">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            <input type="text" placeholder="Search for anything" />
          </div>
          <div className="navigation">
            <ul className="main" id="list">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="Courses">Courses</Link>
              </li>
              <li>
                <Link to="Blog">
                  Go-Learn <RiArrowDownSLine fontSize="20px" />{" "}
                </Link>
                <ul className="dd">
                  <span>
                    <Link to="About">About</Link>
                  </span>
                  <span>
                    <Link to="Contact-Us">Contact Us</Link>
                  </span>
                </ul>
              </li>
              <li>
                <Link to="Blog">Blog</Link>
              </li>
            </ul>
          </div>
          <div className="register">
            {/* Conditional rendering using login status  */}
            {loginStatus ? (
              <Link to="/profile">
                <button className="profileBtn">
                  <HiOutlineUserCircle fontSize="22" color="#fff" />
                  Profile
                </button>
              </Link>
            ) : (
              <div className="group">
                <Link to="/login">
                  <button className="loginBtn">Login</button>
                </Link>
                <Link to="/register">
                  <button>Register</button>
                </Link>
                <input
                  type="search"
                  placeholder="Search for anything"
                  className="search"
                />
              </div>
            )}
          </div>
        </div>
      )}
      {onMobile && (
        <div className="navbar">
          {/* Logo area */}
          <div className="logo-search">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
          </div>

          {/* Naviagtion area */}
          <div className="navigation">
            <ul
              className="main"
              id="list"
              style={{ display: dropdown ? "flex" : "none" }}
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="Courses">
                  Courses
                  {/* <RiArrowDownSLine fontSize="20px" /> */}
                  {/* <i class="fa fa-caret-down" aria-hidden="true"></i> */}
                </Link>
                {/* <ul className="dd">
                  <span>
                    <Link to="DecFinance">Decentralized Finance</Link>
                  </span>
                  <span>
                    <Link to="DecFinance">Personal Development Courses</Link>
                  </span>
                </ul> */}
              </li>
              <li>
                <Link to="Blog">
                  Go-Learn <RiArrowDownSLine fontSize="20px" />{" "}
                </Link>
                <ul className="dd">
                  <span>
                    <Link to="About">About</Link>
                  </span>
                  <span>
                    <Link to="Contact-Us">Contact Us</Link>
                  </span>
                </ul>
              </li>
              <li>
                <Link to="Blog">Blog</Link>
              </li>
            </ul>
            {/* Nav icon */}
            <div id="nav">
              {dropdown ? (
                <FaTimes fontSize={22} onClick={dropdownClose} />
              ) : (
                <GiHamburgerMenu fontSize={22} onClick={dropdownOpen} />
              )}
            </div>
          </div>

          {/* Account area */}
          <div className="register">
            {/* Conditional rendering using login status  */}
            {loginStatus ? (
              <>
                <Link to="/profile">
                  <FaUser />
                </Link>
              </>
            ) : (
              <>
                <div className="group">
                  <Link to="/login">
                    <button className="loginBtn">Login</button>
                  </Link>
                  <Link to="/register">
                    <button>Register</button>
                  </Link>
                  {/* <input
                type="search"
                placeholder="Search for anything"
                className="search"
              /> */}
                </div>
                <div className="option">
                  {/* <img src={option} alt="" /> */}
                  <BsThreeDots fontSize={22} />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
