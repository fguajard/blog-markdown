const express = require("express");
const articleRouter = require("./routes/articles");
const Article = require("./models/article");
const methodOverride = require("method-override");
const app = express();

app.listen(3000, console.log("Server Up"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({
    createdAt: "desc",
  });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);
