const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const articleSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: false},
    contentMarkdown: {type: String, required: true},
    author: {type: String, required: true},
    createAt: {type: Date, required: true, default: new Date()}
})

articleSchema.plugin(mongooseUniqueValidator)

module.exports = mongoose.model("Article", articleSchema)