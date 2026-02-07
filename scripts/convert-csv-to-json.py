"""
CSV to JSON Converter for Investor/VC Database
Converts CSV files into a consolidated JSON format
"""
import pandas as pd
import json
import os
from pathlib import Path

# Define the base path
BASE_PATH = Path(__file__).parent.parent / "resources"
OUTPUT_PATH = Path(__file__).parent.parent / "public" / "data"

# CSV files to process (without duplicates)
CSV_FILES = {
    "indian_vc_jumbo": "Indian Angel Investor + VC Data (Jumbo Pack).csv",
    "indian_vc": "Indian VC Access File.csv",
    "uae_middle_east": "UAE-Middle East Angel Investors List.csv",
    "us_uae_eu": "US UAE EU VC List.csv"
}

def standardize_columns(df, source_file):
    """Standardize column names across different CSV files"""
    # Create a mapping of possible column names to standard names
    column_mapping = {
        # Name variations
        'name': 'name',
        'investor name': 'name',
        'vc name': 'name',
        'firm name': 'name',
        'company': 'name',
        'angel name': 'name',
        'company name': 'name',
        'fund name': 'name',
        'organization': 'name',
        
        # Type variations
        'type': 'type',
        'investor type': 'type',
        'category': 'type',
        'kind': 'type',
        
        # Geography variations
        'geography': 'geography',
        'location': 'geography',
        'region': 'geography',
        'country': 'geography',
        'city': 'city',
        'hq': 'city',
        'headquarters': 'city',
        
        # Stage variations
        'stage': 'stage',
        'investment stage': 'stage',
        'funding stage': 'stage',
        'stages': 'stage',
        
        # Focus variations
        'focus': 'focus',
        'sector': 'focus',
        'industry': 'focus',
        'focus area': 'focus',
        'verticals': 'focus',
        'sectors': 'focus',
        'industries': 'focus',
        'vertical': 'focus',
        
        # Contact variations
        'email': 'email',
        'contact email': 'email',
        'e-mail': 'email',
        'linkedin': 'linkedin',
        'linkedin url': 'linkedin',
        'linkedin profile': 'linkedin',
        'website': 'website',
        'url': 'website',
        'web': 'website',
        'site': 'website',
        
        # Additional info
        'ticket size': 'ticket_size',
        'check size': 'ticket_size',
        'investment size': 'ticket_size',
        'ticket': 'ticket_size',
        'description': 'description',
        'notes': 'notes',
        'portfolio': 'portfolio',
        'about': 'description',
        'bio': 'description',
        'overview': 'description',
        
        # Contact person
        'contact': 'contact_person',
        'contact name': 'contact_person',
        'partner': 'contact_person',
        'key person': 'contact_person',
        
        # Phone
        'phone': 'phone',
        'mobile': 'phone',
        'contact number': 'phone',
        'tel': 'phone',
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

def process_csv_file(file_path, source_name, source_geography):
    """Process a single CSV file and return standardized data"""
    print(f"Processing {file_path.name}...")
    
    try:
        # Read CSV file
        df = pd.read_csv(file_path, encoding='utf-8', on_bad_lines='skip')
        
        if df.empty:
            print(f"  Warning: Empty file {file_path}")
            return []
        
        # Standardize columns
        df = standardize_columns(df, source_name)
        
        # Add source metadata
        df['source'] = source_name
        df['source_geography'] = source_geography
        
        # Convert to dict records
        records = df.to_dict('records')
        
        print(f"  ✓ Extracted {len(records)} records from {file_path.name}")
        return records
        
    except Exception as e:
        print(f"  ✗ Error processing {file_path}: {str(e)}")
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
                if value and value.lower() not in ['nan', 'n/a', 'na', '-', '']:
                    clean_inv[key] = value
            elif isinstance(value, (int, float)):
                clean_inv[key] = value
        
        # Only add if we have a name
        if clean_inv.get('name'):
            cleaned.append(clean_inv)
    
    return cleaned

def main():
    """Main conversion function"""
    print("="*60)
    print("CSV to JSON Conversion for Investor Directory")
    print("="*60)
    print(f"Base path: {BASE_PATH}\n")
    
    all_investors = []
    stats = {}
    
    # Geography mapping
    geography_map = {
        "indian_vc_jumbo": "India",
        "indian_vc": "India",
        "uae_middle_east": "UAE & Middle East",
        "us_uae_eu": "US, UAE & EU"
    }
    
    # Process each CSV file
    for source_key, filename in CSV_FILES.items():
        file_path = BASE_PATH / filename
        
        if not file_path.exists():
            print(f"⚠ Warning: File not found: {filename}")
            print(f"  Looking in: {BASE_PATH}")
            continue
        
        data = process_csv_file(
            file_path, 
            source_key,
            geography_map.get(source_key, "Unknown")
        )
        all_investors.extend(data)
        stats[source_key] = len(data)
    
    # Clean the data
    print("\n" + "="*60)
    print("Cleaning and validating data...")
    print("="*60)
    
    before_count = len(all_investors)
    all_investors = clean_investor_data(all_investors)
    after_count = len(all_investors)
    
    print(f"  Before cleaning: {before_count} records")
    print(f"  After cleaning: {after_count} records")
    print(f"  Removed: {before_count - after_count} invalid records")
    
    # Create output directory if it doesn't exist
    OUTPUT_PATH.mkdir(parents=True, exist_ok=True)
    
    # Save to JSON
    output_file = OUTPUT_PATH / "investors.json"
    print(f"\n{'='*60}")
    print(f"Saving to {output_file}...")
    print("="*60)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_investors, f, indent=2, ensure_ascii=False)
    
    print(f"✓ Successfully created {output_file}")
    print(f"✓ Total investors: {len(all_investors)}")
    
    # Generate summary statistics
    print("\n" + "="*60)
    print("SUMMARY STATISTICS")
    print("="*60)
    
    print("\n📊 Records by Source:")
    for source, count in stats.items():
        print(f"  {source:20s}: {count:4d} records")
    
    if all_investors:
        df = pd.DataFrame(all_investors)
        
        if 'source_geography' in df.columns:
            print("\n🌍 By Geography:")
            geo_counts = df['source_geography'].value_counts()
            for geo, count in geo_counts.items():
                print(f"  {geo:20s}: {count:4d} investors")
        
        if 'type' in df.columns:
            print("\n💼 By Type:")
            type_counts = df['type'].value_counts()
            for inv_type, count in type_counts.items():
                print(f"  {str(inv_type):20s}: {count:4d} investors")
        
        if 'stage' in df.columns:
            print("\n📈 By Stage:")
            stage_counts = df['stage'].value_counts().head(10)
            for stage, count in stage_counts.items():
                print(f"  {str(stage):20s}: {count:4d} investors")
        
        # Count records with contact info
        print("\n📧 Contact Information:")
        if 'email' in df.columns:
            email_count = df['email'].notna().sum()
            print(f"  With email:          {email_count:4d} ({email_count/len(df)*100:.1f}%)")
        if 'linkedin' in df.columns:
            linkedin_count = df['linkedin'].notna().sum()
            print(f"  With LinkedIn:       {linkedin_count:4d} ({linkedin_count/len(df)*100:.1f}%)")
        if 'website' in df.columns:
            website_count = df['website'].notna().sum()
            print(f"  With website:        {website_count:4d} ({website_count/len(df)*100:.1f}%)")
    
    print("\n" + "="*60)
    print("✓ CONVERSION COMPLETE!")
    print("="*60)
    print(f"\nOutput file: {output_file}")
    print(f"Ready to use in your application!\n")

if __name__ == "__main__":
    main()
