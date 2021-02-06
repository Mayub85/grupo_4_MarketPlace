const express = require('express');
const app = express();
const path = require("path");
const homeRoutes = require("./routes/home"); 
const productsRoutes = require("./routes/products");
const adminRoutes = require("./routes/admin"); 
let session = require("express-session");


/******CONFIGS******/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const methodOverride = require('method-override');
app.use(methodOverride('_method'));


app.use(express.static('public'));
app.use(session({
    secret: "Grupo4MarketPlace",
    resave: true,
    saveUninitialized: true})); 

app.use("/", homeRoutes);

app.use("/products", productsRoutes);


app.use("/admin", adminRoutes);


// app.get("/register", (req, res)=>{
//     res.sendFile(path.resolve("./public/pages/register.html"));
// });

// app.get("/login", (req, res)=>{
//     res.sendFile(path.resolve("./public/pages/login.html"));
// });


app.listen(3000,()=>{
    console.log("http://localhost:3000/");
    console.log("http://localhost:3000/productCart");
    console.log("http://localhost:3000/admin");
});