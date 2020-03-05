const { Router } = require('express');
const router = Router();
const push = require('../Controllers/Push');

router.post('/receiver', push.Process);

module.exports = router;