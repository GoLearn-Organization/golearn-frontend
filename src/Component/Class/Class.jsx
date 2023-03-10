import React, { useCallback } from "react";
import "./Class.css";
import Module from "./Card/Module";
import StudentRev from "../Review/StudentRev";
import { useParams } from "react-router-dom";
import MemoryKeys from "../models/MemoryKeys";
import { useState } from "react";
import { useEffect } from "react";

const Class = () => {
  const { id } = useParams();
  let selectedCourseId = id;

  const [courseData, setCourseData] = useState();
  const [courseContent, setCourseContent] = useState([]);
  const [isCourseContentFetched, setIsCourseContentFetched] = useState(false);

  /**
   * Function to get course data
   */
  const handleGetCourseInfo = useCallback(async () => {
    if (courseData) {
      return;
    }

    localStorage.removeItem(MemoryKeys.SelectedCourseContent);

    let result = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/course/${selectedCourseId}`,
      {
        method: "get",
      }
    );
    result = await result.json();
    console.log("Selected course info: ", result);
    setCourseData(result.data);
    localStorage.setItem(
      MemoryKeys.SelectedCourseContent,
      JSON.stringify(result.data.courseContent)
    );
  }, [courseData, selectedCourseId]);
  // const handleGetCourseInfo = async () => {
  // };

  useEffect(() => {
    if (!courseData) {
      handleGetCourseInfo();
    }
  }, [courseData, handleGetCourseInfo]);

  useEffect(() => {
    const retrievedCourseContent = localStorage.getItem(
      MemoryKeys.SelectedCourseContent
    );

    const parsedRetrievedCourseContent = JSON.parse(retrievedCourseContent);

    if (
      parsedRetrievedCourseContent &&
      parsedRetrievedCourseContent.length > 1 &&
      courseContent.length < 1
    ) {
      setCourseContent(parsedRetrievedCourseContent);
      setIsCourseContentFetched(true);
      localStorage.removeItem(MemoryKeys.SelectedCourseContent);
      // console.log('retrievedCourseContent: ', retrievedCourseContent);
      // console.log('courseContent: ', courseContent);
      return;
    }

    handleGetCourseInfo();
  }, [handleGetCourseInfo, courseContent]);

  // useEffect(() => {

  // }, [courseDataId]);

  // videos nesting function
  // let videoData = [
  //   "https://www.youtube.com/embed/LRjvSfu0Q1U",
  //   "https://www.youtube.com/embed/BnJ2VW4-DiA",
  //   "https://www.youtube.com/embed/xDBW8qWPkdc",
  //   "https://www.youtube.com/embed/qXCmc_wVA1o",
  //   "https://www.youtube.com/embed/RrnSHm6Lh4c",
  //   "https://www.youtube.com/embed/gTtGWH8EJfA",
  // ];
  const [videoData, setVideoData] = useState();

  useEffect(() => {
    const extract = courseContent.flatMap(({ content, youtube }) => [
      content,
      youtube,
    ]);
    const undefinedExtract = extract.filter((each) => each !== undefined);
    console.log(undefinedExtract);
    setVideoData(undefinedExtract);
  }, [courseContent]);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const currentVideo = videoData && videoData[currentVideoIndex];
  let videoElement;

  if (currentVideo && currentVideo.startsWith("http://res.cloudinary.com")) {
    videoElement = <video src={currentVideo} controls />;
  } else {
    videoElement = (
      // <iframe
      //   src={currentVideo}
      //   title="YouTube video player"
      //   // frameborder="0"
      //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      //   allowFullScreen
      //   style={{ border: "none" }}
      // />
      <iframe
        src={currentVideo}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      />
    );
  }

  const handleNext = () => {
    if (currentVideo === undefined) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoData.length);
  };

  const handlePrevious = () => {
    setCurrentVideoIndex(
      (prevIndex) => (prevIndex - 1 + videoData.length) % videoData.length
    );
  };

  // function ConditionalRenderVideo(array) {
  //   return array.map((element) => {
  //     if (element.includes("cloudinary")) {
  //       return <video src={element} />;
  //     } else if (element.includes("youtube")) {
  //       return (
  //         <iframe
  //           src={element}
  //           title="YouTube video player"
  //           // frameborder="0"
  //           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  //           allowFullScreen
  //           style={{border: 'none'}}
  //         />
  //       );
  //     }
  //   });
  // }

  // const [nextForward, nextForwardFunc] = React.useState(0);
  // function next() {
  //   nextForwardFunc(nextForward + (nextForward <= 4 ? 1 : 0));
  // alert(nextForward)
  // }

  // function backward() {
  //   nextForwardFunc(nextForward - (nextForward >= 1 ? 1 : 0));
  //   // alert(nextForward)
  // }

  // console.log("total length", videoData.length);

  // const mode = ModuleData.map((item) => {
  //   return <Module module={item.module} title={item.title} time={item.time} />;
  // });

  function overview() {
    document.getElementById("overview").style.display = "flex";
    document.getElementById("file").style.display = "none";
    document.getElementById("review").style.display = "none";
    document.getElementById("link1").style.borderBottom = "2px solid #027dff";
    document.getElementById("link2").style.borderBottom =
      "2px solid transparent";
    document.getElementById("link3").style.borderBottom =
      "2px solid transparent";
    document.getElementById("link1").style.color = "#027dff";
    document.getElementById("link2").style.color = "#41454f";
    document.getElementById("link3").style.color = "#41454f";
  }
  function file() {
    document.getElementById("file").style.display = "flex";
    document.getElementById("overview").style.display = "none";
    document.getElementById("review").style.display = "none";
    document.getElementById("link1").style.borderBottom =
      "2px solid transparent";
    document.getElementById("link2").style.borderBottom = "2px solid #027dff";
    document.getElementById("link3").style.borderBottom =
      "2px solid transparent";
    document.getElementById("link1").style.color = "#41454f";
    document.getElementById("link2").style.color = "#027dff";
    document.getElementById("link3").style.color = "#41454f";
  }
  function reviews() {
    document.getElementById("file").style.display = "none";
    document.getElementById("overview").style.display = "none";
    document.getElementById("review").style.display = "flex";
    document.getElementById("link1").style.borderBottom =
      "2px solid transparent";
    document.getElementById("link2").style.borderBottom =
      "2px solid transparent";
    document.getElementById("link3").style.borderBottom = "2px solid #027dff";
    document.getElementById("link1").style.color = "#41454f";
    document.getElementById("link2").style.color = "#41454f";
    document.getElementById("link3").style.color = "#027dff";
  }

  const [revew, refunct] = React.useState([]);

  const handlerev = useCallback(async () => {
    if (revew) {
      return;
    }
    let result = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/course/${selectedCourseId}/reviews`,
      {
        method: "get",
      }
    );
    result = await result.json();
    // console.log(result)

    refunct(result.data);
  }, [revew, selectedCourseId]);

  let [pup, pupf] = React.useState("");
  let [review, refunc] = React.useState("");
  let [rating, rafunc] = React.useState("");

  const handlereview = async (e) => {
    e.preventDefault();
    let result2 = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/course/${selectedCourseId}/reviews`,
      {
        method: "post",
        body: JSON.stringify({ review, rating }),
        headers: {
          "content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem(MemoryKeys.UserToken),
        },
      }
    );
    result2 = await result2.json();
    console.warn(result2);
    console.log(result2);

    if (result2.success === true) {
      pupf(
        "Review created!"
        // "You just created a review " +
        //   result2.data.review +
        //   " rated " +
        //   result2.data.raing || result2.error
      );
    } else {
      pupf(result2.error);
    }

    handlerev();
  };

  useEffect(() => {
    if (!revew) {
      handlerev();
    }
  }, [revew, handlerev]);

  useEffect(() => {
    if (!courseContent) {
    }
  }, [courseContent]);

  if (rating > 5) {
    rating = 5;
  } else if (rating < 0) {
    rating = 0;
  }

  const rev = revew.map((item) => {
    return (
      <StudentRev
        key={item._id}
        name={item.userName}
        time={item.createdAt}
        review={item.review}
        star={item.rating}
      />
    );
  });

  const materialsList = courseData?.materials.map((item, index) => {
    return (
      <a href={item} target="_blank" rel="noreferrer" key={index}>
        {item}
      </a>
    );
  });

  // const courseId = selectedCourseId;

  // const handleCart = async (e) => {
  //   e.preventDefault();
  //   let result = await fetch("`https://golearn.up.railway.app/api/v1/cart", {
  //     method: "post",
  //     credencials: "include",
  //     body: JSON.stringify(courseId),
  //     headers: {
  //       "content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem(MemoryKeys.UserToken),
  //     },
  //   });
  //   result = await result.json();
  //   console.warn(result);
  //   console.log(result);
  // };

  return (
    <div className="class">
      <div className="sub-class">
        <div className="content">
          <div className="content-head">
            <span>Course Content</span>
          </div>
          {/* {mode} */}
          {courseContent.map((each, index) => (
            <Module
              module={`Module ${'0' + (index + 1)}`}
              title={each.title}
              time={each.time}
              setCurrentVideoIndex={setCurrentVideoIndex}
              index={index}
              key={index}
            />
          ))}
          {!isCourseContentFetched && (
            <div className="course-content-loader-container">
              <div className="course-content-loader">
                <svg
                  width="40px"
                  height="40px"
                  viewBox="0 0 50 50"
                  fill="#007bff"
                >
                  <circle cx="25" cy="2.4" r="2.4"></circle>
                  <circle opacity="0.55" cx="25" cy="47.6" r="2.4"></circle>
                  <circle opacity="0.9" cx="13.7" cy="5.4" r="2.4"></circle>
                  <path
                    d="M38.4,43.4 C39,44.5 38.6,46 37.5,46.7 C36.4,47.3 34.9,46.9 34.2,45.8 C33.6,44.7 34,43.2 35.1,42.5 C36.2,41.9 37.7,42.3 38.4,43.4 Z"
                    opacity="0.45"
                  ></path>
                  <path
                    d="M6.6,11.6 C7.7,12.2 8.1,13.7 7.5,14.9 C6.9,16 5.4,16.4 4.2,15.8 C3.1,15.2 2.7,13.7 3.3,12.5 C4,11.3 5.5,11 6.6,11.6 Z"
                    opacity="0.8"
                  ></path>
                  <path
                    d="M45.8,34.2 C46.9,34.8 47.3,36.3 46.7,37.5 C46.1,38.6 44.6,39 43.4,38.4 C42.3,37.8 41.9,36.3 42.5,35.1 C43.1,34 44.6,33.5 45.8,34.2 Z"
                    opacity="0.35"
                  ></path>
                  <circle opacity="0.7" cx="2.4" cy="25" r="2.4"></circle>
                  <circle opacity="0.2" cx="47.6" cy="25" r="2.4"></circle>
                  <path
                    d="M4.2,34.2 C5.3,33.6 6.8,34 7.5,35.1 C8.1,36.2 7.7,37.7 6.6,38.4 C5.5,39 4,38.6 3.3,37.5 C2.6,36.4 3.1,34.9 4.2,34.2 Z"
                    opacity="0.65"
                  ></path>
                  <path
                    d="M43.4,11.6 C44.5,11 46,11.4 46.7,12.5 C47.3,13.6 46.9,15.1 45.8,15.8 C44.7,16.4 43.2,16 42.5,14.9 C41.9,13.8 42.3,12.3 43.4,11.6 Z"
                    opacity="0.1"
                  ></path>
                  <path
                    d="M11.6,43.4 C12.2,42.3 13.7,41.9 14.9,42.5 C16,43.1 16.4,44.6 15.8,45.8 C15.2,46.9 13.7,47.3 12.5,46.7 C11.4,46 11,44.5 11.6,43.4 Z"
                    opacity="0.6"
                  ></path>
                  <path
                    d="M34.2,4.2 C34.8,3.1 36.3,2.7 37.5,3.3 C38.6,3.9 39,5.4 38.4,6.6 C37.8,7.7 36.3,8.1 35.1,7.5 C34,6.9 33.5,5.4 34.2,4.2 Z"
                    fill="#212120"
                  ></path>
                </svg>
                <p>Loading course contents</p>
              </div>
            </div>
          )}
          {isCourseContentFetched &&
            courseContent.length < 1 &&
            "No course content was added for this course"}
        </div>
        <div className="video">
          <div className="video-head">
            <div className="first">
              <p>{courseData?.courseTitle}</p>
            </div>
            <div className="second">
              {/* <span>Your Progress: 0 of 11 (0%)</span> */}
              {/* <button onClick={handleCart}>Add to profile</button> */}
            </div>
          </div>
          {videoData && videoElement}
          {/* {videoData && <iframe
            src={videoData[nextForward]}
            title="YouTube video player"
            // frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{border: 'none'}}
          />} */}
          <div className="course-details">
            <ul>
              <li id="link1" onClick={overview}>
                Overview
              </li>
              <li id="link2" onClick={file}>
                Exercise Files
              </li>
              <li id="link3" onClick={reviews}>
                Drop Review
              </li>
            </ul>
            <div className="course-content">
              <div className="control">
                <button onClick={handlePrevious}>Previous</button>
                <button onClick={handleNext}>Next</button>
              </div>
              <div className="overview" id="overview">
                <h2>About Lesson</h2>
                <p>{courseData?.courseDescription}</p>
              </div>
              <div className="file" id="file">
                <h2>Exercise Files</h2>
                {materialsList}
              </div>
              <div className="review" id="review">
                <h2>Your Experience</h2>
                <form onSubmit={handlereview} action="">
                  <textarea
                    value={review}
                    onChange={(e) => refunc(e.target.value)}
                    rows="10"
                    placeholder="Let's know your experience about the course here..."
                  ></textarea>
                  <span id="err">{pup}</span>
                  <input
                    type="number"
                    value={rating}
                    onChange={(e) => rafunc(e.target.value)}
                    id="star"
                    placeholder="rate 0 - 5"
                  />
                  <input type="submit" />
                </form>
                <div className="comments">{rev}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Class;
