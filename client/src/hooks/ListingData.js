import { useContext } from "react";
import ListingContext from "../context/ListingContext";


function useListing() {
    return useContext(ListingContext)
}

export default useListing;
