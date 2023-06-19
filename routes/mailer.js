const express = require("express")
const subscribe  = require("../controllers/subsribe");
const router = express.Router();

router.post('/subscribe', subscribe.subscriber);

module.exports = router;