import time
from langchain.vectorstores.chroma import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain_community.llms.ollama import Ollama
import ollama
from get_embedding_function import get_embedding_function
from prompt_creation import promptcreation


CHROMA_PATH = "chroma"

PROMPT_TEMPLATE = """
Answer the questions based on the following context and previous prompts:
{context}
{question}
"""

def query_rag(query_text):
    start_time = time.time()
    # Prepare the DB.
    embedding_function = get_embedding_function()
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

    # Search the DB.
    results = db.similarity_search_with_score(query_text, k=5)

    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])

    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)
    # print(prompt)

    # model = Ollama(model="phi3")
    # response_text = model.invoke(prompt)

    stream = ollama.chat(
    model='phi3',
    messages=[{'role': 'user', 'content': prompt}],
    stream=True,
    )

    response=""
    for chunk in stream:
        # print(chunk['message']['content'], end='', flush=True)
        response+=chunk['message']['content']

    return response
    # sources = [doc.metadata.get("id", None) for doc, _score in results]
    # formatted_response = f"Response: {response_text}"
    # print(formatted_response)
    # end_time = time.time()
    # return response_text
