import json
import re
from pathlib import Path

json_path = Path("data/food_log.json")
public_json_path = Path("app/public/food_log.json")

data = json.loads(json_path.read_text(encoding="utf-8"))

junk_patterns = [
    r'^\s*Actual\s*$',
    r'^\s*Del día hasta ahora\s*$',
    r'^\s*Sábado\s+\d+\s*$',
    r'^\s*Previo a la cena\s*$',
    r'^\s*Recamara\s*/\s*Snack:\s*$'
]

purged_count = 0

for log in data.get("dailyLogs", []):
    valid_intakes = []
    for intake in log.get("intakes", []):
        desc = intake.get("description", "").strip()
        
        # Check if description matches any junk pattern
        if any(re.match(p, desc, re.IGNORECASE) for p in junk_patterns):
            purged_count += 1
            continue
            
        # Strip unmatched leading '(' or trailing ')'
        desc = re.sub(r'^\s*\(\s*', '', desc)
        desc = re.sub(r'\s*\)\s*$', '', desc)
        
        intake["description"] = desc.strip()
        if intake["description"]:
            valid_intakes.append(intake)
            
    log["intakes"] = valid_intakes

json_path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
public_json_path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")

print(f"Purged {purged_count} non-food junk entries from DB.")
