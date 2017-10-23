'use strict';

/** 
 * =============================================================================
 * Imports
 * =============================================================================
 */
var express = require('express');
var controller = require('./volunteer.controller');
var router = express.Router();


/** 
 * =============================================================================
 * Routes
 * =============================================================================
 */
router.get('/volunteers/:id', controller.getVolunteer);
router.get('/volunteers/all', controller.getAllVolunteers);
router.post('/volunteers/create', controller.createVolunteer);

module.exports = router;