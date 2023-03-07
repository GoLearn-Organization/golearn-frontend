import React from "react";
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
          <a href="https://t.me/+c6CH6rULbwdIZjc8" target="_blank">
            <button>
              {" "}
              <HiOutlineChatAlt fontSize="20px" /> Join Go-Learn Community
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default GoAlumni;
