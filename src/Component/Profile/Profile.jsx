import React from "react";
import ProfileBody from "./ProfileBody/ProfileBody";
import ProfileTop from "./ProfileTop/ProfileTop";

const Profile = ({setLoginStatus}) => {
  return (
    <>
      <ProfileTop />
      <ProfileBody setLoginStatus={setLoginStatus} />
    </>
  );
};

export default Profile;
