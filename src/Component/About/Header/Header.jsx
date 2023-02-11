import React from "react";
import "./Header.css";
const Header = ({ data }) => {
  return (
    <div className="header">
      <div className="sub-header">
        <div className="img-div">
          <img src={data.img} alt="" />
        </div>
        <div className="text-content">
          <h1>{data.title}</h1>
          <p>
            {data.body}
          </p>
          {/* <p>
            At Go-Learn, we believe that flexible and easy to access learning
            opportunities can bring a significant change in how individuals
            prefer to learn! Therefore, we offers you the possibility of earning
            while you enjoy the beauty of eLearning!
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
