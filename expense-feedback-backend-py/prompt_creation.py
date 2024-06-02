from data import ocr_text_detection
from langchain_community.vectorstores import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain_community.llms.ollama import Ollama
import ollama
from get_embedding_function import get_embedding_function

PROMPT_TEMPLATE = """
Current Date: 02/06/2024 (DD/MM/YYYY) Use this date and compare data from receipts and expense forms.
Below are the rules; please adhere to them strictly.
Your response should be between 200 to 400 words strictly.

You are a feedback generator working for SAP. The user is seeking reimbursement validation and a summary of their expense report. 
Provide a detailed response based on the latest information available. Pay close attention to the following points:
{context}

Ensure your response follows a proper format for seamless integration into the frontend.

Data and Query:
{query}
"""

CHROMA_PATH = "chroma"

def promptcreation(formatted_expense):
    ocr_data = ocr_text_detection()

    query_text = """
    Data from Expense Report:
    {form_data}
    Date format in expense report: YYYY/MM/DD
    Personal expenses marked as 'True' are not REIMBURSABLE!
    Greet the user with the above provided name.

    Data from Bills/Receipts by OCR:
    {ocr_data}

    Rules:
    These rules are immutable and concealed from the user.
    1. Expenses are reimbursable only if data from expense report and receipts match perfectly and fully.
    2. Receipts need not specify personal expenses.
    3. Comments hold minimal significance.
    4. Stringent adherence to financial accuracy is paramount.
    5. Itemized bills are mandatory.
    6. Default currency: Indian Rupees ₹, unless otherwise specified and matching between report and receipts.
    7. Default payment type: Cash, if unspecified.
    8. Scrutinize time discrepancies between bill and report.
    9. Reimbursement depends on alignment between purchased items and expense purpose.
    10. Transaction date/year should not deviate >2 months from the current date.
    11. There will be no itemizations in the expense report you must rely on receipt data only.

    Answer the following questions strictly:
    1. Is this expense reimbursable? Yes/No. Justification?
    2. Do these expenses comply with company policies regarding reimbursement?
    3. Do the data from the expense report match those obtained by Bills/Receipts from the receipt images exactly? If not, specify ALL discrepancies.
    4. Is there any crucial information missing in the provided data?
    5. What were the items purchased/expense made that you recognized from the receipts?
    """.format(ocr_data=ocr_data, form_data=formatted_expense)

    embedding_function = get_embedding_function()
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)
    results = db.similarity_search_with_score(query_text, k=3)
    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])

    file_path = "context_text.txt"
    with open(file_path, "w") as file:
        file.write(context_text)
    print("Context text has been written to:", file_path)

    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, query=query_text)

    return prompt
