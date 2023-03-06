import React from "react";
import "./ContactBody.css";
import emailjs from "emailjs-com";
import {
  MdOutlineLocationOn,
  MdOutlineMail,
  MdCall,
  MdEventAvailable,
} from "react-icons/md";
import { useState } from "react";

const ContactBody = () => {
  const [messageResponse, setmessageResponse] = useState();

  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_n8u9esj",
        "template_i3u3qxm",
        e.target,
        "kc0dD2RzmpV1gMPY1"
      )
      .then(
        (result) => {
          if (result.status === 200) {
            setmessageResponse("Message sent successfully!");
          } else {
            setmessageResponse("Message could not be sent. Please try again.");
          }
          console.log(result.text);
        },
        (error) => {
          setmessageResponse("Message could not be sent. Please try again.");
          console.log(error.text);
        }
      );
    e.target.reset();
  }

  function closeMessage() {
    setmessageResponse("");
  }
  return (
    <div className="contactbody">
      <div className="sub-contactbody">
        <div className="content-area">
          <span>Contact Details</span>
          <h2>Get in Touch</h2>
          <p>
            Interested in reaching out to us with regards one of our services?
            Or your would like to know more about our affiliate program? Kindly
            send us an email and someone would get in touch as soon as possible.
          </p>
          <ul>
            <li>
              <div className="icon">
                <MdOutlineLocationOn />
              </div>
              <div className="text">
                <h3>Our Address</h3>
                <p>Lekki, Lagos</p>
              </div>
            </li>
            <li>
              <div className="icon">
                <MdOutlineMail />
              </div>
              <div className="text">
                <h3>E-mail</h3>
                <p>
                  Support:{" "}
                  <a href="mailto:hello@ecademy.com">hello@go-learn.oline</a>{" "}
                </p>
                <p>
                  Affiliate:{" "}
                  <a href="mailto:hello@ecademy.com">
                    affiliate@go-learn.online
                  </a>{" "}
                </p>
              </div>
            </li>
            <li>
              <div className="icon">
                <MdCall />
              </div>
              <div className="text">
                <h3>Contact</h3>
                <p>
                  Mobile:{" "}
                  <a href="https://tel:+234-802-156-9242">+234-802-156-9242</a>{" "}
                </p>
                <p>
                  Whatsapp:{" "}
                  <a href="https://tel:+234-802-654-5550">+234-802-654-5550</a>{" "}
                </p>
              </div>
            </li>
            <li>
              <div className="icon">
                <MdEventAvailable />
              </div>
              <div className="text">
                <h3>Hours of Operation</h3>
                <p>Monday - Saturday: 09.00 - 20.00</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="form">
          <h2>Ready to Get Started?</h2>
          <p>
            Your email address will not be published. Required fields are marked
            *
          </p>
          <form onSubmit={sendEmail}>
            <input
              type="text"
              placeholder="Your Name *"
              name="name"
              required
              onClick={closeMessage}
            />
            <input
              type="email"
              placeholder="Your Email Address *"
              name="email"
              required
              onClick={closeMessage}
            />
            <input
              type="text"
              placeholder="Your Subject *"
              name="subject"
              required
              onClick={closeMessage}
            />
            <textarea
              cols="30"
              rows="10"
              placeholder="Write Your Message *"
              name="message"
              required
              onClick={closeMessage}
            ></textarea>
            {/* <small><input type="checkbox" /></small> */}
            <p>{messageResponse}</p>
            <input className="submit" type="submit" value="Send Message" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactBody;
