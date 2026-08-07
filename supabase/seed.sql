-- Seed SQL auto-generado desde data/food_log.json

TRUNCATE public.intakes, public.daily_logs, public.foods CASCADE;

-- 1. Insertar Alimentos Maestros (foods)

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Sábado 18', 0.0, 1.81, 96.9, 221.1) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('1 huevo hervido', 72.0, 6.3, 0.4, 4.8) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('1 Huevo cocido entero', 72.0, 6.3, 0.4, 4.8) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('2 Plátanos (medida filipina)', 120.0, 1.4, 30.0, 0.4) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Del día hasta ahora', 575.0, 38.5, 74.9, 15.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Del día (Ajo, plátanos, 2 huevos)', 575.0, 38.5, 74.9, 15.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('1 Plátano (medida filipina)', 60.0, 0.7, 15.0, 0.2) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Medio polo', 38.0, 0.3, 9.8, 0.1) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('70g de mango', 38.0, 0.3, 9.8, 0.1) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('1 Huevo cocido', 72.0, 6.3, 0.4, 4.8) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('147g de arroz cocido', 191.0, 3.9, 41.5, 0.4) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('40g de pepino', 6.0, 0.3, 1.4, 0.1) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('70g de mango fresco', 42.0, 0.6, 10.5, 0.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('1 Huevo entero', 64.0, 4.4, 0.5, 4.7) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('1 yema', 64.0, 4.4, 0.5, 4.7) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('27g de Sitaw', 10.0, 0.5, 2.0, 0.1) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Burger McDo (Datos reales)', 354.0, 13.0, 43.0, 14.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('108g de arroz blanco', 140.0, 2.9, 30.5, 0.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Medio Popstick helado', 110.0, 1.2, 11.5, 6.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Medio Popstick de hielo', 22.0, 0.0, 5.5, 0.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('50g de mango fresco', 30.0, 0.4, 7.5, 0.2) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Omelette (2 huevos, cherrys, cebolla y 4g queso)', 171.0, 13.9, 4.1, 10.8) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Huevos, 1.5 hot dogs y Milk Tea', 743.0, 27.1, 67.3, 40.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Medio Ice Pop', 22.0, 0.0, 5.5, 0.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('2 vasos de Buko Juice', 95.0, 1.0, 22.0, 1.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('100g de Mango fresco', 60.0, 0.8, 15.0, 0.4) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('2 mini burgers caseras', 250.0, 18.6, 35.2, 4.2) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Yogur (50g), avena (50g) y plátano (100g)', 305.0, 9.7, 58.2, 5.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('2 mini burgers, 1 huevo cocido, 50g yogur, 40g avena y 1 plátano', 596.0, 33.2, 87.4, 14.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('(2 mini burgers, huevo, yogur, avena, plátano)', 596.0, 33.2, 87.4, 14.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('1 Huevo cocido grande', 78.0, 6.3, 0.6, 5.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Donut de chocolate y Pan de Ube con queso', 370.0, 7.0, 51.0, 15.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Actual', 1596.0, 91.6, 201.4, 48.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('(2 burgers', 171.0, 13.0, 12.4, 7.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('1 balut', 171.0, 13.0, 12.4, 7.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('1 huevo)', 171.0, 13.0, 12.4, 7.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('1 balut)', 218.0, 16.3, 18.4, 8.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('50g mango, 1 hot dog rojo sin aceite, 1 huevo cocido', 248.0, 12.2, 11.1, 17.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('3 cucharaditas de Mango Graham (\~25g)', 62.0, 0.9, 9.0, 2.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Pollo (110g), patata (100g), zanahoria (60g) y sitaw (15g)', 301.0, 37.1, 27.1, 4.2) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Mango Graham', 194.0, 9.7, 10.3, 12.4) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Pollo cocido (110g), patata (100g), zanahoria (60g) y sitaw (15g)', 334.0, 37.1, 27.1, 4.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('1 Mini burger casera', 136.0, 13.1, 14.9, 2.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('1 Mini burger (receta de 11 uds)', 124.0, 11.9, 13.5, 2.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('3 Takoyakis de pulpo', 180.0, 7.5, 22.5, 6.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Cheesy Beef Bread', 510.0, 28.0, 53.0, 20.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('2 cuch. Mango Graham, 1 mini burger, 1 plátano filipino', 246.0, 13.5, 39.2, 4.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('1 Bibingka (\~100g)', 230.0, 4.5, 36.0, 7.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Pollo (110g), arroz (100g), zanahoria, cebolla y sitaw', 361.0, 37.4, 31.6, 4.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('100g de Arroz cocido', 130.0, 2.7, 28.2, 0.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Leche de coco (gata) en la cocción', 70.0, 0.7, 1.7, 7.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Guiso de pollo con coco, patata, zanahoria y 70g arroz', 470.0, 41.2, 36.5, 12.9) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('2 Puto tradicionales', 150.0, 2.6, 32.0, 1.2) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('2 Puto con queso', 185.0, 4.6, 32.4, 4.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Puto con queso (90g)', 234.0, 5.9, 41.6, 5.1) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Puto con queso (100g)', 260.0, 6.5, 46.2, 5.7) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('100g arroz, guiso de pollo al coco (110g) y 1 mini burger', 584.0, 50.4, 53.5, 13.9) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('40g de Mango Graham', 100.0, 1.4, 14.4, 4.2) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('100g mango', 64.0, 0.8, 16.1, 0.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('1.5 plátano filipino', 64.0, 0.8, 16.1, 0.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('1 Puto tradicional sin queso (70g)', 161.0, 2.8, 35.7, 0.7) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('2 Mini burgers', 142.0, 12.2, 18.0, 2.4) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('60g mango', 142.0, 12.2, 18.0, 2.4) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Pollo al coco (120g), 60g puto y 60g mango graham', 638.0, 43.1, 62.2, 19.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('(Pollo soja/ostras, patata, arroz, huevo, mango graham y Tang)', 706.0, 50.6, 73.4, 18.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('120g Yogur natural', 73.0, 4.2, 5.6, 4.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Yogur (170g), pollo (120g) con patata (80g) y 30g puto', 493.0, 46.6, 42.3, 10.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('1 Huevo duro', 72.0, 6.3, 0.4, 4.8) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('50g avena', 128.0, 6.0, 18.9, 3.4) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('100g yogur natural', 128.0, 6.0, 18.9, 3.4) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('115g extras de espaguetis preparados', 189.0, 7.7, 27.6, 5.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Previo a la cena', 1142.0, 92.9, 113.2, 30.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('115g yogur', 145.0, 11.0, 17.4, 3.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('30g avena', 145.0, 11.0, 17.4, 3.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('1/2 Ice pop de mango', 40.0, 0.3, 9.5, 0.1) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('1 Tortang talong (1 huevo)', 159.0, 7.3, 10.2, 10.1) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('150g de pasta preparada de ayer', 218.0, 9.2, 28.4, 7.2) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('100g de pollo cocinado', 195.0, 31.0, 0.0, 3.8) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('100g yogur', 102.0, 3.8, 18.0, 2.1) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('40g avena', 102.0, 3.8, 18.0, 2.1) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('1 plátano mediano', 102.0, 3.8, 18.0, 2.1) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('140g yogur', 110.0, 4.3, 18.6, 2.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('1 plátano', 110.0, 4.3, 18.6, 2.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('40g de pan de banana', 130.0, 1.8, 22.0, 4.2) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Plátano', 100.0, 7.1, 12.6, 1.9) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Pollo', 100.0, 7.1, 12.6, 1.9) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Patata', 100.0, 7.1, 12.6, 1.9) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Pakbet', 100.0, 7.1, 12.6, 1.9) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Espaguetis', 100.0, 7.1, 12.6, 1.9) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('1/2 ice pop', 100.0, 7.1, 12.6, 1.9) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Yogur', 138.0, 8.5, 7.3, 8.4) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Avena', 138.0, 8.5, 7.3, 8.4) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('2 huevos revueltos con queso', 138.0, 8.5, 7.3, 8.4) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Pan de banana', 102.0, 3.4, 16.8, 2.8) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('2 mini hamburguesas', 294.0, 28.2, 32.2, 5.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('120g pollo', 150.0, 14.0, 16.1, 1.7) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('100g patata', 150.0, 14.0, 16.1, 1.7) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('100g arroz', 150.0, 14.0, 16.1, 1.7) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('3 piezas de siomai', 130.0, 6.0, 9.0, 7.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('4 plátanos', 203.0, 11.6, 28.5, 4.8) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Garbanzos', 203.0, 11.6, 28.5, 4.8) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Pollo tinola', 203.0, 11.6, 28.5, 4.8) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Huevo', 203.0, 11.6, 28.5, 4.8) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Recamara / Snack: 180g yogur natural', 110.0, 6.3, 8.5, 5.9) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('170g pollo', 248.0, 29.1, 16.5, 3.9) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('60g pan shawarma', 248.0, 29.1, 16.5, 3.9) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Yogur (170g)', 96.0, 3.5, 15.4, 3.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('30g pan shawarma', 155.0, 10.7, 23.8, 2.2) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Batido de plátano', 270.0, 8.0, 41.0, 8.2) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('1/2 plato Pad Thai', 270.0, 8.0, 41.0, 8.2) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Pan shawarma (55g)', 67.0, 3.2, 11.3, 1.2) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Tofu', 67.0, 3.2, 11.3, 1.2) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Vegetales', 67.0, 3.2, 11.3, 1.2) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Yogur (120g)', 81.0, 2.6, 14.2, 2.1) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Curry garbanzos (200g)', 312.0, 11.7, 53.4, 6.1) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Arroz (170g)', 312.0, 11.7, 53.4, 6.1) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('2 Shawarmas dürüm (tofu', 238.0, 11.5, 34.5, 6.4) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Queso)', 238.0, 11.5, 34.5, 6.4) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Postre/Snack: Yogur (160g)', 74.0, 2.3, 12.9, 1.9) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Pollo adobo', 138.0, 11.5, 13.1, 4.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Zanahoria', 138.0, 11.5, 13.1, 4.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Pollo adobo (120g)', 193.0, 13.4, 22.4, 5.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Patata (30g)', 193.0, 13.4, 22.4, 5.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Arroz (100g)', 193.0, 13.4, 22.4, 5.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Garbanzos (180g)', 193.0, 13.4, 22.4, 5.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Yogur con avena', 312.0, 21.6, 26.6, 13.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Doble cheeseburger de ternera', 312.0, 21.6, 26.6, 13.0) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Cheeseburger doble de ternera', 301.0, 14.4, 26.6, 14.8) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Pan de hamburguesa', 94.0, 5.8, 10.8, 3.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('100g tofu', 94.0, 5.8, 10.8, 3.3) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Sizzling Pork', 222.0, 10.8, 16.2, 12.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Arroz', 222.0, 10.8, 16.2, 12.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Huevo frito', 222.0, 10.8, 16.2, 12.5) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Garbanzos (100g)', 128.0, 7.5, 15.2, 4.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Tofu (70g)', 128.0, 7.5, 15.2, 4.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Pollo con garbanzos, patata y zanahoria', 311.0, 26.3, 34.6, 6.8) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('2 huevos cocidos', 156.0, 12.6, 1.2, 10.6) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Pollo (150g)', 248.0, 46.5, 0.0, 5.4) ON CONFLICT (name) DO NOTHING;

INSERT INTO public.foods (name, calories_100g, protein_100g, carbs_100g, fats_100g) VALUES ('Platano (200g)', 178.0, 2.2, 45.6, 0.6) ON CONFLICT (name) DO NOTHING;


-- 2. Insertar Logs Diarios e Ingestas

INSERT INTO public.daily_logs (date) VALUES ('2026-07-13') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Sábado 18', 100, 0.0, 1.807, 96.9, 221.1, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Sábado 18') WHERE dl.date = '2026-07-13';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-14') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 huevo hervido', 100, 72.0, 6.3, 0.4, 4.8, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 huevo hervido') WHERE dl.date = '2026-07-14';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 Huevo cocido entero', 100, 72.0, 6.3, 0.4, 4.8, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 Huevo cocido entero') WHERE dl.date = '2026-07-14';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '2 Plátanos (medida filipina)', 100, 120.0, 1.4, 30.0, 0.4, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('2 Plátanos (medida filipina)') WHERE dl.date = '2026-07-14';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Del día hasta ahora', 100, 575.0, 38.5, 74.9, 15.3, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Del día hasta ahora') WHERE dl.date = '2026-07-14';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Del día (Ajo, plátanos, 2 huevos)', 100, 575.0, 38.5, 74.9, 15.3, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Del día (Ajo, plátanos, 2 huevos)') WHERE dl.date = '2026-07-14';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-15') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 Plátano (medida filipina)', 100, 60.0, 0.7, 15.0, 0.2, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 Plátano (medida filipina)') WHERE dl.date = '2026-07-15';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Medio polo', 100, 38.0, 0.3, 9.8, 0.1, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Medio polo') WHERE dl.date = '2026-07-15';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '70g de mango', 100, 38.0, 0.3, 9.8, 0.1, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('70g de mango') WHERE dl.date = '2026-07-15';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 Huevo cocido', 100, 72.0, 6.3, 0.4, 4.8, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 Huevo cocido') WHERE dl.date = '2026-07-15';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-16') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '147g de arroz cocido', 100, 191.0, 3.9, 41.5, 0.4, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('147g de arroz cocido') WHERE dl.date = '2026-07-16';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '40g de pepino', 100, 6.0, 0.3, 1.4, 0.1, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('40g de pepino') WHERE dl.date = '2026-07-16';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '70g de mango fresco', 100, 42.0, 0.6, 10.5, 0.3, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('70g de mango fresco') WHERE dl.date = '2026-07-16';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 Huevo entero', 100, 64.0, 4.4, 0.5, 4.7, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 Huevo entero') WHERE dl.date = '2026-07-16';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 yema', 100, 64.0, 4.4, 0.5, 4.7, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 yema') WHERE dl.date = '2026-07-16';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 Huevo cocido', 100, 72.0, 6.3, 0.4, 4.8, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 Huevo cocido') WHERE dl.date = '2026-07-16';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '27g de Sitaw', 100, 10.0, 0.5, 2.0, 0.1, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('27g de Sitaw') WHERE dl.date = '2026-07-16';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-17') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Burger McDo (Datos reales)', 100, 354.0, 13.0, 43.0, 14.0, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Burger McDo (Datos reales)') WHERE dl.date = '2026-07-17';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '108g de arroz blanco', 100, 140.0, 2.9, 30.5, 0.3, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('108g de arroz blanco') WHERE dl.date = '2026-07-17';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 Huevo cocido', 100, 72.0, 6.3, 0.4, 4.8, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 Huevo cocido') WHERE dl.date = '2026-07-17';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Medio Popstick helado', 100, 110.0, 1.2, 11.5, 6.5, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Medio Popstick helado') WHERE dl.date = '2026-07-17';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Medio Popstick de hielo', 100, 22.0, 0.0, 5.5, 0.0, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Medio Popstick de hielo') WHERE dl.date = '2026-07-17';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '50g de mango fresco', 100, 30.0, 0.4, 7.5, 0.2, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('50g de mango fresco') WHERE dl.date = '2026-07-17';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Omelette (2 huevos, cherrys, cebolla y 4g queso)', 100, 171.0, 13.9, 4.1, 10.8, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Omelette (2 huevos, cherrys, cebolla y 4g queso)') WHERE dl.date = '2026-07-17';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-18') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Huevos, 1.5 hot dogs y Milk Tea', 100, 743.0, 27.1, 67.3, 40.6, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Huevos, 1.5 hot dogs y Milk Tea') WHERE dl.date = '2026-07-18';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Medio Ice Pop', 100, 22.0, 0.0, 5.5, 0.0, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Medio Ice Pop') WHERE dl.date = '2026-07-18';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '2 vasos de Buko Juice', 100, 95.0, 1.0, 22.0, 1.0, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('2 vasos de Buko Juice') WHERE dl.date = '2026-07-18';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-19') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.daily_logs (date) VALUES ('2026-07-20') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.daily_logs (date) VALUES ('2026-07-21') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '100g de Mango fresco', 100, 60.0, 0.8, 15.0, 0.4, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('100g de Mango fresco') WHERE dl.date = '2026-07-21';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-22') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '2 mini burgers caseras', 100, 250.0, 18.6, 35.2, 4.2, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('2 mini burgers caseras') WHERE dl.date = '2026-07-22';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Yogur (50g), avena (50g) y plátano (100g)', 100, 305.0, 9.7, 58.2, 5.5, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Yogur (50g), avena (50g) y plátano (100g)') WHERE dl.date = '2026-07-22';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-23') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '2 mini burgers, 1 huevo cocido, 50g yogur, 40g avena y 1 plátano', 100, 596.0, 33.2, 87.4, 14.3, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('2 mini burgers, 1 huevo cocido, 50g yogur, 40g avena y 1 plátano') WHERE dl.date = '2026-07-23';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '(2 mini burgers, huevo, yogur, avena, plátano)', 100, 596.0, 33.2, 87.4, 14.3, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('(2 mini burgers, huevo, yogur, avena, plátano)') WHERE dl.date = '2026-07-23';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 Huevo cocido grande', 100, 78.0, 6.3, 0.6, 5.3, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 Huevo cocido grande') WHERE dl.date = '2026-07-23';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Donut de chocolate y Pan de Ube con queso', 100, 370.0, 7.0, 51.0, 15.5, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Donut de chocolate y Pan de Ube con queso') WHERE dl.date = '2026-07-23';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Actual', 100, 1596.0, 91.6, 201.4, 48.0, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Actual') WHERE dl.date = '2026-07-23';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '(2 burgers', 100, 171.0, 13.0, 12.4, 7.5, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('(2 burgers') WHERE dl.date = '2026-07-23';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 balut', 100, 171.0, 13.0, 12.4, 7.5, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 balut') WHERE dl.date = '2026-07-23';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 huevo)', 100, 171.0, 13.0, 12.4, 7.5, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 huevo)') WHERE dl.date = '2026-07-23';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Actual', 100, 1596.0, 91.6, 201.4, 48.0, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Actual') WHERE dl.date = '2026-07-23';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '(2 burgers', 100, 218.0, 16.3, 18.4, 8.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('(2 burgers') WHERE dl.date = '2026-07-23';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 balut)', 100, 218.0, 16.3, 18.4, 8.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 balut)') WHERE dl.date = '2026-07-23';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-24') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '50g mango, 1 hot dog rojo sin aceite, 1 huevo cocido', 100, 248.0, 12.2, 11.1, 17.0, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('50g mango, 1 hot dog rojo sin aceite, 1 huevo cocido') WHERE dl.date = '2026-07-24';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 Huevo cocido grande', 100, 78.0, 6.3, 0.6, 5.3, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 Huevo cocido grande') WHERE dl.date = '2026-07-24';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '3 cucharaditas de Mango Graham (\~25g)', 100, 62.0, 0.9, 9.0, 2.6, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('3 cucharaditas de Mango Graham (\~25g)') WHERE dl.date = '2026-07-24';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Pollo (110g), patata (100g), zanahoria (60g) y sitaw (15g)', 100, 301.0, 37.1, 27.1, 4.2, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Pollo (110g), patata (100g), zanahoria (60g) y sitaw (15g)') WHERE dl.date = '2026-07-24';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '', 100, 194.0, 9.7, 10.3, 12.4, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('') WHERE dl.date = '2026-07-24';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Mango Graham', 100, 194.0, 9.7, 10.3, 12.4, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Mango Graham') WHERE dl.date = '2026-07-24';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Pollo cocido (110g), patata (100g), zanahoria (60g) y sitaw (15g)', 100, 334.0, 37.1, 27.1, 4.5, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Pollo cocido (110g), patata (100g), zanahoria (60g) y sitaw (15g)') WHERE dl.date = '2026-07-24';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '70g de Mango', 100, 42.0, 0.6, 10.5, 0.3, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('70g de Mango') WHERE dl.date = '2026-07-24';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 Mini burger casera', 100, 136.0, 13.1, 14.9, 2.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 Mini burger casera') WHERE dl.date = '2026-07-24';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 Mini burger (receta de 11 uds)', 100, 124.0, 11.9, 13.5, 2.3, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 Mini burger (receta de 11 uds)') WHERE dl.date = '2026-07-24';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '3 Takoyakis de pulpo', 100, 180.0, 7.5, 22.5, 6.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('3 Takoyakis de pulpo') WHERE dl.date = '2026-07-24';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Cheesy Beef Bread', 100, 510.0, 28.0, 53.0, 20.0, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Cheesy Beef Bread') WHERE dl.date = '2026-07-24';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-25') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '2 cuch. Mango Graham, 1 mini burger, 1 plátano filipino', 100, 246.0, 13.5, 39.2, 4.6, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('2 cuch. Mango Graham, 1 mini burger, 1 plátano filipino') WHERE dl.date = '2026-07-25';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 Bibingka (\~100g)', 100, 230.0, 4.5, 36.0, 7.5, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 Bibingka (\~100g)') WHERE dl.date = '2026-07-25';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Pollo (110g), arroz (100g), zanahoria, cebolla y sitaw', 100, 361.0, 37.4, 31.6, 4.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Pollo (110g), arroz (100g), zanahoria, cebolla y sitaw') WHERE dl.date = '2026-07-25';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '100g de Arroz cocido', 100, 130.0, 2.7, 28.2, 0.3, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('100g de Arroz cocido') WHERE dl.date = '2026-07-25';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 Mini burger casera', 100, 124.0, 11.9, 13.5, 2.3, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 Mini burger casera') WHERE dl.date = '2026-07-25';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Leche de coco (gata) en la cocción', 100, 70.0, 0.7, 1.7, 7.0, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Leche de coco (gata) en la cocción') WHERE dl.date = '2026-07-25';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Guiso de pollo con coco, patata, zanahoria y 70g arroz', 100, 470.0, 41.2, 36.5, 12.9, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Guiso de pollo con coco, patata, zanahoria y 70g arroz') WHERE dl.date = '2026-07-25';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-26') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '2 Puto tradicionales', 100, 150.0, 2.6, 32.0, 1.2, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('2 Puto tradicionales') WHERE dl.date = '2026-07-26';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '2 Puto con queso', 100, 185.0, 4.6, 32.4, 4.0, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('2 Puto con queso') WHERE dl.date = '2026-07-26';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Puto con queso (90g)', 100, 234.0, 5.9, 41.6, 5.1, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Puto con queso (90g)') WHERE dl.date = '2026-07-26';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Puto con queso (100g)', 100, 260.0, 6.5, 46.2, 5.7, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Puto con queso (100g)') WHERE dl.date = '2026-07-26';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 Huevo cocido', 100, 72.0, 6.3, 0.4, 4.8, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 Huevo cocido') WHERE dl.date = '2026-07-26';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '100g arroz, guiso de pollo al coco (110g) y 1 mini burger', 100, 584.0, 50.4, 53.5, 13.9, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('100g arroz, guiso de pollo al coco (110g) y 1 mini burger') WHERE dl.date = '2026-07-26';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '40g de Mango Graham', 100, 100.0, 1.4, 14.4, 4.2, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('40g de Mango Graham') WHERE dl.date = '2026-07-26';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '100g mango', 100, 64.0, 0.8, 16.1, 0.3, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('100g mango') WHERE dl.date = '2026-07-26';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1.5 plátano filipino', 100, 64.0, 0.8, 16.1, 0.3, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1.5 plátano filipino') WHERE dl.date = '2026-07-26';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 Puto tradicional sin queso (70g)', 100, 161.0, 2.8, 35.7, 0.7, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 Puto tradicional sin queso (70g)') WHERE dl.date = '2026-07-26';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 Mini burger casera', 100, 124.0, 11.9, 13.5, 2.3, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 Mini burger casera') WHERE dl.date = '2026-07-26';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-27') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '2 Mini burgers', 100, 142.0, 12.2, 18.0, 2.4, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('2 Mini burgers') WHERE dl.date = '2026-07-27';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '60g mango', 100, 142.0, 12.2, 18.0, 2.4, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('60g mango') WHERE dl.date = '2026-07-27';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Pollo al coco (120g), 60g puto y 60g mango graham', 100, 638.0, 43.1, 62.2, 19.5, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Pollo al coco (120g), 60g puto y 60g mango graham') WHERE dl.date = '2026-07-27';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '(Pollo soja/ostras, patata, arroz, huevo, mango graham y Tang)', 100, 706.0, 50.6, 73.4, 18.0, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('(Pollo soja/ostras, patata, arroz, huevo, mango graham y Tang)') WHERE dl.date = '2026-07-27';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-28') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '120g Yogur natural', 100, 73.0, 4.2, 5.6, 4.0, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('120g Yogur natural') WHERE dl.date = '2026-07-28';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '2 Mini burgers caseras', 100, 248.0, 23.8, 27.0, 4.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('2 Mini burgers caseras') WHERE dl.date = '2026-07-28';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Yogur (170g), pollo (120g) con patata (80g) y 30g puto', 100, 493.0, 46.6, 42.3, 10.5, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Yogur (170g), pollo (120g) con patata (80g) y 30g puto') WHERE dl.date = '2026-07-28';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 Huevo duro', 100, 72.0, 6.3, 0.4, 4.8, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 Huevo duro') WHERE dl.date = '2026-07-28';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '50g avena', 100, 128.0, 6.0, 18.9, 3.4, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('50g avena') WHERE dl.date = '2026-07-28';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '100g yogur natural', 100, 128.0, 6.0, 18.9, 3.4, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('100g yogur natural') WHERE dl.date = '2026-07-28';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '115g extras de espaguetis preparados', 100, 189.0, 7.7, 27.6, 5.0, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('115g extras de espaguetis preparados') WHERE dl.date = '2026-07-28';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Previo a la cena', 100, 1142.0, 92.9, 113.2, 30.6, '20:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Previo a la cena') WHERE dl.date = '2026-07-28';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-29') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '115g yogur', 100, 145.0, 11.0, 17.4, 3.5, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('115g yogur') WHERE dl.date = '2026-07-29';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '30g avena', 100, 145.0, 11.0, 17.4, 3.5, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('30g avena') WHERE dl.date = '2026-07-29';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '2 mini burgers', 100, 145.0, 11.0, 17.4, 3.5, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('2 mini burgers') WHERE dl.date = '2026-07-29';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1/2 Ice pop de mango', 100, 40.0, 0.3, 9.5, 0.1, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1/2 Ice pop de mango') WHERE dl.date = '2026-07-29';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 Tortang talong (1 huevo)', 100, 159.0, 7.3, 10.2, 10.1, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 Tortang talong (1 huevo)') WHERE dl.date = '2026-07-29';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '150g de pasta preparada de ayer', 100, 218.0, 9.2, 28.4, 7.2, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('150g de pasta preparada de ayer') WHERE dl.date = '2026-07-29';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '100g de pollo cocinado', 100, 195.0, 31.0, 0.0, 3.8, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('100g de pollo cocinado') WHERE dl.date = '2026-07-29';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '100g yogur', 100, 102.0, 3.8, 18.0, 2.1, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('100g yogur') WHERE dl.date = '2026-07-29';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '40g avena', 100, 102.0, 3.8, 18.0, 2.1, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('40g avena') WHERE dl.date = '2026-07-29';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 plátano mediano', 100, 102.0, 3.8, 18.0, 2.1, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 plátano mediano') WHERE dl.date = '2026-07-29';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-30') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '140g yogur', 100, 110.0, 4.3, 18.6, 2.6, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('140g yogur') WHERE dl.date = '2026-07-30';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '40g avena', 100, 110.0, 4.3, 18.6, 2.6, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('40g avena') WHERE dl.date = '2026-07-30';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 plátano', 100, 110.0, 4.3, 18.6, 2.6, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 plátano') WHERE dl.date = '2026-07-30';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '40g de pan de banana', 100, 130.0, 1.8, 22.0, 4.2, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('40g de pan de banana') WHERE dl.date = '2026-07-30';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Plátano', 100, 100.0, 7.1, 12.6, 1.9, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Plátano') WHERE dl.date = '2026-07-30';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Pollo', 100, 100.0, 7.1, 12.6, 1.9, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Pollo') WHERE dl.date = '2026-07-30';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Patata', 100, 100.0, 7.1, 12.6, 1.9, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Patata') WHERE dl.date = '2026-07-30';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Pakbet', 100, 100.0, 7.1, 12.6, 1.9, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Pakbet') WHERE dl.date = '2026-07-30';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Espaguetis', 100, 100.0, 7.1, 12.6, 1.9, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Espaguetis') WHERE dl.date = '2026-07-30';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1/2 ice pop', 100, 100.0, 7.1, 12.6, 1.9, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1/2 ice pop') WHERE dl.date = '2026-07-30';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Yogur', 100, 138.0, 8.5, 7.3, 8.4, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Yogur') WHERE dl.date = '2026-07-30';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Avena', 100, 138.0, 8.5, 7.3, 8.4, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Avena') WHERE dl.date = '2026-07-30';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '2 huevos revueltos con queso', 100, 138.0, 8.5, 7.3, 8.4, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('2 huevos revueltos con queso') WHERE dl.date = '2026-07-30';

INSERT INTO public.daily_logs (date) VALUES ('2026-07-31') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Yogur', 100, 102.0, 3.4, 16.8, 2.8, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Yogur') WHERE dl.date = '2026-07-31';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Avena', 100, 102.0, 3.4, 16.8, 2.8, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Avena') WHERE dl.date = '2026-07-31';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Plátano', 100, 102.0, 3.4, 16.8, 2.8, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Plátano') WHERE dl.date = '2026-07-31';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Pan de banana', 100, 102.0, 3.4, 16.8, 2.8, '08:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Pan de banana') WHERE dl.date = '2026-07-31';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '2 mini hamburguesas', 100, 294.0, 28.2, 32.2, 5.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('2 mini hamburguesas') WHERE dl.date = '2026-07-31';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '120g pollo', 100, 150.0, 14.0, 16.1, 1.7, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('120g pollo') WHERE dl.date = '2026-07-31';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '100g patata', 100, 150.0, 14.0, 16.1, 1.7, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('100g patata') WHERE dl.date = '2026-07-31';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '100g arroz', 100, 150.0, 14.0, 16.1, 1.7, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('100g arroz') WHERE dl.date = '2026-07-31';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 huevo cocido', 100, 78.0, 6.3, 0.6, 5.3, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 huevo cocido') WHERE dl.date = '2026-07-31';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '3 piezas de siomai', 100, 130.0, 6.0, 9.0, 7.5, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('3 piezas de siomai') WHERE dl.date = '2026-07-31';

INSERT INTO public.daily_logs (date) VALUES ('2026-08-01') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '4 plátanos', 100, 203.0, 11.6, 28.5, 4.8, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('4 plátanos') WHERE dl.date = '2026-08-01';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Yogur', 100, 203.0, 11.6, 28.5, 4.8, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Yogur') WHERE dl.date = '2026-08-01';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Garbanzos', 100, 203.0, 11.6, 28.5, 4.8, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Garbanzos') WHERE dl.date = '2026-08-01';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Pollo tinola', 100, 203.0, 11.6, 28.5, 4.8, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Pollo tinola') WHERE dl.date = '2026-08-01';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Huevo', 100, 203.0, 11.6, 28.5, 4.8, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Huevo') WHERE dl.date = '2026-08-01';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Pan de banana', 100, 203.0, 11.6, 28.5, 4.8, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Pan de banana') WHERE dl.date = '2026-08-01';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Recamara / Snack: 180g yogur natural', 100, 110.0, 6.3, 8.5, 5.9, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Recamara / Snack: 180g yogur natural') WHERE dl.date = '2026-08-01';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '2 mini hamburguesas', 100, 294.0, 28.2, 32.2, 5.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('2 mini hamburguesas') WHERE dl.date = '2026-08-01';

INSERT INTO public.daily_logs (date) VALUES ('2026-08-02') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '170g pollo', 100, 248.0, 29.1, 16.5, 3.9, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('170g pollo') WHERE dl.date = '2026-08-02';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '60g pan shawarma', 100, 248.0, 29.1, 16.5, 3.9, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('60g pan shawarma') WHERE dl.date = '2026-08-02';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Yogur (170g)', 100, 96.0, 3.5, 15.4, 3.0, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Yogur (170g)') WHERE dl.date = '2026-08-02';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 Plátano', 100, 96.0, 3.5, 15.4, 3.0, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 Plátano') WHERE dl.date = '2026-08-02';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '2 mini burgers', 100, 155.0, 10.7, 23.8, 2.2, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('2 mini burgers') WHERE dl.date = '2026-08-02';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '30g pan shawarma', 100, 155.0, 10.7, 23.8, 2.2, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('30g pan shawarma') WHERE dl.date = '2026-08-02';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 plátano', 100, 155.0, 10.7, 23.8, 2.2, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 plátano') WHERE dl.date = '2026-08-02';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Batido de plátano', 100, 270.0, 8.0, 41.0, 8.2, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Batido de plátano') WHERE dl.date = '2026-08-02';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1/2 plato Pad Thai', 100, 270.0, 8.0, 41.0, 8.2, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1/2 plato Pad Thai') WHERE dl.date = '2026-08-02';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Pan shawarma (55g)', 100, 67.0, 3.2, 11.3, 1.2, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Pan shawarma (55g)') WHERE dl.date = '2026-08-02';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Tofu', 100, 67.0, 3.2, 11.3, 1.2, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Tofu') WHERE dl.date = '2026-08-02';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Vegetales', 100, 67.0, 3.2, 11.3, 1.2, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Vegetales') WHERE dl.date = '2026-08-02';

INSERT INTO public.daily_logs (date) VALUES ('2026-08-03') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '120g yogur natural', 100, 81.0, 2.6, 14.2, 2.1, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('120g yogur natural') WHERE dl.date = '2026-08-03';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 plátano', 100, 81.0, 2.6, 14.2, 2.1, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 plátano') WHERE dl.date = '2026-08-03';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Yogur (120g)', 100, 81.0, 2.6, 14.2, 2.1, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Yogur (120g)') WHERE dl.date = '2026-08-03';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 plátano', 100, 81.0, 2.6, 14.2, 2.1, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 plátano') WHERE dl.date = '2026-08-03';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Curry garbanzos (200g)', 100, 312.0, 11.7, 53.4, 6.1, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Curry garbanzos (200g)') WHERE dl.date = '2026-08-03';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Arroz (170g)', 100, 312.0, 11.7, 53.4, 6.1, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Arroz (170g)') WHERE dl.date = '2026-08-03';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '2 mini hamburguesas', 100, 294.0, 28.2, 32.2, 5.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('2 mini hamburguesas') WHERE dl.date = '2026-08-03';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '2 Shawarmas dürüm (tofu', 100, 238.0, 11.5, 34.5, 6.4, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('2 Shawarmas dürüm (tofu') WHERE dl.date = '2026-08-03';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Queso)', 100, 238.0, 11.5, 34.5, 6.4, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Queso)') WHERE dl.date = '2026-08-03';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Postre/Snack: Yogur (160g)', 100, 74.0, 2.3, 12.9, 1.9, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Postre/Snack: Yogur (160g)') WHERE dl.date = '2026-08-03';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1 plátano', 100, 74.0, 2.3, 12.9, 1.9, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1 plátano') WHERE dl.date = '2026-08-03';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '1/2 ice pop', 100, 74.0, 2.3, 12.9, 1.9, '17:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('1/2 ice pop') WHERE dl.date = '2026-08-03';

INSERT INTO public.daily_logs (date) VALUES ('2026-08-04') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Garbanzos', 100, 138.0, 11.5, 13.1, 4.6, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Garbanzos') WHERE dl.date = '2026-08-04';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Pollo adobo', 100, 138.0, 11.5, 13.1, 4.6, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Pollo adobo') WHERE dl.date = '2026-08-04';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Patata', 100, 138.0, 11.5, 13.1, 4.6, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Patata') WHERE dl.date = '2026-08-04';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Zanahoria', 100, 138.0, 11.5, 13.1, 4.6, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Zanahoria') WHERE dl.date = '2026-08-04';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '2 mini hamburguesas', 100, 294.0, 28.2, 32.2, 5.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('2 mini hamburguesas') WHERE dl.date = '2026-08-04';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Pollo adobo (120g)', 100, 193.0, 13.4, 22.4, 5.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Pollo adobo (120g)') WHERE dl.date = '2026-08-04';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Patata (30g)', 100, 193.0, 13.4, 22.4, 5.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Patata (30g)') WHERE dl.date = '2026-08-04';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Arroz (100g)', 100, 193.0, 13.4, 22.4, 5.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Arroz (100g)') WHERE dl.date = '2026-08-04';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Garbanzos (180g)', 100, 193.0, 13.4, 22.4, 5.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Garbanzos (180g)') WHERE dl.date = '2026-08-04';

INSERT INTO public.daily_logs (date) VALUES ('2026-08-05') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Yogur con avena', 100, 312.0, 21.6, 26.6, 13.0, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Yogur con avena') WHERE dl.date = '2026-08-05';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Doble cheeseburger de ternera', 100, 312.0, 21.6, 26.6, 13.0, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Doble cheeseburger de ternera') WHERE dl.date = '2026-08-05';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Yogur con avena', 100, 301.0, 14.4, 26.6, 14.8, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Yogur con avena') WHERE dl.date = '2026-08-05';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Cheeseburger doble de ternera', 100, 301.0, 14.4, 26.6, 14.8, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Cheeseburger doble de ternera') WHERE dl.date = '2026-08-05';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Pan de hamburguesa', 100, 94.0, 5.8, 10.8, 3.3, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Pan de hamburguesa') WHERE dl.date = '2026-08-05';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '100g tofu', 100, 94.0, 5.8, 10.8, 3.3, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('100g tofu') WHERE dl.date = '2026-08-05';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Sizzling Pork', 100, 222.0, 10.8, 16.2, 12.5, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Sizzling Pork') WHERE dl.date = '2026-08-05';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Arroz', 100, 222.0, 10.8, 16.2, 12.5, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Arroz') WHERE dl.date = '2026-08-05';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Huevo frito', 100, 222.0, 10.8, 16.2, 12.5, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Huevo frito') WHERE dl.date = '2026-08-05';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Garbanzos (100g)', 100, 128.0, 7.5, 15.2, 4.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Garbanzos (100g)') WHERE dl.date = '2026-08-05';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Tofu (70g)', 100, 128.0, 7.5, 15.2, 4.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Tofu (70g)') WHERE dl.date = '2026-08-05';

INSERT INTO public.daily_logs (date) VALUES ('2026-08-06') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Yogur con avena', 100, 311.0, 26.3, 34.6, 6.8, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Yogur con avena') WHERE dl.date = '2026-08-06';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Pollo con garbanzos, patata y zanahoria', 100, 311.0, 26.3, 34.6, 6.8, '13:30' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Pollo con garbanzos, patata y zanahoria') WHERE dl.date = '2026-08-06';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, '2 huevos cocidos', 100, 156.0, 12.6, 1.2, 10.6, '12:00' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('2 huevos cocidos') WHERE dl.date = '2026-08-06';

INSERT INTO public.daily_logs (date) VALUES ('2026-08-07') ON CONFLICT (date) DO NOTHING;

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Pollo (150g)', 100, 248.0, 46.5, 0.0, 5.4, '11:35' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Pollo (150g)') WHERE dl.date = '2026-08-07';

INSERT INTO public.intakes (daily_log_id, food_id, description, grams, calories, protein, carbs, fats, time) SELECT dl.id, f.id, 'Platano (200g)', 100, 178.0, 2.2, 45.6, 0.6, '11:36' FROM public.daily_logs dl LEFT JOIN public.foods f ON LOWER(f.name) = LOWER('Platano (200g)') WHERE dl.date = '2026-08-07';
