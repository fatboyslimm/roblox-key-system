// validate.js - простий валідатор ключів
let validKeys = [
  'ROBLOX-TEST-123',
  'ANIME-TOWER-2026'
];

export default function handler(req, res) {
  // Дозволяємо запити з Roblox
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ valid: false, message: 'Тільки POST' });
  }

  const { key } = req.body;
  
  if (validKeys.includes(key)) {
    validKeys = validKeys.filter(k => k !== key);
    return res.json({ valid: true, message: '✅ Ключ прийнято' });
  } else {
    return res.json({ valid: false, message: '❌ Невірний ключ' });
  }
}
