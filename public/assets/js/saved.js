

$(function(){
  loadSavedArticles();
})

const displayArticles = articles => {
  articles.forEach(article => {
    let item = $('<li>').addClass('collection-item avatar');
    let title = $('<h5>').text(article.title);
    let link = $('<a>').attr('href', article.link);
    let description = $('<p>').text(article.description);

    link.text(article.link);

    item.append(title);
    item.append(link);
    item.append(description);

    let buttons = $('<div>').addClass('secondary-content');
    let btnDelete = $('<button>').addClass('btn-floating red');
    let btnNote = $('<button>').addClass('btn-floating yellow darken-2');

    let delIcon = $('<i>').addClass('material-icons');
    let noteIcon = $('<i>').addClass('material-icons');

    delIcon.text('delete');
    noteIcon.text('note_add');

    btnDelete.append(delIcon);
    btnNote.append(noteIcon);

    buttons.append(btnDelete);
    buttons.append(btnNote);

    item.append(buttons);

    $('#articles').append(item);
  });
}

const loadSavedArticles = () => {
  $.get('/articles/')
    .then(function(data) {
      displayArticles(data);
    });
}