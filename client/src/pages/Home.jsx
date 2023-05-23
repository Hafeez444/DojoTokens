import React, { useState } from "react";
import HeroSection from "../components/ui/HeroSection";
import Listing from "../components/ui/Listing/Listing";
import MyMintNfts from "../components/ui/MyMintNfts/MyMintNfts";
import SellerSection from "../components/ui/Seller-section/SellerSection";
import Trending from "../components/ui/Trending-section/Trending";
import StepSection from "../components/ui/Step-section/StepSection";
import { Tabs, Tab } from 'react-bootstrap';
import '../custom.css'; // Import the custom CSS file

const Home = () => {
  const [key, setKey] = useState('listing');

  // var styles = {
  //   navtabs: { backgroundColor: '#fff', color: '#fff' },
  // };

  return (
    <>
      <HeroSection />
      <div className="container"  >
        {/* <h1>React Bootstrap Tabs Example - ItSolutionStuff.com</h1> */}
        <Tabs className="custom-tabs"
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >

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


        {/* <Listing /> */}
        {/* <SellerSection /> */}
        {/* <Trending /> */}
        <SellerSection />
        <StepSection />

      </div >
    </>
  );
}


export default Home;
