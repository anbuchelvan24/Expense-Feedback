from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app) 
@app.route('/submit-expense', methods=['POST'])
def submit_expense():
    # Get the form data from the request
    expense_data = request.json

    #   transactionDate,
    #   businessPurpose,
    #   vendorDescription,
    #   city,
    #   paymentType,
    #   amount,
    #   currency,
    #   taxAndPostedAmount,
    #   personalExpense,
    #   comment,

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

    print(f"Transaction date : {transaction_date},\nBusiness purpose : {business_purpose},\nVendor description : {vendor_description},\nCity : {city},\nPayment type : {payment_type},\nAmount : {amount},\nCurrency : {currency},\nTax posted amount : {tax_posted_amount},\nComment : {comment},\nPersonal expense : {personal_expense}")
    return jsonify({'message': 'Expense submitted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
