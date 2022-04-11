const router = require("express").Router();
const Article = require("../models/article")
const {markdownToHtml} = require("../utils/functions");

router.get("/", async (req, res) => {
    let articles;

    try {
        articles = await Article.find()

        // sort by date in descending order
        articles.sort((a, b) => b.createAt - a.createAt)
    } catch (error) {
        console.log(error)
    }

    res.render("index", {articles: articles});
})

router.get("/add", (req, res) => {
    res.render("articles/add_article");
})

router.post("/add", async (req, res) => {
    let {title, description, contentMarkdown, author} = req.body;

    if (title && description && contentMarkdown && author) {
        let article = new Article({title, description, contentMarkdown, author})

        try {
            await article.save()
        }catch (err) {
            console.log(err)
        }        
    }

    res.redirect("/articles")
})

router.get("/edit/:article_id?", async (req, res) => {
    let article_id = req.params.article_id;
    let article;

    if (!article_id) {
        res.redirect("/articles")
    }

    try {
        article = await Article.findOne({_id: article_id})

        res.render("articles/edit_article", {article: article})
    } catch (error) {
        console.log(error)
        res.redirect("/articles")
    }
})

router.put("/edit/:article_id", async (req, res) => {
    let article_id = req.params.article_id;
    let {title, description, contentMarkdown} = req.body;
    let data = {}

    if (title) 
        data["title"] = title;
    if (description)
        data["description"] = description;
    if (contentMarkdown) 
        data["contentMarkdown"] = contentMarkdown;

    
    if (data) {
        try {
            let f = await Article.updateOne(
                {_id: article_id},
                {"$set": data}
            )

            console.log(f)

            res.redirect("/articles/" + article_id);
        } catch (error) {
            console.log(error);
        }
    }else {
        res.redirect("/articles/edit/" + article_id);
    }
})

router.get("/:article_id", async (req, res) => {
    let article_id = req.params.article_id;
    let article;
    let contentHtml;
    
    try {
        article = await Article.findOne({_id: article_id})

        contentHtml = markdownToHtml(article.contentMarkdown)

        res.render("articles/preview", {
            article: {...article._doc, contentHtml}
        })
    } catch (error) {
        res.redirect("/articles")
    }
})

router.delete("/:article_id", async (req, res) => {
    let article_id = req.params.article_id
    let article;

    try {
        article = await Article.deleteOne({_id: article_id})
    } catch (error) {
        console.log(error)
    }

    res.redirect("/articles");
})


module.exports = router;