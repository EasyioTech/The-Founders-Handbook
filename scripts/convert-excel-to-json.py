"""
Excel to JSON Converter for Investor/VC Database
Converts multiple Excel files into a consolidated JSON format
"""
import pandas as pd
import json
import os
from pathlib import Path

# Define the base path
BASE_PATH = Path(__file__).parent.parent / "resources"
OUTPUT_PATH = Path(__file__).parent.parent / "public" / "data"

# Excel files to process
EXCEL_FILES = {
    "indian_vc_jumbo": "Indian Angel Investor + VC Data (Jumbo Pack).xlsx",
    "indian_vc": "Indian VC Access File.xlsx",
    "uae_middle_east": "UAE-Middle East Angel Investors List.xlsx",
    "us_uae_eu": "US UAE EU VC List.xlsx"
}

def standardize_columns(df, source_file):
    """Standardize column names across different Excel files"""
    # Create a mapping of possible column names to standard names
    column_mapping = {
        # Name variations
        'name': 'name',
        'investor name': 'name',
        'vc name': 'name',
        'firm name': 'name',
        'company': 'name',
        'angel name': 'name',
        
        # Type variations
        'type': 'type',
        'investor type': 'type',
        'category': 'type',
        
        # Geography variations
        'geography': 'geography',
        'location': 'geography',
        'region': 'geography',
        'country': 'geography',
        'city': 'city',
        
        # Stage variations
        'stage': 'stage',
        'investment stage': 'stage',
        'funding stage': 'stage',
        
        # Focus variations
        'focus': 'focus',
        'sector': 'focus',
        'industry': 'focus',
        'focus area': 'focus',
        'verticals': 'focus',
        
        # Contact variations
        'email': 'email',
        'contact email': 'email',
        'linkedin': 'linkedin',
        'website': 'website',
        'url': 'website',
        
        # Additional info
        'ticket size': 'ticket_size',
        'check size': 'ticket_size',
        'investment size': 'ticket_size',
        'description': 'description',
        'notes': 'notes',
        'portfolio': 'portfolio'
    }
    
    # Normalize column names (lowercase, strip spaces)
    df.columns = df.columns.str.lower().str.strip()
    
    # Rename columns based on mapping
    renamed_cols = {}
    for col in df.columns:
        if col in column_mapping:
            renamed_cols[col] = column_mapping[col]
    
    df = df.rename(columns=renamed_cols)
    
    return df

def process_excel_file(file_path, source_name, source_geography):
    """Process a single Excel file and return standardized data"""
    print(f"Processing {file_path}...")
    
    try:
        # Read Excel file
        xls = pd.ExcelFile(file_path)
        all_data = []
        
        # Process each sheet
        for sheet_name in xls.sheet_names:
            print(f"  Reading sheet: {sheet_name}")
            df = pd.read_excel(file_path, sheet_name=sheet_name)
            
            if df.empty:
                continue
            
            # Standardize columns
            df = standardize_columns(df, source_name)
            
            # Add source metadata
            df['source'] = source_name
            df['source_geography'] = source_geography
            
            # Convert to dict records
            records = df.to_dict('records')
            all_data.extend(records)
        
        print(f"  Extracted {len(all_data)} records from {file_path}")
        return all_data
        
    except Exception as e:
        print(f"  Error processing {file_path}: {str(e)}")
        return []

def clean_investor_data(investors):
    """Clean and validate investor data"""
    cleaned = []
    
    for inv in investors:
        # Skip empty records
        if not inv.get('name') or pd.isna(inv.get('name')):
            continue
        
        # Clean up the record
        clean_inv = {}
        for key, value in inv.items():
            # Skip NaN values
            if pd.isna(value):
                continue
            # Convert to string and strip
            if isinstance(value, str):
                value = value.strip()
                if value:  # Only add non-empty strings
                    clean_inv[key] = value
            else:
                clean_inv[key] = value
        
        cleaned.append(clean_inv)
    
    return cleaned

def main():
    """Main conversion function"""
    print("Starting Excel to JSON conversion...")
    print(f"Base path: {BASE_PATH}")
    
    all_investors = []
    
    # Geography mapping
    geography_map = {
        "indian_vc_jumbo": "India",
        "indian_vc": "India",
        "uae_middle_east": "UAE & Middle East",
        "us_uae_eu": "US, UAE & EU"
    }
    
    # Process each Excel file
    for source_key, filename in EXCEL_FILES.items():
        file_path = BASE_PATH / filename
        
        if not file_path.exists():
            print(f"Warning: File not found: {file_path}")
            continue
        
        data = process_excel_file(
            file_path, 
            source_key,
            geography_map.get(source_key, "Unknown")
        )
        all_investors.extend(data)
    
    # Clean the data
    print("\nCleaning investor data...")
    all_investors = clean_investor_data(all_investors)
    
    # Create output directory if it doesn't exist
    OUTPUT_PATH.mkdir(parents=True, exist_ok=True)
    
    # Save to JSON
    output_file = OUTPUT_PATH / "investors.json"
    print(f"\nSaving {len(all_investors)} investors to {output_file}...")
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_investors, f, indent=2, ensure_ascii=False)
    
    print(f"✓ Successfully created {output_file}")
    print(f"✓ Total investors: {len(all_investors)}")
    
    # Generate summary statistics
    print("\n=== Summary Statistics ===")
    df = pd.DataFrame(all_investors)
    
    if 'source_geography' in df.columns:
        print("\nBy Geography:")
        print(df['source_geography'].value_counts())
    
    if 'type' in df.columns:
        print("\nBy Type:")
        print(df['type'].value_counts())
    
    print("\n✓ Conversion complete!")

if __name__ == "__main__":
    main()
