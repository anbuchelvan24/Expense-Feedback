from langchain.prompts import ChatPromptTemplate
from data import ocr_text_detection


def promptcreation(formatted_expense):
    print(formatted_expense)
    query_text = """
    You have been provided with the following query and data:
    The response must be maximum of 500 characters

    Query:
    "Is this expense data enough? If not, what else is important to be provided? Is this reimbursable by company policies?"

    Data from Expense Form:
    {form_data}

    Data from Receipts of expenses by OCR:
    {ocr_data}

    Answer the following questions based on the provided context:

    1. Do these expenses comply with company policies regarding reimbursement?
    2. Do the data from the expense form match those obtained by OCR from the receipts?
    3. Is there any important information missing in the provided data?
    """.format(ocr_data=ocr_text_detection(),form_data=formatted_expense)
    return query_text