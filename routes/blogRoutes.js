const express = require('express');
const blogController = require('../controllers/blogController');//acessing blogController.js
const router = express.Router();
const upload= require('../middleware/upload')


//get all posts
router.get("/", blogController.post_index);  
// handle post request save in DB, entre () deve ser o name property dado no input field
router.post("/", upload.single("image"),blogController.post_create);
//redirect
router.get("/create", blogController.post_create_get);
//extract the route parameter from URL
router.get("/:id", blogController.post_details);
//delete request
router.delete("/:id", blogController.post_delete);

module.exports = router;