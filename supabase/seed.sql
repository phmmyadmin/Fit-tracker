-- Seed SQL auto-generado desde data/food_log.json

TRUNCATE public.intakes, public.daily_logs, public.foods CASCADE;

-- 1. Insertar Alimentos Maestros (foods)

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Sábado 18', 0.0, 1.81, 96.9, 221.1) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Snack: 1 huevo hervido', 72.0, 6.3, 0.4, 4.8) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 1 Huevo cocido entero', 72.0, 6.3, 0.4, 4.8) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 2 Plátanos (medida filipina)', 120.0, 1.4, 30.0, 0.4) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Progreso del día hasta ahora', 575.0, 38.5, 74.9, 15.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Progreso del día (Ajo, plátanos, 2 huevos)', 575.0, 38.5, 74.9, 15.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 1 Plátano (medida filipina)', 60.0, 0.7, 15.0, 0.2) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Snack: Medio polo \+ 70g de mango', 77.0, 0.6, 19.5, 0.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 1 Huevo cocido', 72.0, 6.3, 0.4, 4.8) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 147g de arroz cocido', 191.0, 3.9, 41.5, 0.4) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 40g de pepino', 6.0, 0.3, 1.4, 0.1) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 70g de mango fresco', 42.0, 0.6, 10.5, 0.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 1 Huevo entero \+ 1 yema', 127.0, 8.8, 1.0, 9.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 27g de Sitaw', 10.0, 0.5, 2.0, 0.1) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Desayuno: Burger McDo (Datos reales)', 354.0, 13.0, 43.0, 14.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 108g de arroz blanco', 140.0, 2.9, 30.5, 0.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: Medio Popstick helado', 110.0, 1.2, 11.5, 6.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: Medio Popstick de hielo', 22.0, 0.0, 5.5, 0.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 50g de mango fresco', 30.0, 0.4, 7.5, 0.2) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: Omelette (2 huevos, cherrys, cebolla y 4g queso)', 171.0, 13.9, 4.1, 10.8) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Desayuno: Huevos, 1.5 hot dogs y Milk Tea', 743.0, 27.1, 67.3, 40.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: Medio Ice Pop', 22.0, 0.0, 5.5, 0.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 2 vasos de Buko Juice', 95.0, 1.0, 22.0, 1.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 100g de Mango fresco', 60.0, 0.8, 15.0, 0.4) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Desayuno: 2 mini burgers caseras', 250.0, 18.6, 35.2, 4.2) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: Yogur (50g), avena (50g) y plátano (100g)', 305.0, 9.7, 58.2, 5.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Desayuno: 2 mini burgers, 1 huevo cocido, 50g yogur, 40g avena y 1 plátano', 596.0, 33.2, 87.4, 14.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Desayuno: (2 mini burgers, huevo, yogur, avena, plátano)', 596.0, 33.2, 87.4, 14.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 1 Huevo cocido grande', 78.0, 6.3, 0.6, 5.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: Donut de chocolate y Pan de Ube con queso', 370.0, 7.0, 51.0, 15.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Progreso actual', 1596.0, 91.6, 201.4, 48.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido (2 burgers \+ 1 balut \+ 1 huevo)', 513.0, 38.9, 37.3, 22.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido (2 burgers \+ 1 balut)', 435.0, 32.6, 36.7, 17.2) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Desayuno: 50g mango, 1 hot dog rojo sin aceite, 1 huevo cocido', 248.0, 12.2, 11.1, 17.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 3 cucharaditas de Mango Graham (\~25g)', 62.0, 0.9, 9.0, 2.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: Pollo (110g), patata (100g), zanahoria (60g) y sitaw (15g)', 301.0, 37.1, 27.1, 4.2) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Desayuno \+ Mango Graham', 388.0, 19.4, 20.7, 24.9) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Comida: Pollo cocido (110g), patata (100g), zanahoria (60g) y sitaw (15g)', 334.0, 37.1, 27.1, 4.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 70g de Mango', 42.0, 0.6, 10.5, 0.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 1 Mini burger casera', 136.0, 13.1, 14.9, 2.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 1 Mini burger (receta de 11 uds)', 124.0, 11.9, 13.5, 2.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 3 Takoyakis de pulpo', 180.0, 7.5, 22.5, 6.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: Cheesy Beef Bread', 510.0, 28.0, 53.0, 20.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Desayuno: 2 cuch. Mango Graham, 1 mini burger, 1 plátano filipino', 246.0, 13.5, 39.2, 4.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 1 Bibingka (\~100g)', 230.0, 4.5, 36.0, 7.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: Pollo (110g), arroz (100g), zanahoria, cebolla y sitaw', 361.0, 37.4, 31.6, 4.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 100g de Arroz cocido', 130.0, 2.7, 28.2, 0.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: Leche de coco (gata) en la cocción', 70.0, 0.7, 1.7, 7.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: Guiso de pollo con coco, patata, zanahoria y 70g arroz', 470.0, 41.2, 36.5, 12.9) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Desayuno: 2 Puto tradicionales', 150.0, 2.6, 32.0, 1.2) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Desayuno: 2 Puto con queso', 185.0, 4.6, 32.4, 4.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Desayuno: Puto con queso (90g)', 234.0, 5.9, 41.6, 5.1) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Desayuno: Puto con queso (100g)', 260.0, 6.5, 46.2, 5.7) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 100g arroz, guiso de pollo al coco (110g) y 1 mini burger', 584.0, 50.4, 53.5, 13.9) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 40g de Mango Graham', 100.0, 1.4, 14.4, 4.2) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 100g mango \+ 1.5 plátano filipino', 127.0, 1.6, 32.1, 0.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 1 Puto tradicional sin queso (70g)', 161.0, 2.8, 35.7, 0.7) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Desayuno: 2 Mini burgers \+ 60g mango', 284.0, 24.3, 36.0, 4.8) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: Pollo al coco (120g), 60g puto y 60g mango graham', 638.0, 43.1, 62.2, 19.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: Cena (Pollo soja/ostras, patata, arroz, huevo, mango graham y Tang)', 706.0, 50.6, 73.4, 18.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Desayuno: 120g Yogur natural', 73.0, 4.2, 5.6, 4.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 2 Mini burgers caseras', 248.0, 23.8, 27.0, 4.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: Yogur (170g), pollo (120g) con patata (80g) y 30g puto', 493.0, 46.6, 42.3, 10.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 1 Huevo duro', 72.0, 6.3, 0.4, 4.8) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 50g avena \+ 100g yogur natural', 256.0, 12.0, 37.9, 6.8) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 115g extras de espaguetis preparados', 189.0, 7.7, 27.6, 5.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Progreso previo a la cena', 1142.0, 92.9, 113.2, 30.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Desayuno: 115g yogur \+ 30g avena \+ 2 mini burgers', 435.0, 32.9, 52.3, 10.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 1/2 Ice pop de mango', 40.0, 0.3, 9.5, 0.1) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 1 Tortang talong (1 huevo)', 159.0, 7.3, 10.2, 10.1) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 150g de pasta preparada de ayer', 218.0, 9.2, 28.4, 7.2) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 100g de pollo cocinado', 195.0, 31.0, 0.0, 3.8) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 100g yogur \+ 40g avena \+ 1 plátano mediano', 306.0, 11.4, 54.0, 6.4) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Desayuno: 140g yogur \+ 40g avena \+ 1 plátano', 330.0, 12.8, 55.9, 7.7) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 40g de pan de banana', 130.0, 1.8, 22.0, 4.2) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: Plátano \+ pollo \+ patata \+ pakbet \+ espaguetis \+ 1/2 ice pop', 599.0, 42.8, 75.4, 11.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: Yogur \+ avena \+ 2 huevos revueltos con queso', 414.0, 25.4, 21.9, 25.2) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Desayuno: Yogur \+ avena \+ plátano \+ pan de banana', 407.0, 13.6, 67.2, 11.2) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 2 mini hamburguesas', 294.0, 28.2, 32.2, 5.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 120g pollo \+ 100g patata \+ 100g arroz', 451.0, 41.9, 48.2, 5.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 3 piezas de siomai', 130.0, 6.0, 9.0, 7.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Comidas acumuladas: 4 plátanos \+ yogur \+ garbanzos \+ pollo tinola \+ huevo \+ pan de banana', 1217.0, 69.6, 171.0, 28.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Recamara / Snack: 180g yogur natural', 110.0, 6.3, 8.5, 5.9) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Comida 1: 170g pollo \+ 60g pan shawarma', 497.0, 58.1, 33.0, 7.7) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: Yogur (170g) \+ 1 Plátano', 193.0, 7.1, 30.8, 5.9) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 2 mini burgers \+ 30g pan shawarma \+ 1 plátano', 466.0, 32.0, 71.5, 6.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: Batido de plátano \+ 1/2 plato Pad Thai', 540.0, 16.0, 82.0, 16.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: Pan shawarma (55g) \+ tofu \+ vegetales', 201.0, 9.6, 33.8, 3.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Comida 1: 120g yogur natural \+ 1 plátano', 162.0, 5.3, 28.4, 4.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Comida 1: Yogur (120g) \+ 1 plátano', 162.0, 5.3, 28.4, 4.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Comida 2: Curry garbanzos (200g) \+ arroz (170g)', 624.0, 23.4, 106.7, 12.2) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 2 Shawarmas dürüm (tofu \+ queso)', 476.0, 23.0, 69.0, 12.8) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Postre/Snack: Yogur (160g) \+ 1 plátano \+ 1/2 ice pop', 222.0, 6.9, 38.8, 5.7) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Comida 1: Garbanzos \+ pollo adobo \+ patata \+ zanahoria', 553.0, 46.0, 52.3, 18.4) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: Pollo adobo (120g) \+ patata (30g) \+ arroz (100g) \+ garbanzos (180g)', 771.0, 53.8, 89.5, 22.4) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Comida 1: Yogur con avena \+ Doble cheeseburger de ternera', 624.0, 43.3, 53.1, 26.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Comida 1: Yogur con avena \+ Cheeseburger doble de ternera', 602.0, 28.9, 53.1, 29.7) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: Pan de hamburguesa \+ 100g tofu', 188.0, 11.7, 21.5, 6.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: Sizzling Pork \+ Arroz \+ Huevo frito', 665.0, 32.4, 48.6, 37.4) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: Garbanzos (100g) \+ Tofu (70g)', 255.0, 15.1, 30.5, 9.2) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Comida 1: Yogur con avena \+ Pollo con garbanzos, patata y zanahoria', 622.0, 52.6, 69.2, 13.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Añadido: 2 huevos cocidos', 156.0, 12.6, 1.2, 10.6) ON CONFLICT (name) DO NOTHING;


-- 2. Insertar Logs Diarios e Ingestas

INSERT INTO public.daily_logs (date) VALUES ('2026-07-13') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Sábado 18', 100, 0.0, 1.807, 96.9, 221.1, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Sábado 18') WHERE dl.date = '2026-07-13';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-14') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Snack: 1 huevo hervido', 100, 72.0, 6.3, 0.4, 4.8, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Snack: 1 huevo hervido') WHERE dl.date = '2026-07-14';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 1 Huevo cocido entero', 100, 72.0, 6.3, 0.4, 4.8, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 1 Huevo cocido entero') WHERE dl.date = '2026-07-14';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 2 Plátanos (medida filipina)', 100, 120.0, 1.4, 30.0, 0.4, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 2 Plátanos (medida filipina)') WHERE dl.date = '2026-07-14';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Progreso del día hasta ahora', 100, 575.0, 38.5, 74.9, 15.3, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Progreso del día hasta ahora') WHERE dl.date = '2026-07-14';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Progreso del día (Ajo, plátanos, 2 huevos)', 100, 575.0, 38.5, 74.9, 15.3, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Progreso del día (Ajo, plátanos, 2 huevos)') WHERE dl.date = '2026-07-14';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-15') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 1 Plátano (medida filipina)', 100, 60.0, 0.7, 15.0, 0.2, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 1 Plátano (medida filipina)') WHERE dl.date = '2026-07-15';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Snack: Medio polo \+ 70g de mango', 100, 77.0, 0.6, 19.5, 0.3, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Snack: Medio polo \+ 70g de mango') WHERE dl.date = '2026-07-15';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 1 Huevo cocido', 100, 72.0, 6.3, 0.4, 4.8, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 1 Huevo cocido') WHERE dl.date = '2026-07-15';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-16') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 147g de arroz cocido', 100, 191.0, 3.9, 41.5, 0.4, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 147g de arroz cocido') WHERE dl.date = '2026-07-16';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 40g de pepino', 100, 6.0, 0.3, 1.4, 0.1, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 40g de pepino') WHERE dl.date = '2026-07-16';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 70g de mango fresco', 100, 42.0, 0.6, 10.5, 0.3, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 70g de mango fresco') WHERE dl.date = '2026-07-16';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 1 Huevo entero \+ 1 yema', 100, 127.0, 8.8, 1.0, 9.3, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 1 Huevo entero \+ 1 yema') WHERE dl.date = '2026-07-16';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 1 Huevo cocido', 100, 72.0, 6.3, 0.4, 4.8, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 1 Huevo cocido') WHERE dl.date = '2026-07-16';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 27g de Sitaw', 100, 10.0, 0.5, 2.0, 0.1, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 27g de Sitaw') WHERE dl.date = '2026-07-16';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-17') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Desayuno: Burger McDo (Datos reales)', 100, 354.0, 13.0, 43.0, 14.0, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Desayuno: Burger McDo (Datos reales)') WHERE dl.date = '2026-07-17';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 108g de arroz blanco', 100, 140.0, 2.9, 30.5, 0.3, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 108g de arroz blanco') WHERE dl.date = '2026-07-17';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 1 Huevo cocido', 100, 72.0, 6.3, 0.4, 4.8, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 1 Huevo cocido') WHERE dl.date = '2026-07-17';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: Medio Popstick helado', 100, 110.0, 1.2, 11.5, 6.5, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: Medio Popstick helado') WHERE dl.date = '2026-07-17';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: Medio Popstick de hielo', 100, 22.0, 0.0, 5.5, 0.0, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: Medio Popstick de hielo') WHERE dl.date = '2026-07-17';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 50g de mango fresco', 100, 30.0, 0.4, 7.5, 0.2, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 50g de mango fresco') WHERE dl.date = '2026-07-17';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: Omelette (2 huevos, cherrys, cebolla y 4g queso)', 100, 171.0, 13.9, 4.1, 10.8, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: Omelette (2 huevos, cherrys, cebolla y 4g queso)') WHERE dl.date = '2026-07-17';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-18') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Desayuno: Huevos, 1.5 hot dogs y Milk Tea', 100, 743.0, 27.1, 67.3, 40.6, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Desayuno: Huevos, 1.5 hot dogs y Milk Tea') WHERE dl.date = '2026-07-18';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: Medio Ice Pop', 100, 22.0, 0.0, 5.5, 0.0, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: Medio Ice Pop') WHERE dl.date = '2026-07-18';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 2 vasos de Buko Juice', 100, 95.0, 1.0, 22.0, 1.0, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 2 vasos de Buko Juice') WHERE dl.date = '2026-07-18';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-19') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.daily_logs (date) VALUES ('2026-07-20') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.daily_logs (date) VALUES ('2026-07-21') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 100g de Mango fresco', 100, 60.0, 0.8, 15.0, 0.4, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 100g de Mango fresco') WHERE dl.date = '2026-07-21';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-22') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Desayuno: 2 mini burgers caseras', 100, 250.0, 18.6, 35.2, 4.2, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Desayuno: 2 mini burgers caseras') WHERE dl.date = '2026-07-22';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: Yogur (50g), avena (50g) y plátano (100g)', 100, 305.0, 9.7, 58.2, 5.5, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: Yogur (50g), avena (50g) y plátano (100g)') WHERE dl.date = '2026-07-22';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-23') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Desayuno: 2 mini burgers, 1 huevo cocido, 50g yogur, 40g avena y 1 plátano', 100, 596.0, 33.2, 87.4, 14.3, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Desayuno: 2 mini burgers, 1 huevo cocido, 50g yogur, 40g avena y 1 plátano') WHERE dl.date = '2026-07-23';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Desayuno: (2 mini burgers, huevo, yogur, avena, plátano)', 100, 596.0, 33.2, 87.4, 14.3, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Desayuno: (2 mini burgers, huevo, yogur, avena, plátano)') WHERE dl.date = '2026-07-23';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 1 Huevo cocido grande', 100, 78.0, 6.3, 0.6, 5.3, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 1 Huevo cocido grande') WHERE dl.date = '2026-07-23';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: Donut de chocolate y Pan de Ube con queso', 100, 370.0, 7.0, 51.0, 15.5, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: Donut de chocolate y Pan de Ube con queso') WHERE dl.date = '2026-07-23';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Progreso actual', 100, 1596.0, 91.6, 201.4, 48.0, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Progreso actual') WHERE dl.date = '2026-07-23';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido (2 burgers \+ 1 balut \+ 1 huevo)', 100, 513.0, 38.9, 37.3, 22.5, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido (2 burgers \+ 1 balut \+ 1 huevo)') WHERE dl.date = '2026-07-23';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Progreso actual', 100, 1596.0, 91.6, 201.4, 48.0, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Progreso actual') WHERE dl.date = '2026-07-23';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido (2 burgers \+ 1 balut)', 100, 435.0, 32.6, 36.7, 17.2, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido (2 burgers \+ 1 balut)') WHERE dl.date = '2026-07-23';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-24') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Desayuno: 50g mango, 1 hot dog rojo sin aceite, 1 huevo cocido', 100, 248.0, 12.2, 11.1, 17.0, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Desayuno: 50g mango, 1 hot dog rojo sin aceite, 1 huevo cocido') WHERE dl.date = '2026-07-24';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 1 Huevo cocido grande', 100, 78.0, 6.3, 0.6, 5.3, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 1 Huevo cocido grande') WHERE dl.date = '2026-07-24';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 3 cucharaditas de Mango Graham (\~25g)', 100, 62.0, 0.9, 9.0, 2.6, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 3 cucharaditas de Mango Graham (\~25g)') WHERE dl.date = '2026-07-24';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: Pollo (110g), patata (100g), zanahoria (60g) y sitaw (15g)', 100, 301.0, 37.1, 27.1, 4.2, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: Pollo (110g), patata (100g), zanahoria (60g) y sitaw (15g)') WHERE dl.date = '2026-07-24';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Desayuno \+ Mango Graham', 100, 388.0, 19.4, 20.7, 24.9, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Desayuno \+ Mango Graham') WHERE dl.date = '2026-07-24';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Comida: Pollo cocido (110g), patata (100g), zanahoria (60g) y sitaw (15g)', 100, 334.0, 37.1, 27.1, 4.5, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Comida: Pollo cocido (110g), patata (100g), zanahoria (60g) y sitaw (15g)') WHERE dl.date = '2026-07-24';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 70g de Mango', 100, 42.0, 0.6, 10.5, 0.3, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 70g de Mango') WHERE dl.date = '2026-07-24';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 1 Mini burger casera', 100, 136.0, 13.1, 14.9, 2.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 1 Mini burger casera') WHERE dl.date = '2026-07-24';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 1 Mini burger (receta de 11 uds)', 100, 124.0, 11.9, 13.5, 2.3, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 1 Mini burger (receta de 11 uds)') WHERE dl.date = '2026-07-24';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 3 Takoyakis de pulpo', 100, 180.0, 7.5, 22.5, 6.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 3 Takoyakis de pulpo') WHERE dl.date = '2026-07-24';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: Cheesy Beef Bread', 100, 510.0, 28.0, 53.0, 20.0, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: Cheesy Beef Bread') WHERE dl.date = '2026-07-24';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-25') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Desayuno: 2 cuch. Mango Graham, 1 mini burger, 1 plátano filipino', 100, 246.0, 13.5, 39.2, 4.6, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Desayuno: 2 cuch. Mango Graham, 1 mini burger, 1 plátano filipino') WHERE dl.date = '2026-07-25';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 1 Bibingka (\~100g)', 100, 230.0, 4.5, 36.0, 7.5, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 1 Bibingka (\~100g)') WHERE dl.date = '2026-07-25';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: Pollo (110g), arroz (100g), zanahoria, cebolla y sitaw', 100, 361.0, 37.4, 31.6, 4.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: Pollo (110g), arroz (100g), zanahoria, cebolla y sitaw') WHERE dl.date = '2026-07-25';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 100g de Arroz cocido', 100, 130.0, 2.7, 28.2, 0.3, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 100g de Arroz cocido') WHERE dl.date = '2026-07-25';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 1 Mini burger casera', 100, 124.0, 11.9, 13.5, 2.3, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 1 Mini burger casera') WHERE dl.date = '2026-07-25';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: Leche de coco (gata) en la cocción', 100, 70.0, 0.7, 1.7, 7.0, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: Leche de coco (gata) en la cocción') WHERE dl.date = '2026-07-25';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: Guiso de pollo con coco, patata, zanahoria y 70g arroz', 100, 470.0, 41.2, 36.5, 12.9, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: Guiso de pollo con coco, patata, zanahoria y 70g arroz') WHERE dl.date = '2026-07-25';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-26') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Desayuno: 2 Puto tradicionales', 100, 150.0, 2.6, 32.0, 1.2, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Desayuno: 2 Puto tradicionales') WHERE dl.date = '2026-07-26';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Desayuno: 2 Puto con queso', 100, 185.0, 4.6, 32.4, 4.0, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Desayuno: 2 Puto con queso') WHERE dl.date = '2026-07-26';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Desayuno: Puto con queso (90g)', 100, 234.0, 5.9, 41.6, 5.1, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Desayuno: Puto con queso (90g)') WHERE dl.date = '2026-07-26';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Desayuno: Puto con queso (100g)', 100, 260.0, 6.5, 46.2, 5.7, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Desayuno: Puto con queso (100g)') WHERE dl.date = '2026-07-26';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 1 Huevo cocido', 100, 72.0, 6.3, 0.4, 4.8, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 1 Huevo cocido') WHERE dl.date = '2026-07-26';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 100g arroz, guiso de pollo al coco (110g) y 1 mini burger', 100, 584.0, 50.4, 53.5, 13.9, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 100g arroz, guiso de pollo al coco (110g) y 1 mini burger') WHERE dl.date = '2026-07-26';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 40g de Mango Graham', 100, 100.0, 1.4, 14.4, 4.2, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 40g de Mango Graham') WHERE dl.date = '2026-07-26';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 100g mango \+ 1.5 plátano filipino', 100, 127.0, 1.6, 32.1, 0.6, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 100g mango \+ 1.5 plátano filipino') WHERE dl.date = '2026-07-26';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 1 Puto tradicional sin queso (70g)', 100, 161.0, 2.8, 35.7, 0.7, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 1 Puto tradicional sin queso (70g)') WHERE dl.date = '2026-07-26';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 1 Mini burger casera', 100, 124.0, 11.9, 13.5, 2.3, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 1 Mini burger casera') WHERE dl.date = '2026-07-26';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-27') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Desayuno: 2 Mini burgers \+ 60g mango', 100, 284.0, 24.3, 36.0, 4.8, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Desayuno: 2 Mini burgers \+ 60g mango') WHERE dl.date = '2026-07-27';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: Pollo al coco (120g), 60g puto y 60g mango graham', 100, 638.0, 43.1, 62.2, 19.5, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: Pollo al coco (120g), 60g puto y 60g mango graham') WHERE dl.date = '2026-07-27';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: Cena (Pollo soja/ostras, patata, arroz, huevo, mango graham y Tang)', 100, 706.0, 50.6, 73.4, 18.0, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: Cena (Pollo soja/ostras, patata, arroz, huevo, mango graham y Tang)') WHERE dl.date = '2026-07-27';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-28') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Desayuno: 120g Yogur natural', 100, 73.0, 4.2, 5.6, 4.0, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Desayuno: 120g Yogur natural') WHERE dl.date = '2026-07-28';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 2 Mini burgers caseras', 100, 248.0, 23.8, 27.0, 4.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 2 Mini burgers caseras') WHERE dl.date = '2026-07-28';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: Yogur (170g), pollo (120g) con patata (80g) y 30g puto', 100, 493.0, 46.6, 42.3, 10.5, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: Yogur (170g), pollo (120g) con patata (80g) y 30g puto') WHERE dl.date = '2026-07-28';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 1 Huevo duro', 100, 72.0, 6.3, 0.4, 4.8, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 1 Huevo duro') WHERE dl.date = '2026-07-28';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 50g avena \+ 100g yogur natural', 100, 256.0, 12.0, 37.9, 6.8, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 50g avena \+ 100g yogur natural') WHERE dl.date = '2026-07-28';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 115g extras de espaguetis preparados', 100, 189.0, 7.7, 27.6, 5.0, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 115g extras de espaguetis preparados') WHERE dl.date = '2026-07-28';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Progreso previo a la cena', 100, 1142.0, 92.9, 113.2, 30.6, '20:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Progreso previo a la cena') WHERE dl.date = '2026-07-28';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-29') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Desayuno: 115g yogur \+ 30g avena \+ 2 mini burgers', 100, 435.0, 32.9, 52.3, 10.5, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Desayuno: 115g yogur \+ 30g avena \+ 2 mini burgers') WHERE dl.date = '2026-07-29';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 1/2 Ice pop de mango', 100, 40.0, 0.3, 9.5, 0.1, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 1/2 Ice pop de mango') WHERE dl.date = '2026-07-29';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 1 Tortang talong (1 huevo)', 100, 159.0, 7.3, 10.2, 10.1, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 1 Tortang talong (1 huevo)') WHERE dl.date = '2026-07-29';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 150g de pasta preparada de ayer', 100, 218.0, 9.2, 28.4, 7.2, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 150g de pasta preparada de ayer') WHERE dl.date = '2026-07-29';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 100g de pollo cocinado', 100, 195.0, 31.0, 0.0, 3.8, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 100g de pollo cocinado') WHERE dl.date = '2026-07-29';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 100g yogur \+ 40g avena \+ 1 plátano mediano', 100, 306.0, 11.4, 54.0, 6.4, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 100g yogur \+ 40g avena \+ 1 plátano mediano') WHERE dl.date = '2026-07-29';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-30') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Desayuno: 140g yogur \+ 40g avena \+ 1 plátano', 100, 330.0, 12.8, 55.9, 7.7, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Desayuno: 140g yogur \+ 40g avena \+ 1 plátano') WHERE dl.date = '2026-07-30';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 40g de pan de banana', 100, 130.0, 1.8, 22.0, 4.2, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 40g de pan de banana') WHERE dl.date = '2026-07-30';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: Plátano \+ pollo \+ patata \+ pakbet \+ espaguetis \+ 1/2 ice pop', 100, 599.0, 42.8, 75.4, 11.3, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: Plátano \+ pollo \+ patata \+ pakbet \+ espaguetis \+ 1/2 ice pop') WHERE dl.date = '2026-07-30';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: Yogur \+ avena \+ 2 huevos revueltos con queso', 100, 414.0, 25.4, 21.9, 25.2, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: Yogur \+ avena \+ 2 huevos revueltos con queso') WHERE dl.date = '2026-07-30';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-31') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Desayuno: Yogur \+ avena \+ plátano \+ pan de banana', 100, 407.0, 13.6, 67.2, 11.2, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Desayuno: Yogur \+ avena \+ plátano \+ pan de banana') WHERE dl.date = '2026-07-31';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 2 mini hamburguesas', 100, 294.0, 28.2, 32.2, 5.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 2 mini hamburguesas') WHERE dl.date = '2026-07-31';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 120g pollo \+ 100g patata \+ 100g arroz', 100, 451.0, 41.9, 48.2, 5.0, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 120g pollo \+ 100g patata \+ 100g arroz') WHERE dl.date = '2026-07-31';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 1 huevo cocido', 100, 78.0, 6.3, 0.6, 5.3, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 1 huevo cocido') WHERE dl.date = '2026-07-31';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 3 piezas de siomai', 100, 130.0, 6.0, 9.0, 7.5, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 3 piezas de siomai') WHERE dl.date = '2026-07-31';

INSERT INTO public.daily_logs (date) VALUES ('2026-08-01') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Comidas acumuladas: 4 plátanos \+ yogur \+ garbanzos \+ pollo tinola \+ huevo \+ pan de banana', 100, 1217.0, 69.6, 171.0, 28.6, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Comidas acumuladas: 4 plátanos \+ yogur \+ garbanzos \+ pollo tinola \+ huevo \+ pan de banana') WHERE dl.date = '2026-08-01';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Recamara / Snack: 180g yogur natural', 100, 110.0, 6.3, 8.5, 5.9, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Recamara / Snack: 180g yogur natural') WHERE dl.date = '2026-08-01';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 2 mini hamburguesas', 100, 294.0, 28.2, 32.2, 5.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 2 mini hamburguesas') WHERE dl.date = '2026-08-01';

INSERT INTO public.daily_logs (date) VALUES ('2026-08-02') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Comida 1: 170g pollo \+ 60g pan shawarma', 100, 497.0, 58.1, 33.0, 7.7, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Comida 1: 170g pollo \+ 60g pan shawarma') WHERE dl.date = '2026-08-02';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: Yogur (170g) \+ 1 Plátano', 100, 193.0, 7.1, 30.8, 5.9, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: Yogur (170g) \+ 1 Plátano') WHERE dl.date = '2026-08-02';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 2 mini burgers \+ 30g pan shawarma \+ 1 plátano', 100, 466.0, 32.0, 71.5, 6.5, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 2 mini burgers \+ 30g pan shawarma \+ 1 plátano') WHERE dl.date = '2026-08-02';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: Batido de plátano \+ 1/2 plato Pad Thai', 100, 540.0, 16.0, 82.0, 16.5, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: Batido de plátano \+ 1/2 plato Pad Thai') WHERE dl.date = '2026-08-02';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: Pan shawarma (55g) \+ tofu \+ vegetales', 100, 201.0, 9.6, 33.8, 3.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: Pan shawarma (55g) \+ tofu \+ vegetales') WHERE dl.date = '2026-08-02';

INSERT INTO public.daily_logs (date) VALUES ('2026-08-03') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Comida 1: 120g yogur natural \+ 1 plátano', 100, 162.0, 5.3, 28.4, 4.3, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Comida 1: 120g yogur natural \+ 1 plátano') WHERE dl.date = '2026-08-03';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Comida 1: Yogur (120g) \+ 1 plátano', 100, 162.0, 5.3, 28.4, 4.3, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Comida 1: Yogur (120g) \+ 1 plátano') WHERE dl.date = '2026-08-03';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Comida 2: Curry garbanzos (200g) \+ arroz (170g)', 100, 624.0, 23.4, 106.7, 12.2, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Comida 2: Curry garbanzos (200g) \+ arroz (170g)') WHERE dl.date = '2026-08-03';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 2 mini hamburguesas', 100, 294.0, 28.2, 32.2, 5.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 2 mini hamburguesas') WHERE dl.date = '2026-08-03';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 2 Shawarmas dürüm (tofu \+ queso)', 100, 476.0, 23.0, 69.0, 12.8, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 2 Shawarmas dürüm (tofu \+ queso)') WHERE dl.date = '2026-08-03';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Postre/Snack: Yogur (160g) \+ 1 plátano \+ 1/2 ice pop', 100, 222.0, 6.9, 38.8, 5.7, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Postre/Snack: Yogur (160g) \+ 1 plátano \+ 1/2 ice pop') WHERE dl.date = '2026-08-03';

INSERT INTO public.daily_logs (date) VALUES ('2026-08-04') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Comida 1: Garbanzos \+ pollo adobo \+ patata \+ zanahoria', 100, 553.0, 46.0, 52.3, 18.4, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Comida 1: Garbanzos \+ pollo adobo \+ patata \+ zanahoria') WHERE dl.date = '2026-08-04';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 2 mini hamburguesas', 100, 294.0, 28.2, 32.2, 5.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 2 mini hamburguesas') WHERE dl.date = '2026-08-04';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: Pollo adobo (120g) \+ patata (30g) \+ arroz (100g) \+ garbanzos (180g)', 100, 771.0, 53.8, 89.5, 22.4, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: Pollo adobo (120g) \+ patata (30g) \+ arroz (100g) \+ garbanzos (180g)') WHERE dl.date = '2026-08-04';

INSERT INTO public.daily_logs (date) VALUES ('2026-08-05') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Comida 1: Yogur con avena \+ Doble cheeseburger de ternera', 100, 624.0, 43.3, 53.1, 26.0, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Comida 1: Yogur con avena \+ Doble cheeseburger de ternera') WHERE dl.date = '2026-08-05';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Comida 1: Yogur con avena \+ Cheeseburger doble de ternera', 100, 602.0, 28.9, 53.1, 29.7, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Comida 1: Yogur con avena \+ Cheeseburger doble de ternera') WHERE dl.date = '2026-08-05';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: Pan de hamburguesa \+ 100g tofu', 100, 188.0, 11.7, 21.5, 6.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: Pan de hamburguesa \+ 100g tofu') WHERE dl.date = '2026-08-05';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: Sizzling Pork \+ Arroz \+ Huevo frito', 100, 665.0, 32.4, 48.6, 37.4, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: Sizzling Pork \+ Arroz \+ Huevo frito') WHERE dl.date = '2026-08-05';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: Garbanzos (100g) \+ Tofu (70g)', 100, 255.0, 15.1, 30.5, 9.2, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: Garbanzos (100g) \+ Tofu (70g)') WHERE dl.date = '2026-08-05';

INSERT INTO public.daily_logs (date) VALUES ('2026-08-06') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Comida 1: Yogur con avena \+ Pollo con garbanzos, patata y zanahoria', 100, 622.0, 52.6, 69.2, 13.6, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Comida 1: Yogur con avena \+ Pollo con garbanzos, patata y zanahoria') WHERE dl.date = '2026-08-06';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Añadido: 2 huevos cocidos', 100, 156.0, 12.6, 1.2, 10.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Añadido: 2 huevos cocidos') WHERE dl.date = '2026-08-06';
