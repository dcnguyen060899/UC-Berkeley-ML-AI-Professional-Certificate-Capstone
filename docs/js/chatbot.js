document.addEventListener("DOMContentLoaded", function () {
    const chatbotContainer = document.getElementById("chatbot-container");
    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbotMessages = document.getElementById("chatbot-messages");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    // Function to toggle the chatbot visibility
    function toggleChatbot() {
        if (chatbotContainer.classList.contains("closed")) {
            chatbotContainer.classList.remove("closed");
            chatbotToggle.textContent = "v"; // Change the toggle button to "v" when open
        } else {
            chatbotContainer.classList.add("closed");
            chatbotToggle.textContent = "^"; // Change the toggle button to "^" when closed
        }
    }

    // Function to send a message
    function sendMessage() {
        const message = userInput.value.trim();
        if (message !== "") {
            appendMessage("You", message); // Append user's message
            userInput.value = ""; // Clear the input field

            // Send the message to the server (replace with your actual server endpoint)
            fetch("/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: message }),
            })
            .then(response => response.json())
            .then(data => {
                appendMessage("Berkeley AI Assistant", data.response);
            })
            .catch(error => {
                console.error("Error:", error);
                appendMessage("Berkeley AI Assistant", "Sorry, something went wrong.");
            });
        }
    }

    // Function to append messages to the chat window
    function appendMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("chat-message");

        const senderElement = document.createElement("strong");
        senderElement.textContent = `${sender}: `;
        messageElement.appendChild(senderElement);

        const textElement = document.createElement("span");
        textElement.textContent = message;
        messageElement.appendChild(textElement);

        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Auto-scroll to the latest message
    }

    // Event listeners
    chatbotToggle.addEventListener("click", toggleChatbot);
    sendButton.addEventListener("click", sendMessage);

    // Allow sending messages with the "Enter" key
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});
