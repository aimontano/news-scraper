const express = require('express');
const scraper = require("./scraper.js");

const port = 8080;
const app = express();

app.get('/scrape', (req, res) => {
  let articles = [];
  
  scraper.getArticles(result => {
    articles = result;
  });

  setTimeout(function(){
    console.log(articles);
    res.json(articles);
  }, 1000 * 2)
})

app.listen(port, e => console.log("running"));