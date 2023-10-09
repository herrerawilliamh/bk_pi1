/*IMPORTS*/
const express = require('express');
const app = express();
const path = require('path');
const handlebars = require('express-handlebars');
const http = require('http');
const server =http.createServer(app);
const io = require('socket.io')(server);
const { default: mongoose } = require('mongoose');
const Swal = require("sweetalert2");

/*ROUTES*/
const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carts.router.js');
const viewsRouter = require('./routes/views.router.js');
const usersRouter = require('./routes/users.router.js');
const chatRouter = require('./routes/chat.router.js')
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
    console.log("Usuario conectado");
    socket.on("newUser", (username) => {
        users[socket.id]=username
        io.emit("userConnected", username)
    })
    socket.on("chatMessage", (message) => {
        const username = users[socket.id]
        io.emit("message", {username: username, message: message})
    })
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
app.use("/api/users", usersRouter);
app.use("/chat", chatRouter);

/*Configuración de Mongoose*/
mongoose.connect("mongodb+srv://herrerawilliamh:ydGbNCY5mXBYPU1w@cluster0.ncftrzr.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("Conectado a la Base de datos");
})
.catch((error) => {
    console.log("Error al conectarse a la base de datos",error);
});

/*Respuesta del Puerto*/
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = server;
module.exports = io;