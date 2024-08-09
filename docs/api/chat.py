import os
import openai
from flask import Flask, request, jsonify
from llama_index.agent.openai import OpenAIAgent
from llama_index.llms.openai import OpenAI
from pydantic import BaseModel
from typing import List

# Initialize Flask app
app = Flask(__name__)

# Set up OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY", "your-openai-api-key-here")

# Initialize the OpenAI LLM and Agent
llm = OpenAI(model="gpt-4", temperature=0.7)
agent = OpenAIAgent.from_tools(
    system_prompt="""
    You are an expert data scientist specializing in healthcare analytics, with a focus on predicting hospital length of stay...
    """,
    llm=llm,
    verbose=True
)

# Define a route for the chatbot
@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400
    
    try:
        # Get the response from the agent
        response = agent.chat(user_message)
        return jsonify({'response': response}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
