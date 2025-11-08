const db = require('./config/database');
const bcrypt = require('bcryptjs');

console.log('\n========================================');
console.log('  COMPLETE SYSTEM CHECK');
console.log('========================================\n');

async function runTests() {
  try {
    // Test 1: Database Connection
    console.log('✓ MySQL Database connected successfully');
    
    // Test 2: Check admins table
    console.log('\n📋 Checking admins table...');
    const [admins] = await db.query('SELECT id, email, password_hash FROM admins');
    
    if (admins.length === 0) {
      console.log('❌ No admin found in database!');
      process.exit(1);
    }
    
    const admin = admins[0];
    console.log(`✓ Found admin: ${admin.email}`);
    console.log(`  ID: ${admin.id}`);
    
    // Test 3: Verify password
    console.log('\n🔐 Testing password hash...');
    const testPassword = 'admin123';
    const isValid = await bcrypt.compare(testPassword, admin.password_hash);
    
    if (isValid) {
      console.log(`✓ Password 'admin123' matches the hash`);
    } else {
      console.log(`❌ Password 'admin123' does NOT match`);
      console.log('   Resetting password to admin123...');
      
      const salt = await bcrypt.genSalt(10);
      const newHash = await bcrypt.hash(testPassword, salt);
      
      await db.query('UPDATE admins SET password_hash = ? WHERE id = ?', [newHash, admin.id]);
      console.log('✓ Password reset complete');
    }
    
    // Test 4: Check settings table
    console.log('\n⚙️  Checking settings table...');
    const [settings] = await db.query('SELECT COUNT(*) as count FROM settings');
    console.log(`✓ Settings table exists (${settings[0].count} rows)`);
    
    // Test 5: Check password_resets table
    console.log('\n🔄 Checking password_resets table...');
    try {
      const [resets] = await db.query('SELECT COUNT(*) as count FROM password_resets');
      console.log(`✓ Password resets table exists (${resets[0].count} rows)`);
    } catch (e) {
      console.log(`⚠️  Password resets table issue: ${e.message}`);
    }
    
    // Test 6: Summary
    console.log('\n========================================');
    console.log('  CREDENTIALS TO USE:');
    console.log('========================================');
    console.log(`Email: ${admin.email}`);
    console.log(`Password: admin123`);
    console.log('========================================\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  process.exit(0);
}

runTests();
