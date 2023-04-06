import moment from "moment";
import React, { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import MemoryKeys from "../models/MemoryKeys";
// import DecFinanceDetails from "../DecFinance/DecFinanceDetails/DecFinanceDetails";
import StudentRev from "../Review/StudentRev";
// import Title from "../DecFinance/Title/Title";
import styles from "./course.module.scss";

const Course = ({ loginStatus }) => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState();
  const [courseReview, setCoureReview] = useState([]);
  const [courseReviewCount, setCourseReviewCount] = useState();
  const [coureReviewFetched, setCoureReviewFetched] = useState(false);
  const [isReviewVisible, setIsReviewVisible] = useState(false);
  const [userData, setUserData] = useState();
  const [userEnrolledCourses, setUserEnrolledCourses] = useState([]);
  const [courseIsEnrolled, setCourseIsEnrolled] = useState(false);

  /**
   * Function to get course data
   */
  const handleGetCourseInfo = useCallback(async () => {
    if (courseData) {
      return;
    }

    // setDidIdChange(true);

    let result = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/course/${id}`,
      {
        method: "get",
      }
    );
    result = await result.json();
    // console.log("Course info: ", result);
    setCourseData(result.data);
    return;
    // localStorage.setItem(MemoryKeys.SelectedCourseId, id);
  }, [courseData, id]);

  /**
   * Function to get course review(s)
   */
  const handleCourseReview = useCallback(async () => {
    if (coureReviewFetched) {
      return;
    }

    let result = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/course/${id}/reviews`,
      {
        method: "get",
      }
    );
    result = await result.json();

    setCoureReview(result.data);
    setCourseReviewCount(result.count);
    setCoureReviewFetched(true);
  }, [coureReviewFetched, id]);

  let ratings = [];
  courseReview.map((item) => {
    return ratings.push(item.rating);
  });

  let totalRatingSum = ratings.reduce((add, value) => {
    return add + value;
  }, 0);
  // console.log(totalRatingSum);

  let count5 = 0;
  let count4 = 0;
  let count3 = 0;
  let count2 = 0;
  let count1 = 0;

  ratings.forEach((ratingFigure) => {
    if (ratingFigure === 5) {
      count5 += 1;
    } else if (ratingFigure === 4) {
      count4 += 1;
    } else if (ratingFigure === 3) {
      count3 += 1;
    } else if (ratingFigure === 2) {
      count2 += 1;
    } else if (ratingFigure === 1) {
      count1 += 1;
    }
  });

  let bar5 = `${
    (count5 / (count5 + count4 + count3 + count2 + count1)) * 100
  }%`;
  let bar4 = `${
    (count4 / (count5 + count4 + count3 + count2 + count1)) * 100
  }%`;
  let bar3 = `${
    (count3 / (count5 + count4 + count3 + count2 + count1)) * 100
  }%`;
  let bar2 = `${
    (count2 / (count5 + count4 + count3 + count2 + count1)) * 100
  }%`;
  let bar1 = `${
    (count1 / (count5 + count4 + count3 + count2 + count1)) * 100
  }%`;

  async function enrollCourse() {
    if (!loginStatus) {
      window.location.href = "/login";
    }

    let result = await fetch(
      `${process.env.REACT_APP_SERVER_URL}api/v1/course/${id}/enroll`,
      {
        method: "PATCH",
        headers: {
          "content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem(MemoryKeys.UserToken),
        },
      }
    );
    result = await result.json();
    console.log("result: ", result);

    if (result.success) {
      window.location.href = `${process.env.REACT_APP_FRONTEND_URL}/class/${courseData?._id}`;
    }
    return;
  }

  /**
   * Function to get user info
   */
  const handleUserInfoRetrieval = async () => {
    const token = localStorage.getItem(MemoryKeys.UserToken);

    const config = {
      headers: {
        "content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    let result = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/auth`,
      config,
      {
        method: "get",
        credencials: "include",
      }
    );
    result = await result.json();
    console.log("User info: ", result);

    setUserData(result.data);

    // localStorage.setItem(MemoryKeys.UserCredentials, JSON.stringify(result.data));
  };

  // useEffect hook to get course info if course data is unavailable
  useEffect(() => {
    // If course data is unavailable
    if (!courseData) {
      handleGetCourseInfo();
    }
  }, [courseData, handleGetCourseInfo]);

  // useEffect to fetch course data when id changes
  useEffect(() => {
    // Fetch course info whenever the URL changes
    let result = fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/course/${id}`,
      {
        method: "get",
      }
    );

    // Update state
    setCourseData(result.data);
  }, [id]);

  useEffect(() => {
    // If course review length is less than 1 and we don't have any course review fetched
    if (courseReview.length < 1 && !coureReviewFetched) {
      handleCourseReview();
    }
  }, [courseReview, coureReviewFetched, handleCourseReview]);

  useEffect(() => {
    if (!userData && loginStatus) {
      handleUserInfoRetrieval();
    }
  }, [userData, loginStatus]);

  useEffect(() => {
    if ((userData, courseData)) {
      // Get course id
      // console.log("course id: ", courseData?._id);

      // Get user's enrolled courses array
      // console.log("user info: ", userData.enrolledCourses);
      setUserEnrolledCourses(userData?.enrolledCourses);

      // Check if course id is among any id in the user's enrolled courses array
      if (userEnrolledCourses?.includes(courseData?._id)) {
        setCourseIsEnrolled(true);
      }
    }
  }, [userData, courseData, userEnrolledCourses]);

  return (
    <>
      <div className={styles.title}>
        <div className={styles.subtitle}>
          <div className={styles.detail}>
            {/* <span>
              <FaStar fill="rgb(226, 194, 12)" />
              <FaStar fill="rgb(226, 194, 12)" />
              <FaStar fill="rgb(226, 194, 12)" />
              <FaStar fill="rgb(226, 194, 12)" />
              <FaStar fill="rgb(226, 194, 12)" />
            </span> */}
            <h3>{courseData?.courseTitle}</h3>
            <p>
              Categories: <span>{courseData?.category}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="DecFinanceDetails">
        <div className="sub-DecFinanceDetails">
          <div className="main-detail">
            <div className="img-div">
              {courseData ? (
                <img src={courseData?.courseImage ?? "/logo.png"} alt="" />
              ) : (
                <div className="img-div-loader">
                  <svg
                    width="60px"
                    height="60px"
                    viewBox="0 0 50 50"
                    fill="#007bff"
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
                </div>
              )}
            </div>
            <nav>
              <li onClick={() => setIsReviewVisible(false)}>Course Info</li>
              <li onClick={() => setIsReviewVisible(true)}>Reviews</li>
            </nav>

            {!isReviewVisible && (
              // COURSE INFO SECTION
              <div className="course-info" id="info">
                <div className="about">
                  <h1>About Course</h1>
                  <h4>Course Description</h4>
                  <p>{courseData?.courseDescription}</p>
                  <h4>Who This Course is for</h4>
                  {courseData?.audience.map((eachAudienceValue, index) => (
                    <ul key={index}>{eachAudienceValue}</ul>
                  ))}
                </div>
                <div className="gain">
                  <h4>What Will You Learn?</h4>
                  {courseData?.whatToLearn.map(
                    (eachWhatToLearnValue, index) => (
                      <ul key={index}>{eachWhatToLearnValue}</ul>
                    )
                  )}
                </div>
                {/* <div className="course-content">
                  <h4>Course Content</h4>
                  <div className="tutor-according">- course content data</div>
                </div> */}
              </div>
            )}
            {isReviewVisible && (
              // REVIEW SECTION
              <div className="reviews" id="review">
                <h3>Student Ratings & Reviews</h3>
                <div className="chat">
                  <div className="total-rating">
                    <h1>{courseReview.length}</h1>
                    <p>{courseReview.length < 2 ? "rating" : "ratings"}</p>
                    <span>
                      {[
                        ...Array(
                          `${Math.floor(totalRatingSum / courseReviewCount)}`
                        ),
                      ].map((each, index) => (
                        <div key={index} style={{ display: "inline-flex" }}>
                          <FaStar fill="rgb(226, 194, 12)" />
                        </div>
                      ))}
                    </span>
                    {totalRatingSum === 0 ? (
                      <p>0 Ratings</p>
                    ) : (
                      <p>
                        {totalRatingSum / courseReviewCount} average Ratings
                      </p>
                    )}
                  </div>
                  <div className="rating-bar">
                    <div className="column">
                      <div className="star">
                        <span>
                          <FaStar fill="rgb(226, 194, 12)" />
                        </span>
                        <p>5</p>
                      </div>
                      <div className="bar">
                        <div
                          className="prog"
                          style={{ width: bar5 === "NaN%" ? "0%" : bar5 }}
                          // style={{ width: "0%" }}
                        ></div>
                      </div>
                      {/* <div className="rate">
                        <p>5 Rating</p>
                      </div> */}
                    </div>
                    <div className="column">
                      <div className="star">
                        <span>
                          <FaStar fill="rgb(226, 194, 12)" />
                        </span>
                        <p>4</p>
                      </div>
                      <div className="bar">
                        <div
                          className="prog"
                          style={{ width: bar4 === "NaN%" ? "0%" : bar4 }}
                          // style={{ width: "0%" }}
                        ></div>
                      </div>
                      {/* <div className="rate">
                        <p>4 Rating</p>
                      </div> */}
                    </div>
                    <div className="column">
                      <div className="star">
                        <span>
                          <FaStar fill="rgb(226, 194, 12)" />
                        </span>
                        <p>3</p>
                      </div>
                      <div className="bar">
                        <div
                          className="prog"
                          style={{ width: bar3 === "NaN%" ? "0%" : bar3 }}
                        ></div>
                      </div>
                      {/* <div className="rate">
                        <p>3 Rating</p>
                      </div> */}
                    </div>
                    <div className="column">
                      <div className="star">
                        <span>
                          <FaStar fill="rgb(226, 194, 12)" />
                        </span>
                        <p>2</p>
                      </div>
                      <div className="bar">
                        <div
                          className="prog"
                          style={{ width: bar2 === "NaN%" ? "0%" : bar2 }}
                        ></div>
                      </div>
                      {/* <div className="rate">
                        <p>2 Rating</p>
                      </div> */}
                    </div>
                    <div className="column">
                      <div className="star">
                        <span>
                          <FaStar fill="rgb(226, 194, 12)" />
                        </span>
                        <p>1</p>
                      </div>
                      <div className="bar">
                        <div
                          className="prog"
                          style={{ width: bar1 === "NaN%" ? "0%" : bar1 }}
                        ></div>
                      </div>
                      {/* <div className="rate">
                        <p>1 Rating</p>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="wrap">
                  {/* {[...Array(5)].map((eachReview, index) => ( */}
                  {courseReview.map((eachReview, index) => (
                    <StudentRev
                      key={index}
                      name={eachReview.userName}
                      time={eachReview.createdAt}
                      review={eachReview.review}
                      star={eachReview.rating}
                      img={"/avatar.png"}
                      // img={userData.displayPicture}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right hand side */}
          <div className="sub-detail">
            <div className="free">
              <div className="free-head">
                <span>Free</span>

                {/* <Link to={`/class/${courseData?._id}`}> */}

                {courseIsEnrolled ? (
                  <Link to={`/class/${courseData?._id}`}>
                    <button>View course</button>
                  </Link>
                ) : (
                  <button onClick={enrollCourse}>Enroll Now</button>
                )}

                {/* <Link to={token ? `/class/${courseData?._id}` : "/login"}>
                  <button>Enroll Now</button>
                </Link> */}
                <p>You have free access to this course</p>
              </div>
              <div className="free-footer">
                <ul>
                  {/* <li>
                    <span> - level data - Intermediate</span>
                  </li> */}
                  <li>
                    <span> Duration: {courseData?.courseDuration}</span>
                  </li>
                  <li>
                    <span>
                      Last Updated:{" "}
                      {moment(courseData?.updatedAt).format(
                        "DD MMM YYYY, h:mm A"
                      )}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="course-detail">
              <div className="course-top">
                <h3>A course by</h3>
                <div className="profile">
                  <div className="profileImg">
                    <img
                      // src={userData?.displayPicture ?? "/avatar.png"}
                      src={"/avatar.png"}
                      alt=""
                    />
                  </div>
                  <div className="content">
                    <Link to="/Page-Not-Available">
                      {courseData?.publisherName}
                    </Link>
                    <span>{courseData?.category} instructor</span>
                  </div>
                </div>
              </div>
              <div className="course-footer">
                <div className="first">
                  <h3>Material Includes</h3>
                  <ul>
                    {courseData?.materials.map((eachMaterial, index) => (
                      <li key={index}>{eachMaterial}</li>
                    ))}
                  </ul>
                </div>
                <div className="first">
                  <h3>Requirements</h3>
                  <ul>
                    {courseData?.requirement.map((eachRequirement, index) => (
                      <li key={index}>{eachRequirement}</li>
                    ))}
                  </ul>
                </div>
                <div className="first">
                  <h3>Tags</h3>
                  <div className="tags">
                    {courseData?.tags.map((eachTag, index) => (
                      <button key={index}> {eachTag} </button>
                    ))}
                  </div>
                </div>
                {/* <div className="first">
                  <h3>Audience</h3>
                  <ul>
                    <li>
                      Get your team access to top GoLearn courses anytime,
                      anywhere.
                    </li>
                  </ul>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Course;
