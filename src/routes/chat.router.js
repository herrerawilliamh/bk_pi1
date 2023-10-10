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
        console.log(error)
    }
})
/*POST*/
router.post('/', async (req, res) => {
    let { username, message } = req.body;
    if(!username || !message){
        res.send({ status: "error", error: "Faltan datos" })
    }
    let result = await messageModel.create({ username, message })
    res.send({ status: "success", payload: result })
})

module.exports = router;