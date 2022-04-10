const express = require("express");
const mongoose = require("mongoose");


require("dotenv").config();

app = express();

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Database connect"))
.catch((err) => console.log(err));


app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("index")
})

app.listen(port=process.env.PORT || 8080, () => {
    console.log(`listen on http://localhost:${port}`)
})