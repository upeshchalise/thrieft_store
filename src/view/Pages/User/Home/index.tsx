import React from "react";
import { Contact } from "../../../components/common/Contact";
import { LogoSection } from "../../../components/common/LogoSection";
import { Display } from "../../../components/common/Display";
import WeekSpecialText from "../../../components/common/WeekSpecialText";
import { Hero } from "../../../components/common/Hero";
import { StayTuned } from "../../../components/common/StayTuned";
import Footer from "../../../components/common/Footer";

function Home() {
  return (
    <>
      <div className="flex flex-col justify-between gap-5 bg-gray-50">
        <Contact />
        <LogoSection />
        <Display />
        <WeekSpecialText />
        <Hero />
        <Footer />
      </div>
    </>
  );
}

export default Home;
