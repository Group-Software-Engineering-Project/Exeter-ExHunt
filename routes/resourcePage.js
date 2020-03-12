const express = require('express');
const resourcePageRouter = express.Router();

// displays resource page
resourcePageRouter.get('/', function(req, res, next) {
    res.render('resourcesPage', { title: 'Resources'});
});

module.exports = resourcePageRouter;