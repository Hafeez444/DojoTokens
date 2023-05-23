import { React, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import ListingCard from "../Listing-card/ListingCard";
import "./listing.css";

const Listing = () => {
  const [listing, setListing] = useState([]);

  const fetchListings = () => {
    return fetch("/listings")
      .then((response) => response.json())
      .then((data) => setListing(data));
  }

  useEffect(() => {
    fetchListings();
  }, [])

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="live__auction__top d-flex align-items-center justify-content-between ">
              <h3>Listing Items</h3>
              <span>
                <Link to="/market">Explore more</Link>
              </span>
            </div>
          </Col>

          {listing.map((item) => (
            <Col lg="3" md="4" sm="6" className="mb-4">
              <ListingCard key={item.id} item={item} />
            </Col>
          ))}

        </Row>
      </Container>
    </section>
  );
};

export default Listing;
