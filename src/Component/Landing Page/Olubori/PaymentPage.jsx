import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MemoryKeys from "../../models/MemoryKeys";
import "./Olubori.css";

const PaymentPage = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [verificationStatus, setVerificationStatus] = useState();

  //   console.log('id:', id);

  const handleFetcheUserInfo = async () => {
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
  };

  /**
   * Function to verify payment
   */
  const handleVerifyPayment = useCallback(async () => {
    console.log("Verifying your payment");
    localStorage.removeItem(MemoryKeys.UserCredentials);

    let result = await fetch(
      `${process.env.REACT_APP_SERVER_URL}api/v1/user/subscribe/`,
      {
        method: "post",
        body: JSON.stringify({ reference: id }),
        headers: {
          "content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem(MemoryKeys.UserToken),
        },
      }
    );

    result = await result.json();
    console.log("Verify payment result: ", result);

    if (result.success) {
      setVerificationStatus(true);
      await handleFetcheUserInfo();
      setMessage(
        "Payment verified. We would redirect you to the homepage in seconds."
      );

      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } else {
      setVerificationStatus(false);
      setMessage("We were unable to verify your payment.");
    }
  }, [id]);

  useEffect(() => {
    if (!message) {
      handleVerifyPayment();
    }
  }, [message, handleVerifyPayment]);

  return (
    <div className="paymentPageBody">
      {!message && (
        <>
          <span class="loader"></span>
          <h5>Verifying your payment</h5>
        </>
      )}
      {message && (
        <>
          {verificationStatus ? (
            <svg
              width="56"
              height="56"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.1333 18.4001L11.2333 15.5001C10.9889 15.2556 10.6889 15.1334 10.3333 15.1334C9.97777 15.1334 9.66666 15.2667 9.39999 15.5334C9.15555 15.7779 9.03332 16.089 9.03332 16.4667C9.03332 16.8445 9.15555 17.1556 9.39999 17.4001L13.2 21.2001C13.4444 21.4445 13.7555 21.5667 14.1333 21.5667C14.5111 21.5667 14.8222 21.4445 15.0667 21.2001L22.6333 13.6334C22.8778 13.389 23 13.089 23 12.7334C23 12.3779 22.8667 12.0667 22.6 11.8001C22.3555 11.5556 22.0444 11.4334 21.6667 11.4334C21.2889 11.4334 20.9778 11.5556 20.7333 11.8001L14.1333 18.4001ZM16 29.3334C14.1555 29.3334 12.4222 28.9832 10.8 28.2827C9.17777 27.5832 7.76666 26.6334 6.56666 25.4334C5.36666 24.2334 4.41688 22.8223 3.71732 21.2001C3.01688 19.5779 2.66666 17.8445 2.66666 16.0001C2.66666 14.1556 3.01688 12.4223 3.71732 10.8001C4.41688 9.17786 5.36666 7.76675 6.56666 6.56675C7.76666 5.36675 9.17777 4.41653 10.8 3.71608C12.4222 3.01653 14.1555 2.66675 16 2.66675C17.8444 2.66675 19.5778 3.01653 21.2 3.71608C22.8222 4.41653 24.2333 5.36675 25.4333 6.56675C26.6333 7.76675 27.5831 9.17786 28.2827 10.8001C28.9831 12.4223 29.3333 14.1556 29.3333 16.0001C29.3333 17.8445 28.9831 19.5779 28.2827 21.2001C27.5831 22.8223 26.6333 24.2334 25.4333 25.4334C24.2333 26.6334 22.8222 27.5832 21.2 28.2827C19.5778 28.9832 17.8444 29.3334 16 29.3334Z"
                fill="#027dff"
              />
            </svg>
          ) : (
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28 5.25C15.4558 5.25 5.25 15.4558 5.25 28C5.25 40.5442 15.4558 50.75 28 50.75C40.5442 50.75 50.75 40.5442 50.75 28C50.75 15.4558 40.5442 5.25 28 5.25ZM36.237 33.763C36.4064 33.9239 36.5418 34.117 36.6353 34.3311C36.7288 34.5451 36.7785 34.7757 36.7815 35.0093C36.7845 35.2428 36.7407 35.4746 36.6527 35.691C36.5647 35.9074 36.4343 36.1039 36.2691 36.2691C36.1039 36.4343 35.9074 36.5647 35.691 36.6527C35.4746 36.7407 35.2428 36.7845 35.0093 36.7815C34.7757 36.7785 34.5451 36.7288 34.3311 36.6353C34.117 36.5418 33.9239 36.4064 33.763 36.237L28 30.4752L22.237 36.237C21.9062 36.5514 21.4656 36.724 21.0093 36.7182C20.5529 36.7123 20.1169 36.5285 19.7942 36.2058C19.4715 35.8831 19.2877 35.4471 19.2818 34.9907C19.276 34.5344 19.4486 34.0938 19.763 33.763L25.5248 28L19.763 22.237C19.4486 21.9062 19.276 21.4656 19.2818 21.0093C19.2877 20.5529 19.4715 20.1169 19.7942 19.7942C20.1169 19.4715 20.5529 19.2877 21.0093 19.2818C21.4656 19.276 21.9062 19.4486 22.237 19.763L28 25.5248L33.763 19.763C34.0938 19.4486 34.5344 19.276 34.9907 19.2818C35.4471 19.2877 35.8831 19.4715 36.2058 19.7942C36.5285 20.1169 36.7123 20.5529 36.7182 21.0093C36.724 21.4656 36.5514 21.9062 36.237 22.237L30.4752 28L36.237 33.763Z"
                fill="#DC143C"
              />
            </svg>
          )}
        </>
      )}
      <h5>{message}</h5>
    </div>
  );
};

export default PaymentPage;
