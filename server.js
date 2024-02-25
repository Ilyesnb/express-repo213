const express = require("express");
const { connectToDb, getDb } = require("./db/db");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// Set view engine and static folder
app.set("view engine", "ejs");
app.use(express.static("public"));
let db
connectToDb((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      return;
    }else if (!err) {
      app.listen(3007, () => {
        console.log(`Server is running on port 3007`);
    })
    db=getDb()
    }
});
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/home", (req, res) => {
  res.redirect("/");
});
app.get("/newProducts", (req, res) => {
  res.render("newProducts");
});
app.post("/newProducts",(req,res)=>{
   const {text,body}=req.body;
   const newBooks = { text , body };
   db
   .collection("books")
   .insertOne(newBooks)
   .then(()=>{
    res.redirect("products");
   })
   .catch(()=> {
    res.status(500).json({ error : "could not create new document"})
   })

})
app.get("/products", (req, res) => {
    let bookList = [];
    db
    .collection("books")
    .find()
    .sort({ genres: 1 })
    .forEach((book) => bookList.push(book))
    .then(() => {
      // res.status(200).json(bookList);
      res.render("products", { bookList });
    })
    .catch(() => {
        res.status(500).json({ error: "Internal server error" });
    });
});
app.get("/log-in", (req, res) => {
  res.render("log-in");
});
app.all("*", (req, res) => {
    res.status(404).send("404 can't find the page!");
});