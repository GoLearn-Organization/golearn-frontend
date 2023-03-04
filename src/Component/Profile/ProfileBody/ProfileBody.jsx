import React, { useCallback } from "react";
import "./ProfileBody.css";
import img from "./img/Group 1.png";

import { useEffect } from "react";
import { GiBookmarklet, GiNotebook } from "react-icons/gi";
import { RiBookmark3Fill, RiEditCircleFill } from "react-icons/ri";
import { SlOptionsVertical } from "react-icons/sl";
import { useState } from "react";
import ProfileCard from "./ProfileCard";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import CourseCard from "../../InstructorProfile/CourseCard/CourseCard";
import { BsPlus } from "react-icons/bs";
import MemoryKeys from "../../models/MemoryKeys";

const ProfileBody = ({ setLoginStatus }) => {
  let [savedCourses, setSavedCourses] = React.useState([]);

  const [editProfilePicture, setEditProfilePicture] = useState(false);

  const fetchCourses = async () => {
    let result = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/course`,
      {
        method: "get",
        mode: "cors",
        credencials: "include",
      }
    );
    result = await result.json();

    const data = result.data;

    setSavedCourses(data);

    localStorage.setItem(MemoryKeys.Courses, JSON.stringify(data));

    // console.log("RESULT: ", data);
  };

  const savedCoursesArray = savedCourses;
  if (savedCoursesArray && savedCoursesArray !== []) {
    localStorage.setItem(MemoryKeys.Courses, JSON.stringify(savedCoursesArray));
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  // fetching user data and also sending a unique token to the header

  const [det, effunc] = React.useState("");

  const handleLogin = async () => {
    const config = {
      headers: {
        "content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(MemoryKeys.UserToken),
      },
    };
    let result = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/auth`,
      config,
      {
        method: "get",
        credencials: "include",
      }
    );
    result = await result.json();
    // console.warn(result);
    console.log(result);
    effunc(result.data);
    localStorage.setItem(
      MemoryKeys.UserCredentials,
      JSON.stringify(result.data)
    );
  };

  const [cart, cartfunc] = React.useState([]);
  const handlecart = async () => {
    console.log(`Fetching user's courses in cart`);

    const config = {
      headers: {
        "content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(MemoryKeys.UserToken),
      },
    };

    let result = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/cart`,
      config,
      {
        method: "get",
        credencials: "include",
      }
    );
    result = await result.json();
    console.warn(result);
    console.log(result);
    if (result.success) {
      cartfunc(result.data.course);
    }

    // cartAvailability = true;
  };

  const carts = cart.map((item, index) => {
    return (
      <ProfileCard
        titleValue={item.courseTitle}
        dta={item.courseId}
        data={item}
        key={index}
      />
    );
  });

  let [pup, pupfunc] = React.useState(true);
  // let [selectedCourse, setSelectedCourse] = React.useState();

  function pupF() {
    pupfunc(!pup);
  }

  // let instructCourseAvailability = false;
  const [instructCourse, instructCourseFunc] = useState([]);
  const [instructorError, instructorErrorFunc] = useState([]);

  const handleinstructorCourse = useCallback(async () => {
    console.log("Fetching instructor courses");
    let retrievedCredentials = JSON.parse(
      localStorage.getItem(MemoryKeys.UserCredentials)
    );
    let userId;

    if (
      retrievedCredentials &&
      retrievedCredentials != null &&
      retrievedCredentials !== undefined
    ) {
      userId = retrievedCredentials._id;
    } else {
      if (!det) {
        handleLogin();
      }
      userId = det._id;
    }

    let result = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/course/publisher/${userId}`,
      {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    result = await result.json();
    console.log("courses", result);

    result.data && instructCourseFunc(result.data);
    !result.data && instructorErrorFunc(result);
  }, [det]);

  const courseCreatedCard = instructCourse.map((item, index) => {
    return (
      <CourseCard
        id={item._id}
        courseTitle={item.courseTitle}
        publisher={item.publisherName}
        duration={item.courseDuration}
        icon={<SlOptionsVertical />}
        handleinstructorCourse={handleinstructorCourse}
        data={item}
        del={pupF}
        key={index}
      />
    );
  });

  useEffect(() => {
    let userDetails = localStorage.getItem(MemoryKeys.UserCredentials);
    if (userDetails) {
      if (userDetails === null || userDetails === undefined) {
        console.log("Parsed: ", JSON.parse(userDetails));
        effunc(JSON.parse(userDetails));
        return;
      }
      handleLogin();
      return;
    }

    handleLogin();
  }, []);

  useEffect(() => {
    // if(det) {
    //   det.role === "user" && handlecart();
    //   det.role === "publisher" && handleinstructorCourse();
    // }
    if (det) {
      if (det.role === "user") {
        handlecart();
        return;
      }
      if (det.role === "publisher" || "admin") {
        handleinstructorCourse();
        return;
      }
    }
  }, [det, handleinstructorCourse]);

  // State that handles course content input
  const [courseContentValuesInput, setCourseContentInput] = useState([
    {
      visibility: true,
    },
  ]);
  const [courseContentInputError, setCourseContentInputError] = useState();

  // State that handles what to learn input
  const [whatToLearnValuesInput, setWhatToLearnInput] = useState([
    {
      visibility: true,
    },
    {
      visibility: false,
    },
    {
      visibility: false,
    },
    {
      visibility: false,
    },
    {
      visibility: false,
    },
  ]);

  // State that handles requirementValues input
  const [requirementValuesInput, setRequirementInput] = useState([
    {
      visibility: true,
    },
    {
      visibility: false,
    },
    {
      visibility: false,
    },
    {
      visibility: false,
    },
    {
      visibility: false,
    },
  ]);

  // State that handles audienceValues input
  const [audienceValuesInput, setAudienceInput] = useState([
    {
      visibility: true,
    },
    {
      visibility: false,
    },
    {
      visibility: false,
    },
    {
      visibility: false,
    },
    {
      visibility: false,
    },
  ]);

  // State that handles materialsValues input
  const [materialsValuesInput, setMaterialsInput] = useState([
    {
      visibility: true,
    },
    {
      visibility: false,
    },
    {
      visibility: false,
    },
    {
      visibility: false,
    },
    {
      visibility: false,
    },
  ]);

  // State that handles tags input
  const [tagsInput, setTagsInput] = useState([
    {
      visibility: true,
    },
    {
      visibility: false,
    },
    {
      visibility: false,
    },
    {
      visibility: false,
    },
    {
      visibility: false,
    },
  ]);

  const [isVideoCourseContentUploadType, setIsVideoCourseContentUploadType] =
    useState(true);

  let [publisherName, setPublisherName] = React.useState("");
  let [courseTitle, ctfunc] = React.useState("");
  let [courseDescription, codfunc] = React.useState("");
  let [courseDuration, cdfunc] = React.useState("");
  let [category, cafunc] = React.useState("");
  let [whatToLearnValues, whfunc] = React.useState([]);
  let [requirementValues, refunc] = React.useState([]);
  let [audienceValues, aufunc] = React.useState([]);
  let [materialsValues, mafunc] = React.useState([]);
  let [tag, tafunc] = React.useState([]);

  let [courseContentValues, cofunc] = React.useState([]);
  let [titleValue, titleValuefunc] = React.useState([]);
  let [youtubeValue, youtubeValuefunc] = React.useState([]);

  const whatToLearn = Object.values(whatToLearnValues);
  const requirement = Object.values(requirementValues);
  const audience = Object.values(audienceValues);
  const materials = Object.values(materialsValues);
  const title = Object.values(titleValue);
  const youtube = Object.values(youtubeValue);
  const coursecontent = Object.values(courseContentValues);
  const tags = Object.values(tag);
  const courseContent = title.map((title, index) => ({
    title,
    youtube: youtube[index],
    coursecontent: coursecontent[index],
  }));

  console.log("updated coursecontent: ", courseContent);

  const [courseImage, courseImageFunc] = React.useState(null);

  const [responseMessage, setResponseMessage] = useState();
  const [courseContentResponseMessage, setCourseContentResponseMessage] =
    useState();

  const handleCreateCourse = async (e) => {
    localStorage.removeItem(MemoryKeys.Courses);

    e.preventDefault();
    setCourseContentResponseMessage("");

    document.getElementById("message").style.color = "#007bff";
    setResponseMessage(`${courseTitle} course creation in progress.`);

    // console.log("Form inputs: ", {
    //   courseTitle,
    //   courseDescription,
    //   courseDuration,
    //   category,
    //   whatToLearnValues,
    //   requirementValues,
    //   audienceValues,
    //   materialsValues,

    //   courseContentValues,
    //   content,
    //   whatToLearn,
    //   requirement,
    //   audience,
    // });

    console.log("Form inputs: ", {
      publisherName,
      courseTitle,
      courseDescription,
      courseDuration,
      category,
      whatToLearn,
      requirement,
      audience,
      materials,
      title,
      coursecontent,
      tags,
    });

    // return;

    let result = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/course`,
      {
        method: "post",
        credencials: "include",
        body: JSON.stringify({
          publisherName,
          courseTitle,
          courseDescription,
          courseDuration,
          category,
          whatToLearn,
          requirement,
          audience,
          materials,
          tags,
        }),
        headers: {
          "content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem(MemoryKeys.UserToken),
        },
      }
    );

    result = await result.json();
    console.warn(result);
    console.log(result);
    // createCoufunc(result.data._id);

    if (result.success === true) {
      // Upload course image
      await handleCourseImage(result.data._id);
      // Upload course content
      await handleUploadCourseContent(result.data._id);

      localStorage.removeItem(MemoryKeys.Courses);

      document.getElementById("message").style.color = "green";
      setResponseMessage(
        `You have successfully created ${courseTitle} course.`
      );
      // document.getElementById(
      //   "message"
      // ).innerHTML = `You have successfully created ${courseTitle} course.`;
    } else if (result.success === false) {
      setResponseMessage(
        "An error occured, please fill in all fields, and try again."
      );
      // document.getElementById(
      //   "message"
      // ).innerHTML = `An error occured, please fill in all fields, and try again.`;
      document.getElementById("message").style.color = "red";
    }

    // call handleUploadCourseContent() to update the course (to upload course content and videos) immediately after course is created
    // createCou ? handleUploadCourseContent() : console.log("no course created");
  };

  const handleUploadCourseContent = async (courseId) => {
    console.log({
      "title: ": titleValue,
      "courseContent: ": courseContentValues,
      "youtube: ": youtubeValue,
    });

    document.getElementById("courseContentResponseMessage").style.color =
      "#007bff";
    setCourseContentResponseMessage(
      "Uploading course contents. Please hold on..."
    );

    for (let i = 0; i < courseContent.length; i++) {
      const courseContentData = new FormData();
      courseContentData.append(`title`, titleValue[i]);
      courseContentValues[i] !== undefined &&
        courseContentData.append(`coursecontent`, courseContentValues[i]);
      youtubeValue[i] !== undefined &&
        courseContentData.append(`youtube`, youtubeValue[i]);

      console.log(courseContentData);

      document.getElementById("courseContentResponseMessage").style.color =
        "#007bff";
      i + 1 === courseContent.length - 1
        ? setCourseContentResponseMessage(
            `Uploading course content ${i + 1} now... We're almost done.`
          )
        : setCourseContentResponseMessage(
            `Uploading course content ${i + 1} now... This shouldn't take long.`
          );

      let result = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/course/uploadcontent/${courseId}`,
        {
          method: "post",
          credencials: "include",
          body: courseContentData,
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem(MemoryKeys.UserToken),
          },
        }
      );
      result = await result.json();
      console.warn(result);
      console.log(result);
      if (result.success) {
        document.getElementById("courseContentResponseMessage").style.color =
          "green";

        i + 1 === courseContent.length
          ? setCourseContentResponseMessage(`All course contents uploaded!.`)
          : setCourseContentResponseMessage(
              `Course content ${i + 1} uploaded!`
            );
        fetchCourses();
        course();
      } else {
        document.getElementById("courseContentResponseMessage").style.color =
          "red";
        setCourseContentResponseMessage("Course content upload failed");
        return false;
      }
    }
  };

  const handleCourseImage = async (courseId) => {
    console.log("Image file: ", coverImageFile);
    courseImageFunc(!courseImage);

    // const data = new FormData();
    // data.append("File", imageFile);

    const data = new FormData();
    data.append("courseimage", coverImageFile);
    console.log("data: ", data);

    let result = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/course/uploadcourseimage/${courseId}`,
      {
        method: "post",
        credencials: "include",
        body: data,
        headers: {
          Authorization: "Bearer " + localStorage.getItem(MemoryKeys.UserToken),
        },
      }
    );
    console.log("Loading");
    result = await result.json();
    console.warn(result);
    console.log(result);
    console.log("DATA: ", data);

    handleLogin();
    // console.log(displaypicture);
  };

  function dashboard() {
    document.getElementById("dashboard").style.display = "flex";
    document.getElementById("profile").style.display = "none";
    document.getElementById("create").style.display = "none";
    document.getElementById("cart").style.display = "none";
    //   document.getElementById("first").style.backgroundColor = "#007bff";
    //   document.getElementById("first").style.color = "#ffffff";
    //   document.getElementById("second").style.backgroundColor = "transparent";
    //   document.getElementById("sixth").style.backgroundColor = "transparent";
  }

  function profile() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("profile").style.display = "block";
    document.getElementById("create").style.display = "none";
    document.getElementById("cart").style.display = "none";
  }

  function create() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("profile").style.display = "none";
    document.getElementById("create").style.display = "block";
    document.getElementById("cart").style.display = "none";
  }

  function course() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("profile").style.display = "none";
    document.getElementById("create").style.display = "none";
    document.getElementById("cart").style.display = "flex";

    det.role === "publisher" || "admin"
      ? handleinstructorCourse()
      : handlecart();
  }

  /**
   *
   * @param {state name} contentName holds name of the state
   * @param {state function} contentNameFunction holds name of function that sets state
   * @param {nil} temporaryName
   * @returns voids
   */
  function addInputField(contentName, contentNameFunction, temporaryName) {
    // Create loop
    for (let i = 0; i < contentName.length; i++) {
      // If current iteration visibility status is false
      if (!contentName[i].visibility) {
        // Create state instance
        const temporaryName = [...contentName];

        // Set current indec value to true
        temporaryName[i].visibility = true;

        // Set state
        contentNameFunction(temporaryName);

        return;
      }
    }
  }

  /**
   * Function to add new course content field
   */
  function addNewCourseContent() {
    // Set latest input
    const latestTitle = titleValue[courseContentValuesInput.length - 1];
    const latestVideo =
      courseContentValues[courseContentValuesInput.length - 1];
    const latestYoutube = youtubeValue[courseContentValuesInput.length - 1];

    // If the title and video do not have a value
    if (!latestTitle && (!latestVideo || !latestYoutube)) {
      setCourseContentInputError(
        "Fill in complete course content before adding a new one."
      );
      return;
    }

    setCourseContentInputError("");

    // Else, add new visibility status to show next field
    setCourseContentInput([
      ...courseContentValuesInput,
      {
        visibility: true,
      },
    ]);

    console.log(courseContentValuesInput);

    console.log([
      {
        "Title: ": titleValue,
        "youtube: ": youtubeValue,
        "Video: ": courseContentValues,
      },
    ]);
  }

  const navigate = useNavigate();

  /**
   * Function to logout of application
   */
  function logout() {
    // Clear localStorage
    localStorage.clear();

    // Set login status to true
    setLoginStatus(false);

    // Navigate to homepage
    navigate("/login");

    // window.location.reload(true);
  }

  // State that holds display picture info
  const [displaypicture, displaypictureFunc] = React.useState(null);
  const [imageFile, setImageFile] = React.useState(null);

  // State that holds display picture info
  const [coverImage, setCoverImage] = React.useState(null);
  const [coverImageFile, setCoverImageFile] = React.useState(null);

  const handleImageFile = (e) => {
    setImageFile(e.target.files[0]);
    const imgURL = URL.createObjectURL(e.target.files[0]);
    displaypictureFunc(imgURL);
  };

  const handleCoverImageUpload = (e) => {
    setCoverImageFile(e.target.files[0]);
    const imgURL = URL.createObjectURL(e.target.files[0]);
    setCoverImage(imgURL);
  };

  const handleCourseContentUpload = (e) => {
    if (isVideoCourseContentUploadType) {
      // let _courseContentValues = courseContentValues;

      // _courseContentValues.push(e.target.files[0]);

      cofunc([...courseContentValues, e.target.files[0]]);
      youtubeValuefunc([...youtubeValue, undefined]);
      console.log("courseContentValues: ", courseContentValues);

      // const videoURL = URL.createObjectURL(e.target.files[0]);

      // setVideoFiles(videoURL);

      // console.log(courseContentValues);
      return;
    }
    if (!isVideoCourseContentUploadType) {
      /**
       *
       * @param {*} youtubeLink is the sender of the youtube link value
       * @returns the replaced youtube link
       */
      function convertToEmbedLink(youtubeLink) {
        return youtubeLink.replace("youtu.be", "www.youtube.com/embed");
      }

      // Assign the converted link to a variable
      let convertedLink = convertToEmbedLink(e.target.value);

      // Updated the state to save youtube value
      youtubeValuefunc([...youtubeValue, convertedLink]);

      // Set the course content value of that index to undefined
      cofunc([...courseContentValues, undefined]);

      // console.log(youtubeValue);

      return;
    }
  };

  const profilePic = async (e) => {
    e.preventDefault();
    console.log("Image file: ", imageFile);
    displaypictureFunc(!displaypicture);

    // const data = new FormData();
    // data.append("File", imageFile);

    const data = new FormData();
    data.append("displaypicture", imageFile);
    console.log("data: ", data);

    let result = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/uploaddisplaypicture`,
      {
        method: "post",
        credencials: "include",
        // body: JSON.stringify({
        //   data,
        // }),
        body: data,
        headers: {
          Authorization: "Bearer " + localStorage.getItem(MemoryKeys.UserToken),
        },
      }
    );
    console.log("Loading");
    result = await result.json();
    console.warn(result);
    console.log(result);
    console.log("DATA: ", data);

    handleLogin();
    // console.log(displaypicture);
  };

  return (
    <div className="profilebody">
      <div className="sub-profilebody">
        <div className="top">
          <div className="alert">
            {/* <span>Your Application is pending as of 10 September, 2022</span> */}
          </div>
          <div className="profileDetails">
            <div className="img-div">
              <img src={det.displayPicture ?? img} alt="" />
              <span
                style={{ color: "#fff" }}
                onClick={() => setEditProfilePicture(true)}
              >
                <RiEditCircleFill />
              </span>
            </div>
            <div className="text-div">
              <h5>Hello,</h5>
              <h3>
                {det.firstName} {det.lastName}
              </h3>
            </div>
          </div>
        </div>

        <div className="dashboard">
          <div className="dashboard-nav">
            <ul>
              <li onClick={dashboard} id="first">
                <span className="span">Dashboard</span>
              </li>
              <li onClick={profile} id="second">
                <span className="span">My Profile</span>
              </li>
              <li onClick={course}>
                <span className="span">
                  {det.role === "publisher" || "admin"
                    ? "Course Created"
                    : "Enrolled Courses"}
                </span>
              </li>
              {/* <li>
                <span className="span"> {det.role=== "publisher"? "Create Blog" : "Reviews" } </span>
              </li> */}
              <li
                onClick={create}
                style={{
                  display:
                    det.role === "publisher" || "admin" ? "block" : "none",
                }}
              >
                <span className="span">Create Course</span>
              </li>
              {/* <li>
                <span className="span">Settings</span>
              </li> */}
              <li onClick={logout}>
                <span className="span">Logout</span>
              </li>
            </ul>
          </div>
          <div className="dashboard-main" id="dashboard">
            {(!det.displayPicture || editProfilePicture) && (
              <div className="upload">
                {!displaypicture ? (
                  <div className="alert">
                    <span>Set Your Profile Photo</span>
                  </div>
                ) : (
                  <div className="alert">
                    <span>Selected picture:</span>
                    <div className="alert__selectedImage">
                      <img src={displaypicture} alt="selected display" />
                    </div>
                  </div>
                )}

                {displaypicture ? (
                  <button
                    className="uploadPictureBtn"
                    onClick={(e) => profilePic(e)}
                  >
                    Upload picture
                  </button>
                ) : (
                  <button className="uploadPictureBtn">
                    Click Here
                    <input
                      type="file"
                      // onChange={(e) => displaypictureFunc(e.target.files[0])}
                      onChange={(e) => handleImageFile(e)}
                    />
                  </button>
                )}
              </div>
            )}
            <h4>Dashboard</h4>
            <div className="properties">
              <div className="box">
                <div className="img-div">
                  <GiBookmarklet fontSize="55px" color="#027dff" />
                </div>
                <div className="text-div">
                  <h1>
                    {det.role === "publisher" || "admin"
                      ? instructCourse.length
                      : cart.length}
                  </h1>
                  <p>
                    {" "}
                    {det.role === "publisher" || "admin"
                      ? "Course Created "
                      : "Enrolled Courses"}{" "}
                  </p>
                </div>
              </div>
              <div className="box">
                <div className="img-div">
                  <GiNotebook fontSize="55px" color="#027dff" />
                </div>
                <div className="text-div">
                  <h1>{cart.length}</h1>
                  <p>
                    {" "}
                    {det.role === "publisher" || "admin"
                      ? "Created Blogs"
                      : "Active Courses"}
                  </p>
                </div>
              </div>
              <div className="box">
                <div className="img-div">
                  <RiBookmark3Fill fontSize="55px" color="#027dff" />
                </div>
                <div className="text-div">
                  <h1>0</h1>
                  <p>Completed Courses</p>
                </div>
              </div>
            </div>
            {det.role === "user" && (
              <>
                <h4>In Progress Courses</h4>
                <div className="course-progress">
                  {carts && carts.length < 1
                    ? "No enrolled courses yet"
                    : carts}
                </div>
              </>
            )}
          </div>
          <div className="profile" id="profile">
            <div className="data">
              <h2>Profile</h2>
              <ul>
                <li>Registered Date</li>
                <li>{moment(det.createdAt).format("DD MMM YYYY, h:mm A")}</li>
              </ul>
              <ul>
                <li>First Name</li>
                <li>{det.firstName}</li>
              </ul>
              <ul>
                <li>LastName</li>
                <li>{det.lastName}</li>
              </ul>
              <ul>
                <li>UserName</li>
                <li>{det.userName}</li>
              </ul>
              <ul>
                <li>Email</li>
                <li>{det.email}</li>
              </ul>
              {/* <ul>
                <li>Phone Number</li>
                <li>+234 9067925333</li>
              </ul>
              <ul>
                <li>id</li>
                <li>{det._id}</li>
              </ul> */}
              <ul>
                <li>Role</li>
                <li>{det.role}</li>
              </ul>
            </div>
          </div>

          {/* Form begins here */}
          <div className="create-course" id="create">
            <h2>Create Course</h2>
            <form onSubmit={handleCreateCourse} action="">
              <label>
                Publisher's name <span>(First name comes before surname)</span>
              </label>
              <input
                type="text"
                value={publisherName}
                onChange={(e) => setPublisherName(e.target.value)}
              />

              <label>Course Cover image</label>
              <div className="content-upload-area">
                {coverImage ? (
                  <>
                    <div className="selectedImg">
                      <img src={coverImage} alt="selected display" />
                    </div>
                    <button className="changeImg">
                      <input
                        type="file"
                        onChange={(e) => handleCoverImageUpload(e)}
                      />
                      Change image
                    </button>
                  </>
                ) : (
                  <>
                    <p>
                      <BsPlus fontSize={20} /> Tap to upload file
                    </p>
                    <input
                      type="file"
                      onChange={(e) => handleCoverImageUpload(e)}
                    />
                  </>
                )}
              </div>

              <label>Course Title</label>
              <input
                type="text"
                value={courseTitle}
                onChange={(e) => ctfunc(e.target.value)}
              />

              <label>Course Description</label>
              <input
                type="text"
                value={courseDescription}
                onChange={(e) => codfunc(e.target.value)}
              />

              <label>Course Duration</label>
              {/* <input
                type="time"
                value={courseDuration}
                onChange={(e) => cdfunc(e.target.value)}
              /> */}
              <select
                value={courseDuration}
                onChange={(e) => cdfunc(e.target.value)}
              >
                <option value="">Select an option</option>
                <option value="4 hours">4 hours</option>
                <option value="8 hours">8 hours</option>
                <option value="12 hours">12 hours</option>
                <option value="1 day">1 day</option>
              </select>

              {/*
                value={displaypicture}
                onChange={(e) => displaypictureFunc(e.target.value)} */}

              <label>Category</label>
              {/* <input
                type="text"
                value={category}
                onChange={(e) => cafunc(e.target.value)}
              /> */}

              <select value={category} onChange={(e) => cafunc(e.target.value)}>
                <option value="">Select an option</option>
                <option value="Personal Development">
                  Personal Development
                </option>
                <option value="Forex">Forex</option>
                <option value="Affiliate Marketing">Affiliate Marketing</option>
                <option value="Financial Trading">Financial Trading</option>
                <option value="Marketing">Marketing</option>
                <option value="Design and IT">Design and IT</option>
                <option value="Business and management">
                  Business and Management
                </option>
              </select>

              <label>What To Learn</label>
              <div className="array-input">
                <div className="array-input-course-content">
                  {whatToLearnValuesInput.map((eachContent, index) => (
                    <div key={index}>
                      {eachContent.visibility && (
                        <input
                          type="text"
                          value={whatToLearnValues[index]}
                          onChange={(e) =>
                            whfunc({
                              ...whatToLearnValues,
                              [index]: e.target.value,
                            })
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
                {whatToLearnValuesInput[0].visibility && (
                  <span
                    onClick={() =>
                      addInputField(whatToLearnValuesInput, setWhatToLearnInput)
                    }
                  >
                    Add
                  </span>
                )}
              </div>

              <label>Requirement</label>
              <div className="array-input">
                <div className="array-input-course-content">
                  {requirementValuesInput.map((eachContent, index) => (
                    <div key={index}>
                      {eachContent.visibility && (
                        <input
                          type="text"
                          value={requirementValues[index]}
                          onChange={(e) =>
                            refunc({
                              ...requirementValues,
                              [index]: e.target.value,
                            })
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
                {requirementValuesInput[0].visibility && (
                  <span
                    onClick={() =>
                      addInputField(requirementValuesInput, setRequirementInput)
                    }
                  >
                    Add
                  </span>
                )}
              </div>

              <label>Audience</label>
              <div className="array-input">
                <div className="array-input-course-content">
                  {audienceValuesInput.map((eachContent, index) => (
                    <div key={index}>
                      {eachContent.visibility && (
                        <input
                          type="text"
                          value={audienceValues[index]}
                          onChange={(e) =>
                            aufunc({
                              ...audienceValues,
                              [index]: e.target.value,
                            })
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
                {audienceValuesInput[0].visibility && (
                  <span
                    onClick={() =>
                      addInputField(audienceValuesInput, setAudienceInput)
                    }
                  >
                    Add
                  </span>
                )}
              </div>

              <label>Materials</label>
              <div className="array-input">
                <div className="array-input-course-content">
                  {materialsValuesInput.map((eachContent, index) => (
                    <div key={index}>
                      {eachContent.visibility && (
                        <input
                          type="text"
                          value={materialsValues[index]}
                          onChange={(e) =>
                            mafunc({
                              ...materialsValues,
                              [index]: e.target.value,
                            })
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
                {materialsValuesInput[0].visibility && (
                  <span
                    onClick={() =>
                      addInputField(materialsValuesInput, setMaterialsInput)
                    }
                  >
                    Add
                  </span>
                )}
              </div>

              <label>Tags</label>
              <div className="array-input">
                <div className="array-input-course-content">
                  {tagsInput.map((eachContent, index) => (
                    <div key={index}>
                      {eachContent.visibility && (
                        <input
                          type="text"
                          value={tag[index]}
                          onChange={(e) =>
                            tafunc({
                              ...tag,
                              [index]: e.target.value,
                            })
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
                {tagsInput[0].visibility && (
                  <span onClick={() => addInputField(tagsInput, setTagsInput)}>
                    Add
                  </span>
                )}
              </div>

              <div>
                <span className="linksPasteInfo">
                  In case of links upload make sure to paste{" "}
                  <span>(not type)</span> the youtube links
                </span>
                <div className="double-array-input">
                  <div className="each">
                    {/* to upload the course content */}
                    <label>Course Content</label>
                    <div className="array-input-course-content">
                      {courseContentValuesInput.map((eachContent, index) => (
                        <div key={index}>
                          {eachContent.visibility && (
                            <input
                              type="text"
                              value={titleValue[index]}
                              onChange={(e) =>
                                titleValuefunc({
                                  ...titleValue,
                                  [index]: e.target.value,
                                })
                              }
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="each">
                    {/* to upload the course videos (send to the API as "coursecontent") */}
                    <label>Upload Videos / links</label>
                    {/* <div className="array-input"> */}
                    <div>
                      {courseContentValuesInput.map((eachContent, index) => (
                        <div key={index}>
                          {courseContentValuesInput[index].visibility && (
                            <div key={index} className="content-upload-area">
                              {eachContent.visibility &&
                              (courseContentValues[index] ||
                                youtubeValue[index]) ? (
                                // <p>{courseContentValues[index]} uploaded</p>
                                <p>
                                  <p className="uploadedContent">
                                    {youtubeValue[index] ??
                                      courseContentValues[index].name}
                                    {/* {courseContentValues[index].name ??
                                      courseContentValues[index]} */}
                                  </p>
                                  uploaded
                                </p>
                              ) : (
                                // <p>uploaded!</p>
                                <>
                                  {isVideoCourseContentUploadType ? (
                                    <>
                                      <p className="tapArea">
                                        <BsPlus fontSize={20} /> Tap to upload
                                        file
                                        <input
                                          type="file"
                                          value={courseContentValues[index]}
                                          onChange={(e) =>
                                            handleCourseContentUpload(e)
                                          }
                                        />
                                      </p>
                                      <p
                                        className="uploadOptions"
                                        onClick={() =>
                                          setIsVideoCourseContentUploadType(
                                            false
                                          )
                                        }
                                      >
                                        Upload link instead
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <input
                                        type="text"
                                        // value={courseContentValues[index]}
                                        onChange={(e) =>
                                          handleCourseContentUpload(e)
                                        }
                                      />
                                      <p
                                        className="uploadOptions"
                                        onClick={() =>
                                          setIsVideoCourseContentUploadType(
                                            true
                                          )
                                        }
                                      >
                                        Upload video instead
                                      </p>
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p>{courseContentInputError}</p>

                  {courseContentValuesInput[0].visibility && (
                    <span
                      onClick={addNewCourseContent}
                      className="addCourseContent"
                    >
                      Add
                    </span>
                  )}
                </div>
              </div>

              <span id="message">{responseMessage}</span>
              <span id="courseContentResponseMessage">
                {courseContentResponseMessage}
              </span>
              <input type="submit" value="Create" className="submit" />
            </form>
          </div>

          <div
            className="cart"
            id="cart"
            style={{
              justifyContent: instructorError ? "center" : "space-between",
              alignItems: instructorError ? "center" : "flex-start",
            }}
          >
            {det.role === "publisher" || "admin" ? courseCreatedCard : carts}
            {det.role === "user" && carts && carts.length < 1
              ? "No enrolled courses yet"
              : carts}
            <h4
              style={{
                textAlign: "center",
                marginBlockEnd: 0,
                height: "fit-content",
              }}
            >
              {/* {instructCourseAvailability &&
                !instructorError.error &&
                "Loading courses..."} */}
            </h4>
          </div>
          {/* <div
            className="pup-up"
            id="pupUp"
            style={{ display: pup ? "none" : "flex" }}
          >
            <div className="pup-box">
              <h4>
                You're about to delete the following course click CONFIRM to
                delete and CANCEL to abort.
              </h4>
              <div className="button">
                <button onClick={deleteCourse}>Confirm</button>
                <button onClick={pupF}>Cancel</button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileBody;
