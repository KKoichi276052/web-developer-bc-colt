import express from "express";

const app = express();
const port = 3000;

// app.use((req, res) => {
//   console.log("we got new request");
//   console.log(req);
//   console.log(res);
//   res.send("we got your request");
// });

app.get('/', (req, res) => {
  res.send('this is homepage')
})

app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req.params
  console.log(res, req)
  res.send(`<h1>Browsing the ${subreddit} </h1>`)
})

app.post('/cats', (req, res) => {
  res.send('post request to /cats')
})

app.get('/search', (req, res) => {
  const { q } = req.query
  res.send(`<h1>search result for ${q} </h1>`)
})

app.get("/cats", (req, res) => {
  res.send("cat request!!!!")
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
