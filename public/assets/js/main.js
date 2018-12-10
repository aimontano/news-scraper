
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

{/* <li class="collection-item avatar">
<h5>Title</h5>
<a href="#">Link</a>
<p>Description</p>
<div class="secondary-content">
  <button class="btn-floating red"><i class="material-icons">delete</i></button>
  <button class="btn-floating yellow darken-2"><i class="material-icons">note_add</i></button>
</div>
</li> */}

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