---
name: nutritionist-logger
description: Log foods eaten into data/food_log.json, calculate macros (Philippines portion aware), record estimated time (HH:MM), update daily totals, git commit and push to origin main. Trigger when user says "comí...", "añade...", "hoy cené...", or logs food.
---

# Nutritionist Logger Skill

## Workflow

1. Get current date (`YYYY-MM-DD`) and current local time (`HH:MM`).
2. Read `/Users/pablo/workspace/fit/data/food_log.json`.
3. Parse food intake text provided by user.
4. Calculate macros:
   - Calories (kcal), Protein (g), Carbs (g), Fats (g).
   - Adjust for Philippines local portions:
     - Plátano filipino (Saba / Lakatan): ~60-70g peeled (~60 kcal, 0.7g P, 15g C, 0.2g G).
     - Mango filipino: 80g (~50 kcal, 0.5g P, 12g C, 0.2g G).
     - Cheese Pandesal / Pandesal: ~40g/ud (~115 kcal, 3g P, 18g C, 3g G).
     - Pechuga de pollo, Tofu, Huevos hervidos, Yogur natural.
5. Update `data/food_log.json`:
   - Find or create entry for today's date in `dailyLogs`.
   - Append intake item to `intakes` array with `"time": "<HH:MM>"`, `"description": "<food name>"`, `"macros": {...}`.
   - Recalculate `dailyTotals`.
6. Write back to `data/food_log.json`.
7. Execute Git sync:
   `git add data/food_log.json && git commit -m "log(food): <short food description>" && git push origin main`
8. Return concise summary response:
   - Added items with macro breakdown.
   - Current daily totals vs targets (1950 kcal / 145g P / 195g C / 65g G).
   - Remaining macro budget for the day.
