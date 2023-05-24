const express = require('express');
var cors = require('cors');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const listingsFile = path.resolve(__dirname + "/models", 'listings.json');
const listings = fs.readFileSync(listingsFile, 'utf8');
const listingsData = JSON.parse(listings);

app.get('/listings', async (req, res) => {
    const listingsItems = await listingsData;

    if (listingsItems.length === 0) {
        return res.status(404).json({});
    }
    res.status(200).json(listingsItems);
});


// My Mint NFTs
const myMintNftsFile = path.resolve(__dirname + "/models", 'myMintNfts.json');
const myMintNfts = fs.readFileSync(myMintNftsFile, 'utf8');
const myMintNftsData = JSON.parse(myMintNfts);


app.get('/myMintNfts', async (req, res) => {
    const mintData = await myMintNftsData;

    if (mintData.length === 0) {
        return res.status(404).json({});
    }
    res.status(200).json(mintData);
});



app.listen(5000, () => { console.log('Server started on port 5000') })