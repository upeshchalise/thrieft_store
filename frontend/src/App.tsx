import { Contact } from "./components/Contact";
import { Display } from "./components/Display";
import Footer from "./components/Footer";
import { Hero } from "./components/Hero";
import { LogoSection } from "./components/LogoSection";
import { StayTuned } from "./components/StayTuned";
import WeekSpecialText from "./components/WeekSpecialText";

function App() {
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

export default App;
