import { React, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import MyMintNftsCard from "../MyMintNfts-card/MyMintNftsCard";
import "./myMintNfts.css";

const Listing = () => {
  const [mint, setMint] = useState([]);

  const fetchMyMintNFTs = () => {
    return fetch("/myMintNfts")
      .then((response) => response.json())
      .then((data) => setMint(data));
  }

  useEffect(() => {
    fetchMyMintNFTs();
  }, [])
  console.log(mint)
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="live__auction__top d-flex align-items-center justify-content-between ">
              <h3>My Mint NFTs</h3>
              <span>
                <Link to="/market">Explore more</Link>
              </span>
            </div>
          </Col>

          {mint.map((item) => (
            <Col lg="3" md="4" sm="6" className="mb-4">
              <MyMintNftsCard key={item.id} item={item} />
            </Col>
          ))}

        </Row>
      </Container>
    </section>
  );
};

export default Listing;
