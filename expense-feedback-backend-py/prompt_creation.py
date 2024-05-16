from langchain.prompts import ChatPromptTemplate
from data import ocr_text_detection


def promptcreation(formatted_expense):
    print(formatted_expense)
    query_text = """
    You have been provided with the following query and data:
    The response must be minimum 400 characters and maximum of 700 characters

    Query:
    "Is this expense data enough? If not, what else is important to be provided? Is this reimbursable by company policies?"

    Data from Expense Form:
    {form_data}

    Data from Receipts of expenses by OCR:
    {ocr_data}
    
    Rules:
    1. OCR data is not required to mention whether it was an personal expense or not.
    2. Comments are not very important.
    3. You must be very strict with the data as it involves money.

    Answer the following questions based on the provided context and rules strictly and you should not hallucinate:

    1. Do these expenses comply with company policies regarding reimbursement?
    2. Do the data from the expense form match those obtained by OCR from the receipt images exactly?! 
    If it doesn't, what data doesn't match!? 
    Does the amount match!? Display the amounts,business purpose,transaction date,payment type,city,vendor company name,currency type, personal expense from both the form and OCR if they dont match.
    3. Is there any important information missing in the provided data?
    """.format(ocr_data=ocr_text_detection(),form_data=formatted_expense)
    print(ocr_text_detection())
    return query_text