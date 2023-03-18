import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import style from "../../../styles/PopularCoursesSection.module.scss";

const PopularCourseCard = () => {

  const [detailsVisibility, setDetailsVisibility] = useState(false);

  
//   <img src={`${data?.courseImage ?? "/logo.png"}`} alt="course cover" />
  
//   <Link to={`/course/${data?._id}`}>

  return (
    <div className={style.eachCard}>
      <Link to="/course">
        <div className={style.eachCard__courseImg}>
          <img src="/cover.jpg" alt="course cover" />
        </div>
      </Link>
      <div className={style.eachCard__top}>
        <div className={style.image}>
          <img src="/avatar.png" alt="" />
        </div>
        <p className={style.tutorName}>Course tutor full name comes</p>
      </div>
      <div className={style.eachCard__courseArea}>
        <Link to="/course">
          <p className={style.courseTitle}>Cryptocurrency course with Xeus oladokun</p>
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
        <div className={style.eachCard__courseInfoContainer}>
          <p className={style.courseInfo}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse
            commodi laudantium nisi fuga earum consectetur optio iure molestiae
            inventore exercitationem quasi corrupti, distinctio aliquam est
            soluta explicabo neque dicta nesciunt. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Eos est quisquam ea eius, voluptatibus
            ex vero quibusdam consequuntur placeat minus. Quae quam enim
            sapiente inventore, temporibus quos non exercitationem vero? Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            voluptatibus repellat ea itaque sapiente, sit dolorem, veritatis
            beatae totam necessitatibus quos. Ullam ratione adipisci ipsa nobis,
            placeat ab obcaecati earum!
          </p>
        </div>
      )}
    </div>
  );
};

export default PopularCourseCard;
