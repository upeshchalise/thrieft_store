import React from "react";
import bgImg from "/Rectangle_4.png";

const Hero: React.FC = () => {
  return (
    <div className="w-full relative">
      <img src={bgImg} alt="main-bg" className="w-full h-[32rem]" />
      <h3 className="capitalize text-white text-7xl absolute top-1/4 w-1/2 pl-10 left-24">
        Not Your Ordinary Thrieft Store
      </h3>
    </div>
  );
};

export default Hero;
