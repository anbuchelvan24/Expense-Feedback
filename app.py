from flask import Flask, request, jsonify
from PyPDF2 import PdfReader
from io import BytesIO
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

@app.route('/process-pdf', methods=['POST'])
def process_pdf():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    pdf_file = request.files['file']
    if pdf_file.filename == '':
        return jsonify({'error': 'No selected file'})

    if pdf_file:
        try:
            pdf_text = extract_text_from_pdf(pdf_file)
            return jsonify({'text': pdf_text})
        except Exception as e:
            return jsonify({'error': str(e)})

def extract_text_from_pdf(pdf_file):
    pdf_reader = PdfReader(BytesIO(pdf_file.read()))
    pdf_text = ''
    for page in pdf_reader.pages:
        pdf_text += page.extract_text()
    return pdf_text

if __name__ == '__main__':
    app.run(debug=True)
