document.addEventListener('DOMContentLoaded', () => {
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  const messagesContainer = document.getElementById('chatbot-messages');

  chatbotToggle.addEventListener('click', () => {
    chatbotContainer.classList.toggle('closed');
    chatbotToggle.textContent = chatbotContainer.classList.contains('closed') ? '^' : 'v';
  });

  sendButton.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  async function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
      addMessage('user', message);
      userInput.value = '';

      try {
        // Show loading indicator
        addMessage('bot', 'Thinking...');

        // Call your Flask backend server hosted on Vercel
        const response = await fetch('https://uc-berkeley-ml-ai-capstone-work-sample.onrender.com/chat', {
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

  function addMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = text;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
});
