import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.join(__dirname, '../data/food_log.json');
const publicJsonPath = path.join(__dirname, '../app/public/food_log.json');

const foodMaster100g = {
  "platano": { calories: 89, protein: 1.1, carbs: 22.8, fats: 0.3, default_g: 100 },
  "platano saba": { calories: 92, protein: 1.1, carbs: 23.0, fats: 0.3, default_g: 65 },
  "saba": { calories: 92, protein: 1.1, carbs: 23.0, fats: 0.3, default_g: 65 },
  "pollo": { calories: 165, protein: 31.0, carbs: 0.0, fats: 3.6, default_g: 150 },
  "pechuga de pollo": { calories: 165, protein: 31.0, carbs: 0.0, fats: 3.6, default_g: 150 },
  "arroz": { calories: 130, protein: 2.7, carbs: 28.0, fats: 0.3, default_g: 150 },
  "huevo": { calories: 155, protein: 13.0, carbs: 1.1, fats: 11.0, default_g: 60 },
  "huevos": { calories: 155, protein: 13.0, carbs: 1.1, fats: 11.0, default_g: 120 },
  "mango": { calories: 60, protein: 0.8, carbs: 15.0, fats: 0.4, default_g: 80 },
  "pan": { calories: 265, protein: 9.0, carbs: 49.0, fats: 3.2, default_g: 50 },
  "pandesal": { calories: 287, protein: 7.5, carbs: 45.0, fats: 7.5, default_g: 40 },
  "atun": { calories: 130, protein: 28.0, carbs: 0.0, fats: 1.0, default_g: 100 },
  "yogur": { calories: 60, protein: 3.5, carbs: 4.7, fats: 3.3, default_g: 125 },
  "avena": { calories: 389, protein: 16.9, carbs: 66.3, fats: 6.9, default_g: 40 },
  "hamburguesa": { calories: 250, protein: 18.0, carbs: 20.0, fats: 12.0, default_g: 150 },
  "cheeseburger": { calories: 280, protein: 19.0, carbs: 22.0, fats: 14.0, default_g: 160 },
  "ternera": { calories: 250, protein: 26.0, carbs: 0.0, fats: 15.0, default_g: 150 }
};

function cleanFoodName(text) {
  return text.replace(/^(?:Comida|Desayuno|Cena|Snack|Merienda)\s*\d*:\s*/i, '').trim();
}

function parseFoodText(text) {
  const cleaned = cleanFoodName(text);
  // Split on '+', '\+', ' y ' (with spaces)
  const segments = cleaned.split(/\\?\+|\s+y\s+/i).map(s => s.trim()).filter(Boolean);
  
  let matches = [];

  for (const seg of segments) {
    const lower = seg.toLowerCase();
    const gramsMatch = lower.match(/(\d+)\s*g(?:ramos)?\s+(?:de\s+)?([a-z\s]+)/i);
    const qtyMatch = lower.match(/(\d+)\s+([a-z\s]+)/i);

    let foundKey = null;
    for (const key of Object.keys(foodMaster100g)) {
      if (lower.includes(key)) {
        foundKey = key;
        break;
      }
    }

    if (foundKey) {
      const info = foodMaster100g[foundKey];
      let grams = info.default_g;
      let unit = 'g';
      let quantity = grams;

      if (gramsMatch && gramsMatch[2].includes(foundKey)) {
        quantity = parseFloat(gramsMatch[1]);
        grams = quantity;
      } else if (qtyMatch && qtyMatch[2].includes(foundKey)) {
        // e.g. "2 huevos" -> quantity 2, unit 'ud'
        quantity = parseFloat(qtyMatch[1]);
        unit = 'ud';
        grams = info.default_g * quantity; // for macro calculation
      }

      const factor = grams / 100;
      matches.push({
        name: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/\s*\(\d+g\)$/i, ''),
        quantity: quantity,
        unit: unit,
        calories: Math.round(info.calories * factor),
        protein: Math.round(info.protein * factor * 10) / 10,
        carbs: Math.round(info.carbs * factor * 10) / 10,
        fats: Math.round(info.fats * factor * 10) / 10
      });
    } else {
      // Fallback
      matches.push({
        name: seg.charAt(0).toUpperCase() + seg.slice(1),
        quantity: 1,
        unit: 'porcion',
        calories: 180,
        protein: 12,
        carbs: 15,
        fats: 5
      });
    }
  }

  return matches;
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/api/log-food') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const { text, date } = JSON.parse(body);
        if (!text) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Text required' }));
          return;
        }

        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const targetDate = date || now.toISOString().slice(0, 10);

        const items = parseFoodText(text);

        let data = { dailyLogs: [], userProfile: { targetMacros: { calories: 1950, protein: 145, carbs: 195, fats: 65 } } };
        if (fs.existsSync(jsonPath)) {
          data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        }

        let dayLog = data.dailyLogs.find(l => l.date === targetDate);
        if (!dayLog) {
          dayLog = { date: targetDate, intakes: [], dailyTotals: { calories: 0, protein: 0, carbs: 0, fats: 0 } };
          data.dailyLogs.push(dayLog);
        }

        for (const item of items) {
          dayLog.intakes.push({
            time: timeStr,
            name: item.name,
            quantity: item.quantity,
            unit: item.unit,
            macros: {
              calories: item.calories,
              protein: item.protein,
              carbs: item.carbs,
              fats: item.fats
            }
          });
        }

        dayLog.dailyTotals = dayLog.intakes.reduce((acc, curr) => ({
          calories: Math.round(acc.calories + curr.macros.calories),
          protein: Math.round((acc.protein + curr.macros.protein) * 10) / 10,
          carbs: Math.round((acc.carbs + curr.macros.carbs) * 10) / 10,
          fats: Math.round((acc.fats + curr.macros.fats) * 10) / 10
        }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

        fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8');
        fs.writeFileSync(publicJsonPath, JSON.stringify(data, null, 2), 'utf-8');

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, addedItems: items, totals: dayLog.dailyTotals, updatedLog: dayLog }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  } else if (req.method === 'DELETE' && req.url.startsWith('/api/intake')) {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const { date, index } = JSON.parse(body);
        let data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        let dayLog = data.dailyLogs.find(l => l.date === date);
        if (dayLog && dayLog.intakes[index] !== undefined) {
          dayLog.intakes.splice(index, 1);
          dayLog.dailyTotals = dayLog.intakes.reduce((acc, curr) => ({
            calories: Math.round(acc.calories + curr.macros.calories),
            protein: Math.round((acc.protein + curr.macros.protein) * 10) / 10,
            carbs: Math.round((acc.carbs + curr.macros.carbs) * 10) / 10,
            fats: Math.round((acc.fats + curr.macros.fats) * 10) / 10
          }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

          fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8');
          fs.writeFileSync(publicJsonPath, JSON.stringify(data, null, 2), 'utf-8');
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, updatedLog: dayLog }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Local Fit Backend listening on http://localhost:${PORT}`);
});
