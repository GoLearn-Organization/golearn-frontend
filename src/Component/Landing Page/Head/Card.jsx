import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiBookAlt } from "react-icons/bi";
import { HiUserGroup } from "react-icons/hi";

const Card = ({ courseData, hideBottomVisibility }) => {

  const [publisherImg, setPublisherImg] = useState();

  courseData && console.log("courseData.publisher: ", courseData.publisher);

  /**
   * Function to get a publisher
   */
  const handleFetchPublisher = useCallback(async (courseId) => {
    let result = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/user/publishers/${courseId}`,
      {
        method: "get",
      }
    );
    result = await result.json();
    console.log(result);
    setPublisherImg(result.data.displayPicture);
  }, []);

  useEffect(() => {
    if (courseData && courseData.publisher && !publisherImg) {
      handleFetchPublisher(courseData.publisher);
    }
  }, [courseData, handleFetchPublisher, publisherImg]);

  return (
    <div className="card">
      <div className="card-img">
        <img
          // src={forex}
          src={`${courseData?.courseImage ?? "/logo.png"}`}
          alt=""
        />
      </div>
      <div className="cont">
        <div className="card-prof">
          <div className="img-area">
            <img
              // src={prof}
              src={`${publisherImg ?? "/logo.png"}`}
              alt=""
            />
          </div>
          <span>
            <Link to="/instructor">{courseData?.publisherName}</Link>
          </span>
        </div>
        <div className="card-content">
          <h1>
            {/* <Link to={token ? `/course/${courseData?._id}` : "/login"}> */}
            <Link to={`/course/${courseData?._id}`}>
              {courseData?.courseTitle}
            </Link>
          </h1>
          <p>{courseData?.courseDescription}</p>
        </div>
        {!hideBottomVisibility && (
          <div className="card-bottom">
            <ul>
              <li>
                <Link to="">
                  {" "}
                  <BiBookAlt fontSize="20px" color="#007bff" /> Lesson 9
                </Link>
              </li>
              <li>
                <Link to="">
                  {" "}
                  <HiUserGroup fontSize="20px" color="#007bff" /> Students 288
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
