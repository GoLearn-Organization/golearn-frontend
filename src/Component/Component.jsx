import React, { useCallback, useEffect, useState } from "react";
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

function Component() {
  // const API = "https://golearn.up.railway.app/api/v1/auth/";
  console.log('process.env.REACT_APP_SERVER_URL: ', process.env.REACT_APP_SERVER_URL);

  const [loginStatus, setLoginStatus] = useState(false);

  let [savedCourses, setSavedCourses] = useState();

  const fetchCourses = useCallback(async () => {
    if (savedCourses) {
      return;
    }

    let result = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/course`, {
      method: "get",
      credencials: "include",
    });
    result = await result.json();

    const data = result.data;

    // console.log("RESULT: ", data);

    setSavedCourses(data);

    localStorage.setItem(MemoryKeys.Courses, JSON.stringify(data));

    // const savedCoursesArray = savedCourses;

    // console.log("Saved courses: ", savedCoursesArray);
  }, [savedCourses]);

  useEffect(() => {
    const token = window.localStorage.getItem(MemoryKeys.UserToken);
    if (token) {
      setLoginStatus(true);
      console.log("Token retrieved successfully!");

      // Call function to fetch courses if savede courses is nto available
      !savedCourses && fetchCourses();
    } else {
      console.log("Token could not be retrieved!");
      setLoginStatus(false);
    }

    return () => {
      console.log("cleanup");
    };
  }, [savedCourses, fetchCourses]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout loginStatus={loginStatus} />}>
            <Route index path="/" element={<LandingPage />} />
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
            <Route path={`${process.env.REACT_APP_SERVER_URL}resetpassword/:token`} element={<Reset />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Component;
