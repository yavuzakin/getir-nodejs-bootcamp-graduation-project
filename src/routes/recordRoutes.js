const express = require('express');
const recordController = require('../controllers/recordController');
const recordValidation = require('../validations/recordValidation');
const validate = require('../middlewares/validate');

const router = express.Router();

router.route('/').post(validate(recordValidation.recordPost, 'body'), recordController.fetchData);

module.exports = router;