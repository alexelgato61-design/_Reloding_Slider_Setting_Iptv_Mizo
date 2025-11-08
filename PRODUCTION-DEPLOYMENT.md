# Production Deployment Guide

## Fixed Issues
✅ Frontend now correctly sends API requests to `https://api.365upstream.com`  
✅ Backend CORS updated to allow requests from `https://365upstream.com`  
✅ No more localhost:5000 errors in production

## Architecture
- **Frontend Domain**: `https://365upstream.com` (Next.js app)
- **Backend API Domain**: `https://api.365upstream.com` (Express API)

## Changes Made

### 1. Frontend Configuration (`next-app/app/lib/config.js`)
- Development (localhost): Uses `http://localhost:5000/api`
- Production: Always uses `https://api.365upstream.com/api`

### 2. Backend CORS (`backend/server.js`)
- Added `https://365upstream.com` to allowed origins
- Added `https://www.365upstream.com` to allowed origins
- Added `https://api.365upstream.com` to allowed origins

### 3. Environment Variables (`next-app/.env.production`)
```
NEXT_PUBLIC_API_URL=https://api.365upstream.com/api
```

## Deployment Steps

### Backend (api.365upstream.com)
1. Upload the `backend/` folder to your server
2. Create a `.env` file in the backend directory:
```bash
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=iptv_database
JWT_SECRET=your_secret_key
ADMIN_EMAIL=admin@365upstream.com
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://365upstream.com
```
3. Install dependencies: `npm install`
4. Restart the backend server
5. Verify it's running: `curl https://api.365upstream.com/api/health`

### Frontend (365upstream.com)
1. Build the frontend (already done): `npm run build`
2. Upload the entire `next-app/` folder to your server
3. Make sure `.env.production` file exists with:
```
NEXT_PUBLIC_API_URL=https://api.365upstream.com/api
```
4. Start the production server:
   - Using PM2: `pm2 start npm --name "iptv-frontend" -- start`
   - Or directly: `npm start`
5. Configure your web server (Nginx/Apache) to proxy to the Next.js server

## Testing
After deployment, test these endpoints:
- ✅ Login: `POST https://api.365upstream.com/api/auth/login`
- ✅ Recover Password: `POST https://api.365upstream.com/api/auth/recover-password`
- ✅ Get Settings: `GET https://api.365upstream.com/api/settings`

## Troubleshooting

### If you still see CORS errors:
1. Check backend logs for "CORS rejected origin" messages
2. Verify `NODE_ENV=production` is set in backend `.env`
3. Restart the backend server after changes

### If API calls fail:
1. Verify backend is running: `curl https://api.365upstream.com/api/health`
2. Check browser console for actual error messages
3. Verify DNS is correctly pointing:
   - `365upstream.com` → Frontend server
   - `api.365upstream.com` → Backend server

## Port Configuration
- **Backend**: Runs on port 5000 (internal)
- **Frontend**: Runs on port 3000 (internal)
- Your web server (Nginx/Apache) should proxy:
  - `https://365upstream.com` → `http://localhost:3000`
  - `https://api.365upstream.com` → `http://localhost:5000`
