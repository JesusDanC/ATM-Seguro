const express = require('express');
const router = express.Router();
const { verificarAuth } = require('../middlewares/auth');

router.get('/', verificarAuth );

module.exports = router;
