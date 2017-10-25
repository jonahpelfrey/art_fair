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
router.get('/', controller.getAllArtists);
router.post('/', controller.createArtist);
router.put('/:id', controller.updateArtist);
router.get('/:id', controller.getArtistById);

module.exports = router;