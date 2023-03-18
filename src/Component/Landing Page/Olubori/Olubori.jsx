import React from "react";
import "./Olubori.css";
import "../OnlineBlog/OnlineBlog.css";
import img from "./img/about-4.jfif";
import { Link } from "react-router-dom";
import MemoryKeys from "../../models/MemoryKeys";
import { PaystackButton } from "react-paystack";

const Olubori = () => {
  // const [message, setMessage] = useState('Verifying payment');

  let token = localStorage.getItem(MemoryKeys.UserToken);
  let islog = token;

  let retrievedCredentials = localStorage.getItem(MemoryKeys.UserCredentials);

  let userCredentials;
  let isSubscribed;

  if (retrievedCredentials !== "undefined" && retrievedCredentials !== null) {
    userCredentials = JSON.parse(retrievedCredentials);

    isSubscribed = userCredentials?.isSubscribed;
  } else {
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
      localStorage.setItem(
        MemoryKeys.UserCredentials,
        JSON.stringify(result.data)
      );
      isSubscribed = result?.data?.isSubscribed;
    };
    handleLogin();
  }

  // let isSubscribed = userCredentials?.isSubscribed;

  // console.log("isSubscribed: ", isSubscribed);

  // async function verifyPayment(reference) {
  //   const config = {
  //     headers: {
  //       "content-Type": "application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //   };

  //   let result = await fetch(
  //     `${process.env.REACT_APP_SERVER_URL}api/v1/user/subscribe/`,
  //     config,
  //     reference,
  //     {
  //       method: "POST",
  //       credencials: "include",
  //     }
  //   );

  //   result = await result.json();

  //   console.log("verify payment result: ", result);

  //   // window.location.href = "/access-payment";
  //   window.location.href = `/access-payment/${generated_ref}`;

  //   // if (result.success) {
  //   //   setMessage('Payment verified. We would redirect you to the homepage in seconds.');
  //   //   window.location.href = "/";
  //   // }
  //   // setMessage('We were unable to verify your payment.');
  // }

  const generated_ref = Math.floor(Math.random() * 1000000000 + 1);

  const componentProps = {
    email: userCredentials?.email,
    amount: 200000, // Given in kobo
    currency: "NGN",
    reference: generated_ref,
    metadata: {
      name: `${userCredentials?.firstName} ${userCredentials?.lastName}`,
    },
    publicKey: `pk_test_0a8ca3b20df9603c66b667419295ee21d6c4dc38`,
    text: "Get Access",
    // onSuccess: () => verifyPayment(generated_ref),
    onSuccess: () =>
      (window.location.href = `/access-payment/${generated_ref}`),
    onClose: () => (window.location.href = "/"), // go back to previous page,
  };

  return (
    <div className="OnlineBlog Online-bori">
      <div className="sub-OnlineBlog sub-Online-bori">
        <div className="OnlineBlog-img-div Sub-Online-img">
          <img src={img} alt="" />
        </div>
        <div className="OnlineBlog-content">
          <span>Cheap access to courses </span>
          <h2>
            {isSubscribed
              ? "You can now Access All Available Courses and Join Premium Community"
              : "Get Access to All Available Courses and Community For 2,000 Naira"}
          </h2>
          {isSubscribed ? (
            <p>
              Congratulations! Your payment of a 2,000 naira has been
              received and you now have access to all our courses for a year.
              You can also log in to our community platform to attend sessions
              on financial management, savings, budgeting, investment
              opportunities, and access our financial planning and budgeting
              templates, as well as information on grants and sponsorships.
              Thank you for your payment and we look forward to seeing you in
              our community!
            </p>
          ) : (
            <p>
              You get a chance to access all our courses for a subscription fee
              of a thousand naira. This thousand naira gives you access to our
              courses for a year. This thousand naira also gives you access to
              the community platform where you get access to sessions on
              financial management, savings, budgeting, investment
              opportunities, financial planning template, budgeting template,
              grants and sponsorships.
            </p>
          )}

          {islog === null ? (
            <Link to="/register">
              <button>Register For Free</button>
            </Link>
          ) : (
            // User is logged in
            // So we check if user subscription status is true to run our condition
            <>
              {isSubscribed ? (
                <Link to="/courses">
                  <button>View courses</button>
                </Link>
              ) : (
                // <Link to={`/access-payment/${generated_ref}`}>
                // <button>Get Access</button>
                <PaystackButton {...componentProps} />
                // </Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Olubori;
