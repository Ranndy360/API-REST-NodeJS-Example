const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).json({error: true, message: 'Acceso denegado'});

    try {
        const verify = jwt.verify(token,process.env.TOKEN_SECRET);
        req.user = verify;
        next();
    } catch (error) {
        return res.status(500).json({error: true, message: error});
    }
}

module.exports = verifyToken;