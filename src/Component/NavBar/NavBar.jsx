import React, { useEffect, useState } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { RiArrowDownSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import style from "../../styles/Navbar.module.scss";
import useResponsive from "../custom-hooks/UseResponsive";
import logo from "./img/GoLearnFull Color.png";

const Navbar = ({ loginStatus }) => {
  const [dropdownContainerVisisble, setdropdownContainerVisisble] =
    useState(false);
  const [sideBarDropdownModalVisibility, setSideBarDropdownModalVisibility] =
    useState(false);

  const onMobile = useResponsive();

  /**
   * useEffect to make body scrollable or not
   */
  useEffect(() => {
    sideBarDropdownModalVisibility
      ? document.body.classList.add(style.bodyNoScroll)
      : document.body.classList.remove(style.bodyNoScroll);
  }, [sideBarDropdownModalVisibility]);

  return (
    <div className={style.navbarContainer}>
      {onMobile && sideBarDropdownModalVisibility && (
        <NavbarDropdown
          setSideBarDropdownModalVisibility={setSideBarDropdownModalVisibility}
        />
      )}

      <div className={style.navbarContainer__left}>
        <div className={style.logo}>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        {!onMobile && <input type="text" placeholder="Search for a course" />}
      </div>

      {!onMobile && (
        <div className={style.navbarContainer__navigation}>
          <ul>
            <Link to="/">
              <li>Home</li>
            </Link>
            <li>Learn</li>
            <li>Forum</li>
            <Link to="Blog">
              <li>Blog</li>
            </Link>
            <li
              onMouseOver={() => setdropdownContainerVisisble(true)}
              onMouseLeave={() => setdropdownContainerVisisble(false)}
            >
              More <RiArrowDownSLine fontSize="20px" />
              {dropdownContainerVisisble && (
                <div className={style.dropdownContainer}>
                  <Link to="About">
                    <span>About us</span>
                  </Link>
                  <Link to="Contact-Us">
                    <span>Contact us</span>
                  </Link>
                </div>
              )}
            </li>
          </ul>
          <button>
            <FaUser /> Profile
          </button>
        </div>
      )}

      {onMobile && (
        <div className={style.navbarContainer__mobileNav}>
          {/* <FaTimes fontSize={22} onClick={dropdownClose} /> */}
          <div className={style.search}>
            <FaSearch fontSize={18} />
          </div>
          <div className={style.user}>
            {loginStatus ? (
              <Link to="/profile">
                <FaUser fontSize={18} />
              </Link>
            ) : (
              <Link to="/login">
                <FaUser fontSize={18} />
              </Link>
            )}
          </div>
          <div
            className={style.menu}
            onClick={() => setSideBarDropdownModalVisibility(true)}
          >
            <GiHamburgerMenu fontSize={20} />
          </div>
        </div>
      )}
    </div>
  );
};

export const NavbarDropdown = ({ setSideBarDropdownModalVisibility }) => {
  return (
    <div className={style.sidebarContainer}>
      <div
        className={style.overlay}
        onClick={() => setSideBarDropdownModalVisibility(false)}
      ></div>
      <div className={style.container}>
        <div className={style.topArea}>
          <div className={style.topArea__logo}>
            <Link to="/" onClick={() => setSideBarDropdownModalVisibility(false)}>
              <img src={logo} alt="" /> 
            </Link>
          </div>
          <div
            className={style.topArea__closeIcon}
            onClick={() => setSideBarDropdownModalVisibility(false)}
          >
            <MdClose />
          </div>
        </div>
        <ul>
          <Link to="/" onClick={() => setSideBarDropdownModalVisibility(false)}>
            <li>Home</li>
          </Link>
          <Link to="/" onClick={() => setSideBarDropdownModalVisibility(false)}>
            <li>Learn</li>
          </Link>
          <Link
            to="Blog"
            onClick={() => setSideBarDropdownModalVisibility(false)}
          >
            <li>Blog</li>
          </Link>
          <Link
            to="About"
            onClick={() => setSideBarDropdownModalVisibility(false)}
          >
            <li>About us</li>
          </Link>
          <Link
            to="Contact-Us"
            onClick={() => setSideBarDropdownModalVisibility(false)}
          >
            <li>Contact us</li>
          </Link>
        </ul>
        
      </div>
    </div>
  )
};

export default Navbar;