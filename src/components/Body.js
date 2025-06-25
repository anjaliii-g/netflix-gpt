import React, { useEffect } from "react";
import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter, useNavigate } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { auth } from "../utils/firebase";

const Body = () => {
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);
  useEffect(() => {
    //we need to set up this kind to listener once
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //signIn/sign up
        const { uid, email, displayName } = user; //when state chnages, we get the updated
        dispatch(addUser({ uid: uid, email: email, displayName: displayName })); //update the appstore
        //navigate("/browse"); //asa use is sign in/signup, we navigate it to home
      } else {
        // User is signed out
        dispatch(removeUser());
        //navigate("/"); //signout will lead to login screen
      }
    });
  }, []);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
