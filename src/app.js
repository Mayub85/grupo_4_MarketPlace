const express = require('express');
const app = express();
const path = require("path");


app.use(express.static('public'));

app.get("/", (req, res)=>{
    res.sendFile(path.resolve("./public/pages/index.html"));
});

app.get("/productDetail", (req, res)=>{
    res.sendFile(path.resolve("./public/pages/productDetail.html"));
});

app.get("/productCart", (req, res)=>{
    res.sendFile(path.resolve("./public/pages/productCart.html"));
});

app.get("/register", (req, res)=>{
    res.sendFile(path.resolve("./public/pages/register.html"));
});

app.get("/login", (req, res)=>{
    res.sendFile(path.resolve("./public/pages/login.html"));
});


app.listen(3000,()=>{
    console.log("http://localhost:3000/");
});