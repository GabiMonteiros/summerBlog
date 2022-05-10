
const express = require('express');
const morgan = require('morgan'); //middleware
const mongoose = require('mongoose'); //connect to DB
const Blog = require('./models/blog'); //connect with Blog Model
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


//static files middleware - public css acess to browser
app.use(express.static('public'));

app.use(morgan('dev'));

// //interect with Blog model_ mongoose and mongo sandbox routes
// app.get('/add-post', (req, res) => {
//     const post = new Blog({
//         title: 'second post',
//         snippet: '2 about your Travel tip',
//         body: 'more about your expirience'
//         //image: ''
//     });
//     //saving to the DB
//     post.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// })




//finding a sigle post
// app.get('/single-post', (req, res) => {
//     Blog.findById('627a8f04b6f0d0ea8c85989f')
//         .then((result) => {
//         res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//     })
// })

//routes
app.get('/', (req, res) => {
    res.redirect('/posts');
});

app.get("/about", (req, res) => {
    res.render("about", {title: 'About'});

});


//blog route

//all posts
app.get('/posts', (req, res) => {
         //Blog is the model, find method, to all posts
         Blog.find().sort({createdAt: -1}) //.sort... do mais novo pro mais velho
             .then((result) => {                //2o arg is the blogs collection in MongoDB
                 res.render('index', {title: 'All Posts', blogs: result})
             })
             .catch((err) => {
                 console.log(err);
             });
    ;
})


//redirect
app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "New Post" });
});

//404 page - middleware
app.use((req,res) => {
    res.status(404).render("404", { title: "Not Found" });
})
