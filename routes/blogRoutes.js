const express = require('express');
const blogController = require('../controllers/blogController');//acessing blogController.js
const router = express.Router();



//get all posts
router.get("/", blogController.post_index);  
// handle post request
router.post("/", blogController.post_create);
//redirect
router.get("/create", blogController.post_create_get);
//extract the route parameter from URL
router.get("/:id", blogController.post_details);
//delete request
router.delete("/:id", blogController.post_delete);

module.exports = router;