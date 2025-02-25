import React from "react";
import Hero from "./Sections/Hero/Hero";
import Gallery from "./Sections/Gallery/Gallery";
import Services from "./Sections/Services/Services";
import About from "./Sections/About/About";
import Contacts from "./Sections/Contacts/Contacts";

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Gallery />
      <About />
      <Contacts />
    </div>
  );
};

export default Home;
