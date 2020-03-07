var express = require('express');
var trackViewer = express.Router();

trackViewer.get('/view_track', function(req, res, next) {
    res.render('view_track', { title: 'Track Viewer' });
});

module.exports = trackViewer;