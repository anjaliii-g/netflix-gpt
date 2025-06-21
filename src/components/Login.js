import React from "react";
import Header from "./Header";

const Login = () => {
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/8200f588-2e93-4c95-8eab-ebba17821657/web/IN-en-20250616-TRIFECTA-perspective_9cbc87b2-d9bb-4fa8-9f8f-a4fe8fc72545_small.jpg"
          alt="Backgorund"
        />
      </div>
      <form className="w-3/12 absolute p-12 bg-black/80 my-24 mx-auto text-white right-0 left-0 rounded-md bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">Sign In</h1>
        <input
          type="text"
          placeholder="Email or mobile number"
          className="p-4 my-2 w-full bg-black/70 text-gray-300 rounded-sm border border-gray-400"
        />
        <input

          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full bg-black/70 text-gray-300 rounded-sm border border-gray-400"
        />
        <button className="my-2 w-full p-2 bg-red-700 rounded-md">
          Sign In
        </button>
        <p className="py-4">New to Netflix? Sign Up Now</p>
      </form>
    </div>
  );
};

export default Login;
