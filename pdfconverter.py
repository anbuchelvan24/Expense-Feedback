import pytesseract
from PIL import Image
import cv2
import os
import numpy as np
import pandas as pd
from pdf2image import convert_from_path

# Define helper functions
def get_conf(page_gray):
    '''Returns the average confidence value of OCR result'''
    df = pytesseract.image_to_data(page_gray, output_type='data.frame')
    df.drop(df[df.conf == -1].index, inplace=True)
    return df.conf.mean()

def deskew(image):
    '''Deskew the image'''
    gray = cv2.bitwise_not(image)
    temp_arr = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
    coords = np.column_stack(np.where(temp_arr > 0))
    angle = cv2.minAreaRect(coords)[-1]
    if angle < -45:
        angle = -(90 + angle)
    else:
        angle = -angle
    (h, w) = image.shape[:2]
    center = (w // 2, h // 2)
    M = cv2.getRotationMatrix2D(center, angle, 1.0)
    rotated = cv2.warpAffine(image, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
    return rotated

# Main part of OCR
OCR_dic = {} 
file_list = ["SamplePDF.pdf"]  # Make sure 'SamplePDF.pdf' is in the same directory
PATH = os.getcwd()  # Get the current directory

for file in file_list:
    # Convert PDF into images
    pdf_images = convert_from_path(os.path.join(PATH, file))
    
    # Initialize DataFrame to save each PDF's text
    pages_df = pd.DataFrame(columns=['conf', 'text'])
    
    for i, page in enumerate(pdf_images):
        try:
            # Convert page image to array and grayscale
            page_arr = np.asarray(page)
            page_arr_gray = cv2.cvtColor(page_arr, cv2.COLOR_BGR2GRAY)
            
            # Preprocess image (e.g., deskew)
            page_deskew = deskew(page_arr_gray)
            
            # Calculate confidence value
            page_conf = get_conf(page_deskew)
            
            # Extract text
            page_text = pytesseract.image_to_string(page_deskew)
            
            # Append to DataFrame
            pages_df = pages_df._append({'conf': page_conf, 'text': page_text}, ignore_index=True)
        
        except Exception as e:
            # If OCR fails, log the exception
            print(f"Failed to process page {i + 1} of {file}: {e}")
            pages_df = pages_df._append({'conf': -1, 'text': 'N/A'}, ignore_index=True)
            continue
    
    # Save DataFrame to dictionary with filename as key
    OCR_dic[file] = pages_df
    print(f'{file} is processed')

# Print the result for the first file
print(OCR_dic[file_list[0]])
