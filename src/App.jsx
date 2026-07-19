import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection/HeroSection";
import Services from "./components/Services/Services";
import { servicesData } from './components/Services/ServicesData';
import ServiceDetail from "./components/Services/ServiceDetail";
import Project from "./components/Projects/Project";
import Technologies from "./components/Technologies/Technologies";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import "./App.css";

function HomePage({ onSelectService }) {
  return (
    <>
      <HeroSection />

      <section id="services">
        <Services onSelectService={onSelectService} />
      </section>

      <section id="projects">
        <Project />
      </section>

      <section id="technologies">
        <Technologies />
      </section>

      <Footer />
    </>
  );
}

function ServicesPage({ onSelectService }) {
  return (
    <>
      <div style={{ paddingTop: "90px" }}>
        <Services onSelectService={onSelectService} />
      </div>

      <Footer />
    </>
  );
}

function App() {
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const selectedService =
    selectedServiceId !== null
      ? servicesData.find((service) => service.id === selectedServiceId)
      : null;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage onSelectService={setSelectedServiceId} />}
        />

        <Route
          path="/services"
          element={<ServicesPage onSelectService={setSelectedServiceId} />}
        />
      </Routes>

      {selectedService && (
        <ServiceDetail
          service={selectedService}
          onBack={() => setSelectedServiceId(null)}
        />
      )}
    </BrowserRouter>
  );
}

export default App;