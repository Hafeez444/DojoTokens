import React from "react";
import HeroSection from "../components/ui/HeroSection";
import SellerSection from "../components/ui/Seller-section/SellerSection";
import Trending from "../components/ui/Trending-section/Trending";
import AboutSection from "../components/ui/About-section/AboutSection";
import StepSection from "../components/ui/Step-section/StepSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <Trending />
      <SellerSection />
      <StepSection />
    </>
  );
};
export default Home;
