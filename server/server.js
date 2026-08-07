import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.join(__dirname, '../data/food_log.json');
const publicJsonPath = path.join(__dirname, '../app/public/food_log.json');

// Local food DB per 100g lookup
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
  "atun": { calories: 130, protein: 28.0, carbs: 0.0, fats: 1.0, default_g: 100 }
};

function parseFoodText(text) {
  const lower = text.toLowerCase();
  let matches = [];

  // Grams regex check (e.g. 150g pollo)
  const gramsMatch = lower.match(/(\d+)\s*g(?:ramos)?\s+(?:de\s+)?([a-z\s]+)/i);
  const qtyMatch = lower.match(/(\d+)\s+([a-z\s]+)/i);

  let foundAny = false;
  for (const [key, info] of Object.entries(foodMaster100g)) {
    if (lower.includes(key)) {
      foundAny = true;
      let grams = info.default_g;
      if (gramsMatch && gramsMatch[2].includes(key)) {
        grams = parseFloat(gramsMatch[1]);
      } else if (qtyMatch && qtyMatch[2].includes(key)) {
        const qty = parseFloat(qtyMatch[1]);
        grams = info.default_g * qty;
      }

      const factor = grams / 100;
      matches.push({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        grams: grams,
        calories: Math.round(info.calories * factor),
        protein: Math.round(info.protein * factor * 10) / 10,
        carbs: Math.round(info.carbs * factor * 10) / 10,
        fats: Math.round(info.fats * factor * 10) / 10
      });
    }
  }

  if (!foundAny) {
    // Fallback estimation
    matches.push({
      name: text,
      grams: 100,
      calories: 200,
      protein: 15,
      carbs: 20,
      fats: 5
    });
  }

  return matches;
}

const server = http.createServer((req, res) => {
  // CORS
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
            description: `${item.name} (${item.grams}g)`,
            macros: {
              calories: item.calories,
              protein: item.protein,
              carbs: item.carbs,
              fats: item.fats
            }
          });
        }

        // Recalculate daily totals
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
    // Delete intake logic
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
