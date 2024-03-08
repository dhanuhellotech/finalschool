const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date:Date,

  category:String,
  author: String,
  comments: Number,
  content: String,
  link: String,
  pid:{
    type:String,
    required:true
  },
  imageUrl: String,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
// *Dhanam123