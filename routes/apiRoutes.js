const mongoose = require('mongoose');
const scraper = require('./../scraper.js');

let databaseURI = 'mongodb://localhost/news-scraper';

if(process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(databaseURI);
}

let db = mongoose.connection;

db.on('error', err => console.log("Mongoose Error:", err));
db.once('open', () => console.log("Mongoose connection successful!!"));

// db = require('./../models');

const saveScrapedArticles = articles => {
  articles.forEach(article => {
    db.Article.create(article)
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err));    
  });
};

module.exports = app => {
  app.get('/scrape', (req, res) => {
    let articles = [];
    
    scraper.getArticles(result => {
      articles = result;
    });
  
    setTimeout(function(){
      saveScrapedArticles(articles);
      res.json(articles);
    }, 1000 * 2);
  }); 
  
  app.get('/articles', (req, body) => {

  });
}