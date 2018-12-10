
// function displays a preloader to a specified location
const displayPreloader = (loc) => {
  let loaderWrapper = $('<div>').addClass();
};

// function display articles from scraper to a specified DOM object
const displayArticles = articles => {
  articles.forEach(article => {
    let item = $('<a>').addClass('collection-item avatar black-text');
    let title = $('<h5>');
    let link = $('<a>').attr('href', article.link);
    let description = $('<p>').text(article.description);
    let btnSave = $('<button>').addClass('secondary-content btn-floating red');
    let btnIcon = $('<i>').addClass('material-icons');

    title.text(article.title);
    link.text(article.link);

    link.attr('target', '_blank');

    btnIcon.text('bookmark');
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

$(document).on('click', '.secondary-content.btn-floating.red', function(){
  // get article title
  let article = $(this).siblings('h5').text();

  // remove article
  $(this).parent('.collection-item').remove();

  // save article
  $.ajax({
    url: '/articles',
    method: 'POST',
    data: { article: article}
  });
})