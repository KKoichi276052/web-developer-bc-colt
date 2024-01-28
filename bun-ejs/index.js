// const server = Bun.serve({
//   port: 3000,
//   fetch(req) {
//     return new Response(`Hello there`);
//   },
// });

// console.log(`Listening on localhost: ${server.port}`);

import express from "express";
const path = require('path')
const redditData = require('./data.json')
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/cats', (req, res) => {
  const cats = [
    'Blue', 'Rocket', 'Monty', 'Stephanie'
  ]
  res.render('cats', { cats })
})

app.get('/rand', (req, res) => {
  const num = Math.trunc(Math.random() * 10) + 1
  res.render('random', { num })
})

app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req.params
  const data = redditData[subreddit]
  if (data) {
    res.render('subreddit', { ...data })
  } else {
    res.render('404', { subreddit })
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
