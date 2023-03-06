import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footerArea">
      <div className="lines">
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>
      <div className="footerArea__container">
        <div className="content">
          <div className="content__goLearn">
            <h2>GoLearn</h2>
            <p>
              Working to bring significant changes in online-based learning
              platform, GoLearn offers student the unique opportunity of earning
              while they learn a skill.{" "}
            </p>
            <div className="socialIcons">
              <a href="http://twitter.com/Golearn_online?t=rllyy72hOKYBVioXR9b1RQ&s=09"><span>T</span></a>
              <a href="http://www.facebook.com/golearn.online?mibextid=ZbWKwL"><span>F</span></a>
              <a href="http://instagram.com/golearn.online?igshid=NTdIMDg3MTY="><span>I</span></a>
              <a href="http://youtube.com/@Golearnonline"><span>Y</span></a>
            </div>
          </div>
          <div className="content__explore">
            <h2>Explore</h2>
            <ul>
              <li>Home</li>
              <li>About GoLearn</li>
              <li>GoLearn Affiliate</li>
              <li>Blog</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="content__resources">
            <h2>Resources</h2>
            <ul>
              <li>Student Area</li>
              <li>GoLearn Instructors</li>
              <li>Terms & Conditions</li>
              <li>Frequently Asked Questions</li>
            </ul>
          </div>
        </div>
        <div className="bottom">&copy;2022 GoLearn.</div>
      </div>
    </div>
  );
};

export default Footer;
