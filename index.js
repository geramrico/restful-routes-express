const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

let comments = [
  { id: uuid(), username: "Gera", comment: "Hola como les va" },
  { id: uuid(), username: "Sofi", comment: "Quiero una concha" },
  { id: uuid(), username: "Luis", comment: "Yo dos conchas por favor" },
  { id: uuid(), username: "Emilia", comment: "Eso seria delicioso" },
];

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  res.redirect("/comments");
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((comment) => comment.id === id);
  res.render("comments/show", { ...comment });
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((comment) => comment.id === id);
  res.render("comments/edit", { ...comment });
});

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newCommentText = req.body.comment;
  const foundComment = comments.find((comment) => comment.id === id);
  foundComment.comment = newCommentText;
  res.redirect("/comments");
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments")

});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
