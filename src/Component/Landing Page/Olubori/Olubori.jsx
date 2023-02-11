import React from "react";
import "./Olubori.css";
import "../OnlineBlog/OnlineBlog.css";
import img from "./img/about-4.jfif";
import { Link } from "react-router-dom";

const Olubori = () => {
  return (
    <div className="OnlineBlog Online-bori">
      <div className="sub-OnlineBlog sub-Online-bori">
        <div className="OnlineBlog-img-div Sub-Online-img">
          <img src={img} alt="" />
        </div>
        <div className="OnlineBlog-content">
          <span>Cheap access to courses </span>
          <h2>
            Get Access to All Available Courses and Community For 1,000 Naira
          </h2>
          <p>
            You get a chance to access all our courses for a subscription fee of
            a thousand naira. This thousand naira gives you access to our
            courses for a year. This thousand naira also gives you access to the
            community platform where you get access to sessions on financial
            management, savings, budgeting, investment opportunities, financial
            planning template, budgeting template, grants and sponsorships.
          </p>
          <Link to="/courses">
            <button>Start For Free</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Olubori;
