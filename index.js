const express = require('express');
const bodyParser = require('body-parser');
const { config } = require("./config");
const { logErrors,errorHandler,clientErrorHandler, wrapErrors} = require("./utils/middleware/errorHandlers");

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//validacion CORS
if(config.dev)
    app.use(cors());
else{
    const corsOptions = {origin: "https:dominio.com"};
    app.use(corst(corsOptions));
}

//usar router
const authRoutes = require('./routes/auth');
const validateToken = require('./utils/middleware/validate-auth');
const admin = require('./routes/admin');

app.use('/api',authRoutes);
//ruta protegida por middleware
app.use('/api/admin',validateToken, admin);

// error handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

const port = config.portServer || 3000;
app.listen(port,()=>{
    console.log(`listen port ${port}`);
})