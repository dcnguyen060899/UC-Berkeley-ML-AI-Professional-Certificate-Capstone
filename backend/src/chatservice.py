from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_openai import OpenAI
from agent import generate_response, generate_evaluation_response
import os

class ChatService:
    def __init__(self, api_key):
        self.api_key = api_key
        self.template = """Question: {question}

        Answer: Let's think step by step."""
        self.prompt = PromptTemplate(template=self.template, input_variables=["question"])
    def get_evaluation_response(self, user_message):
        response = generate_evaluation_response(user_message)
        return response

    def get_response(self, user_message):
        response = generate_response(user_message)
        return response

