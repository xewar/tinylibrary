const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true }, //reference to associated book
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"],
    default: "Maintenance",
  },
  due_back: { type: Date, default: Date.now },
});
//virtual for bookinstance's URL
BookInstanceSchema.virtual("url").get(function () {
  //we don't use arrow function as we'll need the 'this' object
  return `/catalog/bookinstance/${this._id}`;
});

//export model
module.exports = mongoose.model("BookInstance", BookInstanceSchema);
