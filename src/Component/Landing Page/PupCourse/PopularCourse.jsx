import React, { useState } from "react";
import style from "../../../styles/PopularCoursesSection.module.scss";
import PopularCourseCard from "./PopularCourseCard";

const PopularCourse = () => {
  const [isFirstTabVisible, setIsFirstTabVisible] = useState(false);

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
          Financial literacy
        </span>
        <span
          className={`${isFirstTabVisible ? "" : style.active}`}
          onClick={() => setIsFirstTabVisible(false)}
        >
          Skill Acquisition courses
        </span>
        <span
          className={style.indicator}
          style={isFirstTabVisible ? { left: 0 } : { left: "50%" }}
        ></span>
      </div>

      <div className={style.popularCourseContainer__cardContainer}>
        <PopularCourseCard />
        <PopularCourseCard />
        <PopularCourseCard />
      </div>
    </div>
  );
};

export default PopularCourse;
