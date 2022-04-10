const express = require("express");

require("dotenv").config();

app = express();


app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("index")
})

app.listen(port=process.env.PORT || 8080, () => {
    console.log(`listen on http://localhost:${port}`)
})