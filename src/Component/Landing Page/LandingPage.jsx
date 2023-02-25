import React from "react";
import Head from "./Head/Head";
import Details from "./Details/Details";
import PupCourse from "./PupCourse/PupCourse";
import Olubori from "./Olubori/Olubori";
import Education from "./Education/Education";
import OnlineBlog from "./OnlineBlog/OnlineBlog";
import FreeAccess from "./FreeAccess/FreeAccess";
import GoAlumni from "./GoAlumni/GoAlumni";
import DistanceLearn from "./DistanceLearn/DistanceLearn";
import Subscribe from "./Subscribe/Subscribe";
import Footer from "./Footer/Footer";
import { useEffect } from "react";
import { useState } from "react";
import MemoryKeys from "../models/MemoryKeys";

function LandingPage() {
  //   const API = "https://golearn.up.railway.app/api/v1/auth/";

  const [landingCourses, setLandingCourses] = useState();

  useEffect(() => {
    /**
     * Fetches courses
     */
    async function fetchCourses() {
      // Try fetching from local storage
      let data = localStorage.getItem(MemoryKeys.Courses);

      // If the data is in local storage...
      if (data && data !== "null" && data !== "undefined") {
        // Extract the data
        let coursesFetched = JSON.parse(data);

        // Store it in state
        setLandingCourses(coursesFetched);

        // Exit this function
        return;
      }

      let result = await fetch("https://golearn.up.railway.app/api/v1/course", {
        method: "get",
        credencials: "include",
      });
      result = await result.json();
  
      const fetchedCourseData = result.data;
  
      localStorage.setItem(MemoryKeys.Courses, JSON.stringify(fetchedCourseData));
    }

    // If we don't have the courses 
    if(!landingCourses) {
      // Fetch courses 
      fetchCourses();
    }
  }, [landingCourses]);

  return (
    <div>
      <Head landingCourses={landingCourses} />
      <Details />
      <PupCourse landingCourses={landingCourses} />
      <Olubori />
      <Education />
      <OnlineBlog />
      <FreeAccess />
      <GoAlumni />
      <DistanceLearn />
      <Subscribe />
      <Footer />
    </div>
  );
}

export default LandingPage;
