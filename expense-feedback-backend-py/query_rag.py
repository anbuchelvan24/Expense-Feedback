import ollama


def query_rag(prompt):

    stream = ollama.chat(
        model='phi3',
        messages=[{'role': 'user', 'content': prompt}],
        stream=True,
    )

    for chunk in stream:
        yield chunk['message']['content']
