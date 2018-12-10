

$(function(){
  loadSavedArticles();
  handleClickEvents();
})

const displayArticles = articles => {
  articles.forEach(article => {
    let item = $('<li>').addClass('collection-item avatar');
    let title = $('<h5>').text(article.title);
    let link = $('<a>').attr('href', article.link);
    let description = $('<p>').text(article.description);

    link.text(article.link);
    title.attr('data-id', article._id);

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

    btnDelete.attr('id', 'btnDelete');

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

const handleClickEvents = () => {
  $(document).on('click', '#btnDelete', function() {
    let articleId = $(this).parents('.collection-item').children('h5').data('id');
    $.post('/articles/' + articleId);
    $(this).parents('.collection-item').remove();
  })
}