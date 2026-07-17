import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import Project from "./components/Project";
import Technologies from "./components/Technologies";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <main>
      <HeroSection />
      <Services />
      <Project />
      <Technologies />
      <Footer />
    </main>
  );
}

export default App;