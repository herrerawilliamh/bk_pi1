const { Router } = require('express');
const { chatModel } = require('../dao/models/message.model');

const router = Router();

/*GET*/
router.get('/', async (req, res) => {
    res.render('chat', {title: "WILLY Ecommerce - Contacto"})
    try {
        let messages = await chatModel.find();
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
    let result = await chatModel.create({ username, message })
    res.send({ status: "success", payload: result })
})

module.exports = router;