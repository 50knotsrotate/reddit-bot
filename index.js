require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const Snoowrap = require("snoowrap");
const { CommentStream } = require("snoostorm");

const { CLIENT_SECRET, CLIENT_ID, REDDIT_USER, REDDIT_PASS } = process.env;
const client = new Snoowrap({
  userAgent: "dOnTqUoTeMeOnThAt-bot",
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  username: REDDIT_USER,
  password: REDDIT_PASS
});

const comments = new CommentStream(client, {
  subreddit: "testingground4bots",
  limit: 25,
  pollTime: 80000
});

const BOT_START = Date.now() / 1000;

comments.on("item", item => {
  // if (item.created_utc <= BOT_START) return;
// if(item.author.name == 'grass_tastes_badd') return 
  if (item.body.includes("but dont quote me on that")) {
    console.log('We got one')
    item.reply(quote(item.body, item.author));
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server live on ${process.env.PORT}`)
);

function quote(str, user) {
  return `"${str.split("but dont quote me on that")[0]}" - ${
    user.name
  }`;
}
