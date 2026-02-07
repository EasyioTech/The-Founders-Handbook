import json
import os
from collections import Counter

# Use absolute paths based on where the script is run
base_dir = os.getcwd()
json_path = os.path.join(base_dir, 'public', 'data', 'investors.json')
output_path = os.path.join(base_dir, 'check_output.txt')

print(f"Reading from: {json_path}")
print(f"Writing to: {output_path}")

try:
    if not os.path.exists(json_path):
        print(f"Error: File not found at {json_path}")
        with open(output_path, 'w') as f:
            f.write(f"Error: File not found at {json_path}")
    else:
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            sources = [item.get('source', 'Unknown') for item in data]
            
            with open(output_path, 'w', encoding='utf-8') as out:
                out.write(f"Total records: {len(data)}\n")
                out.write("Unique sources:\n")
                for source, count in Counter(sources).items():
                    out.write(f"- {source}: {count}\n")
        print(f"Success. Check {output_path}")

except Exception as e:
    print(f"Exception: {e}")
    with open(output_path, 'w') as f:
        f.write(f"Exception: {e}")
