from flask import Flask, request, Response
from flask_cors import CORS
from prompt_creation import promptcreation
import ollama

app = Flask(__name__)
CORS(app)

def query_rag(prompt):
    stream = ollama.chat(
        model='phi3',
        messages=[{'role': 'user', 'content': prompt}],
        stream=True,
    )
    for chunk in stream:
        yield f"{chunk['message']['content']}"


@app.route('/submit-expense', methods=['POST','GET'])
def submit_expense():
    expense_data = request.json

    transaction_date = expense_data['transactionDate']
    business_purpose = expense_data['businessPurpose']
    vendor_description = expense_data['vendorDescription']
    city = expense_data['city']
    payment_type = expense_data['paymentType']
    amount = expense_data['amount']
    currency = expense_data['currency']
    tax_posted_amount = expense_data['taxAndPostedAmount']
    personal_expense = expense_data['personalExpense']
    comment = expense_data['comment']
    name=expense_data['name']

    formatted_expense = f"Transaction date: {transaction_date},\n" \
                        f"Business purpose: {business_purpose},\n" \
                        f"Vendor description: {vendor_description},\n" \
                        f"City: {city},\n" \
                        f"Payment type: {payment_type},\n" \
                        f"Amount: {amount},\n" \
                        f"Currency: {currency},\n" \
                        f"Tax posted amount: {tax_posted_amount},\n" \
                        f"Comment: {comment},\n" \
                        f"Personal expense: {personal_expense},\n"\
                        f"Name: {name}"

    print(formatted_expense)
    
    def generate():
        prompt = promptcreation(formatted_expense)
        for chunk in query_rag(prompt):
            yield chunk

    return generate(), {"Content-Type": "text/plain"}


if __name__ == '__main__':
    app.run(debug=True)
