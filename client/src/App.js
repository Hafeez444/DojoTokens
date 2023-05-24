import "./app.css";
import Layout from "./components/Layout/Layout";
import ListingContext from "./context/ListingContext";
import { React, useState, useEffect } from "react";

function App() {
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
    < ListingContext.Provider value={listing} >
      <Layout />;
    </ListingContext.Provider >
  );
}

export default App;
