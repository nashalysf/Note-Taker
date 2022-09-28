const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3003;
const app = express();

//parse incoming data to accept user input and parses it into the req.body of routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

require('./routes/route')(app);


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});  
