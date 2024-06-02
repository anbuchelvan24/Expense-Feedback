from langchain_community.vectorstores import Chroma
from get_embedding_function import get_embedding_function

CHROMA_PATH = "chroma"

def context_creation():    
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
    3. Is there any important information missing in the provided data?
    4. What were items purchased/ expense made that you recognized from the receipts?
    """

    embedding_function = get_embedding_function()
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)
    results = db.similarity_search_with_score(data, k=3)

    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])