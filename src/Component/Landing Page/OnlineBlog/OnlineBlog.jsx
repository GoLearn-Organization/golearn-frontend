import React from "react";
import "./OnlineBlog.css";
import img from "./img/golearn-2.jpg";
import { Link } from "react-router-dom";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import { RiRemoteControlLine } from "react-icons/ri";
import { MdOutlineAccessTime } from "react-icons/md";
//import { GrGrow } from "react-icons/gr";
import { TbPlant } from "react-icons/tb";

const OnlineBlog = () => {

  
  let token = localStorage.getItem("goLearn-token");
  let islog = token
  
  return (
    <div className="OnlineBlog">
      <div className="sub-OnlineBlog">
        <div className="OnlineBlog-img-div">
          <img src={img} alt="" />
        </div>
        <div className="OnlineBlog-content">
          <span>Online Learning</span>
          <h2>
            Develop Your Skills, Learn Something New, and Grow Your Skills From
            Anywhere In the World
          </h2>
          <p>
            At Go-Learn, we understand that online based learning can make a
            significant change to reach students from all over the world. Giving
            options to learn better can always offer the best outcomes.
          </p>
          <div className="online-props">
            <ul>
              <li>
                <span>
                  <FaChalkboardTeacher />
                </span>
                Expert Trainers
              </li>
              <li>
                <span>
                  <MdOutlineAccessTime />
                </span>
                Lifetime Access
              </li>
            </ul>
            <ul>
              <li>
                <span>
                  <RiRemoteControlLine />
                </span>
                Remote Learning
              </li>
              <li>
                <span>
                  {/* <GrGrow stroke="#fff" /> */}
                  <TbPlant />
                </span>
                Self Development
              </li>
            </ul>
          </div>

          {
            islog === null ? 
            <Link to="/register">
            <button>
              <BsFillJournalBookmarkFill fontSize="20px" /> View All Courses
            </button>
          </Link>
            : 
            <Link to="/learn">
            <button>
              <BsFillJournalBookmarkFill fontSize="20px" /> View All Courses
            </button>
          </Link>
          }
        </div>
      </div>
    </div>
  );
};

export default OnlineBlog;
