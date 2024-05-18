import React from "react";
import { CommonRoutes } from "../../../../../routes";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div className="w-full h-screen bg-slate-50 flex justify-center items-center">
      <div className="bg-white flex flex-col items-center gap-6 w-[650px] rounded-lg h-fit mx-auto py-10 px-10">
        <input
          type="text"
          placeholder="Email"
          className="bg-white border-2 border-blue-950 px-2 py-4 rounded-md w-full text-lg"
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-white border-2 border-blue-950 px-2 py-4 rounded-md w-full text-lg"
        />
        <button className="w-full bg-gray-800 text-white py-5 rounded-lg text-lg">
          Login
        </button>
        <p>
          Don't have an account? <Link to={CommonRoutes.SIGNUP}>Signup</Link>{" "}
        </p>
      </div>
    </div>
  );
};
