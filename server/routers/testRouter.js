const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('testRouter /');
    return res.status(200).send("testRouter /");
});

module.exports = router;