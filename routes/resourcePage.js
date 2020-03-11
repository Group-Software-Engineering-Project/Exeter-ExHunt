// routes/ressourcePage.js
const express = require('express');
const resourcePageRouter = express.Router();

// route to ressources page
resourcePageRouter.get('/', function(req, res, next) {
    res.render('resourcesPage', { title: 'Resources'});
});

module.exports = resourcePageRouter;