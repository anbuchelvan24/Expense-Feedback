from pymongo import MongoClient
from PyPDF2 import PdfFileReader
from pdf2image import convert_from_bytes
from PIL import Image
import pytesseract
from bson.objectid import ObjectId
import io
import requests

pytesseract.pytesseract.tesseract_cmd = 'C:/Program Files/Tesseract-OCR/tesseract.exe'

def ocr_text_detection():
    response = requests.get('http://localhost:3000/id')

    client = MongoClient('mongodb://localhost:27017/')
    db = client['files']

    fs_files = db['uploads.files']
    fs_chunks = db['uploads.chunks']  # Collection for file chunks

# Retrieve the file metadata
    file_id = ObjectId(response.text)  # change this to the id in your db

    file = fs_files.find_one({'_id': file_id})
    if not file:
        print("File not found.")
        exit(1)

    chunks = list(fs_chunks.find({'files_id': file_id}))
    chunk_size = file['length']
    total_chunks = len(chunks)

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
    return text
