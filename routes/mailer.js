const express = require("express");
const subscribe = require("../controllers/subsribe");
const router = express.Router();

router.post("/subscribe", subscribe.subscriber);
router.post("/subscribe-email", subscribe.subscriber_email);
router.post("/message", subscribe.message);
router.post("/distributor", subscribe.distributor);
router.post("/resume", subscribe.resume);

module.exports = router;
