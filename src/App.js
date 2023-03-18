import React, { useState } from "react";
import './App.css'
import Component from "./Component/Component";


function App() {

  let [courses, setCourses] = useState();

  return(
    <div className="app">
      <Component courses={courses} setCourses={setCourses} />
    </div>
  )
}

export default App;