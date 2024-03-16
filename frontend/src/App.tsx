import { Contact } from "./components/Contact";
import Hero from "./components/Hero";
import { LogoSection } from "./components/LogoSection";

function App() {
  return (
    <>
      <div className="flex flex-col justify-between gap-5">
        <Contact />
        <LogoSection />
        <Hero />
      </div>
    </>
  );
}

export default App;
