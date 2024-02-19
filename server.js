const express = require("express");
const { connectToDb, getDb } = require("./db/db");
const database= " "
const app = express();

// Set view engine and static folder
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// Define routes
const mybooks =[
    {id:1 ,title:"The Alchemist", author:"Paulo Coelho"},  
    {id:2 ,title:"Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling"},
    {id:3 ,title: 'The Catcher in the Rye', author:'J.D. Salinger'} 
]
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/home", (req, res) => {
  res.redirect("/");
});

app.get("/newProducts", (req, res) => {
  res.render("newProducts");
});
app.get("/products", (req, res) => {
    res.render("products",{mybooks});
  });
app.get("/products",()=>{
    const books = { id  , title , author};
    mybooks.push(books)


})
app.get("/prodects", (req, res) => {
  let bookList = [];
//   const database = getDb(); // Retrieve the database instance

  database
    .collection("books")
    .find()
    .sort({ genres: 1 })
    .forEach((book) => bookList.push(book))
    .then(() => {
      res.status(200).json(bookList);
    })
    .catch(() => {
      res.status(500).json({ error: "Internal server error" });
    });
    res.json({msg:"Requesting books from API" });
});

app.get("/log-in", (req, res) => {
  res.render("log-in");
});

app.all("*", (req, res) => {
  res.status(404).send("404 can't find the page!");
});

// Connect to the database and start the server
connectToDb((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  database=getDb();

});
app.listen(3007, () => {
  console.log(`Server is running on port 3007`);

});
