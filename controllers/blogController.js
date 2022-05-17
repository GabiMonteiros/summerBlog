//importing blog model
const Blog = require('../models/blog'); //connect with Blog Model


const post_index = (req,res) => {
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
}

const post_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render("details", { blog: result, title: "Post Detail" });
        })
        .catch((err) => {
            console.log(err);
        });
}


const post_create_get = (req, res) => {
    res.render("create", { title: "New Post" });
}

const post_create = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect("/posts");
        })
        .catch((err) => {
            console.log(err);
        });
}

const post_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: "/posts" });
        })
        .catch((err) => {
            console.log(err);
        });    
}



module.exports = {
    post_index,
    post_details,
    post_create_get,
    post_create,
    post_delete

};