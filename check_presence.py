import os

base_dir = os.getcwd()
json_path = os.path.join(base_dir, 'public', 'data', 'investors.json')
output_path = os.path.join(base_dir, 'presence_check.txt')
search_term = "Dale Ventures"

try:
    with open(json_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    with open(output_path, 'w', encoding='utf-8') as out:
        if search_term in content:
            out.write("Found")
        else:
            out.write("Not Found")
            
except Exception as e:
    with open(output_path, 'w', encoding='utf-8') as out:
        out.write(f"Error: {e}")
