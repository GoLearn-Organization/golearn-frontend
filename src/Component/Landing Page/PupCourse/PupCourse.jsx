import React, { useCallback, useEffect } from "react";
import "./PupCourse.css";
import Card from "./Card.jsx";
// import ClassesData from '../../Courses/Data/ClassesData'
import { Link } from "react-router-dom";
import { useState } from "react";
import MemoryKeys from "../../models/MemoryKeys";

const PupCourse = ({ landingCourses }) => {
  const [course, setCourse] = useState();

  const fetchCourses = useCallback(async () => {
    if (course) {
      return;
    }

    let result = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/course`,
      {
        method: "get",
        credencials: "include",
      }
    );
    result = await result.json();
    
    const data = result.data;
    
    setCourse(data);

    // console.log("RESULT: ", data);

    localStorage.setItem(MemoryKeys.Courses, JSON.stringify(data));

    data && setCourse(data);
  }, [course]);

  useEffect(() => {
    if (!course) {
      fetchCourses();
    }
    console.log("COURSE DATA: ", course);
  }, [course, fetchCourses]);

  
  let token = localStorage.getItem("goLearn-token");
  let islog = token

  return (
    <div className="pupcourse">
      <div className="sub-pupcourse">
        <div className="pupcourse-top-text">
          <span>Learn At Your Own Pace</span>
          <h2>Go-Learn Popular Courses</h2>
          <p>
            Explore all our courses and choose the one suitable to your goals
            and start learning with us. We assure you that you will never regret
            it.
          </p>
        </div>
        {course && (
          <div className="wrapper">
            <Card data={course[2]} />
            <Card data={course[3]} />
            <Card data={course[4]} />
          </div>
        )}
        <div className="pupcourse-bottom-text">
          <p>
            Enjoy top notch learning methods and achieve next level skills. You
            are the creator of your own career and we will guide you through it.
            <Link to="/register"> Register Free Now!</Link>{" "}
          </p>
          {islog === null ? <Link to="/register"><button>VIEW MORE COURSES</button></Link> : <Link to="/courses"><button>VIEW MORE COURSES</button></Link>}
        </div>
      </div>
    </div>
  );
};

export default PupCourse;
