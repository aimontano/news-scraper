const scraper = require('./../scraper.js');
module.exports = app => {
  app.get('/scrape', (req, res) => {
    let articles = [];
    
    scraper.getArticles(result => {
      articles = result;
    });
  
    setTimeout(function(){
      res.json(articles);
    }, 1000 * 2)
  });  
}