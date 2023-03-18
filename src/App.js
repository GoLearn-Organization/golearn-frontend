import React, { useState } from "react";
import './App.css'
import Component from "./Component/Component";


function App() {

  let [courses, setCourses] = useState();

  /**
   * Updates the courses state
   * @param updatedCourses The updated courses
   */
  function updateCourses(updatedCourses) {
      setCourses(updatedCourses);
  }

  return(
    <div className="app">
      <Component updateCourses={updateCourses} courses={courses} />
    </div>
  )
}

export default App;