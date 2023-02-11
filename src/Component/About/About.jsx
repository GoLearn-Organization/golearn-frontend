import React from "react";
import Header from "./Header/Header";
import Executive from "./Executive/Executive";
// import Details from '../Landing Page/Details/Details';
import Education from "../Landing Page/Education/Education";
import Instructors from "./Instructors/Instructors";
import Affiliate from "./Affiliate/Affiliate";
import picture1 from "./Header/img/about-1.jfif"
import picture2 from "./Header/img/about-2.jpg"

const About = () => {
  const data = [
    {
      img: picture1,
      title: "About Us",
      body: "Go-Learn Limited is an Edutech platform headquartered in Lagos, Nigeria. It was founded by Olubori Paul Kehinde, a 28 year old successful entrepreneur and with full support from his team of successful experts that have gained extensive experience in their niche. Go-Learn is established for young and ambitious individuals willing to learn high-income skills from proven experts with the sole aim to equip young Africans with high-income skills and for poverty alleviation. The platform has since its commencement passed down strategic and transformational learning experiences to students. Founded just over two years ago, Go-Learn has been on an exciting growth path and has plans to grow bigger; the company has been recently projected as the future of edutech in Africa.",
    },
    {
      img: picture2,
      title: "Our Story",
      body: `The journey started in May 2019 when there was a need to create a balance where ambitious individuals can leverage available opportunities by learning high in-demand skills. The goal was to provide people with the tools necessary to engage actively in the wide financial market, where willing individuals would make profitable investments in personal investment by getting equipped with high in-demand skills. Go-Learn commenced by providing a  formalized means of learning with the help of a well-laid-out course curriculum and over 25 professional tutors.
      From inception till date, the Go-Learn platform has completed 1,926 learning sessions, enrolled 3,279 learners, and maintained a 100% satisfaction rate. These statistics have shown how far Go-Learn has helped individuals as the platform provides an avenue of growth for basically everyone due to our programs promoting diversity among all.
      Purpose, they say, is an essential element of everyone and crosses across all disciplines. Go-Learn loves to prove that everyone has a purpose and its learning system is set to professionally unravel the passion and purpose of students through carefully formulated courses.`,
    },
  ];

  return (
    <div>
      {data.map((eachData, index) => (
        <div key={index}>
          <Header data={eachData} />
        </div>
      ))}
      <Executive />
      {/* <Details /> */}
      <Education />
      <Instructors />
      <Affiliate />
    </div>
  );
};

export default About;
