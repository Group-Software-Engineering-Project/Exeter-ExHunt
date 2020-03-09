var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    res.render('hunter/hunter_loop')
    console.log(req.session.hunter_track)
});

module.exports = router;