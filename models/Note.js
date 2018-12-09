const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let NoteSchema = new Schema({
  note: {
    type: String,
    required: true
  },
  _articleId: {
    type: Schema.Types.ObjectId
  }
});

let Note = mongoose.model("Note", NoteSchema);

module.exports = Note;