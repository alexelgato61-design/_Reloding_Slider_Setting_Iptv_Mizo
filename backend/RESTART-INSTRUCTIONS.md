# Backend Restart Instructions

## CORS Issue Fix

The CORS error you're seeing means the backend server needs to be restarted with the updated configuration.

## Steps to Fix on Your Production Server (api.365upstream.com):

### Option 1: Using PM2 (Recommended)
```bash
# SSH into your server
ssh user@api.365upstream.com

# Navigate to backend directory
cd /path/to/backend

# Upload the new server.js file (use FTP/SCP)
# Then restart PM2
pm2 restart all
# or restart specific app
pm2 restart iptv-backend

# Check logs
pm2 logs
```

### Option 2: Using systemd
```bash
# SSH into your server
ssh user@api.365upstream.com

# Upload the new server.js file
# Then restart the service
sudo systemctl restart iptv-backend
# or
sudo systemctl restart node-app

# Check status
sudo systemctl status iptv-backend
```

### Option 3: Direct Node Process
```bash
# SSH into your server
ssh user@api.365upstream.com

# Find the running Node process
ps aux | grep node

# Kill the process (replace PID with actual process ID)
kill -9 PID

# Navigate to backend directory
cd /path/to/backend

# Start the server again
NODE_ENV=production node server.js
# or
npm start
```

### Option 4: Using your hosting panel
1. Upload the updated `server.js` file via FTP/File Manager
2. Go to your hosting control panel
3. Find the Node.js application manager
4. Click "Restart Application" or "Restart"

## Verify the Fix

After restarting, test the CORS:
```bash
curl -I -X OPTIONS https://api.365upstream.com/api/auth/login \
  -H "Origin: https://365upstream.com" \
  -H "Access-Control-Request-Method: POST"
```

You should see:
```
Access-Control-Allow-Origin: https://365upstream.com
Access-Control-Allow-Credentials: true
```

## If Still Not Working

Check the backend is running:
```bash
curl https://api.365upstream.com/api/health
```

Should return:
```json
{"status":"OK","message":"IPTV Backend API is running","timestamp":"..."}
```

## Environment Variables Check

Make sure your `.env` file on the production server has:
```
NODE_ENV=production
FRONTEND_URL=https://365upstream.com
PORT=5000
```

## Important Notes

⚠️ **The changes MUST be uploaded to your production server**
⚠️ **The backend service MUST be restarted**
⚠️ **Just rebuilding the frontend won't fix CORS - the backend needs updating**
