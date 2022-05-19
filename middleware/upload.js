const path = require('path')
const multer = require('multer')


//storage img db
const storage = multer.diskStorage({
    destination: function (req, file, cb) { 
        cb(null, "uploads");
        
    },
filename: function (req, file, cb) {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({storage: storage})


module.exports = upload 