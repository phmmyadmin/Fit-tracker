import json
import re
from pathlib import Path

json_path = Path("data/food_log.json")
public_json_path = Path("app/public/food_log.json")

data = json.loads(json_path.read_text(encoding="utf-8"))

for log in data.get("dailyLogs", []):
    new_intakes = []
    for intake in log.get("intakes", []):
        desc = intake.get("description", "")
        time_str = intake.get("time", "12:00")
        macros = intake.get("macros", {})
        
        # Strip prefixes like "Comida 1: ", "Desayuno: ", etc.
        clean_desc = re.sub(r'^(?:Comida|Desayuno|Cena|Snack|Merienda)\s*\d*:\s*', '', desc, flags=re.IGNORECASE)
        
        # Check if description contains "+" or " \+ " or " + "
        if "+" in clean_desc or "\\+" in clean_desc:
            parts = [p.strip() for p in re.split(r'\\?\+', clean_desc) if p.strip()]
            num_parts = len(parts)
            
            # Split macros equally across parts
            cals_part = Math.round(macros.get("calories", 0) / num_parts) if 'Math' in globals() else round(macros.get("calories", 0) / num_parts)
            prot_part = round(macros.get("protein", 0) / num_parts, 1)
            carbs_part = round(macros.get("carbs", 0) / num_parts, 1)
            fats_part = round(macros.get("fats", 0) / num_parts, 1)
            
            for part in parts:
                part_clean = re.sub(r'^(?:Comida|Desayuno|Cena|Snack|Merienda)\s*\d*:\s*', '', part, flags=re.IGNORECASE)
                new_intakes.append({
                    "time": time_str,
                    "description": part_clean,
                    "macros": {
                        "calories": cals_part,
                        "protein": prot_part,
                        "carbs": carbs_part,
                        "fats": fats_part
                    }
                })
        else:
            intake["description"] = clean_desc
            new_intakes.append(intake)
            
    log["intakes"] = new_intakes

json_path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
public_json_path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
print("Cleaned up historical composite intakes successfully.")
