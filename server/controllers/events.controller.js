import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve path to eventsData.json relative to this file (works in ESM)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, '..', 'eventsData.json');

let events = [];
try {
  const raw = fs.readFileSync(dataPath, 'utf8');
  const parsed = JSON.parse(raw);
  // file uses a top-level "events" key
  events = Array.isArray(parsed.events) ? parsed.events : [];
} catch (err) {
  console.error('Failed to load eventsData.json:', err);
  events = [];
}

function returnEvents(req, res) {
    console.log("Returning events:", events);
    return res.json(events);
}

export { returnEvents };