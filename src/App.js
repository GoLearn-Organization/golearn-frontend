import React, { useState } from "react";
import './App.css'
import Component from "./Component/Component";
// import { NextProgressbarSpinner } from 'nextjs-progressbar-spinner';


function App() {

  let [courses, setCourses] = useState();

  /**
   * Updates the courses state
   * @param updatedCourses The updated courses
   */
  function updateCourses(updatedCourses) {
    setCourses(updatedCourses);
  }


  // const tokenExpirationMiddleware = useCallback(() => {
  //   const token = localStorage.getItem(MemoryKeys.UserToken);
  //   console.log('Token checked');
  //   if (token && isTokenExpired(token)) {
  //     localStorage.removeItem(MemoryKeys.UserToken);
  //   }
  //   // next();
  // }, []);

  // useEffect(() => {
  //   tokenExpirationMiddleware();
  // }, []);


  return (
    <>
      {/* <NextProgressbarSpinner
        NextNProgressProps={{
          color: "#F26528",
        }} /> */}
      <div className="app">
        <Component updateCourses={updateCourses} courses={courses} />
      </div>
    </>
  )
}

export default App;