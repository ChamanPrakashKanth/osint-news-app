import Parser from "rss-parser";

const parser = new Parser();

// Defense / military RSS feeds
const feeds = [
"https://www.defensenews.com/arc/outboundfeeds/rss/",
"https://breakingdefense.com/feed/",
"https://www.twz.com/feed",
"https://www.armyrecognition.com/rss.xml",
"https://www.navalnews.com/feed/",
"https://www.airforcetimes.com/arc/outboundfeeds/rss/"
];

// Keywords to filter relevant defense / intelligence news
const keywords = [
"military",
"defense",
"missile",
"drone",
"navy",
"air force",
"army",
"war",
"satellite",
"radar",
"cyber",
"espionage",
"intelligence",
"fighter",
"submarine",
"hypersonic",
"nuclear"
];

export default async function handler(req, res) {

try {

let articles = [];

// fetch all RSS feeds
for (const url of feeds) {

try {

const feed = await parser.parseURL(url);

feed.items.forEach(item => {

articles.push({
title: item.title || "",
description: item.contentSnippet || "",
url: item.link,
publishedAt: item.pubDate || new Date().toISOString(),
source: {
name: feed.title || "Defense Feed"
}
});

});

} catch (err) {

console.log("Feed failed:", url);

}

}

// filter for defense-related keywords
articles = articles.filter(article => {

const text = (article.title + " " + article.description).toLowerCase();

return keywords.some(k => text.includes(k));

});

// remove duplicate URLs
const seen = new Set();

articles = articles.filter(article => {

if (seen.has(article.url)) return false;

seen.add(article.url);

return true;

});

// sort newest first
articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

res.status(200).json({
articles: articles.slice(0, 30)
});

} catch (error) {

res.status(500).json({
error: "Failed to fetch defense OSINT feeds"
});

}

}