from pymongo import MongoClient
from PyPDF2 import PdfFileReader
from pdf2image import convert_from_bytes
from PIL import Image
import pytesseract
from bson.objectid import ObjectId
import io
import requests
import os

pytesseract.pytesseract.tesseract_cmd = 'C:/Program Files/Tesseract-OCR/tesseract.exe'

def ocr_text_detection():
    try:
        # Get the file ID from your Flask app
        response = requests.get('http://localhost:3000/id')
        response.raise_for_status()
        file_id = ObjectId(response.text)

        # Connect to MongoDB
        client = MongoClient(os.getenv("MONGO_URI"))
        db = client['userDataDB']

        fs_files = db['uploads.files']
        fs_chunks = db['uploads.chunks']  # Collection for file chunks

        # Retrieve the file metadata
        file = fs_files.find_one({'_id': file_id})
        if not file:
            print("File not found.")
            return

        # Reconstruct the file from chunks
        chunks = list(fs_chunks.find({'files_id': file_id}).sort('n'))
        reconstructed_file = io.BytesIO()
        for chunk in chunks:
            reconstructed_file.write(chunk['data'])

        reconstructed_file.seek(0)

        # Check if the file is a PDF
        if file['contentType'] == 'application/pdf':
            # Convert PDF to images
            images = convert_from_bytes(reconstructed_file.read(), fmt='jpeg')
            text = ""
            # Process each page image using PyTesseract
            for image in images:
                text += pytesseract.image_to_string(image)
        else:
            # Process other file types as images using PyTesseract
            text = pytesseract.image_to_string(Image.open(reconstructed_file))

        print(text)

        # Link OCR results with the expense record
        users_collection = db['users']

        # Retrieve the user associated with the file
        user = users_collection.find_one({'details.receiptFileId': file_id})
        if user:
            # Update the expense detail with OCR text
            for detail in user['details']:
                if detail.get('receiptFileId') == file_id:
                    detail['ocrText'] = text
                    break
            users_collection.update_one({'_id': user['_id']}, {'$set': {'details': user['details']}})
        else:
            print("User not found for the given file ID.")

        return text
    except requests.RequestException as e:
        print(f"HTTP Request failed: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    ocr_text_detection()
