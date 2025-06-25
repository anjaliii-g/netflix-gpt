import React from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import {  signOut } from "firebase/auth";

const Header = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
        // An error happened.
      });
  };
  return (
    <div className="absolute w-screen px-16 py-8 z-10 bg-gradient-to-b from-black flex justify-between">
      <img
        className="w-44 "
        src="https://assets.nflxext.com/en_us/layout/ecweb/common/logo-shadow2x.png"
        alt="Netflix Logo"
      />
      <div className="flex">
        <img
          className=" w-12 h-12 p-1 m-1 "
          src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
          alt="Profile logo"
        />
        <button className="text-white font-bold" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Header;
