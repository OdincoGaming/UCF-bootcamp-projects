var axios = require("axios");
var cheerio = require("cheerio");
var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");

var db = require("./models");
var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoMuckraker";

mongoose.connect(MONGODB_URI);
//mongoose.connect("mongodb://localhost/muckraker", { useNewUrlParser: true });

app.get("/scrape", function(req, res)
{
	axios.get("https://www.oann.com").then(function(response)
	{
		var $ = cheerio.load(response.data);
		$("article h3 a").each(function()
		{
			var result = {};
			result.title = $(this).text();
			result.link = $(this).attr("href");

			db.Article.create(result).then(function(article)
			{
				console.log(article);
			}).catch(function(err)
			{
				console.log(err);
			});
		});

		res.send("SCRAPE COMPLETE");
	});
});

app.get("/articles", function(req, res)
{
	db.Article.find().then(function(articles)
	{
		res.json(articles);
	}).catch(function(err)
	{
		res.json(err);
	});
});

app.get("/articles/:id", function(req, res)
{
	db.Article.findOne({
		_id: req.params.id
	}).populate("comments").then(function(article)
	{
		res.json(article);
	}).catch(function(err)
	{
		res.json(err);
	});
});

app.post("/articles/:id", function(req, res)
{
	db.Comment.create(req.body).then(function(comment)
	{
		return db.Article.findOneAndUpdate({
			_id: req.params.id
		},
		{
			$push: {
				comments: comment._id
			}
		},
		{
			new: true
		});
	}).then(function(article)
	{
		res.json(article);
	}).catch(function(err)
	{
		res.json(err);
	});
});

app.delete("/comments/:id", function(req, res)
{
	db.Comment.remove({
		_id: req.params.id
	}).then(function(data)
	{
		res.json(data);
	}).catch(function(err)
	{
		res.json(err);
	});
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, function()
{
	console.log("RUNNING ON " + PORT);
});
