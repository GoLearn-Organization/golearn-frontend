import React from "react";
import { Link } from "react-router-dom";
import { BiBookAlt } from "react-icons/bi";
import { HiUserGroup } from "react-icons/hi";
import prof from "./img/Group 1.png";
import MemoryKeys from "../../models/MemoryKeys";

const Card = ({courseData, hideBottomVisibility}) => {
  // console.log('CARD PROPS: ', {courseData, hideBottomVisibility});
  let token = localStorage.getItem(MemoryKeys.UserToken);
  // console.log('token: ', token);

  return (
    <div className="card">
      <div className="card-img">
        <img 
        // src={forex} 
        src={`${courseData?.courseImage ?? '/logo.png'}`}
        alt="" />
      </div>
      <div className="cont">
        <div className="card-prof">
          <img src={prof} alt="" />
          <span>
            <Link to="/instructor">{courseData?.publisherName}</Link>
          </span>
        </div>
        <div className="card-content">
          <h1>
            <Link to={token ? `/course/${courseData?._id}` : '/login'}>
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