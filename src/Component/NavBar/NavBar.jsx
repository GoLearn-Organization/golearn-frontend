import React, { useEffect, useRef, useState } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose, MdStarRate } from "react-icons/md";
import { RiArrowDownSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import style from "../../styles/Navbar.module.scss";
import useResponsive from "../custom-hooks/UseResponsive";
import ForumModal from "../ForumModal";
import logo from "./img/GoLearnFull Color.png";

const Navbar = ({ loginStatus, courses }) => {
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

  const [searchInputValue, setSearchInputValue] = useState("");

  const [searchResultVisibility, setSearchResultVisibility] = useState(false);
  const [mobileInputVisibility, setMobileInputVisibility] = useState(false);

  const [forumModalVisibility, setForumModalVisibility] = useState(false);

  // let searchedCourses = [];
  const [searchedCourses, setSearchedCourses] = useState([]);

  function filterCourse(e) {
    // Set the value
    let value = e.target.value;

    console.log("VALUE: ", value);

    // return;
    setSearchInputValue(value);

    setSearchResultVisibility(true);

    console.log("input value: ", searchInputValue);

    // searchedCourses = courses?.filter((keyword) =>
    //   keyword?.courseTitle.toLowerCase().includes(searchInputValue)
    // );

    setSearchedCourses(
      courses?.filter((course) =>
        course?.courseTitle
          .toLowerCase()
          .includes(searchInputValue.toLowerCase())
      )
    );
  }

  const searchAreaRef = useRef();

  // useEffect hook to close search dropdown when mouse is clicked outside search area
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchAreaRef.current &&
        !searchAreaRef.current.contains(event.target)
      ) {
        setSearchResultVisibility(false);
        setMobileInputVisibility(false);
        setSearchInputValue("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [searchAreaRef]);

  // Another way to go about this
  // function filterCoursesContainingKeyword(courses, searchInputValue) {
  //   // Create an empty array to store the filtered courses
  //   const filteredCourses = [];

  //   // Loop through each course in the courses array
  //   courses.forEach((course) => {
  //     // If the course contains the search string, add it to the filteredCourses array
  //     if (course.includes(searchInputValue)) {
  //       filteredCourses.push(course);
  //     }
  //   });

  //   // Return the filtered courses array
  //   return filteredCourses;
  // }

  return (
    <>
      <div className={style.navbarContainer}>
        {forumModalVisibility && (
          <ForumModal setForumModalVisibility={setForumModalVisibility} />
        )}
        {onMobile && sideBarDropdownModalVisibility && (
          <NavbarDropdown
            setSideBarDropdownModalVisibility={
              setSideBarDropdownModalVisibility
            }
            setForumModalVisibility={setForumModalVisibility}
          />
        )}

        <div className={style.navbarContainer__left}>
          <div className={style.logo}>
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          {!onMobile && (
            <div className={style.searchDiv} ref={searchAreaRef}>
              <input
                type="text"
                value={searchInputValue}
                onChange={filterCourse}
                placeholder="Search for a course"
              />
              {searchResultVisibility && searchInputValue && (
                <div className={style.searchResultsContainer}>
                  {searchedCourses && searchedCourses.length > 0 ? (
                    <>
                      {searchedCourses.map((eachCourse, index) => (
                        <NavbarSearchResults
                          course={eachCourse}
                          setSearchResultVisibility={setSearchResultVisibility}
                          setSearchInputValue={setSearchInputValue}
                          key={index}
                        />
                      ))}
                    </>
                  ) : (
                    <div className={style.searchErrorMsg}>
                      <span>
                        <MdClose fontSize={24} />
                      </span>
                      <p>
                        We couldn't find results based on your search keyword
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {!onMobile && (
          <div className={style.navbarContainer__navigation}>
            <ul>
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/learn">
                <li>Learn</li>
              </Link>
              <li onClick={() => setForumModalVisibility(true)}>Forum</li>
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
            {loginStatus ? (
              <Link to="profile">
                <button>
                  <FaUser /> Profile
                </button>
              </Link>
            ) : (
              <Link to="Login">
                <button>
                  <FaUser /> Login
                </button>
              </Link>
            )}
          </div>
        )}

        {onMobile && (
          <div className={style.navbarContainer__mobileNav}>
            {/* <FaTimes fontSize={22} onClick={dropdownClose} /> */}
            <div className={style.search} ref={searchAreaRef}>
              <FaSearch
                fontSize={18}
                onClick={() => setMobileInputVisibility(true)}
              />

              {onMobile && (
                <>
                  {mobileInputVisibility && (
                    <div className={style.mobileSearchDiv} ref={searchAreaRef}>
                      <input
                        type="text"
                        value={searchInputValue}
                        onChange={async (e) => {
                          // Set the value
                          let value = e.target.value;

                          setSearchInputValue(value);

                          filterCourse();
                        }}
                        placeholder="Search for a course"
                      />

                      {searchResultVisibility && searchInputValue && (
                        <div className={style.searchResultsContainer}>
                          {searchedCourses && searchedCourses.length > 0 ? (
                            <>
                              {searchedCourses.map((eachCourse, index) => (
                                <NavbarSearchResults
                                  course={eachCourse}
                                  setSearchResultVisibility={
                                    mobileInputVisibility
                                  }
                                  setSearchInputValue={setSearchInputValue}
                                  key={index}
                                />
                              ))}
                            </>
                          ) : (
                            <div className={style.searchErrorMsg}>
                              <span>
                                <MdClose fontSize={24} />
                              </span>
                              <p>
                                We couldn't find results based on your search
                                keyword
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
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
    </>
  );
};

export const NavbarDropdown = ({
  setSideBarDropdownModalVisibility,
  setForumModalVisibility,
}) => {
  return (
    <div className={style.sidebarContainer}>
      <div
        className={style.overlay}
        onClick={() => setSideBarDropdownModalVisibility(false)}
      ></div>
      <div className={style.container}>
        <div className={style.topArea}>
          <div className={style.topArea__logo}>
            <Link
              to="/"
              onClick={() => setSideBarDropdownModalVisibility(false)}
            >
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
          <Link
            to="/learn"
            onClick={() => setSideBarDropdownModalVisibility(false)}
          >
            <li>Learn</li>
          </Link>
          <li
            onClick={() => {
              setSideBarDropdownModalVisibility(false);
              setForumModalVisibility(true);
            }}
          >
            Forum
          </li>
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
  );
};

export default Navbar;

const NavbarSearchResults = ({
  course,
  setSearchResultVisibility,
  setSearchInputValue,
}) => {
  const rating = course?.courserating ?? 0;

  return (
    <>
      <Link
        to={`/course/${course?._id}`}
        onClick={() => {
          setSearchInputValue("");
          setSearchResultVisibility(false);
        }}
      >
        <div className={style.eachResult}>
          <div className={style.eachResult__image}>
            <img src={course?.courseImage ?? "/logo.png"} alt="course cover" />
          </div>
          <div className={style.eachResult__courseDetails}>
            <div className={style.topAreaDetails}>
              <div className={style.details}>
                <h1 className={style.courseTitle}>{course?.courseTitle}</h1>
                <p className={style.publisherName}>{course?.publisherName}</p>
                <div className={style.category}>
                  <span>Category:</span>
                  <p>{course?.category}</p>
                </div>
              </div>
              {course?.courseType === 0 && (
                <span className={style.courseTypeFree}>Free</span>
              )}
              {course?.courseType === 1 && (
                <span className={style.courseTypePaid}>Paid</span>
              )}
            </div>
            <div className={style.bottomAreaDetails}>
              <div className={style.tagsArea}>
                <span>TAGS:</span>
                <div className={style.tagsArea__tags}>
                  {[...course?.tags].map((eachTag, index) => (
                    <p key={index}>{eachTag}</p>
                  ))}
                </div>
              </div>
              <div className={style.ratingArea}>
                <span className={style.rating}>
                  {[...Array(rating)].map((each, index) => {
                    return (
                      <span>
                        <MdStarRate fontSize={11} color="#F7A921" />
                      </span>
                    );
                  })}
                  {rating < 5 && (
                    <>
                      {[...Array(5 - rating)].map((each, index) => {
                        return (
                          <span>
                            <MdStarRate fontSize={11} color="#D9D9D9" />
                          </span>
                        );
                      })}
                    </>
                  )}
                </span>
                <p>
                  <span className={style.actualRating}>{rating}</span>/5{" "}
                  <span className={style.text}>
                    {rating < 2 ? "Rating" : "Ratings"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
