
const displayArticles = articles => {
  articles.forEach(article => {
    let item = $('<a>').addClass('collection-item black-text');
    let title = $('<h5>').addClass('title');
    let link = $('<a>').attr('href', article.link);
    let description = $('<p>').text(article.description);
    let btnSave = $('<a>').addClass('secondary-content');
    let btnIcon = $('<i>').addClass('material-icons');

    title.text(article.title);
    link.text(article.link);

    btnIcon.text('save');
    btnSave.append(btnIcon);

    item.append(title);
    item.append(link);
    item.append(description);
    item.append(btnSave);

    $('#articles').append(item);
  });  
};

$(document).on('click', '#btnScrape', function(){
  $.get('/scrape', displayArticles);
});
