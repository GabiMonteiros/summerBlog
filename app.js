const express = require('express');
const app = express();

 
//register view enginee
app.set('view engine', 'ejs');
//app.set('views', 'partials'); 

//listen request
app.listen(3000, () =>
    console.log(" listening in localhost 3000")
);



app.get('/', (req, res) => {
    //res.send('<p>home page</p>');
    res.render('index');
})

app.get("/about", (req, res) => {
    //res.send("<p>about page</p>");
    res.render("about");

});

//redirect
app.get("/blogs/create", (req, res) => {
    res.render("create");
});

//404 page
app.use((req,res) => {
    res.status(404).render("404");
})
