import React from "react";
import "./Subscribe.css";

const Subscribe = () => {
  return (
    <div className="subscribe">
      <div className="sub-subscribe">
        <div className="content">
          <span>Information on the Go</span>
          <h2>Subscribe to Our Newsletter</h2>
          <p>
            Interested in getting up-to-date information about our offers,
            promotions or perks?
          </p>
          <form action="/Page-Not-Available">
            <input
              type="email"
              required={true}
              placeholder="Enter your email address"
            />
            <button>Subscribe Now</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
