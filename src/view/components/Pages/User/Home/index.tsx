import React from "react";
import { Contact } from "../../../common/Contact";
import { LogoSection } from "../../../common/LogoSection";
import { Display } from "../../../common/Display";
import WeekSpecialText from "../../../common/WeekSpecialText";
import { Hero } from "../../../common/Hero";
import { StayTuned } from "../../../common/StayTuned";
import Footer from "../../../common/Footer";

function Home() {
  return (
    <>
      <div className="flex flex-col justify-between gap-5">
        <Contact />
        <LogoSection />
        <Display />
        <WeekSpecialText />
        <Hero />
        <StayTuned />
        <Footer />
      </div>
    </>
  );
}

export default Home;
