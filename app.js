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

//404 page
app.use((req,res) => {
    res.status(404).render("404", { title: "Not Found" });
})
