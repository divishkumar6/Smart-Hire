# Deployment Guide for Smart-Hire

## Step-by-Step Deployment Instructions

### 1. Backend Deployment on Render

1. **Create Render Account**
   - Go to [render.com](https://render.com) and sign up/login
   - Connect your GitHub account

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Select "Build and deploy from a Git repository"
   - Connect to your GitHub repository: `divishkumar6/Smart-Hire`

3. **Configure Service Settings**
   - **Name**: `smart-hire-backend` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Set Environment Variables**
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smarthire
   JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
   JWT_EXPIRE=7d
   CORS_ORIGIN=https://your-app-name.netlify.app
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL: `https://your-service-name.onrender.com`

### 2. Frontend Deployment on Netlify

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com) and sign up/login
   - Connect your GitHub account

2. **Create New Site**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository: `divishkumar6/Smart-Hire`

3. **Configure Build Settings**
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

4. **Set Environment Variables**
   - Go to Site settings → Environment variables
   - Add: `VITE_API_URL` = `https://your-backend-service.onrender.com`

5. **Update Configuration Files**
   - Update `frontend/netlify.toml` with your actual backend URL
   - Update `frontend/.env.production` with your backend URL

6. **Deploy**
   - Click "Deploy site"
   - Wait for deployment to complete
   - Note your frontend URL: `https://your-app-name.netlify.app`

### 3. Update CORS Configuration

After getting your Netlify URL, update the backend environment variable:
- In Render dashboard, go to your service → Environment
- Update `CORS_ORIGIN` to your actual Netlify URL
- Redeploy the service

### 4. Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   - Create a free cluster

2. **Configure Database**
   - Create a database user
   - Whitelist IP addresses (0.0.0.0/0 for all IPs)
   - Get connection string

3. **Update Environment Variable**
   - Replace `MONGODB_URI` in Render with your Atlas connection string

### 5. Final Configuration Updates

1. **Update netlify.toml**
   ```toml
   [build]
     publish = "dist"
     command = "npm run build"

   [[redirects]]
     from = "/api/*"
     to = "https://your-actual-backend-url.onrender.com/api/:splat"
     status = 200
     force = true

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Update .env.production**
   ```
   VITE_API_URL=https://your-actual-backend-url.onrender.com
   ```

### 6. Testing Deployment

1. Visit your Netlify URL
2. Try logging in with default admin credentials:
   - Email: admin@smarthire.com
   - Password: admin123
3. Test all major features

### 7. Troubleshooting

**Common Issues:**

1. **CORS Errors**
   - Ensure CORS_ORIGIN matches your Netlify URL exactly
   - Check for trailing slashes

2. **API Connection Issues**
   - Verify VITE_API_URL is correct
   - Check network tab for failed requests

3. **Build Failures**
   - Check build logs in Netlify/Render
   - Ensure all dependencies are in package.json

4. **Database Connection**
   - Verify MongoDB URI is correct
   - Check IP whitelist in MongoDB Atlas

### 8. Post-Deployment Steps

1. **Seed Database** (if needed)
   - SSH into Render service or run locally with production DB
   - Run: `npm run seed`

2. **Monitor Performance**
   - Check Render metrics
   - Monitor Netlify analytics

3. **Set up Custom Domain** (optional)
   - Configure custom domain in Netlify
   - Update CORS_ORIGIN accordingly

## URLs to Replace

After deployment, update these placeholders with actual URLs:

- `your-backend-app.onrender.com` → Your actual Render service URL
- `your-netlify-app.netlify.app` → Your actual Netlify app URL

## Support

If you encounter issues during deployment, check:
1. Build logs in respective platforms
2. Browser console for frontend errors
3. Server logs in Render dashboard