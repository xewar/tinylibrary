const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

//virtual for author's full name
AuthorSchema.virtual("name").get(function () {
  //avoiding errors when the author doesn't have two names
  //we want to make sure we handle the exception by returning an empty string for that case

  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }
  if (!this.first_name || !this.family_name) {
    fullname = "";
  }
  return fullname;
});

//virtual for author's URL
AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

//virtual for author's date of birth and death
AuthorSchema.virtual("birth_formatted").get(function () {
  return this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString({
        year: "numeric",
      })
    : "";
});
//virtual for author's date of birth and death
AuthorSchema.virtual("death_formatted").get(function () {
  return this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toLocaleString({
        year: "numeric",
      })
    : "";
});

//export model
module.exports = mongoose.model("Author", AuthorSchema);
