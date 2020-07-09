const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");

const app = express();

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

// app.listen(PORT, () => {
//   console.log(`App listening in port ${PORT}`);
// });
