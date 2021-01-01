const express = require('express');
const app = express();
const path = require("path");
const homeRoutes = require("./routes/home"); 
const productsRoutes = require("./routes/products"); 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use("/", homeRoutes);

app.use("/products", productsRoutes);



// app.get("/productCart", (req, res)=>{
//     res.sendFile(path.resolve("./public/pages/productCart.html"));
// });

// app.get("/register", (req, res)=>{
//     res.sendFile(path.resolve("./public/pages/register.html"));
// });

// app.get("/login", (req, res)=>{
//     res.sendFile(path.resolve("./public/pages/login.html"));
// });

app.get("/admin", (req, res)=>{
    res.sendFile(path.resolve("./public/pages/admin.html"));
});


app.listen(3000,()=>{
    console.log("http://localhost:3000/");
});