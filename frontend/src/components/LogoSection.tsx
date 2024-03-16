import React from "react";
import searchIcon from "/Ellipse_1.svg";

export const LogoSection: React.FC = () => {
  return (
    <>
      <div className="flex gap-4 justify-around items-baseline">
        {/* <h1>this is the logo section</h1> */}
        <div className="relative items-center">
          <input
            type="text"
            className="border border-x-0 border-t-0 border-b-black py-2"
          />
          <img
            src={searchIcon}
            alt="searchIcon"
            className="absolute right-1 top-1/4"
          />
        </div>
        <h1 className="text-5xl">LOGO</h1>
        <div className="flex gap-8">
          <button className=" px-2">SIGN IN</button>
          <button className=" px-2">SIGN UP</button>
        </div>
      </div>
    </>
  );
};
