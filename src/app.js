/*IMPORTS*/
const express = require('express');
const app = express();
const path = require('path');
const handlebars = require('express-handlebars');
const http = require('http');
const server =http.createServer(app);
const io = require('socket.io')(server);

/*ROUTES*/
const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carts.router.js');
const viewsRouter = require('./routes/views.router.js');
const ProductManager = require('./dao/ProductManager.js');

/*VARS*/
const PORT = 8080;
const productManager = new ProductManager();

/*HANDLEBARS START*/
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


/*Manager Public Folder*/
app.use(express.static(path.join(__dirname, 'public')));

/*RENDER*/
app.get('/', (req, res) => {
    const products = productManager.getProducts();
    res.render('home', {title: "WILLY Ecommerce", products: products});
});

/*SOCKET*/
io.on("connection", socket =>{
    console.log("Usuario conectado")
    socket.on("disconnect", () => {
        console.log("Usuario desconectado")
    })
})

/*Middlewars*/
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/*Routes*/
app.use("/", productsRouter);
app.use("/", cartsRouter);
app.use("/", viewsRouter);

/*Respuesta del Puerto*/
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = server;
module.exports = io;