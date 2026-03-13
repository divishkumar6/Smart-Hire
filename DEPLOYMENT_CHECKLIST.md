# Smart-Hire Deployment Checklist

## ✅ Pre-Deployment (Completed)

- [x] Code pushed to GitHub repository
- [x] Created deployment configuration files
- [x] Updated API configuration for environment variables
- [x] Created Netlify configuration (netlify.toml)
- [x] Created environment variable templates

## 🚀 Next Steps (Manual Actions Required)

### 1. Backend Deployment (Render)

- [ ] Go to [render.com](https://render.com) and create account
- [ ] Create new Web Service
- [ ] Connect GitHub repository: `divishkumar6/Smart-Hire`
- [ ] Configure build settings:
  - Root Directory: `backend`
  - Build Command: `npm install`
  - Start Command: `npm start`
- [ ] Set environment variables:
  ```
  NODE_ENV=production
  PORT=10000
  MONGODB_URI=your_mongodb_atlas_connection_string
  JWT_SECRET=your_32_character_secret_key
  JWT_EXPIRE=7d
  CORS_ORIGIN=https://your-netlify-app.netlify.app
  ```
- [ ] Deploy and note the backend URL

### 2. Database Setup (MongoDB Atlas)

- [ ] Create MongoDB Atlas account at [mongodb.com/atlas](https://mongodb.com/atlas)
- [ ] Create a free cluster
- [ ] Create database user
- [ ] Whitelist IP addresses (0.0.0.0/0)
- [ ] Get connection string
- [ ] Update MONGODB_URI in Render environment variables

### 3. Frontend Deployment (Netlify)

- [ ] Go to [netlify.com](https://netlify.com) and create account
- [ ] Create new site from GitHub
- [ ] Connect repository: `divishkumar6/Smart-Hire`
- [ ] Configure build settings:
  - Base directory: `frontend`
  - Build command: `npm run build`
  - Publish directory: `frontend/dist`
- [ ] Set environment variable:
  - `VITE_API_URL=https://your-render-backend-url.onrender.com`
- [ ] Deploy and note the frontend URL

### 4. Final Configuration Updates

- [ ] Update `frontend/netlify.toml` with actual backend URL
- [ ] Update `frontend/.env.production` with actual backend URL
- [ ] Update CORS_ORIGIN in Render with actual Netlify URL
- [ ] Commit and push changes
- [ ] Redeploy both services

### 5. Testing

- [ ] Visit your Netlify app URL
- [ ] Test login with admin credentials:
  - Email: admin@smarthire.com
  - Password: admin123
- [ ] Test main features:
  - [ ] User registration/login
  - [ ] Dashboard access
  - [ ] Candidate management
  - [ ] Drive creation
  - [ ] File uploads

### 6. Optional Enhancements

- [ ] Set up custom domain on Netlify
- [ ] Configure SSL certificates
- [ ] Set up monitoring and alerts
- [ ] Configure backup strategies

## 📝 Important URLs to Save

After deployment, save these URLs:

- **Frontend URL**: https://your-app.netlify.app
- **Backend URL**: https://your-backend.onrender.com
- **GitHub Repository**: https://github.com/divishkumar6/Smart-Hire
- **MongoDB Atlas**: https://cloud.mongodb.com

## 🆘 Troubleshooting

If you encounter issues:

1. **Check build logs** in Netlify/Render dashboards
2. **Verify environment variables** are set correctly
3. **Test API endpoints** directly in browser
4. **Check CORS configuration** if getting connection errors
5. **Verify MongoDB connection** string format

## 📞 Support

For deployment assistance, refer to:
- [Render Documentation](https://render.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)