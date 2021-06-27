const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//conexion bdd
const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@test.pfqtg.mongodb.net/veterinaria?retryWrites=true&w=majority`;

mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log('Conectado a bdd'))
    .catch(e => console.log(e));


//usar router
const authRoutes = require('./routes/auth');
const validateToken = require('./routes/middleware/validate-auth');
const admin = require('./routes/admin');

app.use('/api',authRoutes);
//ruta protegida por middleware
app.use('/api/admin',validateToken, admin);

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`listen port ${port}`);
})