'use strict';

/** 
 * =============================================================================
 * Imports
 * =============================================================================
 */
var express = require('express');
var controller = require('./artist.controller');
var router = express.Router();


/** 
 * =============================================================================
 * Routes
 * =============================================================================
 */
router.get('/artists/:id', controller.getArtist);
router.get('/artists/all', controller.getAllArtists);
router.post('/artists/create', controller.createArtist);

module.exports = router;