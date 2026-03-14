import axios from 'axios';

// Mock data store for default users
const mockData = {
  drives: [
    {
      _id: 'mock-drive-1',
      name: 'Software Engineer 2024',
      description: 'Full-stack engineering roles for our product team',
      company: 'TechCorp',
      jobRole: 'Software Engineer',
      status: 'active',
      selectionThreshold: 75,
      waitlistThreshold: 60,
      totalCandidates: 5,
      rounds: [
        { name: 'Aptitude Test', type: 'aptitude', weightage: 20, maxScore: 100, cutoffScore: 50, order: 1 },
        { name: 'Technical Interview', type: 'technical', weightage: 40, maxScore: 100, cutoffScore: 60, order: 2 },
        { name: 'Coding Challenge', type: 'coding', weightage: 30, maxScore: 100, cutoffScore: 65, order: 3 },
        { name: 'HR Interview', type: 'hr', weightage: 10, maxScore: 100, cutoffScore: 50, order: 4 },
      ],
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'mock-drive-2',
      name: 'Data Analyst Batch 2024',
      description: 'Data analysis and business intelligence roles',
      company: 'DataFirst',
      jobRole: 'Data Analyst',
      status: 'draft',
      selectionThreshold: 70,
      waitlistThreshold: 55,
      totalCandidates: 0,
      rounds: [
        { name: 'Aptitude', type: 'aptitude', weightage: 30, maxScore: 100, cutoffScore: 50, order: 1 },
        { name: 'Technical Round', type: 'technical', weightage: 50, maxScore: 100, cutoffScore: 60, order: 2 },
        { name: 'HR', type: 'hr', weightage: 20, maxScore: 100, cutoffScore: 40, order: 3 },
      ],
      createdAt: new Date().toISOString(),
    }
  ],
  candidates: [],
  users: []
};

// Check if using default credentials
const isUsingDefaultCredentials = () => {
  const token = localStorage.getItem('token');
  return token && token.startsWith('default-token-');
};

// Mock API responses for default users
const mockApiCall = (method, url, data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (url.includes('/drives')) {
        if (method === 'GET') {
          if (url.includes('/drives/')) {
            // Get single drive
            const id = url.split('/drives/')[1];
            const drive = mockData.drives.find(d => d._id === id);
            resolve({ data: { drive } });
          } else {
            // Get all drives
            resolve({ data: { drives: mockData.drives, total: mockData.drives.length } });
          }
        } else if (method === 'POST') {
          // Create drive
          const newDrive = {
            ...data,
            _id: 'mock-drive-' + Date.now(),
            createdAt: new Date().toISOString(),
            totalCandidates: 0
          };
          mockData.drives.push(newDrive);
          resolve({ data: { drive: newDrive } });
        } else if (method === 'PUT') {
          // Update drive
          const id = url.split('/drives/')[1];
          const index = mockData.drives.findIndex(d => d._id === id);
          if (index !== -1) {
            mockData.drives[index] = { ...mockData.drives[index], ...data };
            resolve({ data: { drive: mockData.drives[index] } });
          }
        }
      } else if (url.includes('/candidates')) {
        if (method === 'GET') {
          resolve({ data: { candidates: mockData.candidates, total: mockData.candidates.length } });
        }
      } else if (url.includes('/admin/users')) {
        if (method === 'GET') {
          resolve({ data: { users: mockData.users, total: mockData.users.length } });
        }
      }
      
      // Default success response
      resolve({ data: { success: true } });
    }, 300); // Simulate network delay
  });
};

const api = axios.create({
  baseURL: 'https://smart-hire-305z.onrender.com/api',
  timeout: 15000,
  headers: { 
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  
  // Intercept requests for default users
  if (isUsingDefaultCredentials()) {
    return Promise.reject({ 
      isMockRequest: true, 
      method: config.method.toUpperCase(), 
      url: config.url, 
      data: config.data 
    });
  }
  
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    // Handle mock requests for default users
    if (error.isMockRequest) {
      return mockApiCall(error.method, error.url, error.data);
    }
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
