import React, { useState } from "react";
import style from "../../../styles/PopularCoursesSection.module.scss";
import PopularCourseCard from "./PopularCourseCard";

const PopularCourse = ({ landingPageCourses }) => {
  const [isFirstTabVisible, setIsFirstTabVisible] = useState(true);

  // console.log('landingPageCourses: ', landingPageCourses);
  
  let financeCourses = landingPageCourses?.filter(
    (word) => word.category === "Financial Trading" || "Forex"
  );
  
  let skillCourses = landingPageCourses?.filter(
    (word) => word.category === "Personal Development" || "Design and IT"
  );

  // console.log({'financeCourses': financeCourses, "skidllCourses": skillCourses})

  return (
    <div className={style.popularCourseContainer}>
      <div className={style.popularCourseContainer__topArea}>
        <span>Learn at your own pace</span>
        <h2>Go-Learn Popular Courses</h2>
        {/* 28px */}
        <p>
          Explore all our courses and choose the one suitable to your goals and
          start learning with us. We assure you that you will never regret it.
        </p>
      </div>

      <div className={style.popularCourseContainer__filterArea}>
        <span
          className={`${isFirstTabVisible ? style.active : ""}`}
          onClick={() => setIsFirstTabVisible(true)}
        >
          Financial education
        </span>
        <span
          className={`${isFirstTabVisible ? "" : style.active}`}
          onClick={() => setIsFirstTabVisible(false)}
        >
          {/* Skill Acquisition courses */}
          Skill Acquisition
        </span>
        <span
          className={style.indicator}
          style={isFirstTabVisible ? { left: 0 } : { left: "50%" }}
        ></span>
      </div>

      {landingPageCourses && isFirstTabVisible && (
        <div className={style.popularCourseContainer__cardContainer}>
          <PopularCourseCard data={financeCourses && financeCourses[Math.floor(Math.random() * financeCourses.length)]} /> 
          <PopularCourseCard data={financeCourses && financeCourses[Math.floor(Math.random() * financeCourses.length)]} />
          <PopularCourseCard data={financeCourses && financeCourses[Math.floor(Math.random() * financeCourses.length)]} />
        </div>
      )}
      {landingPageCourses && !isFirstTabVisible && (
        <div className={style.popularCourseContainer__cardContainer}>
          <PopularCourseCard data={skillCourses && skillCourses[Math.floor(Math.random() * skillCourses.length)]} /> 
          <PopularCourseCard data={skillCourses && skillCourses[Math.floor(Math.random() * skillCourses.length)]} />
          <PopularCourseCard data={skillCourses && skillCourses[Math.floor(Math.random() * skillCourses.length)]} />
        </div>
      )}
    </div>
  );
};

export default PopularCourse;
