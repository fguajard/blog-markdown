const saveArticleAndRedirect = (path) => {
  return async (req, res) => {
    const articlePayload = req.body;
    const article = req.article;
    article.title = articlePayload.title;
    article.description = articlePayload.description;
    article.markdown = articlePayload.markdown;
    try {
      const articleSaved = await article.save();
      res.redirect(`/articles/${articleSaved.slug}`);
    } catch (error) {
      res.render(`articles/${path}`, { article: article });
    }
  };
};

module.exports = saveArticleAndRedirect;
