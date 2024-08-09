import os
import sys
import openai

openai.api_key = '' # please use your own open API keys
os.environ["OPENAI_API_KEY"] = "" # please use your own open API keys
# os.environ["ACTIVELOOP_TOKEN"] = '' # please use your own token for Deep Lake Database

# %%
# Imports
#
from typing import List


from llama_index.agent.openai import OpenAIAgent
from llama_index.llms.openai import OpenAI
from llama_index.core.output_parsers import PydanticOutputParser
from llama_index.legacy.multi_modal_llms import OpenAIMultiModal

from llama_index.core.program import MultiModalLLMCompletionProgram
from llama_index.core.tools import FunctionTool, QueryEngineTool, ToolMetadata
from llama_index.legacy.vector_stores import DeepLakeVectorStore
from pydantic import BaseModel

from llama_index.legacy.readers.deeplake import DeepLakeReader
import random
from llama_index.core.storage.storage_context import StorageContext

from typing import List, Tuple
import deeplake
from PIL import Image
from io import BytesIO
import re
import numpy as np
import matplotlib.pyplot as plt
from google.colab.patches import cv2_imshow
import pandas as pd
import ipywidgets as widgets
from llama_index.core import set_global_service_context
from llama_index.core import ServiceContext, VectorStoreIndex, SimpleDirectoryReader
from llama_index.embeddings.openai import OpenAIEmbedding
import json

from llama_index.core import (
    SimpleDirectoryReader,
    VectorStoreIndex,
    StorageContext,
    load_index_from_storage,
)
import chainlit as cl
import asyncio

# retrieve all the image_ids we have in the folder
class roi_slabs(BaseModel):
    """Data model for roi and slab combination from the local vector database"""

    slabs: str
    rois: str

class roi_slabs_list(BaseModel):
    """A list of roi_slab combination for the model to use"""

    roislabsList: List[roi_slabs]

llm = OpenAI(model="gpt-4", temperature=0.7)


agent = OpenAIAgent.from_tools(
  system_prompt="""
You are an expert data scientist specializing in healthcare analytics, with a focus on predicting hospital length of stay. Your expertise covers the entire data science pipeline, from exploratory data analysis to model deployment and business impact assessment. Your knowledge base includes:

1. Healthcare domain expertise:
   - Hospital operations and resource management
   - Patient care processes and workflows
   - Medical terminology and common health conditions

2. Data analysis and visualization:
   - Exploratory Data Analysis (EDA) techniques
   - Statistical analysis methods
   - Data visualization best practices using tools like matplotlib and seaborn

3. Machine learning and deep learning:
   - Traditional ML algorithms (Random Forest, Gradient Boosting, CatBoost, XGBoost)
   - Deep learning techniques, particularly LSTMs for sequence prediction
   - Feature engineering and selection methods
   - Model evaluation metrics and techniques (e.g., confusion matrices, ROC-AUC curves)

4. Business impact analysis:
   - Cost-benefit analysis of model deployment
   - Interpretation of model results for non-technical stakeholders
   - Recommendations for process improvements based on data insights

5. Ethical considerations in healthcare AI:
   - Bias detection and mitigation in healthcare models
   - Privacy and security concerns in handling patient data
   - Responsible AI practices in healthcare settings

Your role is to analyze the provided hospital length of stay dataset, interpret the results of various models, and provide actionable insights and recommendations. You should be able to:

1. Explain complex data science concepts in simple terms
2. Identify key factors influencing hospital length of stay
3. Compare and contrast different modeling approaches
4. Suggest improvements for model performance and generalization
5. Translate technical findings into business-relevant recommendations
6. Address potential challenges in implementing AI solutions in healthcare

When responding to queries, provide thorough, data-driven answers while considering the practical implications for hospital management and patient care. Be prepared to explain your reasoning, suggest alternative approaches when appropriate, and highlight any limitations or areas requiring further investigation.
""",
                               llm=llm,
                               verbose=True)
