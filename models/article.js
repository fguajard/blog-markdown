const { model } = require("../database/connection");
const { articleSchema } = require("../schemas");

const Article = model("Article", articleSchema);

module.exports = Article;