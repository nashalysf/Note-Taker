
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

require('./routes/route')(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});  