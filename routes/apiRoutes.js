const mongoose = require('mongoose');
const scraper = require('./../scraper.js');

let databaseURI = 'mongodb://localhost/news-scraper';

if(process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(databaseURI);
}

let db = mongoose.connection;

// db.on('error', err => console.log("Mongoose Error:", err));
// db.once('open', () => console.log("Mongoose connection successful!!"));

db = require('./../models');

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
  
  // return saved articles
  app.get('/articles', (req, res) => {
    db.Article.find({saved: true}, (err, data) => {
      if(err) throw err;
      res.json(data);
    });
  });

  app.post('/articles', (req, res) => {
    // should save the article
    db.Article.findOneAndUpdate(
      {
        title: req.body.article
      },
      {
        $set: {
          saved: true
        }
      },
      {
        new: true
      },
      (err, data) => {
        if(err) throw err;
        console.log("Article was saved!");
        res.json(data);
      }
      );
  });

  // route deletes article from saved page
  app.post('/articles/:id', (req, res) => {
    let articleId = req.params.id;
    
    db.Article.findOneAndUpdate({_id: articleId}, 
      {
        $set: {
          saved: false
        }
      },
      (err, data) => {
        if(err) throw err;
        res.json({message: "Article has been deleted!"});
      });
  });
  
  app.post('/notes', (req, res) => {
    console.log(req.body);
    if(req.body.articleId && req.body.note) {
      // save note
      db.Note.create({
        note: req.body.note,
        _articleId: mongoose.Types.ObjectId(req.body.articleId)
      }).then(data => {
        console.log(data);
        res.json(data);
      })
    } else {
      res.json({error: "Bad request!"});
    }
  });

  app.get('/notes/:id', (req, res) => {
    let articleId = req.params.id;
    console.log(articleId);
    if(articleId){
      db.Note.find({_articleId: articleId}, (err, data) => {
        if(err) throw err;
        res.json(data);
      })
    } else {
      res.end(400);
    }
  });

  app.post('/delete', (req, res) => {
    let type = req.body.type;
    let id = req.body.id;
    if(type === 'note' && id) {
      db.Note.remove({_id: id}, (err, data) => {
        if(err) throw err;
        res.json(data);
      })
    } else {
      res.send("Bad request!");
    }
  })
}