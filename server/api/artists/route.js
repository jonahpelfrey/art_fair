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
router.get('/:id', controller.getArtistById);
router.put('/:id', controller.updateArtist);
router.post('/', controller.createArtist);
router.delete('/:id', controller.removeArtistById);

module.exports = router;