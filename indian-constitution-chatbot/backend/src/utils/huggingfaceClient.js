const { HfInference } = require('@huggingface/inference');

class HuggingFaceChatbot {
  constructor() {
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    if (!apiKey) {
      console.error('Hugging Face API Key is missing.');
      process.exit(1);
    }
    
    this.hf = new HfInference(apiKey);
  }

  async generateConstitutionResponse(message) {
    try {
      console.log('Sending message to Hugging Face API:', message);
      
      // Use a more explicit inference method
      const response = await this.hf.textGeneration({
        model: 'facebook/blenderbot-400M-distill',
        inputs: message,
        parameters: {
          max_new_tokens: 100, // Limit response length
        }
      });
  
      console.log('Hugging Face API full response:', JSON.stringify(response, null, 2));
      
      // Ensure we extract the generated text correctly
      const generatedText = response.generated_text || 
        (response.output ? response.output[0] : 'No response generated');
      
      return generatedText;
    } catch (error) {
      console.error('Detailed Hugging Face API Error:', {
        message: error.message,
        stack: error.stack,
        responseData: error.response ? JSON.stringify(error.response) : 'No response data'
      });
      
      // Fallback response
      return "I'm having trouble generating a response right now.";
    }
  }
}

module.exports = new HuggingFaceChatbot();