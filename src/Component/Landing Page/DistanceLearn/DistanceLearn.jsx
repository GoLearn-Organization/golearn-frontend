import React from "react";
import "../OnlineBlog/OnlineBlog.css";
import "./DistanceLearn.css";
import img from "./img/golearn-1.jpg";
import { Link } from "react-router-dom";

const DistanceLearn = () => {

  
  let token = localStorage.getItem("goLearn-token");
  let islog = token
  
  return (
    <div className="OnlineBlog Online-bori">
      <div className="sub-OnlineBlog sub-Online-bori">
        <div className="distance-img-div">
          <img src={img} alt="" />
        </div>
        <div className="OnlineBlog-content">
          <span>Distant Learning</span>
          <h2>Feel Like You Are Attending Your Classes Physically</h2>
          <p>
            Go-Learn training programs can bring you a super exciting experience
            of online learning. You never face any negative experience while
            enjoying your virtual classes in your comfort zone. Our flexible
            learning initiatives will help you to learn better and quicker than
            the traditional ways of learning skills.
          </p>

          {
            islog === null ? 
            <Link to="/register">
              <button>Register Now</button>
            </Link> 
            : 
            <Link to="/learn">
              <button>View Courses</button>
            </Link>
          }
        </div>
      </div>
    </div>
  );
};

export default DistanceLearn;
