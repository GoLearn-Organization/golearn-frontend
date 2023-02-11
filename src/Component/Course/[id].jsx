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

const Course = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState();
  const [courseReview, setCoureReview] = useState([]);
  const [courseReviewCount, setCourseReviewCount] = useState();
  const [coureReviewFetched, setCoureReviewFetched] = useState(false);
  const [isReviewVisible, setIsReviewVisible] = useState(false);
  const [userData, setUserData] = useState();

  /**
   * Function to get course data
   */
  const handleGetCourseInfo = useCallback(async () => {
    if (courseData) {
      return;
    }

    let result = await fetch(
      `https://golearn.up.railway.app/api/v1/course/${id}`,
      {
        method: "get",
      }
    );
    result = await result.json();
    console.log("Course info: ", result);
    setCourseData(result.data);
    localStorage.setItem(MemoryKeys.SelectedCourseId, id);
  }, [courseData, id]);

  /**
   * Function to get course review(s)
   */
  const handleCourseReview = useCallback(async () => {
    if (coureReviewFetched) {
      return;
    }

    let result = await fetch(
      `https://golearn.up.railway.app/api/v1/course/${id}/reviews`,
      {
        method: "get",
      }
    );
    result = await result.json();
    console.log("Course reviews: ", result);

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

  /**
   * Function to get user info
   */
  const handleUserInfoRetrieval = async () => {
    const token = localStorage.getItem(MemoryKeys.UserToken);
    console.log(token);

    const config = {
      headers: {
        "content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    let result = await fetch(
      "https://golearn.up.railway.app/api/v1/auth",
      config,
      {
        method: "get",
        credencials: "include",
      }
    );
    result = await result.json();
    console.log("User info: ", result);

    setUserData(result.data);

    localStorage.setItem(
      MemoryKeys.UserCredentials,
      JSON.stringify(result.data)
    );
  };

  useEffect(() => {
    if (!courseData) {
      handleGetCourseInfo();
    }
  }, [courseData, handleGetCourseInfo]);

  useEffect(() => {
    if (courseReview.length < 1 && !coureReviewFetched) {
      handleCourseReview();
    }
  }, [courseReview, coureReviewFetched, handleCourseReview]);

  useEffect(() => {
    if (!userData) {
      handleUserInfoRetrieval();
    }
  }, [userData]);

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
              <img src={courseData?.courseImage ?? "/logo.png"} alt="" />
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
                <div className="course-content">
                  <h4>Course Content</h4>
                  <div className="tutor-according">- course content data</div>
                </div>
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
                      img={userData.displayPicture}
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
                {/* <Link to="/class" state={{ id: data }}> */}
                {/* <Link to="/class"> */}
                <Link to={`/class/${courseData?._id}`}>
                  <button>Enroll Now</button>
                </Link>
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
                      src={userData?.displayPicture ?? "/avatar.png"}
                      alt=""
                    />
                  </div>
                  <div className="content">
                    <Link to="/construction">{courseData?.publisherName}</Link>
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

// export default Course;

// export const getServerSideProps = async ({ params }) => {
//   const res = await axios.get(
//     `https://golearn.up.railway.app/api/v1/course/${params.id}`
//   );
//   return {
//     props: {
//       pizza: res.data,
//     },
//   };
// };

export default Course;
