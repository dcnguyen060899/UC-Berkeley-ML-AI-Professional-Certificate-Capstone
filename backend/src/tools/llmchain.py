from langchain.chains import LLMChain
from langchain.prompts.prompt import PromptTemplate

from llm import llm, memory

prompt = PromptTemplate(
    template="""
    Instructions:
    Do not answer any questions that do not relate to programs offered by mosaic and information about said programs.
    Do not answer any questions using pre-trained knowledge, only use the information provided in the context.
    Always provide linked information to the programs in form of URL list.

    ChatHistory:{chat_history}
    Question: {input}
    """,
    input_variables = ["chat_history", "input"]
)
chat_chain = LLMChain(llm=llm, prompt=prompt, memory=memory)
