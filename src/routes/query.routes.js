const express = require('express');
const router  = express.Router(); 
const queryController           = require('../controllers/query.controller');

router.post('/query',            queryController.createQuery)
router.get('/query/get/all',     queryController.getQuery)
router.delete('/query/delete/:id',queryController.deleteQuery)

module.exports = router;