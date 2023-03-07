import React from "react";
import "./Education.css";
// import EducationDetail from '../Data/EducationDetail.json'
import Card from "./Card";
import { MdGroups } from "react-icons/md";
// import { GrMoney } from 'react-icons/gr'
import { FaGlobeAfrica } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";

const Education = () => {
  const dd = [
    {
      icons: <FaGlobeAfrica fontSize="80px" color="#027dff" />,
      title: "Enjoy Learning From Anywhere ",
      content:
        "We are delighted to give you options to enjoy learning from anywhere in the world.",
    },
    {
      icons: <MdGroups fontSize="80px" color="#027dff" />,
      title: "Learn From Industry Experts",
      content:
        "Experienced teachers can assist in learning faster with their best approaches!",
    },
    // {
    //   icons: <GiReceiveMoney fontSize="80px" color="#027dff" />,
    //   title: "Earn Juicy Commission",
    //   content:
    //     "Get familiar with digital and financial literacy skills in your journey of becoming stable",
    // },
    {
      icons: <MdGroups fontSize="80px" color="#027dff" />,
      title: "Learn the Latest Top Skills",
      content:
        "Learning top skills can give you the extra incentive to push your career further.",
    },
  ];

  const Data = dd.map((items, index) => {
    return (
      <Card title={items.title} content={items.content} icons={items.icons}  key={index} />
    );
  });

  return (
    <div className="education">
      <div className="sub-education">
        <div className="education-text">
          <span>Education for everyone</span>
          <h2>Affordable Online Courses and Learning Opportunities​</h2>
          <p>
            Finding your space and utilizing better learning options can result
            in extraordinary achievements better than conventional ways. Enjoy
            the beauty and rewards of eLearning.
          </p>
        </div>
        <div className="education-cards">{Data}</div>
      </div>
    </div>
  );
};

export default Education;
