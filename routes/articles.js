const express = require("express");
const { findById } = require("../models/article");

const Article = require("../models/article");

const router = express.Router();

const saveArticleAndRedirect = require("../middlewares/saveArticle");

router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const article = await Article.findById(id);
  res.render("articles/edit", { article: article });
});

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  const findedArticle = await Article.findOne({ slug });
  if (!findedArticle) res.redirect("/");
  res.render("articles/show", { article: findedArticle });
});

router.post(
  "/",
  async (req, res, next) => {
    req.article = new Article();
    next();
  },
  saveArticleAndRedirect("new")
);

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Article.findByIdAndDelete(id);
  res.redirect("/");
});

router.put(
  "/:id",
  async (req, res, next) => {
    const { id } = req.params;
    req.article = await Article.findById(id);
    next();
  },
  saveArticleAndRedirect("edit")
);

module.exports = router;
