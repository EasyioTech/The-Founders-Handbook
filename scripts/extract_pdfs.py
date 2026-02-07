"""
PDF Content Extractor
Extracts text content from PDF files and converts to structured markdown
"""
import pdfplumber
import re
from pathlib import Path

BASE_PATH = Path(__file__).parent.parent / "resources"
OUTPUT_PATH = Path(__file__).parent.parent / "public" / "content"

def clean_text(text):
    """Clean extracted text"""
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text)
    # Remove extra newlines
    text = re.sub(r'\n\s*\n\s*\n+', '\n\n', text)
    return text.strip()

def extract_pdf_content(pdf_path, output_name):
    """Extract content from PDF and save as markdown"""
    print(f"Extracting content from {pdf_path.name}...")
    
    try:
        content = []
        content.append(f"# {output_name}\n\n")
        content.append("> This content was extracted from the PDF guide in the resources folder.\n\n")
        
        with pdfplumber.open(pdf_path) as pdf:
            for page_num, page in enumerate(pdf.pages, 1):
                text = page.extract_text()
                
                if text:
                    cleaned = clean_text(text)
                    if cleaned:
                        content.append(f"## Page {page_num}\n\n")
                        content.append(f"{cleaned}\n\n")
                        content.append("---\n\n")
        
        # Combine all content
        full_content = "".join(content)
        
        # Create output directory
        OUTPUT_PATH.mkdir(parents=True, exist_ok=True)
        
        # Save to file
        output_file = OUTPUT_PATH / f"{output_name.lower().replace(' ', '-')}.md"
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(full_content)
        
        print(f"✓ Saved to {output_file}")
        print(f"✓ Extracted {len(pdf.pages)} pages")
        
        return output_file
        
    except Exception as e:
        print(f"Error extracting PDF: {str(e)}")
        return None

def main():
    """Main extraction function"""
    print("Starting PDF extraction...\n")
    
    # PDF files to process
    pdfs = [
        {
            "filename": "Complete Fundraising Guide (Course).pdf",
            "output_name": "Complete Fundraising Guide"
        },
        {
            "filename": "Cold-Outreach-Guide---Pitch-deck-templates-2025-16-11-04-28-51.pdf",
            "output_name": "Cold Outreach Guide"
        }
    ]
    
    for pdf_info in pdfs:
        pdf_path = BASE_PATH / pdf_info["filename"]
        
        if not pdf_path.exists():
            print(f"Warning: File not found: {pdf_path}")
            continue
        
        extract_pdf_content(pdf_path, pdf_info["output_name"])
        print()
    
    print("✓ PDF extraction complete!")

if __name__ == "__main__":
    main()
