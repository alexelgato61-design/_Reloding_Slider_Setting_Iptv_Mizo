const db = require('./backend/config/database');

(async () => {
  try {
    const [rows] = await db.query('SELECT id, email FROM admins');
    console.log('\n=== Admins in database ===');
    rows.forEach(r => {
      console.log(`Email: ${r.email}`);
      console.log(`ID: ${r.id}`);
      console.log('---');
    });
    
    if (rows.length === 0) {
      console.log('No admins found in database!');
    }
  } catch(e) {
    console.error('Error:', e.message);
  }
  process.exit();
})();
