const express = require('express');
const router = express.Router();
const Blog = require('../models/blog'); //connect with Blog Model


//get all posts
router.get("/", (req, res) => {
    //Blog is the model, find method, to all posts
    Blog.find()
        .sort({ createdAt: -1 }) //.sort... do mais novo pro mais velho
        .then((result) => {
            //2o arg is the blogs collection in MongoDB
            res.render("index", { title: "All Posts", blogs: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

// handle post request
router.post("/", (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect("/posts");
        })
        .catch((err) => {
            console.log(err);
        });
});


//redirect
router.get("/create", (req, res) => {
    res.render("create", { title: "New Post" });
});


//extract the route parameter from URL
router.get("/:id", (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render("details", { blog: result, title: "Post Detail" });
        })
        .catch((err) => {
            console.log(err);
        });
});

//delete request
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: "/posts" });
        })
        .catch((err) => {
            console.log(err);
        });
});




module.exports = router;