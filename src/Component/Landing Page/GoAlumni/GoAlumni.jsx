import React from "react";
import { Link } from "react-router-dom";
import "./GoAlumni.css";
import { HiOutlineChatAlt } from "react-icons/hi";

const GoAlumni = () => {
  return (
    <div className="goalumni">
      <div className="sub-goalumni">
        <div className="goalumni-content">
          <span>GoLearn Alumni</span>
          <h2>Join the Go-Learn Community​</h2>
          <p>
            Join our community and get access to sessions on financial
            management, budgeting, financial planning, investment opportunities,
            financial planning template, budgeting template, savings and lots
            more.
          </p>
          <Link to="">
            <button>
              {" "}
              <HiOutlineChatAlt fontSize="20px" /> Join Go-Learn Community
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GoAlumni;
