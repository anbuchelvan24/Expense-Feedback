from data import ocr_text_detection
from langchain.vectorstores.chroma import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain_community.llms.ollama import Ollama
import ollama
from get_embedding_function import get_embedding_function

PROMPT_TEMPLATE = """
[THE RESPONSE MUST BE VERY PERFECT! DON'T HALLUCINATE YOURSELF. GIVE RESPONSES ONLY BASED ON INFORMATION YOU GET BELOW]
Minimum words: 200 words and Maximum words: 400 words
You are a feedback generator. The user is asking about reimbursements validation. Provide a detailed and informative response based on the latest information available. Make sure to cover the following points:
{context}
Ensure your response is clear and concise.
At first, let the user know whether it's reimbursable or not clearly and shortly.
Query:
{query}
"""

CHROMA_PATH = "chroma"

def promptcreation(formatted_expense):
    print(formatted_expense)
    # Extract OCR data
    ocr_data = ocr_text_detection()

    # Prepare the query text with formatted data
    query_text = """
    You have been provided with the following query and data:

    Query:
    "Is this expense data enough? If not, what else is important to be provided? Is this reimbursable by company policies?"

    Data from Expense Form:
    {form_data}
    If personal expense is "on" then it's not reimbursable else proceed with the following.

    Data from Receipts of expenses from Bills/Receipts by OCR:
    From the below data recognize amounts, business purpose, transaction date, payment type, city, vendor company name, currency type. These will be the only things that will be available in the receipt.
    If the data below doesn't look like data from receipts, generate a negative prompt that says "Need relevant recept data for reimbursement" (Exact words)
    Total amount will be in the bill, you don't have to calculate.
    {ocr_data}

    Rules:
    1. Receipts/Bills data is not required to mention whether it was an personal expense or not.
    2. Comments are not very important.
    3. You must be very strict with the data as it involves money.
    4. The bills must have itemizations (items that have been purchased)
    5. If no currency type is given in receipt, default to Indian Rupees ₹. If given, the currency type from expense form and currency type from receipts must match.
    6. If no payment type is provided, default to Cash

    Answer the following questions based on the provided context and RULES strictly and you should not hallucinate:

    1. Is this expense reimbursable? Yes or No?
    2. Do these expenses comply with company policies regarding reimbursement?
    3. Do the data from the expense form match those obtained by Bills/Receipts from the receipt images exactly? 
    If it doesn't, what data doesn't match? 
    Does the amount match? Display the amounts, business purpose, transaction date, payment type, city, vendor company name, currency type, personal expense from both the form and OCR if they don't match.
    4. Is there any important information missing in the provided data?
    """.format(ocr_data=ocr_data, form_data=formatted_expense)

    # Combine data for embedding search
    data = """
    These data will be from Expense Form:

    Amounts: The total cost of the expenses incurred and taxes if present.
    Business Purpose: The reason or motive behind each expense.
    Transaction Date: The date when the expense transaction occurred.
    Payment Type: The method used for payment, such as cash, card, UPI, or bank transfer.
    City: The location where the expense was made.
    Vendor Company Name: The name of the company or vendor from which the goods or services were purchased.
    Currency Type: The type of currency used for the transaction, such as USD, EUR, or INR.
    Personal Expense: Indication whether the expense is personal or business-related.


    Answer the following questions based on the provided context and RULES strictly and you should not hallucinate:
    1. Do these expenses comply with company policies regarding reimbursement?
    2. Do the data from the expense form strictly match those recgognized from Bills/Receipts exactly?  If it doesn't, what data doesn't match? 
    4. Does the amount match? Display the amounts, business purpose, transaction date, payment type, city, vendor company name, currency type, personal expense from both the form and OCR if they don't match.
    3. Is there any important information missing in the provided data?
    """.format(form_data=formatted_expense, ocr_data=ocr_data)

    # Initialize embedding function and database
    embedding_function = get_embedding_function()
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

    # Perform similarity search
    results = db.similarity_search_with_score(data, k=5)

    # Extract context from results
    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])

    # Create and format the prompt template
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, query=query_text)

    return prompt