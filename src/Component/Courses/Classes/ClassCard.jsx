import React from "react";
import "./Classes.css";
import profile from "./img/Group 1.png";
import { Link } from "react-router-dom";
// import { FaStar } from "react-icons/fa";

const ClassCard = (props) => {
  
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
            By <Link to="/construction">{props.author}</Link> in{" "}
            <Link to="/construction">{props.category}</Link>{" "}
          </p>
          <Link to="/construction">
            <img src={profile} alt="/construction" />
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
