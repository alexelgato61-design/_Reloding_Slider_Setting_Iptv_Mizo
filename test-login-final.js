// Test login with correct credentials
const testLogin = async () => {
  try {
    console.log('\n========================================');
    console.log('  TESTING LOGIN');
    console.log('========================================\n');
    
    const credentials = {
      email: 'ayoub-k10@hotmail.com',
      password: 'admin123'
    };
    
    console.log('Attempting login with:');
    console.log(`Email: ${credentials.email}`);
    console.log(`Password: ${credentials.password}\n`);
    
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000'
      },
      credentials: 'include',
      body: JSON.stringify(credentials)
    });

    console.log(`Response Status: ${response.status} ${response.statusText}`);
    console.log('\nResponse Headers:');
    console.log(`  Access-Control-Allow-Origin: ${response.headers.get('access-control-allow-origin')}`);
    console.log(`  Access-Control-Allow-Credentials: ${response.headers.get('access-control-allow-credentials')}`);
    console.log(`  Set-Cookie: ${response.headers.get('set-cookie') ? 'YES (token cookie set)' : 'NO'}`);
    
    const data = await response.json();
    console.log('\nResponse Data:');
    console.log(JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('\n✅ LOGIN SUCCESSFUL!');
    } else {
      console.log('\n❌ LOGIN FAILED');
    }
    
    console.log('\n========================================\n');
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
  }
};

testLogin();
