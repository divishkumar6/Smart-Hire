# Smart-Hire - Recruitment Management System

A comprehensive MERN stack application for managing placement drives, candidates, and recruitment processes.

## 🚀 Features

- **Admin Dashboard**: Manage users, drives, and system settings
- **Recruiter Portal**: Create and manage placement drives
- **Candidate Management**: Add, view, and track candidates
- **ATS Integration**: Resume parsing and scoring
- **Offer Letter Generation**: Automated offer letter creation
- **Real-time Analytics**: Dashboard with recruitment metrics

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Three.js
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT
- **File Processing**: PDF parsing, Excel import/export

## 📦 Deployment

### Backend (Render)

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Set the following configuration:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment Variables**:
     ```
     NODE_ENV=production
     PORT=10000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key_min_32_chars
     JWT_EXPIRE=7d
     CORS_ORIGIN=https://your-netlify-app.netlify.app
     ```

### Frontend (Netlify)

1. Create a new site on [Netlify](https://netlify.com)
2. Connect your GitHub repository
3. Set the following build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
4. Update environment variables:
   - `VITE_API_URL=https://your-backend-app.onrender.com`
5. Update `frontend/netlify.toml` with your actual backend URL

## 🔧 Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/divishkumar6/Smart-Hire.git
   cd Smart-Hire
   ```

2. Install dependencies:
   ```bash
   npm run install:all
   ```

3. Set up environment variables:
   - Copy `backend/.env.example` to `backend/.env`
   - Update the values with your configuration

4. Start development servers:
   ```bash
   npm run dev
   ```

## 📝 Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=5001
MONGODB_URI=mongodb://localhost:27017/smarthire
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend-app.onrender.com
```

## 🚀 Quick Deploy Steps

1. **Push to GitHub** (Already done)
2. **Deploy Backend to Render**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect GitHub and select this repository
   - Configure as described above
3. **Deploy Frontend to Netlify**:
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub and select this repository
   - Configure as described above

## 📱 Default Admin Credentials

After running the seed script:
- **Email**: admin@smarthire.com
- **Password**: admin123

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.