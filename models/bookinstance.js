const mongoose = require("mongoose");
const { DateTime } = require("luxon");

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
//virtual for due_back_formatted
// BookInstanceSchema.virtual("due_back_formatted").get(function () {
//   return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
// });

BookInstanceSchema.virtual("due_back_formatted").get(function () {
  return DateTime.fromJSDate(this.due_back).toLocaleString({
    month: "long",
    day: "numeric",
  });
});

//export model
module.exports = mongoose.model("BookInstance", BookInstanceSchema);
