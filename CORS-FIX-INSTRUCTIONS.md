# CORS Issue Fix - Instructions

## Problem
Login fails with CORS error:
```
Access to fetch at 'http://localhost:5000/api/auth/login' from origin 'http://localhost:3000' 
has been blocked by CORS policy: Response to preflight request doesn't pass access control check: 
The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' 
when the request's credentials mode is 'include'.
```

## What Was Fixed
Updated `backend/server.js` CORS configuration to:
- ✅ Explicitly allow `http://localhost:3001` (frontend is running on this port)
- ✅ Explicitly allow `http://localhost:3000` (default port)
- ✅ Remove wildcard `*` when using `credentials: 'include'`
- ✅ Properly handle preflight OPTIONS requests

## How to Apply the Fix

### Step 1: Stop the Backend Server
You need to stop the currently running backend server. You can do this by:

**Option A: Find the terminal running the backend**
- Look for the terminal window that shows backend logs
- Press `Ctrl + C` to stop it

**Option B: Use Task Manager**
1. Open Task Manager (Ctrl + Shift + Esc)
2. Find "Node.js" processes
3. Right-click on the one using port 5000
4. Click "End Task"

**Option C: Use PowerShell as Administrator**
```powershell
# Run PowerShell as Administrator, then:
$port = 5000
$proc = Get-NetTCPConnection -LocalPort $port | Select-Object -ExpandProperty OwningProcess -Unique
Stop-Process -Id $proc -Force
```

### Step 2: Restart the Backend Server
Open a new PowerShell terminal and run:
```powershell
cd "d:\download\IPTV-WEBSITE-WITH-FULL-CONTENT-MANAGING-XIII\IPTV-WEBSITE-WITH-FULL-CONTENT-MANAGING-XIII"
.\START-BACKEND.bat
```

Or manually:
```powershell
cd "d:\download\IPTV-WEBSITE-WITH-FULL-CONTENT-MANAGING-XIII\IPTV-WEBSITE-WITH-FULL-CONTENT-MANAGING-XIII\backend"
node server.js
```

### Step 3: Verify the Fix
1. Go to `http://localhost:3001/admin/login` (or 3000 if that's where your frontend is)
2. Try to login with admin credentials
3. Check browser console (F12) - there should be no CORS errors
4. Login should work successfully

## What Changed in the Code

### Before (Problematic):
```javascript
corsOptions = {
  origin: true,  // ❌ This reflects the origin but doesn't work properly with credentials
  credentials: true
}
```

### After (Fixed):
```javascript
corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',  // ✅ Added this
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001'
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}
```

## Testing After Fix

### 1. Check CORS Headers
Open browser DevTools (F12) → Network tab → Try login → Check the response headers:
- ✅ `Access-Control-Allow-Origin: http://localhost:3001` (exact origin, not *)
- ✅ `Access-Control-Allow-Credentials: true`

### 2. Test Login
- Username: `admin@site.com` (or your admin email)
- Password: Your admin password
- Should redirect to dashboard on success

### 3. Check Backend Logs
Backend terminal should show:
```
[req] POST /auth/login origin=http://localhost:3001
```

## Troubleshooting

### Still Getting CORS Error?
1. **Clear browser cache**: Ctrl + Shift + Delete → Clear cached images and files
2. **Hard refresh**: Ctrl + F5 on the login page
3. **Check frontend port**: Make sure you're accessing the correct port (3000 or 3001)
4. **Verify backend restarted**: Backend logs should show the server starting with the new config

### "Failed to fetch" Error?
- Backend is not running → Start it with `.\START-BACKEND.bat`
- Wrong port → Check if frontend is calling `http://localhost:5000`

### Wrong Origin in Request?
Check `next-app/app/lib/config.js`:
```javascript
export function getApiUrl() {
  if (typeof window !== 'undefined') {
    return 'http://localhost:5000'  // Should match backend port
  }
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
}
```

## Notes
- This fix applies to **development mode only**
- In production, you'll need to add your production domain to allowed origins
- The fix maintains security while allowing credentials to be sent with requests
- Both port 3000 and 3001 are now supported

---
**Status**: ✅ Code Updated - **Action Required**: Restart Backend Server
