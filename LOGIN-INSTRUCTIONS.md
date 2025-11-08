# 🎯 LOGIN INSTRUCTIONS - QUICK REFERENCE

## ⚠️ IMPORTANT: Use the Correct Port!

Your frontend is running on **PORT 3001** (not 3000)

## 🔐 Login Credentials

**URL:** http://localhost:3001/admin/login  
**Email:** `ayoub-k10@hotmail.com`  
**Password:** `admin123`

## 🚀 How to Start Servers

### Method 1: Use Batch Files (Easiest)
```powershell
# From the main project folder:
.\START-BACKEND.bat
.\START-FRONTEND.bat
```

### Method 2: Manual Start
```powershell
# Terminal 1 - Backend:
cd "d:\download\IPTV-WEBSITE-WITH-FULL-CONTENT-MANAGING-XIII\IPTV-WEBSITE-WITH-FULL-CONTENT-MANAGING-XIII\backend"
node server.js

# Terminal 2 - Frontend:
cd "d:\download\IPTV-WEBSITE-WITH-FULL-CONTENT-MANAGING-XIII\IPTV-WEBSITE-WITH-FULL-CONTENT-MANAGING-XIII\next-app"
npm run dev
```

## 📋 Check Server Status

```powershell
# Check what ports are being used:
Get-NetTCPConnection -State Listen | Where-Object { $_.LocalPort -in @(3000, 3001, 5000) }
```

Expected output:
- **Port 5000** = Backend API
- **Port 3001** = Frontend (or 3000 if 3001 is busy)

## 🔧 If Login Still Fails

1. **Check you're on the right port:**
   - Try http://localhost:3000/admin/login
   - Try http://localhost:3001/admin/login
   - One of them should work

2. **Clear browser cache:**
   - Press `Ctrl + Shift + Delete`
   - Clear "Cached images and files"
   - Click "Clear data"

3. **Hard refresh the page:**
   - Press `Ctrl + F5`

4. **Check browser console:**
   - Press `F12`
   - Click "Console" tab
   - Look for any red error messages
   - Take a screenshot if you see errors

5. **Check backend is responding:**
   ```powershell
   curl http://localhost:5000/api/health
   ```
   Should return: `{"status":"OK","message":"IPTV Backend API is running",...}`

## 📧 Password Recovery

If you forget your password:

1. Click "Forgot Password?" on login page
2. Enter email: `ayoub-k10@hotmail.com`
3. Check your email inbox
4. Click the reset link
5. Enter new password

OR manually reset using script:
```powershell
cd backend
node change-admin-password.js "ayoub-k10@hotmail.com" "yournewpassword"
```

## 🎯 Port Confusion Fix

If you're getting CORS errors or login isn't working:

**Check which port the frontend is actually on:**
```powershell
Get-NetTCPConnection -LocalPort 3000,3001 -State Listen
```

Then use that port in your browser!

## ✅ Verification Checklist

Before trying to login, verify:

- [ ] Backend running (check port 5000)
- [ ] Frontend running (check port 3000 or 3001)
- [ ] Using correct URL (match the frontend port)
- [ ] Using correct email: `ayoub-k10@hotmail.com`
- [ ] Using correct password: `admin123`
- [ ] Browser cache cleared
- [ ] No JavaScript errors in console (F12)

---

**Quick Test:**
```powershell
# Test login works:
cd "d:\download\IPTV-WEBSITE-WITH-FULL-CONTENT-MANAGING-XIII\IPTV-WEBSITE-WITH-FULL-CONTENT-MANAGING-XIII"
node test-login-final.js
```

Expected result: `✅ LOGIN SUCCESSFUL!`
