const express = require('express');
var cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(8000, () => { console.log('Server started on port 8000') })