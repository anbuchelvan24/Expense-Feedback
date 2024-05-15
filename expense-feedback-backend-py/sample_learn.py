import requests
import json

url = 'http://localhost:5000/submit-expense'
data = {
    'transactionDate': '2024-05-16',
    'businessPurpose': 'Office supplies',
    'vendorDescription': 'ABC Company',
    'city': 'New York',
    'paymentType': 'Credit card',
    'amount': 100.50,
    'currency': 'USD',
    'taxAndPostedAmount': 105.00,
    'personalExpense': False,
    'comment': 'For office use'
}

# Send POST request with JSON data
response = requests.post(url, json=data)

print(response.text)