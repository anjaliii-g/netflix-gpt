import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { auth } from "../utils/firebase";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

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

  useEffect(() => {
    //we need to set up this kind to listener once
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //signIn/sign up
        const { uid, email, displayName, photoURL } = user; //when state chnages, we get the updated
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        ); //update the appstore
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    //unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);
  return (
    <div className="absolute w-screen px-16 py-8 z-10 bg-gradient-to-b from-black flex justify-between">
      <img
        className="w-44 "
        src="https://assets.nflxext.com/en_us/layout/ecweb/common/logo-shadow2x.png"
        alt="Netflix Logo"
      />
      {user && (
        <div className="flex">
          <img
            className=" w-12 h-12 p-1 m-1 "
            src={user?.photoURL}
            alt="Profile logo"
          />
          <button
            className="text-white font-bold cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
