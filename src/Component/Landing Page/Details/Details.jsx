import { useEffect } from "react";
import { useState } from "react";
import "./Details.css";

const Details = () => {
  const [enrolledLearnerscount, setEnrolledLearnersCount] = useState(0);
  const [satisfactionRate, setSatisfactionRate] = useState(0);
  const [finishedSessions, setFinishedSessions] = useState(0);
  const [onlineInstructors, setOnlineInstructors] = useState(0);

  const [loadingNumber, setLoadingNumber] = useState(true);
  const [secondLoadingNumber, setSecondLoadingNumber] = useState(true);
  const [thirdLoadingNumber, setThirdLoadingNumber] = useState(true);
  const [fourthLoadingNumber, setFourthLoadingNumber] = useState(true); 

  useEffect(() => {
    const onScroll = () => {
      const enrolledLearners = document.getElementById("enrolled-learners");
      const rect = enrolledLearners.getBoundingClientRect();

      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // Check if the element is visible on the screen
      if (rect.top < windowHeight && rect.bottom >= 0) {
        // Start the animation
        const interval = setInterval(() => {
          setEnrolledLearnersCount((currentCount) => {
            if (currentCount === 115) {
              setLoadingNumber(false);
              clearInterval(interval);
              return 115;
            } else {
              setLoadingNumber(true);
              return currentCount + 1;
            }
          });
        }, 300);
      }
    };

    const onScrollSecond = () => {
      const satisfactionRate = document.getElementById("satisfaction-rate");
      const rect = satisfactionRate.getBoundingClientRect(); 

      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Check if the element is visible on the screen
      if (rect.top < windowHeight && rect.bottom >= 0) {
        // Start the animation
        const interval = setInterval(() => {
            setSatisfactionRate((currentCount) => {
            if (currentCount === 100) {
              setSecondLoadingNumber(false);
              clearInterval(interval);
              return 100;
            } else {
              setSecondLoadingNumber(true);
              return currentCount + 1;
            }
          });
        }, 100);
      }
    };

    const onScrollThird = () => {
      const finishedSessions = document.getElementById("finished-sessions");
      const rect = finishedSessions.getBoundingClientRect();

      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // Check if the element is visible on the screen
      if (rect.top < windowHeight && rect.bottom >= 0) {
        // Start the animation
        const interval = setInterval(() => {
          setFinishedSessions((currentCount) => {
            if (currentCount === 1926) {
              setThirdLoadingNumber(false);
              clearInterval(interval);
              return 1926;
            } else {
              setThirdLoadingNumber(true);
              return currentCount + 1;
            }
          });
        }, 20);
      }
    };

    const onScrollFourth = () => {
      const onlineInstructors = document.getElementById("online-instructors"); 
      const rect = onlineInstructors.getBoundingClientRect();

      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // Check if the element is visible on the screen
      if (rect.top < windowHeight && rect.bottom >= 0) {
        // Start the animation
        const interval = setInterval(() => {
            setOnlineInstructors((currentCount) => {
            if (currentCount === 25) {
              setFourthLoadingNumber(false); 
              clearInterval(interval);
              return 25;
            } else {
              setFourthLoadingNumber(true);
              return currentCount + 1;
            }
          });
        }, 100);
      }
    };


    window.addEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScrollSecond);
    window.addEventListener("scroll", onScrollThird);
    window.addEventListener("scroll", onScrollFourth);

    return () => {
      setLoadingNumber(false);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScrollSecond);
      window.removeEventListener("scroll", onScrollThird);
      window.removeEventListener("scroll", onScrollFourth);
    };
  }, []);

  return (
    <div className="details">
      {/* <div className="sub-details"> */}
      <div className="details-text">
        <span>Distance learning</span>
        <h2>Flexible Study At Your Own Pace, According to Your Own Needs</h2>
        <p>
          With Go-Learn, you can choose to study whenever and wherever you
          choose. Our tutors and course facilitators are experienced
          professionals in their respective fields. Our teaching also means, if
          you travel often or need to relocate, you can continue to study
          wherever you go.
        </p>
      </div>
      <div className="details-box">
        <div className="detail-wrapper">
          <div className="card">
            <h1
              id="enrolled-learners"
              className={loadingNumber && "loadingCounts"}
            >
              {enrolledLearnerscount}
            </h1>
            <p>Enrolled Learners</p>
          </div>
          <div className="card">
            <h1
              id="satisfaction-rate"
              className={secondLoadingNumber && "loadingCounts"}
            >
              {satisfactionRate}%
            </h1>
            <p>Satisfaction Rate</p>
          </div>
        </div>
        <div className="detail-wrapper">
          <div className="card">
            <h1 id="finished-sessions"
              className={thirdLoadingNumber && "loadingCounts"}>{finishedSessions}</h1>
            <p>Finished Sessions</p>
          </div>
          <div className="card">
            <h1 id="online-instructors"
              className={fourthLoadingNumber && "loadingCounts"}>{onlineInstructors}</h1>
            <p>Online Instructors</p>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Details;
