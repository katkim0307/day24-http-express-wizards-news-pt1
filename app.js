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
  </head>
  <body>
    <ul>
      ${posts.map(post => `<li>${post.title}</li>`)}
    </ul>
  </body>
  </html>`;

  // send a response
  res.send(html);
});

app.listen(1337);
