document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = 'https://uc-berkeley-ml-ai-capstone-work-sample.onrender.com/chat'; // Replace with your actual backend API URL
    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbotContainer = document.getElementById("chatbot-container");
    const chatOutput = document.getElementById("chatbot-messages");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    // Introduce the chatbot when the page loads
    function sendWelcomeMessage() {
        const welcomeMessage = "Hello! I'm your Berkeley AI Data Scientist Assistant. How can I help you today?";
        addMessage('bot', welcomeMessage);
    }
    
    // Toggle chatbot visibility
    chatbotToggle.addEventListener("click", function () {
        chatbotContainer.classList.toggle("closed");
    });

    // Send message to the chatbot
    sendButton.addEventListener("click", function () {
        const userMessage = userInput.value.trim();

        if (userMessage) {
            // Display user's message
            chatOutput.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
            userInput.value = ""; // Clear input field

            // Send message to the backend
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            })
            .then(response => response.json())
            .then(data => {
                // Display bot's response
                chatOutput.innerHTML += `<p><strong>Bot:</strong> ${data.response}</p>`;
                chatOutput.scrollTop = chatOutput.scrollHeight; // Auto-scroll to the bottom
            })
            .catch(error => {
                console.error('Error:', error);
                chatOutput.innerHTML += `<p><strong>Bot:</strong> Sorry, something went wrong. Please try again later.</p>`;
            });
        }
    });

    // Allow sending message with Enter key
    userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendButton.click();
        }
    });
    
    // Add a message to the chat output
    function addMessage(sender, text) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = text;
        chatOutput.appendChild(messageElement);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }
});
