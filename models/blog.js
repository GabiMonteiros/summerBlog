const mangoose = require('mongoose');
const { default: mongoose } = require('mongoose');
const Schema = mongoose.Schema;

//structure of collection at DB
const blogSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    snippet: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    image: {
        data: Buffer,
        contentType: String
    }
}, { timestamps: true })

//const to store this model
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog