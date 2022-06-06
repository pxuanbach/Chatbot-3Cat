const express = require('express');

const {
    allMessage,
    sendMessage
} = require('../controllers/MessageController')

const { protect } = require('../middleware/AuthMiddleware')

const router = express.Router();

// router.route("/:chatId").get(protect, allMessage);
// router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(allMessage);
router.route("/").post(sendMessage);


module.exports = router;