const { urlencoded } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override")
const articleRouter = require("./routes/article");
const { use } = require("marked");


require("dotenv").config();

app = express();

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Database connect"))
.catch((err) => console.log(err));


app.set("view engine", "ejs")
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, UPDATE, DELETE, ");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    next();
})
app.use(express.json())
app.use(methodOverride("_method"))
app.use(urlencoded({extended: false}))
app.use("/publics", express.static(__dirname + "/views/publics"))
app.use("/articles", articleRouter)
app.get("/article", (req, res) => res.redirect("/articles"));

app.get("/", (req, res) => {
    res.redirect("/articles")
})

app.listen(port=process.env.PORT || 8080, () => {
    console.log(`listen on http://localhost:${port}`)
})