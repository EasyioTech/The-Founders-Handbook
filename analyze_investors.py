import json
from collections import Counter

try:
    with open('public/data/investors.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        sources = [item.get('source', 'Unknown') for item in data]
        print("Unique sources found in investors.json:")
        for source, count in Counter(sources).items():
            print(f"- {source}: {count} records")
except Exception as e:
    print(f"Error reading investors.json: {e}")
