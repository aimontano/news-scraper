const mongoose = require('mongoose');
const logger = require('morgan');
const express = require('express');
const scraper = require("./scraper.js");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

let databaseURI = 'mongodb://localhost/news-scraper';


if(process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(databaseURI);
}

let db = mongoose.connection;

db.on('error', err => console.log("Mongoose Error:", err));

db.once('open', () => console.log("Mongoose connection successful!!"));

app.get('/scrape', (req, res) => {
  let articles = [];
  
  scraper.getArticles(result => {
    articles = result;
  });

  setTimeout(function(){
    res.json(articles);
  }, 1000 * 2)
});

app.get('/', (req, res) => {
  res.sendFile(__dirname +  '/index.html');
})

app.listen(PORT, e => console.log("running"));