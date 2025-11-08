const db = require('./backend/config/database');
const bcrypt = require('bcryptjs');

const resetPassword = async (email, newPassword) => {
  try {
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update the password
    const [result] = await db.query(
      'UPDATE admins SET password_hash = ? WHERE email = ?',
      [hashedPassword, email.toLowerCase().trim()]
    );
    
    if (result.affectedRows === 0) {
      console.log(`❌ Admin with email ${email} not found`);
    } else {
      console.log(`✅ Password updated successfully for ${email}`);
      console.log(`New password: ${newPassword}`);
    }
  } catch(e) {
    console.error('❌ Error:', e.message);
  }
  process.exit();
};

// Get email and password from command line arguments
const email = process.argv[2] || 'ayoub-k10@hotmail.com';
const password = process.argv[3] || 'admin123';

console.log(`\nResetting password for: ${email}`);
console.log(`New password will be: ${password}\n`);

resetPassword(email, password);
