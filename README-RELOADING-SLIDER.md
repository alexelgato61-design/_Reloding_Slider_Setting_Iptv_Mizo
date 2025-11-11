# 🎯 Reloading Slider Setting IPTV Mizo

A complete IPTV service website with advanced slider management, real-time cache-busting, and smooth loading transitions. This project features a powerful admin panel for managing 5 different slider sections across the website.

## 🌟 Key Features

### 1. **5 Slider Management Sections**
- ✅ **Hero Section Slider** - Main homepage hero carousel
- ✅ **Streaming Services Slider** - Display streaming platform logos
- ✅ **Movies & TV Shows Slider** - Showcase popular content
- ✅ **Sports Events Slider** - Highlight sports content
- ✅ **Channel Categories Slider** - Display channel category icons (Channels page)

### 2. **Advanced Cache-Busting System**
- 🔄 **Multi-Layer Cache Prevention**
  - API timestamp parameters (`?_t=timestamp`)
  - Image cache-busting (`?v=cacheBuster`)
  - HTTP cache control headers
- ⚡ **Real-time Updates** - Changes in admin panel reflect instantly on frontend
- 🚫 **No More Stale Content** - Eliminated flash of old images

### 3. **Full-Page Loading Screen**
- 📊 **Progress Tracking** - Shows "X/4 sections loaded"
- 🎨 **Branded Loading UI** - Custom IPTV ACCESS logo with spinner
- ⏱️ **Smart Timeout** - 5-second fallback for fast loading
- 🎭 **Smooth Transitions** - Fade-in effect when content ready
- 📡 **CustomEvent System** - Components dispatch load events

### 4. **Dynamic Favicon System**
- 🎨 **Server-Side Metadata** - Next.js 15 metadata API
- 🔄 **Client-Side Updates** - FaviconUpdater component
- 📱 **Multi-Device Support** - Icon, shortcut, and apple-touch-icon
- 💾 **Admin Controlled** - Upload favicon from admin panel

### 5. **Complete Admin Dashboard**
- 🖼️ **Slider Galleries** - Visual management for all 5 sections
- ⬆️ **Bulk Upload** - Add multiple images at once
- 🗑️ **Quick Delete** - Remove images with confirmation
- 📋 **Image Count Display** - See total images per section
- 🎯 **Section-Based Organization** - Hero, Streaming, Movies, Sports, Channels

## 🏗️ Project Structure

```
IPTV-SERVICES-WEBSITE-THE-FINAL-VERSION/
├── backend/
│   ├── config/
│   │   └── database.js              # MySQL connection pool
│   ├── routes/
│   │   ├── sliderImages.js          # Slider CRUD API endpoints
│   │   ├── settings.js              # Site settings API
│   │   ├── upload.js                # Image upload handler
│   │   └── ...
│   ├── uploads/                     # Uploaded images directory
│   ├── add-hero-images.js           # Add default hero images
│   ├── populate-default-sliders.js  # Import initial slider data
│   ├── create-slider-images-table.js # Database table setup
│   ├── test-slider-data.js          # Check database contents
│   ├── server.js                    # Express server
│   └── package.json
│
├── next-app/
│   ├── app/
│   │   ├── components/
│   │   │   ├── PageLoader.jsx       # Full-page loading overlay
│   │   │   ├── Hero.jsx             # Hero slider component
│   │   │   ├── Streaming.jsx        # Streaming services slider
│   │   │   ├── Movies.jsx           # Movies slider
│   │   │   ├── SportsEvents.jsx     # Sports slider
│   │   │   ├── FaviconUpdater.jsx   # Dynamic favicon updater
│   │   │   └── ...
│   │   ├── admin/
│   │   │   └── dashboard/
│   │   │       └── page.jsx         # Admin panel with slider management
│   │   ├── channels/
│   │   │   └── page.jsx             # Channels page with slider
│   │   ├── layout.jsx               # Root layout with metadata
│   │   └── page.jsx                 # Homepage with PageLoader
│   ├── public/
│   │   └── images/                  # Static images
│   ├── styles/
│   │   └── globals.css
│   └── package.json
│
├── START-BACKEND.bat                # Quick backend start
├── START-FRONTEND.bat               # Quick frontend start
├── DEPLOYMENT-GUIDE.md
├── EMAIL-SETUP-GUIDE.md
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MySQL 8.0+
- Windows OS (for .bat scripts) or adapt commands for Linux/Mac

### 1. Clone Repository
```bash
git clone https://github.com/alexelgato61-design/_Reloding_Slider_Setting_Iptv_Mizo.git
cd _Reloding_Slider_Setting_Iptv_Mizo
```

### 2. Database Setup
```sql
-- Create database
CREATE DATABASE iptv_database;

-- Import schema
mysql -u root -p iptv_database < backend/database.sql

-- OR run table creation script
cd backend
node create-slider-images-table.js
```

### 3. Backend Setup
```bash
cd backend
npm install

# Configure database
# Edit config/database.js with your MySQL credentials

# Start backend server
npm start
# Or use: .\START-BACKEND.bat
```

Backend runs on: `http://localhost:5000`

### 4. Frontend Setup
```bash
cd next-app
npm install

# Start Next.js dev server
npm run dev
# Or use: .\START-FRONTEND.bat
```

Frontend runs on: `http://localhost:3000`

### 5. Populate Default Data
```bash
cd backend

# Add default slider images (48 images)
node populate-default-sliders.js

# Add hero section images (2 images)
node add-hero-images.js

# Verify data
node test-slider-data.js
```

## 📊 Database Schema

### `slider_images` Table
```sql
CREATE TABLE slider_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  section VARCHAR(50) NOT NULL,           -- hero, streaming, movies, sports, channels
  image_url TEXT NOT NULL,                -- URL or path to image
  display_order INT DEFAULT 0,            -- Order for display
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Sample Data
- **Hero**: 2 images (main carousel)
- **Streaming**: 9 images (service logos)
- **Movies**: 6 images (movie posters)
- **Sports**: 8 images (sports events)
- **Channels**: 25 images (channel icons)

## 🎨 Component Features

### PageLoader Component
```jsx
// Wraps entire homepage
<PageLoader>
  <Homepage />
</PageLoader>

// Tracks 4 slider sections:
// - hero, streaming, movies, sports
// Shows progress: "X/4 sections loaded"
```

### Slider Components with Cache-Busting
```javascript
// Each slider component:
1. Fetches data with timestamp: ?_t=${Date.now()}
2. Adds cache headers to fetch request
3. Appends cacheBuster to image URLs: ?v=${cacheBuster}
4. Dispatches CustomEvent when loaded
5. Updates cacheBuster on data change
```

### Admin Slider Gallery
```jsx
<SliderGallery
  title="Hero Section Slider"
  section="hero"
  sliders={heroSliders}
  handleUpload={handleSliderUpload}
  deleteImage={deleteSliderImage}
  isUploading={uploadingSlider === 'hero'}
/>
```

## 🔧 API Endpoints

### Slider Images
```
GET    /api/slider-images?section=hero     # Get images by section
POST   /api/slider-images                  # Upload new image
DELETE /api/slider-images/:id              # Delete image
```

### Settings
```
GET    /api/settings                       # Get all site settings
PUT    /api/settings                       # Update settings
```

### Upload
```
POST   /api/upload/slider                  # Upload slider image
```

## 🎯 Cache-Busting Implementation

### 1. API Level (Fetch Requests)
```javascript
const timestamp = new Date().getTime()
fetch(`${apiUrl}/slider-images?section=hero&_t=${timestamp}`, {
  cache: 'no-store',
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  }
})
```

### 2. Image Level (Component State)
```javascript
const [cacheBuster, setCacheBuster] = useState(Date.now())

// Image URLs
<img src={`${image.url}?v=${cacheBuster}`} />

// Update on data change
setCacheBuster(Date.now())
```

### 3. Settings Level (Favicon)
```javascript
// Server-side metadata
icons: settings.favicon_url ? {
  icon: settings.favicon_url,
  shortcut: settings.favicon_url,
  apple: settings.favicon_url
} : undefined

// Client-side with cache-buster
const faviconUrl = settings.favicon_url + `?v=${Date.now()}`
```

## 📱 Usage Guide

### Adding Slider Images (Admin)
1. Navigate to `http://localhost:3000/admin/login`
2. Login with admin credentials
3. Go to **Site Settings** section
4. Find the slider section (Hero, Streaming, Movies, Sports, Channels)
5. Click **"Add Images"** button
6. Select multiple images
7. Upload and see instant preview
8. Images appear immediately on frontend

### Deleting Slider Images
1. In admin panel, click **trash icon** on any image
2. Confirm deletion in dialog
3. Image removed from database
4. Frontend updates instantly (no stale cache)

### Changing Favicon
1. Admin Panel → Site Settings
2. Scroll to Favicon section
3. Upload new favicon image
4. Favicon updates across all pages
5. Works on desktop and mobile

## 🐛 Troubleshooting

### Issue: Deleted images still showing
**Solution**: Implemented multi-layer cache-busting
- Clear browser cache manually once
- System now prevents future caching

### Issue: Flash of old content on page load
**Solution**: PageLoader component
- Entire page hidden until all sliders loaded
- No more FOUC (Flash of Unstyled Content)

### Issue: Hero slider showing 0 images
**Solution**: Run hero images script
```bash
cd backend
node add-hero-images.js
```

### Issue: Database connection error
**Solution**: Check MySQL credentials in `backend/config/database.js`
```javascript
{
  host: 'localhost',
  user: 'root',
  password: '',  // Your MySQL password
  database: 'iptv_database'
}
```

## 🔐 Security Features

- ✅ **JWT Authentication** for admin panel
- ✅ **SQL Injection Prevention** with prepared statements
- ✅ **File Upload Validation** - Image types only
- ✅ **CORS Configuration** for API security
- ✅ **Environment Variables** for sensitive data
- ✅ **Password Hashing** with bcrypt

## 📈 Performance Optimizations

- ⚡ **Next.js 15** - App Router with Server Components
- 🖼️ **Image Optimization** - Next.js Image component
- 📦 **Code Splitting** - Automatic route-based splitting
- 🔄 **Parallel Data Fetching** - Promise.all for sliders
- 💾 **MySQL Connection Pooling** - Efficient database access
- 🎨 **CSS Optimizations** - Minimal inline styles

## 🚢 Deployment

### Production Build
```bash
# Backend
cd backend
npm install --production
pm2 start server.js --name iptv-backend

# Frontend
cd next-app
npm install
npm run build
npm start
# Or use pm2: pm2 start npm --name "iptv-frontend" -- start
```

### Environment Variables
```bash
# backend/.env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=iptv_database
JWT_SECRET=your_jwt_secret
PORT=5000

# next-app/.env.production
NEXT_PUBLIC_API_URL=https://your-domain.com/api
```

## 📝 Scripts Reference

### Backend Scripts
```bash
node add-hero-images.js           # Add 2 default hero images
node populate-default-sliders.js  # Add 48 slider images (all sections)
node test-slider-data.js          # Check database contents
node create-slider-images-table.js # Create slider_images table
node check-admin.js               # Verify admin account
node reset-admin-password.js      # Reset admin password
```

### NPM Scripts
```json
{
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

## 🎨 Customization

### Adding New Slider Section
1. Add new section to database enum
2. Create component in `next-app/app/components/`
3. Add state in `admin/dashboard/page.jsx`
4. Add `SliderGallery` component in admin
5. Update `loadSliderImages()` function
6. Add to PageLoader tracking (if homepage)

### Styling
- Global styles: `next-app/styles/globals.css`
- Component styles: Inline or CSS modules
- Loading screen: `PageLoader.jsx` styles

## 🤝 Contributing

This is a private project for IPTV Mizo service. For issues or questions:
- Email: alexelgato61@gmail.com
- GitHub: [@alexelgato61-design](https://github.com/alexelgato61-design)

## 📄 License

Copyright © 2025 IPTV Mizo. All rights reserved.

## 🎉 Features Implemented

- [x] 5 Slider sections with database storage
- [x] Admin panel with visual slider management
- [x] Multi-layer cache-busting system
- [x] Full-page loading screen with progress
- [x] Dynamic favicon with server + client updates
- [x] Real-time updates without page refresh
- [x] Bulk image upload
- [x] Image deletion with confirmation
- [x] CustomEvent-based component tracking
- [x] Responsive design for all devices
- [x] MySQL database with connection pooling
- [x] Next.js 15 App Router
- [x] JWT authentication
- [x] File upload handling
- [x] Default image population scripts

## 🚀 Technology Stack

**Frontend:**
- Next.js 15.5.6
- React 18
- CSS3 with modern features
- Next.js Image optimization

**Backend:**
- Node.js
- Express.js
- MySQL 8.0
- JWT for authentication
- Multer for file uploads
- bcrypt for password hashing

**DevOps:**
- Git version control
- PM2 for process management
- Environment-based configuration

---

**Built with ❤️ by alexelgato61-design**

For support, visit: [GitHub Repository](https://github.com/alexelgato61-design/_Reloding_Slider_Setting_Iptv_Mizo)
