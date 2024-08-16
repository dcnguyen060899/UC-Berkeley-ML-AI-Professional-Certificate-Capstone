import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

const ChatMessage = ({ sender, message }) => (
  <div className={`mb-4 ${sender === 'AI Agent' ? 'text-blue-600' : sender === 'Booking.com' ? 'text-green-600' : 'text-red-600'}`}>
    <strong>{sender}:</strong> {message}
  </div>
);

const simulationScript = [
  { sender: 'Booking.com', message: "We need a model to predict customer churn for our premium users." },
  { sender: 'AI Agent', message: "Understood. Let me provide some context for the McKinsey team. At Booking.com, 'premium users' are those who book more than 5 times a year with an average transaction value exceeding €1000. Our current churn rate for this segment is 15%, and reducing it by 20% would significantly impact our annual revenue." },
  { sender: 'McKinsey', message: "Thanks for the context. We could use a Random Forest model with features like booking frequency, average spend, and last booking date." },
  { sender: 'AI Agent', message: "While those features are relevant, our data shows that for premium users, factors like customer service interactions and loyalty program engagement are highly correlated with retention. Also, our current system uses a decision tree model for segmentation, so a Random Forest would integrate well." },
  { sender: 'Booking.com', message: "That's right, we've found our loyalty program to be crucial for retention." },
  { sender: 'McKinsey', message: "I see. We'll definitely incorporate loyalty program data. Can we access detailed customer service logs?" },
  { sender: 'AI Agent', message: "Booking.com's customer service data is stored in a NoSQL database. I'll provide you with the API documentation for secure access. Remember, due to GDPR, we need to ensure all personally identifiable information is properly anonymized before use in the model." },
  { sender: 'Booking.com', message: "Good point about GDPR. We can't afford any compliance issues." },
  { sender: 'McKinsey', message: "Understood. We'll ensure full GDPR compliance. For model evaluation, we typically use AUC-ROC. Would that work?" },
  { sender: 'AI Agent', message: "While AUC-ROC is a good technical metric, Booking.com prioritizes business impact metrics. I suggest we also include the projected revenue saved from prevented churn. Based on historical data, each retained premium customer brings an average annual revenue of €12,000." },
  { sender: 'Booking.com', message: "Exactly. We need to see the direct financial impact of the model." },
  { sender: 'McKinsey', message: "Got it. We'll incorporate both AUC-ROC and projected revenue saved in our evaluation metrics." },
  { sender: 'AI Agent', message: "Great. I'll prepare a project brief summarizing these points: the use of Random Forest, inclusion of loyalty and customer service data, GDPR compliance measures, and dual evaluation metrics. I'll share this with both teams for confirmation before we proceed to the next stage." },
  { sender: 'Booking.com', message: "This looks promising. It seems we're all aligned on the objectives and approach." },
  { sender: 'McKinsey', message: "Agreed. This context will help us deliver a much more relevant and usable model for Booking.com." }
];

export default function AIAgentMeetingSimulation() {
  const [messages, setMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < simulationScript.length) {
      const timer = setTimeout(() => {
        setMessages(prev => [...prev, simulationScript[currentIndex]]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 2000);  // Adjust timing as needed
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">AI Agent Meeting Simulation: Booking.com and McKinsey</h2>
      <ScrollArea className="h-96 mb-4 p-4 border rounded">
        {messages.map((msg, index) => (
          <ChatMessage key={index} sender={msg.sender} message={msg.message} />
        ))}
      </ScrollArea>
      <div className="text-center text-gray-500">
        {currentIndex >= simulationScript.length ? "Simulation complete" : "Simulating meeting..."}
      </div>
    </div>
  );
}
