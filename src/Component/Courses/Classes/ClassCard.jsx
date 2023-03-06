import React, { useCallback, useEffect } from "react";
import "./Classes.css";
import profile from "./img/Group 1.png";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { FaStar } from "react-icons/fa";

const ClassCard = (props) => {

  const[publisherImg, setPublisherImg] = useState();
  
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
    if (props && props.data.publisher && !publisherImg) {
      handleFetchPublisher(props.data.publisher);
    }
  }, [props, handleFetchPublisher, publisherImg]);
  
  return (
    <div className="card">
      <div className="img-div">
        <img 
        // src={img} 
        src={`${props.data.courseImage ? `${props.data.courseImage}` : '/logo.png'}`}
        alt="" />
      </div>
      <div className="content-div">
        {/* <span>
          <FaStar fill="#fcb303" />
        </span> */}
        <Link to={`/course/${props.data._id}`}>
          <h3>{props.title}</h3>
        </Link>
        <div className="classDetails">
          <p>{props.time}</p>
          <p>{props.audience}</p>
        </div>
        <div className="author">
          <p>
            By {props.author} in{" "}
            {props.category}{" "}
          </p>
          <Link to="/Page-Not-Available">
            <img src={publisherImg ?? profile} alt="/Page-Not-Available" />
          </Link>
        </div>
      </div>
      <div className="enrol-div">
        {/* <Link to="/DecFinance" state={{ id: props.data }}> */}
        <Link to={`/course/${props.data._id}`}>
          <button>Enroll Course</button>
        </Link>
      </div>
    </div>
  );
};

export default ClassCard;
