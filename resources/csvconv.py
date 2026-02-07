import os
import pandas as pd

def convert_excel_to_csv():
    # Get the current working directory (where this script is located)
    current_directory = os.getcwd()
    
    # List all files in the directory
    files = os.listdir(current_directory)
    
    # Filter for Excel files
    excel_files = [f for f in files if f.endswith(('.xlsx', '.xls'))]
    
    if not excel_files:
        print("No Excel files found in this directory.")
        return

    print(f"Found {len(excel_files)} Excel file(s). Starting conversion...\n")

    for file in excel_files:
        try:
            # Construct the full file path
            file_path = os.path.join(current_directory, file)
            
            # Read the Excel file (default loads the first sheet)
            # engine='openpyxl' is for .xlsx, 'xlrd' is for .xls usually auto-detected
            df = pd.read_excel(file_path)
            
            # Create the new CSV filename
            # os.path.splitext removes the extension so we can add .csv
            csv_filename = os.path.splitext(file)[0] + '.csv'
            csv_path = os.path.join(current_directory, csv_filename)
            
            # Save to CSV (index=False prevents pandas from adding a row number column)
            df.to_csv(csv_path, index=False, encoding='utf-8')
            
            print(f"✅ Successfully converted: {file} -> {csv_filename}")
            
        except Exception as e:
            print(f"❌ Error converting {file}: {e}")

    print("\nAll tasks completed.")

if __name__ == "__main__":
    convert_excel_to_csv()