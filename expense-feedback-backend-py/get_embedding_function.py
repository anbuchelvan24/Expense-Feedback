from langchain_community.embeddings.ollama import OllamaEmbeddings
from langchain_community.embeddings.bedrock import BedrockEmbeddings
from chromadb.utils import embedding_functions

def get_embedding_function():
    # Choose the appropriate embeddings based on device availability
    embeddings = OllamaEmbeddings(model="nomic-embed-text")
    
    return embeddings