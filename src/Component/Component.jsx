import React, { useEffect, useState } from "react";
import LandingPage from "./Landing Page/LandingPage";
import Layout from "./Layout";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import About from "./About/About";
import Blog from "./Blog/Blog";
import Courses from "./Courses/Courses";
import DecFinance from "./DecFinance/DecFinance";
import Contact from "./Contact/Contact";
import Construction from "./Construction";
import Register from "./Register/Register";
import Profile from "./Profile/Profile";
import Login from "./Login/Login";
import Forget from "./ForgetPassword/Forget";
import Reset from "./ResetPassword/Reset";
import Class from "./Class/Class";
import Error from "./ErrorPage/Error";
import InstructorProfile from "./InstructorProfile/InstructorProfile";
import PublisherReg from "./PublisherReg/PublisherReg";
import PaymentPage from "./Landing Page/Olubori/PaymentPage";
import Course from "./Course/[id]";
import MemoryKeys from "./models/MemoryKeys";
import useSWR from "swr";
import Learn from "./Learn";
import ResetPassword from "./ForgetPassword/ResetPassword";

function Component({ updateCourses, courses }) {
  // console.log('process.env.REACT_APP_SERVER_URL: ', process.env.REACT_APP_SERVER_URL);

  const [loginStatus, setLoginStatus] = useState(false);

  /**
   * Fetches courses data
   */
  const fetchCourses = async (url) => {
    let result = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/course`,
      {
        method: "get",
        credencials: "include",
      }
    );
    result = await result.json();

    console.log("data fetched: ", result.data);
    return result.data;
  };

  // The result, loading state and / or error of the fetch result
  const {
    data: fetchedCourses,
    // error,
    // isLoading,
  } = useSWR(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/course`,
    fetchCourses,
    { refreshInterval: 20000, refreshWhenHidden: false }
  );

  // Update courses when courses is updated
  useEffect(() => {
    updateCourses(fetchedCourses);
  }, [fetchedCourses, updateCourses]);

  // function isTokenExpired(token) {
  //   const decodedToken = JSON.parse(atob(token.split(".")[1]));
  //   const expirationTime = decodedToken.exp;
  //   const currentTime = Math.floor(Date.now() / 1000);
  //   return expirationTime < currentTime;
  // }

  
  useEffect(() => {
    const token = window.localStorage.getItem(MemoryKeys.UserToken);

    let decodedToken;

    if(token) {
      decodedToken = JSON.parse(atob(token?.split(".")[1]));
    }
    // const decodedToken = JSON.parse(atob(token?.split(".")[1]));
    const expirationTime = decodedToken?.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    
    // console.log({'expirationTime': expirationTime,'currentTime': currentTime })
    if(expirationTime < currentTime) {
      console.log('Token expired');
      // window.location.href = '/login' ;
      return;
    }

    if (token) {
      setLoginStatus(true);
      console.log("Token retrieved successfully!");
    } else {
      console.log("Token could not be retrieved!");
      setLoginStatus(false);
    }

    return () => {
      console.log("cleanup");
    };
  }, [loginStatus]);


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={<Layout loginStatus={loginStatus} courses={courses} />}
          >
            <Route index path="/" element={<LandingPage courses={courses} />} />
            <Route path="about" element={<About />} />
            <Route path="blog" element={<Blog />} />
            <Route
              path="courses"
              element={<Courses loginStatus={loginStatus} />}
            />
            <Route
              path="DecFinance"
              element={
                loginStatus ? (
                  <DecFinance />
                ) : (
                  <Register setLoginStatus={setLoginStatus} />
                )
              }
            />
            <Route path="contact-us" element={<Contact />} />
            <Route path="instructor" element={<InstructorProfile />} />
            <Route path="Page-Not-Available" element={<Construction />} />
            <Route path="course/:id" element={<Course />} />
            <Route path="learn" element={<Learn courses={courses} />} />
            <Route
              path="register"
              element={<Register setLoginStatus={setLoginStatus} />}
            />
            <Route
              path="profile"
              element={<Profile setLoginStatus={setLoginStatus} />}
            />
            <Route
              path="/login"
              element={<Login setLoginStatus={setLoginStatus} />}
            />
            <Route path="/forget" element={<Forget />} />
            <Route path="class/:id" element={<Class />} />
            <Route path="/publisher" element={<PublisherReg />} />
            <Route path="/access-payment" element={<PaymentPage />} />
            <Route path={`/access-payment/:id`} element={<PaymentPage />} />
            <Route path={`/resetpassword`} element={<ResetPassword />} />
            <Route
              path={`${process.env.REACT_APP_SERVER_URL}resetpassword/:token`}
              element={<Reset />}
            />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Component;
