import pdfplumber
import json
import sys

def extract_pdf_text(pdf_path):
    """Extract text from PDF file"""
    text_content = []
    
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for page_num, page in enumerate(pdf.pages, 1):
                text = page.extract_text()
                if text:
                    text_content.append(f"=== Page {page_num} ===\n{text}\n")
        
        return "\n".join(text_content)
    except Exception as e:
        return f"Error extracting PDF: {str(e)}"

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extract_pdf.py <pdf_path>")
        sys.exit(1)
    
    pdf_path = sys.argv[1]
    print(extract_pdf_text(pdf_path))
