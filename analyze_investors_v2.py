import json
from collections import Counter
import os

output_file = 'investor_analysis_result.txt'

try:
    with open('public/data/investors.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        sources = [item.get('source', 'Unknown') for item in data]
        
        with open(output_file, 'w', encoding='utf-8') as out:
            out.write("Unique sources found in investors.json:\n")
            for source, count in Counter(sources).items():
                out.write(f"- {source}: {count} records\n")
    print(f"Analysis complete. Written to {output_file}")
except Exception as e:
    print(f"Error: {e}")
