const router = require('express').Router();
const User = require('../models/User');
const Joi = require('@hapi/joi');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

//validation rules
const SchemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
})
const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
})

//registro de usuarios
router.post('/register',async(req, res) => {
    //validacion de req
    const {error} = SchemaRegister.validate(req.body);
    if(error){
     return res.status(400).json({error:true, message: error.details[0].message});
    }
    //email unico
    const emailUnique = await User.findOne({email:req.body.email});
    if(emailUnique){
        return res.status(400).json({error: true,message:"Correo ya existe"});
    }
    //se encripta la contra
    const salt = await bcryptjs.genSalt(10);
    const password = await bcryptjs.hash(req.body.password,salt);

    //armamos el DTO
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password: password,
    });
    
    try {
        //se guarda en mongo el usuario
        const userDB = await user.save();
        
        res.json({
            error: false,
            data: userDB
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error
        });
    }

});
//validacion de credenciales
router.post('/login', async(req,res)=>{
    //validacion de req
    const {error} = schemaLogin.validate(req.body);
    if(error) return res.status(400).json({error:true, message: error.details[0].message});
    try{
        //validacion de correo
        const user = await User.findOne({email:req.body.email});
        if(!user) return res.status(400).json({error: true, message: 'Email no encontrado'});
        //valida contraseña        
        const passValidate = await bcryptjs.compare(req.body.password,user.password);
        if(!passValidate) return res.status(400).json({error: true, message: 'Contraseña invalida'});

        const token = jwt.sign({
            name: user.name,
            id: user._id
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