import json
import re
from pathlib import Path

json_path = Path("data/food_log.json")
seed_path = Path("supabase/seed.sql")

data = json.loads(json_path.read_text(encoding="utf-8"))

sql_lines = [
    "-- Seed SQL auto-generado desde data/food_log.json\n",
    "TRUNCATE public.intakes, public.daily_logs, public.foods CASCADE;\n"
]

foods_dict = {}

for log in data.get("dailyLogs", []):
    for intake in log.get("intakes", []):
        raw_name = intake.get("description", "").strip()
        if not raw_name:
            continue
            
        m = intake.get("macros", {})
        cals = float(m.get("calories", 0))
        prot = float(m.get("protein", 0))
        carbs = float(m.get("carbs", 0))
        fats = float(m.get("fats", 0))

        # Standardize food name
        clean_name = raw_name.lower().replace("'", "''")
        
        if clean_name not in foods_dict:
            # Estimate macros per 100g assuming standard serving size is ~100g or scaling
            foods_dict[clean_name] = {
                "name": raw_name.replace("'", "''"),
                "cals_100g": round(cals, 2),
                "prot_100g": round(prot, 2),
                "carbs_100g": round(carbs, 2),
                "fats_100g": round(fats, 2)
            }

sql_lines.append("-- 1. Insertar Alimentos Maestros (foods)\n")
for name_key, f in foods_dict.items():
    sql_lines.append(
        f"INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) "
        f"VALUES ('{f['name']}', {f['cals_100g']}, {f['prot_100g']}, {f['carbs_100g']}, {f['fats_100g']}) "
        f"ON CONFLICT (name) DO NOTHING;\n"
    )

sql_lines.append("\n-- 2. Insertar Logs Diarios e Ingestas\n")
for log in data.get("dailyLogs", []):
    date = log.get("date")
    sql_lines.append(f"INSERT INTO public.daily_logs (date) VALUES ('{date}') ON CONFLICT (date) DO NOTHING;\n")
    
    for intake in log.get("intakes", []):
        desc = intake.get("description", "").replace("'", "''")
        t = intake.get("time", "12:00")
        m = intake.get("macros", {})
        c = float(m.get("calories", 0))
        p = float(m.get("protein", 0))
        cb = float(m.get("carbs", 0))
        f = float(m.get("fats", 0))
        
        sql_lines.append(
            f"INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) "
            f"SELECT dl.id, f.id, '{desc}', 100, {c}, {p}, {cb}, {f}, '{t}' "
            f"FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('{desc}') "
            f"WHERE dl.date = '{date}';\n"
        )

seed_path.parent.mkdir(parents=True, exist_ok=True)
seed_path.write_text("\n".join(sql_lines), encoding="utf-8")
print(f"Generated seed.sql with {len(foods_dict)} unique foods and {len(data.get('dailyLogs', []))} daily logs.")
