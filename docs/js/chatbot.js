async function sendMessage() {
  const message = userInput.value.trim();
  if (message) {
    addMessage('user', message);
    userInput.value = '';

    try {
      // Show loading indicator
      addMessage('bot', 'Thinking...');

      // Call your Flask backend server hosted on Vercel
      const response = await fetch('uc-berkeley-ml-ai-capstone-work-sample-chatbot.vercel.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // Remove loading indicator
      messagesContainer.removeChild(messagesContainer.lastChild);

      // Add bot's response
      addMessage('bot', data.response);
    } catch (error) {
      console.error('Error:', error);
      addMessage('bot', 'Sorry, I encountered an error. Please try again later.');
    }
  }
}
