import os
import re

languages = ['en', 'zh', 'ar', 'tr']
base_dirs = ['projects', 'services']
root_path = os.path.dirname(os.path.abspath(__file__))

def process_file(file_path, lang):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            front_matter = parts[1].strip('\n')
            body = parts[2]
            
            # Update or add lang field
            if re.search(r'^lang:', front_matter, re.MULTILINE):
                front_matter = re.sub(r'^lang:.*', f'lang: {lang}', front_matter, flags=re.MULTILINE)
            else:
                front_matter = f"lang: {lang}\n" + front_matter
            
            # Reconstruct with proper newlines
            return f"---\n{front_matter}\n---{body}"
    return content

for lang in languages:
    for base in base_dirs:
        src_base = os.path.join(root_path, base)
        dest_base = os.path.join(root_path, lang, base)
        
        if not os.path.exists(src_base):
            continue
            
        for item in os.listdir(src_base):
            if item in ['css', 'js', 'images']: continue
            
            src_dir = os.path.join(src_base, item)
            if os.path.isdir(src_dir):
                dest_dir = os.path.join(dest_base, item)
                os.makedirs(dest_dir, exist_ok=True)
                
                # Copy index.md or index.html
                for filename in ['index.md', 'index.html']:
                    src_file = os.path.join(src_dir, filename)
                    if os.path.exists(src_file):
                        dest_file = os.path.join(dest_dir, filename)
                        if os.path.exists(dest_file):
                            # Skip overwriting translated file
                            continue
                        new_content = process_file(src_file, lang)
                        with open(dest_file, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Created {lang}/{base}/{item}/{filename}")
