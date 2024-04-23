const router = require('express').Router();
// const User = require('../models/User');
const Joi = require('@hapi/joi');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//validation rules
const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
})


//validacion de credenciales
router.post('/login', async(req,res)=>{
    //validacion de req
    const {error} = schemaLogin.validate(req.body);
    if(error) return res.status(400).json({error:true, message: error.details[0].message});
    try{
        
//     //se encripta la contra
        // const salt = await bcryptjs.genSalt(10);
        // const password = await bcryptjs.hash("test",salt);

        const user = process.env.USER;
        const pwd = process.env.PASSWORD;
        //validacion de correo
        if(user==req.body.email) return res.status(400).json({error: true, message: 'Email no es valido'});
        //valida contraseña        
        const passValidate = await bcryptjs.compare(req.body.password,pwd);
        if(!passValidate) return res.status(400).json({error: true, message: 'Contraseña invalida'});

        const token = jwt.sign({
            name: user
        },process.env.TOKEN_SECRET);

        res.header('auth-token', token).json({
            error:false,
            data: {token}
        });        
        
    } catch (error) {
        res.status(500).json({error:true, message:"Exception "+error});
    }
});

module.exports = router;