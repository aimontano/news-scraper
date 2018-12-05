const express = require('express');
const scraper = require("./scraper.js");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
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