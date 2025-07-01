import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const name = useRef(null);
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    //validate the form data
    console.log(email.current.value);
    console.log(password.current.value);
    const message = checkValidData(email.current.value, password.current.value);

    setErrorMessage(message);
    if (message) return; 
    
      //sign in/ sign up
      if (!isSignIn) {
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            updateProfile(user, {
              displayName: name.current.value,
              photoURL: "https://avatars.githubusercontent.com/u/174245251?s=400&u=5a71902faa47d0d2cba3d88739d159343b0f2694&v=4",
            })
              .then(() => {
                 const { uid, email, displayName, photoURL } = auth.currentUser; //when state chnages, we get the updated
                        dispatch(
                          addUser({
                            uid: uid,
                            email: email,
                            displayName: displayName,
                            photoURL: photoURL,
                          })
                        );
                navigate("/browse")
              })
              .catch((error) => {
                setErrorMessage(error.message);
              });

            // console.log(user);
            // navigate("/browse");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
            // ..
          });
      } else {
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/browse");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
          });

        //sign in logic
      }
    
  };

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/8200f588-2e93-4c95-8eab-ebba17821657/web/IN-en-20250616-TRIFECTA-perspective_9cbc87b2-d9bb-4fa8-9f8f-a4fe8fc72545_small.jpg"
          alt="Backgorund"
        />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="w-3/12 absolute p-12 bg-black/80 my-24 mx-auto text-white right-0 left-0 rounded-md bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-2 w-full bg-black/70 text-gray-300 rounded-sm border border-gray-400"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email or mobile number"
          className="p-4 my-2 w-full bg-black/70 text-gray-300 rounded-sm border border-gray-400"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full bg-black/70 text-gray-300 rounded-sm border border-gray-400"
        />
        <p className="text-red-500 text-md py-2">{errorMessage}</p>
        <button
          className="my-2 w-full p-2 bg-red-700 rounded-md"
          onClick={handleButtonClick}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignIn}>
          {isSignIn
            ? "New to Netflix? Sign up now!"
            : "Already a user? Sign in!"}
        </p>
      </form>
    </div>
  );
};

export default Login;
