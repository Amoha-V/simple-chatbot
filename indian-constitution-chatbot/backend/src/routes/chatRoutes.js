
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Route to handle sending a message
// Expects: { message: "Your message text" } in the request body
router.post('/send', chatController.sendMessage);

// Route to fetch the message history
// Retrieves the last 50 messages, sorted by timestamp
router.get('/history', chatController.getMessageHistory);

// Route to clear all message history
// Deletes all messages from the database
router.delete('/clear', chatController.clearMessageHistory);

// Export the router to be used in the server
module.exports = router;
