import React from "react";
import "./PupCourse.css";
import prof from "./img/Group 1.png";
import { Link } from "react-router-dom";

const Card = (props) => {
  let data = props.data;
  return (
    <div className="card-wrapper">
      <div className="card">
        <div className="card-img">
          <img
            // src={crypt}
            src={`${data?.courseImage ?? "/logo.png"}`}
            alt=""
          />
        </div>
        <div className="cont">
          <div className="card-prof">
            <img src={prof} alt="" />
            <span>{data?.publisherName}</span>
          </div>
          <div className="card-content">
            <h1>
              <Link to={`/course/${data?._id}`}>{data?.courseTitle}</Link>
            </h1>
            <p>{data?.courseDescription}</p>
          </div>
          {/* <div className="card-bottom">
                        <ul>
                            <li><Link to=""> <BiBookAlt fontSize="20px" color='#007bff' /> Lesson 9</Link></li>
                            <li><Link to=""> <HiUserGroup fontSize="20px" color='#007bff' /> Students 288</Link></li>
                        </ul>
                    </div> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
