const express = require('express');

const {
    allMessage,
    sendMessage,
    clearAllMessage
} = require('../controllers/MessageController')

const { protect } = require('../middleware/AuthMiddleware')

const router = express.Router();

// router.route("/:chatId").get(protect, allMessage);
// router.route("/").post(protect, sendMessage);
router.route("/:userId").get(allMessage);
router.route("/").post(sendMessage);
router.route("/:userId").delete(clearAllMessage);


module.exports = router;