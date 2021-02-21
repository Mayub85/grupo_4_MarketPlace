const express = require('express');
const app = express();
const path = require("path");
const homeRoutes = require("./routes/home"); 
const productsRoutes = require("./routes/products");
const adminRoutes = require("./routes/admin"); 
let session = require("express-session");
const methodOverride = require('method-override');
let userMiddleware = require("./middlewares/userMiddleware");
const cookieParser = require('cookie-parser');


const usersRoutes = require ("./routes/users");

let port = process.env.PORT || 3000; //para Heroku

/******CONFIGS******/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride('_method'));

app.use(express.static('public'));
app.use(session({
    secret: "Grupo4MarketPlace",
    resave: true,
    saveUninitialized: true})); 
app.use(cookieParser());
    
app.use(userMiddleware);

app.use("/", homeRoutes);

app.use("/products", productsRoutes);

app.use("/admin", adminRoutes);

app.use("/users", usersRoutes);

app.use((req, res, next) => {
    res.status(404).render("404");
});

app.listen(port,()=>{
    console.log("http://localhost:3000/");
    console.log("http://localhost:3000/productCart");
    console.log("http://localhost:3000/admin");
    console.log("http://localhost:3000/users");
    console.log("http://localhost:3000/users/register");
});