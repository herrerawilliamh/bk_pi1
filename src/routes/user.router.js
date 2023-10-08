const { Router } = require('express');
const { userModel } = require('../dao/models/user.model');

const router = Router();

/*GET*/
router.get('/', async (req, res) => {
    try {
        let users = await userModel.find();
        res.send({ result:"success", payload:users })
    } catch (error) {
        console.log(error)
    }
})
/*POST*/
router.post('/', async (req, res) => {
    
})
/*UPDATE*/
/*DELETE*/