const router = require('express').Router();

router.get('/dashboard',async(req, res) => {  
        
    res.json({
        error: false,
        data: {
            tile: 'mi ruta protegida',
            user: req.user
        }
    })   
});

module.exports = router;