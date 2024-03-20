import React from "react";

export const StayTuned: React.FC = () => {
  return (
    <div className="w-1/5 mx-auto text-center flex flex-col gap-5 mt-5">
      <h4 className="text-4xl">Stay Tuned</h4>
      <hr className="h-1 bg-black" />
      <p>Sign up and stay up to date for our new proudcts!</p>
      <button className="bg-gray-200 py-2 rounded-lg">Sign Up</button>
    </div>
  );
};
