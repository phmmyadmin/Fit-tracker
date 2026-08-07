import json
import re
from pathlib import Path

json_path = Path("data/food_log.json")
public_json_path = Path("app/public/food_log.json")

data = json.loads(json_path.read_text(encoding="utf-8"))

def clean_description(desc):
    if not desc:
        return ""
    
    # Strip unwanted prefix phrases
    patterns_to_remove = [
        r'^\s*(?:Añadido|añadido|Añadidos|añadidos)\s*:?\s*',
        r'^\s*(?:Comidas?\s+acumuladas?|comidas?\s+acumuladas?)\s*:?\s*',
        r'^\s*(?:Comidas?\s+del\s+día|comidas?\s+del\s+día)\s*:?\s*',
        r'^\s*(?:Momento|Alimento|Resumen|Progreso)\s*:?\s*',
        r'^\s*(?:Desayuno|Comida|Cena|Snack|Merienda)\s*\d*\s*:?\s*',
        r'^\s*-\s*',
        r'^\s*\*\s*'
    ]
    
    text = desc
    for pat in patterns_to_remove:
        text = re.sub(pat, '', text, flags=re.IGNORECASE)
        
    text = text.strip()
    
    # If string starts with lowercase, capitalize first letter
    if text:
        text = text[0].upper() + text[1:]
        
    return text

cleaned_count = 0

for log in data.get("dailyLogs", []):
    for intake in log.get("intakes", []):
        old_desc = intake.get("description", "")
        new_desc = clean_description(old_desc)
        if old_desc != new_desc:
            intake["description"] = new_desc
            cleaned_count += 1

json_path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
public_json_path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")

print(f"Cleaned {cleaned_count} food descriptions in JSON database.")
