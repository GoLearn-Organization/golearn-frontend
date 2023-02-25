import React, { useCallback } from "react";
import "./Head.css";
import { Link } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import Card from "./Card";
import { useState } from "react";
import { useEffect } from "react";
import MemoryKeys from "../../models/MemoryKeys";

const Head = ({ landingCourses }) => {
  const [tokenAvailability, setTokenAvailability] = useState(false);
  // const [firstDataIsAvailable, setFirstDataIsAvailable] = useState(false);
  // const [secondDataIsAvailable, setSecondDataIsAvailable] = useState(false);

  let course = JSON.parse(localStorage.getItem(MemoryKeys.Courses));

  const [data1, setData1] = useState();
  const [data2, setData2] = useState();

  const fetchCourses = useCallback(async () => {
    let result = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/course`, {
      method: "get",
      credencials: "include",
    });
    result = await result.json();

    const data = result.data;

    // console.log("RESULT: ", data);

    localStorage.setItem(MemoryKeys.Courses, JSON.stringify(data));

    let affliateMarketingCourses = data.filter(
      (word) => word.category === "Affiliate Marketing"
    );
    // let personalDevelopmentCourses = data.filter(
    //   (word) => word.category === "Personal Development"
    // );
    let iTCourses = data.filter((word) => word.category === "Design and IT");

    console.log("filtered courses: ", {
      // "personal development courses": personalDevelopmentCourses,
      "Affiliate Marketing courses": affliateMarketingCourses,
      iTCourses: iTCourses,
    });

    setData1(
      affliateMarketingCourses[
        Math.floor(Math.random() * affliateMarketingCourses.length)
      ]
    );
    setData2(iTCourses[Math.floor(Math.random() * iTCourses.length)]);
  }, []);

  useEffect(() => {
    if (course) {
      // const marketingCourses = course.filter(word => word.category === "Marketing");
      // let personalDevelopmentCourses = course.filter(
      //   (word) => word.category === "Personal Development"
      // );
      let affliateMarketingCourses = course.filter(
        (word) => word.category === "Affiliate Marketing"
      );
      let iTCourses = course.filter(
        (word) => word.category === "Design and IT"
      );

      console.log("filtered courses: ", {
        "Affiliate Marketing courses": affliateMarketingCourses,
        iTCourses: iTCourses,
      });

      if (!data1 && !data2) {
        setData1(
          affliateMarketingCourses[
            Math.floor(Math.random() * affliateMarketingCourses.length)
          ]
        );

        setData2(iTCourses[Math.floor(Math.random() * iTCourses.length)]);
        // console.log("data: ", { "Data 1": data1, "Data 2 ": data2 });
        return;
      }

      if (!data1) {
        setData1(
          affliateMarketingCourses[
            Math.floor(Math.random() * affliateMarketingCourses.length)
          ]
        );

        // console.log("Data 1 set: ", { "Data": data1,});
        return;
      }

      if (!data2) {
        setData2(iTCourses[Math.floor(Math.random() * iTCourses.length)]);

        // console.log("Data 2 set: ", { "Data": data1,});
        return;
      }
    }
  }, [course, data1, data2]);

  useEffect(() => {
    if (!course) {
      fetchCourses();
    }
  }, [course, fetchCourses]);

  // useeffect hook to get token from localStorage and set token availability
  useEffect(() => {
    const token = localStorage.getItem(MemoryKeys.UserToken);
    token && setTokenAvailability(true);
  }, []);

  return (
    <div className="head">
      <div className="head-text">
        <h1>Your journey to financial freedom starts from here!</h1>
        {/* <p>
          At Go-Learn we believe that flexible and easy to access learning
          opportunities can bring a significant change in how individuals prefer
          to learn. Therefore, we offer you the beauty of eLearning.
        </p> */}
        <p>
          At Go-Learn, we help people learn the skills they need to improve
          their financial well-being. Whether you're looking to start a new
          career, increase your income, or simply gain financial literacy, we
          have everything you need to succeed.
        </p>
        {tokenAvailability ? (
          <Link to="/courses">
            <button>
              <BsPerson fontSize="20px" /> View Courses
            </button>
          </Link>
        ) : (
          <Link to="/register">
            <button>
              <BsPerson fontSize="20px" /> Join For Free
            </button>
          </Link>
        )}
      </div>
      <div className="head-card">
        <div className="card-wrapper">
          <Card courseData={data1} hideBottomVisibility={true} />
        </div>
        <div className="card-wrapper">
          <Card courseData={data2} hideBottomVisibility={true} />
        </div>
      </div>
    </div>
  );
};

export default Head;
