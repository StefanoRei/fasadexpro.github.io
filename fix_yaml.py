import os
import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        lines = f.readlines()

    new_lines = []
    in_accordion = False
    in_content = False
    
    for line in lines:
        stripped = line.strip()
        
        if stripped.startswith('accordion:'):
            in_accordion = True
            new_lines.append(line)
            continue
            
        if stripped == '---' and in_accordion:
            in_accordion = False
            in_content = False
            new_lines.append(line)
            continue
            
        if in_accordion:
            if stripped.startswith('- title:'):
                in_content = False
                # Indent - title by 2 spaces
                new_lines.append('  ' + stripped + '\n')
            elif stripped.startswith('content:'):
                in_content = True
                # Indent content by 4 spaces
                new_lines.append('    ' + stripped + '\n')
            elif in_content and stripped:
                # Indent content text by 6 spaces
                new_lines.append('      ' + stripped + '\n')
            else:
                new_lines.append(line)
        else:
            new_lines.append(line)

    with open(filepath, 'w') as f:
        f.writelines(new_lines)
    print(f"Fixed {filepath}")

root_dir = os.path.dirname(os.path.abspath(__file__))

for root, dirs, files in os.walk(root_dir):
    if 'services' in root:
        for file in files:
            if file == 'index.html':
                if 'razrabotka' in root and 'ru' in root: # Skip the one I manually fixed if problematic, but logic should handle it or I can overwrite
                    pass
                fix_file(os.path.join(root, file))
