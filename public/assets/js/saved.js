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
    let btnNote = $('<button>').addClass('btn-floating yellow darken-2 modal-trigger');

    let delIcon = $('<i>').addClass('material-icons');
    let noteIcon = $('<i>').addClass('material-icons');

    delIcon.text('delete');
    noteIcon.text('note_add');

    btnDelete.attr('id', 'btnDelete');

    btnNote.attr('id', 'btnAddNote');
    btnNote.attr('data-target', 'noteModal');

    btnDelete.append(delIcon);
    btnNote.append(noteIcon);

    buttons.append(btnDelete);
    buttons.append(btnNote);

    item.append(buttons);

    $('#articles').append(item);
  });
}

const displayNotes = notes => {
  notes.forEach(note => {
    let item = $('<li>').addClass('collection-item avatar');
    let noteIcon = $('<i>').addClass('material-icons circle blue');
    let noteContent = $('<p>').text(note.note);
    let btnDelete = $('<button>').addClass('secondary-content btn-floating red');
    let deleteIcon = $('<i>').addClass('material-icons');

    noteContent.attr('data-id', note._id);

    noteIcon.text('note');
    deleteIcon.text('delete');

    btnDelete.attr("id", "btnDeleteNote");
    btnDelete.append(deleteIcon);

    item.append(noteIcon);
    item.append(noteContent);

    item.append(btnDelete);
    $('#notesCollection').append(item);
  });
}

const loadSavedArticles = () => {
  $.get('/articles/')
    .then(function(data) {
      displayArticles(data);
    });
}

const deleteNote = id => {
  return (
    $.ajax({
    url: '/delete',
    method: 'POST',
    data: {
      type: 'note',
      id: id
    }
  }));
}

const loadArticleNotes = id => {
  $.get('/notes/' + id).then(function(response) {
    displayNotes(response);
  })
}

const handleClickEvents = () => {
  $(document).on('click', '#btnDelete', function() {
    let articleId = $(this).parents('.collection-item').children('h5').data('id');
    $.post('/articles/' + articleId);
    $(this).parents('.collection-item').remove();
  });

  $(document).on('click', '#btnAddNote', function() {
    // load clicked article information
    let articleId = $(this).parent().parent().children('h5').data('id');
    let title = $(this).parent().parent().children('h5').text();

    $('#articleTitle').text(title);
    $('#articleTitle').attr('data-id', articleId);
    // load notes 
    loadArticleNotes(articleId);
  });

  $(document).on('click', '#btnSaveNote', function(e){
    e.preventDefault();
    $('#error').text("");
    let note = $('#txtNote').val().trim();

    if(note.length < 4) {
      $('#error').text("You must enter a note");
    } else {
      // add note
      $.ajax({
        url: '/notes',
        method: 'POST',
        data: {
          articleId: $('#articleTitle').data('id'),
          note: note
        }
      }).then(function(response) {
        displayNotes([response]);
      });
    }

    // clear textarea
    $('#txtNote').val('');
  });

  $(document).on('click', '#btnDeleteNote', function() {
    let noteId = $(this).siblings('p').data('id');
    let noteCollectionItem = $(this).parents('.collection-item');

    deleteNote(noteId).then(function(response){
      noteCollectionItem.remove();
    });
  });
};