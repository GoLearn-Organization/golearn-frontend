import React from "react";
// import CourseCard from "./CourseCard/CourseCard";
import Footer from "../Landing Page/Footer/Footer";
import "./instructorProfile.css";
import { useLocation } from 'react-router-dom';
// import { useState } from "react";
// import StarRating from "../StarRating/StarRating";

const InstructorProfile = () => {
      const location = useLocation();
      let data = location.state.id

      console.log(data._id)
      // const [instructCourse, instructCourseFunc] = useState()
      // const handleinstructorCourse = async () => {
      //   let result = await fetch(
      //     `https://golearn.up.railway.app/api/v1/course/publisher/${data._id}`,
      //     {
      //       method: "get",
      //       credencials: "include",
      //       headers: {    
      //           'Accept': 'application/json',
      //           'Content-Type': 'application/json',
      //           'Access-Control-Allow-Origin': '*' },
      //     }
      //   );
      //   result = await result.json();
      //   console.warn(result);
      //   console.log(result);
    
      //   instructCourseFunc(result.data);
      // };

      // console.log(instructCourse);

      // let courses = instructCourse.map((item) =>{
      //   return(
      //     // instructCourse ?
      //     <CourseCard 
      //       courseTitle={item.courseTitle}
      //       publisher={item.publisherName}
      //       duration={item.courseDuration}
      //       data={item}
      //     />
      //     // : <h2>No course</h2>
      //   )
      // })

      // useEffect(() => {
      //   handleinstructorCourse()
      // }, []);

      // localStorage.setItem(

  return (
    <div className="instructorProfile">
      <div className="instructorProfile__profileArea">
        <div className="coverArea">
          <div className="coverArea__instructorImg">
            <img
              src="https://go-learn.online/wp-content/uploads/2021/05/golearn-walter.jpg"
              alt="instructor"
            />
          </div>
          <div className="coverArea__instructorInfo">
            <div className="left">
              <h3>{data.firstName} {data.lastName}</h3>
              <span className="instructorStats">
                <span>{data.email}</span>
                <span>•</span>
                <span>{data.role}</span>
              </span>
            </div>
            <div className="right">
              {/* ⭐⭐⭐⭐⭐ */}
              {/* <StarRating /> */}
              <span className="rating">
                {/* {instructCourse.length > 0 ? instructCourse.length : <h1>No course created.</h1> } Courses  */}
                <span>(11.00)</span>
              </span>
            </div>
          </div>
        </div>
        <div className="bodyArea">
          <div className="bodyArea__biography">
            <h2>Biography</h2>
            <p>
              {/* Walter Nwaugo, also known as traderhack is a stocks, currency and
              cryptocurrency trader, with years of vast experience in trading
              the financial markets. He is an authourity in economics, finance
              and technical analysis. He has a skill in protecting investors and
              taking advantage of the. Walter trades crytocurrencies using
              sophisticated methods and his skill to become a successful trader.
              Having worked with the who is who in the financial sector, which
              has in turn made him a professional much sought after. */}

              {/* {data.firstName} {data.lastName} ({data.userName}) is one of Go-learn {data.role} you can reach out to him at {data.email} */}
            </p>
          </div>
          <div className="bodyArea__courses">
            <h2>Courses</h2>
            <div className="coursesList">
              {/* { courses } */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InstructorProfile;
