const router = require('express').Router();
const verify = require('./varifyToken')

router.get('/', verify, (req, res) => {
    res.send(res.UserID)
})

module.exports = router;