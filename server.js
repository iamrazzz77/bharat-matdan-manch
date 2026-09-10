const express = require("express")
const app = express()
// request("dotenv").config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('listening on port 3000');
})