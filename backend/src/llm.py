from langchain_openai import ChatOpenAI
from langchain_openai.embeddings import OpenAIEmbeddings
from langchain.chains.conversation.memory import ConversationBufferMemory
import os
from dotenv import load_dotenv

#Load variables usinig dotenv
load_dotenv()

# LLM
llm = ChatOpenAI(
    openai_api_key = os.getenv("OPENAI_API_KEY"),
    model = os.getenv("OPENAI_API_MODEL"),
)

#Embeddings for Vector Search Index
embeddings = OpenAIEmbeddings(
    openai_api_key = os.getenv("OPENAI_API_KEY"),
)

#Memory that uses all conversation 
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
