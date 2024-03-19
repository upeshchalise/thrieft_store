import { Contact } from "./components/Contact";
import { Display } from "./components/Display";
import { Hero } from "./components/Hero";
import { LogoSection } from "./components/LogoSection";
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
      </div>
    </>
  );
}

export default App;
