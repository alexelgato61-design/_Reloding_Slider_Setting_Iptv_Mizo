const http = require('http');

console.log('\n=== DIRECT LOGIN TEST ===\n');

const postData = JSON.stringify({
  email: 'ayoub-k10@hotmail.com',
  password: 'admin123'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
    'Origin': 'http://localhost:3000'
  }
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log('Headers:', JSON.stringify(res.headers, null, 2));
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('\nResponse Body:');
    console.log(data);
    
    if (res.statusCode === 200) {
      console.log('\n✓ LOGIN SUCCESSFUL - Backend is working perfectly!');
    } else {
      console.log('\n✗ LOGIN FAILED');
    }
  });
});

req.on('error', (error) => {
  console.error('✗ REQUEST ERROR:', error.message);
});

req.write(postData);
req.end();
