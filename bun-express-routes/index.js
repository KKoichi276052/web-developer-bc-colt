import express from "express";

const app = express();
const path = require("path");
const port = 3000;
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(methodOverride("_method"));

const comments = [
  {
    id: uuid(),
    username: "user1",
    comment: "comment1",
  },
  {
    id: uuid(),
    username: "user2",
    comment: "comment2",
  },
  {
    id: uuid(),
    username: "user3",
    comment: "comment3",
  },
  {
    id: uuid(),
    username: "user4",
    comment: "comment4",
  },
];

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});

app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  res.redirect("/comments");
});

app.get("/tacos", (req, res) => {
  res.send("GET /tacos response");
});

app.post("/tacos", (req, res) => {
  console.log(req.body);
  const { meat, qty } = req.body;
  res.send(`here are you ${qty} ${meat} tacos`);
});

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newCommentText = req.body.comment;
  const foundComment = comments.find((c) => c.id === id);
  foundComment.comment = newCommentText;
  res.redirect("/comments");
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
  res.redirect("/comments");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
