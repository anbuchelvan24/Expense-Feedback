from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient, GridFS
from prompt_creation import promptcreation
from query_rag import query_rag
import os
import gridfs
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient(os.getenv("MONGO_URI"))
db = client['userDataDB']
users_collection = db['users']
fs = gridfs.GridFS(db)

@app.route('/submit-expense', methods=['POST'])
def submit_expense():
    expense_data = request.form

    email = expense_data['email']
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

    # Process receipt if uploaded
    receipt_file_id = None
    if 'receipt' in request.files:
        receipt_file = request.files['receipt']
        receipt_file_id = fs.put(receipt_file, filename=receipt_file.filename, contentType=receipt_file.content_type)

    formatted_expense = {
        "transactionDate": transaction_date,
        "businessPurpose": business_purpose,
        "vendorDescription": vendor_description,
        "city": city,
        "paymentType": payment_type,
        "amount": amount,
        "currency": currency,
        "taxAndPostedAmount": tax_posted_amount,
        "personalExpense": personal_expense,
        "comment": comment,
        "receiptFileId": receipt_file_id
    }

    response_from_query_rag = query_rag(promptcreation(formatted_expense))
    print(response_from_query_rag)

    formatted_expense['responseFromQueryRag'] = response_from_query_rag

    user = users_collection.find_one({"email": email})
    if user:
        users_collection.update_one({"email": email}, {"$push": {"details": formatted_expense}})
    else:
        users_collection.insert_one({"email": email, "details": [formatted_expense]})

    return jsonify(response_from_query_rag)

@app.route('/user-expenses/<email>', methods=['GET'])
def get_user_expenses(email):
    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"message": "User not found"}), 404

    details = user.get("details", [])
    for detail in details:
        if "receiptFileId" in detail:
            receipt_file_id = detail["receiptFileId"]
            if receipt_file_id:
                detail["receipt"] = f"/receipt/{receipt_file_id}"

    return jsonify(details)

@app.route('/receipt/<file_id>', methods=['GET'])
def get_receipt(file_id):
    file = fs.find_one({"_id": ObjectId(file_id)})
    if not file:
        return jsonify({"message": "Receipt not found"}), 404

    return app.response_class(file.read(), mimetype=file.content_type)

if __name__ == '__main__':
    app.run(debug=True)
