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
router.get('/', controller.getAllVolunteers);
router.get('/:id', controller.getVolunteerById);
router.put('/:id', controller.updateVolunteer);
router.post('/', controller.createVolunteer);
router.delete('/:id', controller.removeVolunteerById);

module.exports = router;