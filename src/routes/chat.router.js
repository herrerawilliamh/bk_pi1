const { Router } = require('express');
const ChatManager = require('../dao/ChatManager');

const router = Router();
const chatManager = new ChatManager();
/*GET*/
router.get('/', async (req, res) => {
    try {
        res.render('chat', {title: "WILLY Ecommerce - Contacto"})
        const messages = await chatManager.getMessages();
        res.send({ result:"success", payload:messages })
    } catch (error) {
        console.log("Error al acceder al historial de mensajes", error)
    }
})
/*POST*/
router.post('/', async (req, res) => {
    try {
        const { username, message } = req.body;
        if(!username || !message){
            res.send({ status: "error", error: "Faltan datos" })
        }
        const savedMessage = await chatManager.saveMessage(username, message)
        res.send({ status: "success", payload: savedMessage })
    } catch (error) {
        console.log("Error al guardar el mensaje", error)
    }
})

module.exports = router;