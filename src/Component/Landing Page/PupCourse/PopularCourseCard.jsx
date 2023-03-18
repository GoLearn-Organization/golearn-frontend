import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import style from "../../../styles/PopularCoursesSection.module.scss";

const PopularCourseCard = ({data}) => {
  const [detailsVisibility, setDetailsVisibility] = useState(false);
  // const [closeCourseInfoElem, setCloseCourseInfoElem] = useState(false);

  //   <img src={`${data?.courseImage ?? "/logo.png"}`} alt="course cover" />

  //   <Link to={`/course/${data?._id}`}>

  // function closeCourseInfo() {
  //   setCloseCourseInfoElem(true);
  //   setTimeout(() => {
  //     setDetailsVisibility(false);
  //   }, 3000);
  // }

  return (
    <div className={style.eachCard}>
      <Link to={`/course/${data?._id}`}>
        <div className={style.eachCard__courseImg}>
          <img src={`${data?.courseImage ?? "/logo.png"}`} alt="course cover" /> 
          {/* <img src="/cover.jpg" alt="course cover" /> */}
        </div>
      </Link>
      <div className={style.eachCard__top}>
        <div className={style.image}>
          <img src={`${data?.publisherImage ?? "/avatar.png"}`} alt="" />
        </div>
        <p className={style.tutorName}>{data?.publisherName}</p>
      </div>
      <div className={style.eachCard__courseArea}>
        <Link to={`/course/${data?._id}`}>
          <p className={style.courseTitle}>
            {data?.courseTitle}
          </p>
        </Link>
        <div
          className={style.viewDetails}
          onClick={() => setDetailsVisibility(!detailsVisibility)}
        >
          View details
          {detailsVisibility ? <FaChevronDown /> : <FaChevronUp />}
        </div>
      </div>
      {detailsVisibility && (
        <div
          className={style.eachCard__courseInfoContainer}
        >
          <p className={style.courseInfo}>
            {data?.courseDescription}
          </p>
        </div>
      )}
    </div>
  );
};

export default PopularCourseCard;
