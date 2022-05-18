const dotenv = require("dotenv");
require("dotenv").config();
const express = require("express");
const morgan = require("morgan"); //middleware
const mongoose = require("mongoose"); //connect to DB
const blogRoutes = require("./routes/blogRoutes"); //to connect with blog routes
//express app
const app = express();


//connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI,
        
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then((result) =>
        app.listen(3000, () =>
            console.log(" listenen in localhost 3000 and connect mongoodb")
        )
    )

    .catch((err) => console.log("no connection"));

//register view enginee
app.set("view engine", "ejs");

//static files middleware - public css acess to browser
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.get("/", (req, res) => {
    res.redirect("/posts");
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});

//connect to Blog routes *middleware
app.use("/posts", blogRoutes);

//404 page - middleware
app.use((req, res) => {
    res.status(404).render("404", { title: "Not Found" });
});
