// Цей файл буде обробляти запити з Roblox
// Шлях до нього буде: https://твій-проект.vercel.app/api/validate

// Список валідних ключів (ти можеш їх додавати вручну)
// Ключі, згенеровані через Linkvertise, додавай сюди
let validKeys = [
  'ROBLOX-TEST-123',
  'ANIME-TOWER-2026',
  'LINKVERTISE-GEN-001',
  'PREMIUM-KEY-777'
];

export default function handler(req, res) {
  // Дозволяємо запити з будь-яких джерел (потрібно для Roblox)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Якщо це preflight запит (OPTIONS) - просто підтверджуємо
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Приймаємо тільки POST запити
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      valid: false, 
      message: '❌ Тільки POST запити дозволені' 
    });
  }

  // Отримуємо ключ з тіла запиту
  const { key } = req.body;
  
  if (!key) {
    return res.status(400).json({ 
      valid: false, 
      message: '❌ Ключ не надано' 
    });
  }

  // Перевіряємо, чи є ключ у списку
  const index = validKeys.indexOf(key);
  
  if (index !== -1) {
    // Ключ знайдено - видаляємо його (одноразове використання)
    validKeys.splice(index, 1);
    
    // Логуємо успішне використання
    console.log(`✅ Ключ ${key} використано ${new Date().toISOString()}`);
    
    return res.status(200).json({ 
      valid: true, 
      message: '✅ Ключ прийнято! Телепорт активовано.'
    });
  } else {
    // Ключ не знайдено або вже використаний
    console.log(`❌ Невірна спроба: ${key}`);
    
    return res.status(200).json({ 
      valid: false, 
      message: '❌ Невірний або вже використаний ключ'
    });
  }
}

// Функція для додавання нових ключів (буде доступна через GET запит)
export function addKey(req, res) {
  // Ця функція неекспортована за замовчуванням, 
  // але ти можеш тимчасово розкоментувати, щоб додати ключі
  res.status(200).json({ 
    message: 'Додай ключі в масив validKeys в коді'
  });
}
