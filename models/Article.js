const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },

  link: {
    type: String,
    required: true,
  },

  description: {
    type: String
  },

  saved: {
    type: Boolean,
    default: false
  }
});

let Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;