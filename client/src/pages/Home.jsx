import React, { useState } from "react";
import HeroSection from "../components/ui/HeroSection";
import Listing from "../components/ui/Listing/Listing";
import MyMintNfts from "../components/ui/MyMintNfts/MyMintNfts";
import SellerSection from "../components/ui/Seller-section/SellerSection";
import Trending from "../components/ui/Trending-section/Trending";
import StepSection from "../components/ui/Step-section/StepSection";
import { Tabs, Tab } from "react-bootstrap";
import "../custom.css";

const Home = () => {
  const [key, setKey] = useState("listing");

  return (
    <>
      <HeroSection />
      <div className="container">
        <Tabs
          className="custom-tabs"
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}>
          <Tab eventKey="listing" title="Listing">
            <Listing />
          </Tab>
          <Tab className eventKey="nfts" title="My Nfts">
            <MyMintNfts />
          </Tab>
          <Tab eventKey="bids" title="Bids">
            <Trending />
          </Tab>
        </Tabs>

        <SellerSection />
        <StepSection />
      </div>
    </>
  );
};

export default Home;
