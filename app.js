const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");

const app = express();
// serving static files in Express (public folder) 
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


app.use(morgan('dev'));

app.get("/", (req, res) => {
  // get the list of posts
  const posts = postBank.list();

  // prepare some html to send the list as output
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png" />Wizard News</header>
      ${posts.map(post => `
        <div class="news-item">
          <p>
            <span class="news-position">${post.id}.</span>${post.title}
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>
      `).join('')}
    </div>
  </body>
  </html>`

  // send a response
  res.send(html);
});

app.listen(1337);
