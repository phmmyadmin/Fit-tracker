import re
import json
from pathlib import Path

md_path = Path("source/Calorías para Perder Grasa.md")
output_path = Path("data/food_log.json")

content = md_path.read_text(encoding="utf-8")

target_macros = {
    "calories": 1950,
    "protein": 145,
    "carbs": 195,
    "fats": 65
}

day_pattern = re.compile(r'(?:Lunes|Martes|Miércoles|Jueves|Viernes|Sábado|Domingo)\s+(\d{1,2})\s+de\s+(Julio|Agosto)', re.IGNORECASE)

lines = content.splitlines()

daily_logs = []
current_day = None
current_intakes = []
latest_totals = None

month_map = {"julio": "07", "agosto": "08"}

def parse_num(val_str):
    if not val_str:
        return 0.0
    clean = re.sub(r'[^\d.,]', '', val_str).replace(',', '.')
    try:
        return float(clean)
    except ValueError:
        return 0.0

def guess_time(item_name):
    name_lower = item_name.lower()
    if "desayuno" in name_lower or "mañana" in name_lower or "chicle" in name_lower or "ajo" in name_lower:
        return "08:30"
    elif "comida" in name_lower or "almuerzo" in name_lower or "plato" in name_lower:
        return "13:30"
    elif "merienda" in name_lower or "snack" in name_lower or "mango" in name_lower or "platano" in name_lower:
        return "17:00"
    elif "cena" in name_lower or "noche" in name_lower:
        return "20:30"
    return "12:00"

i = 0
while i < len(lines):
    line = lines[i]
    
    m = day_pattern.search(line)
    if m:
        day_num = int(m.group(1))
        month_name = m.group(2).lower()
        month_str = month_map.get(month_name, "07")
        date_str = f"2026-{month_str}-{day_num:02d}"
        
        if current_day and current_day != date_str:
            if latest_totals or current_intakes:
                daily_logs.append({
                    "date": current_day,
                    "intakes": current_intakes,
                    "dailyTotals": latest_totals or {"calories": 0, "protein": 0, "carbs": 0, "fats": 0}
                })
            current_intakes = []
            latest_totals = None
        current_day = date_str

    if "|" in line and ("Calorías" in line or "TOTAL" in line or "Progreso" in line or "Snack" in line or "Comida" in line or "Desayuno" in line or "Añadido" in line):
        parts = [p.strip() for p in line.split("|")[1:-1]]
        if len(parts) >= 5:
            item_name = re.sub(r'\*+', '', parts[0])
            if "TOTAL" in item_name.upper():
                cals = parse_num(parts[1] if len(parts) > 4 else parts[2])
                prot = parse_num(parts[2] if len(parts) > 4 else parts[3])
                carbs = parse_num(parts[3] if len(parts) > 4 else parts[4])
                fats = parse_num(parts[4] if len(parts) > 4 else parts[5])
                latest_totals = {
                    "calories": cals,
                    "protein": prot,
                    "carbs": carbs,
                    "fats": fats
                }
            elif not any(h in item_name for h in ["Momento", "Alimento", "Progreso anterior", "---"]):
                cals = parse_num(parts[1])
                prot = parse_num(parts[2])
                carbs = parse_num(parts[3])
                fats = parse_num(parts[4])
                if cals > 0 or prot > 0 or carbs > 0 or fats > 0:
                    current_intakes.append({
                        "time": guess_time(item_name),
                        "description": item_name,
                        "macros": {
                            "calories": cals,
                            "protein": prot,
                            "carbs": carbs,
                            "fats": fats
                        }
                    })
    i += 1

if current_day and (latest_totals or current_intakes):
    daily_logs.append({
        "date": current_day,
        "intakes": current_intakes,
        "dailyTotals": latest_totals or {"calories": 0, "protein": 0, "carbs": 0, "fats": 0}
    })

unique_logs = {}
for log in daily_logs:
    unique_logs[log["date"]] = log

final_logs = sorted(list(unique_logs.values()), key=lambda x: x["date"])

output_data = {
    "userProfile": {
        "targetMacros": target_macros
    },
    "dailyLogs": final_logs
}

output_path.parent.mkdir(parents=True, exist_ok=True)
output_path.write_text(json.dumps(output_data, indent=2, ensure_ascii=False), encoding="utf-8")
print(f"Parsed {len(final_logs)} days of logs into {output_path}")
