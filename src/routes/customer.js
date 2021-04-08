const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

router.get('/', customerController.list);
router.post('/add', customerController.add);
router.get('/delete/:id', customerController.delete);
router.get('/edit/:id', customerController.edit);
router.post('/edit/:id', customerController.editPost);

module.exports = router;