const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('API Routes!');
});

module.exports = router;