const mongoose = require('mongoose');
const Message = require('../models/Message');
const huggingfaceClient = require('../utils/huggingfaceClient');

// Create a new message
exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    
    // Validate input
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Received message:', message); // Added logging

    // Save user message to database
    const userMessage = new Message({
      text: message,
      sender: 'user',
      timestamp: new Date()
    });
    await userMessage.save();

    // Generate AI response
    const aiResponseText = await huggingfaceClient.generateConstitutionResponse(message);

    // Save AI response to database
    const aiMessage = new Message({
      text: aiResponseText,
      sender: 'ai',
      timestamp: new Date()
    });
    await aiMessage.save();

    // Respond to client
    res.status(200).json({
      userMessage: userMessage.text,
      aiResponse: aiMessage.text
    });

  } catch (error) {
    console.error('Detailed error in sendMessage:', error.stack);
    res.status(500).json({ 
      error: 'Failed to process message', 
      details: error.message,
      stack: error.stack // Include stack trace for debugging
    });
  }
};

// Fetch message history
exports.getMessageHistory = async (req, res) => {
  try {
    // Retrieve last 50 messages, sorted by timestamp
    const messages = await Message.find()
      .sort({ timestamp: 1 })
      .limit(50);

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching message history:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve message history', 
      details: error.message 
    });
  }
};

// Clear message history
exports.clearMessageHistory = async (req, res) => {
  try {
    await Message.deleteMany({});
    res.status(200).json({ message: 'Message history cleared successfully' });
  } catch (error) {
    console.error('Error clearing message history:', error);
    res.status(500).json({ 
      error: 'Failed to clear message history', 
      details: error.message 
    });
  }
};

module.exports = exports;