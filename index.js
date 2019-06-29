require('dotenv').config()
const express = require('express');
const app = express();
const axios = require('axios');

const {
    PORT
} = process.env;

app.get('/test', (req, res, next) => { 
res.status(200).send('I gotta doo doo in my butt')
})




app.listen(PORT, () => console.log(`Server live on ${PORT}`))