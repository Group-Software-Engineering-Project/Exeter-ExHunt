var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    res.render('hunter/hunter_loop')
});

module.exports = router;