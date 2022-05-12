
const express = require('express');
const morgan = require('morgan'); //middleware
const mongoose = require('mongoose'); //connect to DB
const Blog = require('./models/blog'); //connect with Blog Model
const { use } = require('express/lib/application');
const req = require('express/lib/request');
const { render } = require('express/lib/response');
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


//static files middleware - public css acess to browser
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));




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

// handle post request
app.post('/posts', (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
        .then((result) => {
            res.redirect('/posts')
        })
        .catch((err) => {
            console.log(err);
        })
});

//extract the route parameter from URL
app.get('/posts/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'Post Detail' });
        })
        .catch((err) => {
            console.log(err);
        })
});


//redirect
app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "New Post" });
});

//404 page - middleware
app.use((req,res) => {
    res.status(404).render("404", { title: "Not Found" });
})
