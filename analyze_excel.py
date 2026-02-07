import pandas as pd
import sys
import json

def analyze_excel(file_path):
    """Analyze Excel file structure"""
    try:
        # Read all sheets
        xls = pd.ExcelFile(file_path)
        print(f"File: {file_path}")
        print(f"Sheets: {xls.sheet_names}\n")
        
        for sheet_name in xls.sheet_names:
            df = pd.read_excel(file_path, sheet_name=sheet_name)
            print(f"=== Sheet: {sheet_name} ===")
            print(f"Rows: {len(df)}")
            print(f"Columns: {list(df.columns)}")
            print(f"\nFirst 3 rows:")
            print(df.head(3).to_string())
            print("\n" + "="*80 + "\n")
            
    except Exception as e:
        print(f"Error analyzing Excel: {str(e)}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python analyze_excel.py <excel_path>")
        sys.exit(1)
    
    analyze_excel(sys.argv[1])
