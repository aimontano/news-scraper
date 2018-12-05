
const displayArticles = articles => {
  articles.forEach(article => {
    let item = $('<li>').addClass('collection-item');
    let title = $('<span>').addClass('title');
    let p = $('<p>')
    title.text(article.title);

    item.append(title);
    $('#articles').append(item);
  });  
};

$(document).on('click', '#btnScrape', function(){
  $.get('/scrape', displayArticles);
});
