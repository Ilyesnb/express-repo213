const express = require("express")
const app = express()
app.set("view engine","ejs")
app.use(express.static('public'))
app.get("/",(req,res)=>{
    res.render("home")
})
app.get("/home",(req,res)=>{
    res.redirect("/")
})
app.get("/buy",(req,res)=>{
    res.render("buy")
})
app.get("/shop",(req,res)=>{
    res.render("shop")
})
app.get("/log-in",(req,res)=>{
    res.render("log-in")
})
app.all("*",(req,res)=>{
    res.status(404).send("404 can't find the page!")
})
app.listen(3007,()=>{
    console.log( "Server is running on port 3007");
})