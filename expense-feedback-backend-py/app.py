from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from prompt_creation import promptcreation
from query_rag import query_rag

app = Flask(__name__)
CORS(app) 
@app.route('/submit-expense', methods=['POST'])
def submit_expense():
    # Get the form data from the request
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

    formatted_expense = f"Transaction date: {transaction_date},\n" \
                        f"Business purpose: {business_purpose},\n" \
                        f"Vendor description: {vendor_description},\n" \
                        f"City: {city},\n" \
                        f"Payment type: {payment_type},\n" \
                        f"Amount: {amount},\n" \
                        f"Currency: {currency},\n" \
                        f"Tax posted amount: {tax_posted_amount},\n" \
                        f"Comment: {comment},\n" \
                        f"Personal expense: {personal_expense}"

    # Return response including the success message and the response from query_rag
    return Response(query_rag(promptcreation(formatted_expense)), mimetype='text/plain')

if __name__ == '__main__':
    app.run(debug=True)