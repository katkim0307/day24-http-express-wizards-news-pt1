const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const { restart } = require("nodemon");

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
            <span class="news-position">${post.id}.</span>
            <a href="/posts/${post.id}">${post.title}</a>
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

// ADDING DYNAMIC ROUTING with PARAMETERS

// SINGLE-POST ROUTE
// localhost:1337/posts/1
app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>${post.title}</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png" />Wizard News</header>
      <div class="news-item">
        <p>
          ${post.title}
          <small>(by ${post.name})</small>
        </p>
        <p>
          ${post.content}
        </p>
      </div>
    </div>
  </body>
  </html>`

  // ERROR HANDLING
  if(!post.id) {
    res.status(404)
    const errHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <header><img src="/logo.png">Wizard News</header>
      <div class="not-found">
        <p>Accio Page! 🧙‍♀️ ... Page Not Found</p>
        <img src="/dumbledore-404.gif" />
      </div>
    </body>
    </html>
    `
    res.send(errHTML)
    // catching error
    throw new Error('Post Not Found')
  } else {
  res.send(html);
  }
})

/*
// ERROR HANDLER - https://expressjs.com/en/guide/error-handling.html
const errorHandler = (err, req, res, next) => {
  if(res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('ERROR', {error: err})
}
*/

app.listen(1337);
