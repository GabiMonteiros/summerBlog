
const express = require('express');
const morgan = require('morgan'); //middleware
const mongoose = require('mongoose'); //connect to DB
const app = express();
require("dotenv").config();
//connect to MongoDB
const dbURI = "mongodb+srv://firstdb:test1234@cluster0.yrswz.mongodb.net/summer-blog?retryWrites=true&w=majority";
mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) =>
        app.listen(3000, () =>
            console.log(" listenen in localhost 3000 and connect mongoodb")
        )
    )

    .catch((err) => console.log(err));


//register view enginee
app.set('view engine', 'ejs');
//app.set('views', 'partials'); 

//listen request
// app.listen(3000, () =>
//     console.log(" listening in localhost 3000")
// ); 

//static files middleware - public css acess to browser
app.use(express.static('public'));

app.use(morgan('dev'));

   



app.get('/', (req, res) => {
    const blogs = [
        {
            title: "Yoshi Finds gsgsgs",
            snippet: "Lorem ipsum dolor sit amet, consectetur",
        },
        {
            title: "Mario jhhlñ gsgsgs",
            snippet: "Lorem ipsum dolor sit amet, consectetur",
        },
        {
            title: "How to defeat gsgsgs",
            snippet: "Lorem ipsum dolor sit amet, consectetur",
        },
    ];
    //o 2o parametro é o dado objeto enviado para index.ejs , tem que definir *blogs* aqui pra funcionar no index.ejs
    res.render('index', { title: 'Home', blogs });
});

app.get("/about", (req, res) => {
    res.render("about", {title: 'About'});

});

//redirect
app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "New Post" });
});

//404 page - middleware
app.use((req,res) => {
    res.status(404).render("404", { title: "Not Found" });
})
