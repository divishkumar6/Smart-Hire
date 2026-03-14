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
      totalCandidates: 3,
      rounds: [
        { name: 'Aptitude', type: 'aptitude', weightage: 30, maxScore: 100, cutoffScore: 50, order: 1 },
        { name: 'Technical Round', type: 'technical', weightage: 50, maxScore: 100, cutoffScore: 60, order: 2 },
        { name: 'HR', type: 'hr', weightage: 20, maxScore: 100, cutoffScore: 40, order: 3 },
      ],
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'mock-drive-3',
      name: 'Frontend Developer',
      description: 'React and Vue.js specialists',
      company: 'WebTech',
      jobRole: 'Frontend Developer',
      status: 'completed',
      selectionThreshold: 80,
      waitlistThreshold: 65,
      totalCandidates: 8,
      rounds: [
        { name: 'Portfolio Review', type: 'technical', weightage: 40, maxScore: 100, cutoffScore: 70, order: 1 },
        { name: 'Live Coding', type: 'coding', weightage: 60, maxScore: 100, cutoffScore: 75, order: 2 },
      ],
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    }
  ],
  candidates: [
    {
      _id: 'mock-candidate-1',
      name: 'Arjun Sharma',
      email: 'arjun@example.com',
      phone: '9876543210',
      college: 'IIT Delhi',
      branch: 'CSE',
      cgpa: 9.1,
      drive: 'mock-drive-1',
      status: 'selected',
      atsScore: 92,
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'mock-candidate-2',
      name: 'Priya Nair',
      email: 'priya@example.com',
      phone: '9876543211',
      college: 'NIT Trichy',
      branch: 'IT',
      cgpa: 8.8,
      drive: 'mock-drive-1',
      status: 'waitlisted',
      atsScore: 78,
      skills: ['Java', 'Spring Boot', 'MySQL', 'Angular'],
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'mock-candidate-3',
      name: 'Rohan Mehta',
      email: 'rohan@example.com',
      phone: '9876543212',
      college: 'BITS Pilani',
      branch: 'CS',
      cgpa: 9.3,
      drive: 'mock-drive-2',
      status: 'under_review',
      atsScore: 85,
      skills: ['Python', 'Data Science', 'Machine Learning', 'SQL'],
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'mock-candidate-4',
      name: 'Sneha Patel',
      email: 'sneha@example.com',
      phone: '9876543213',
      college: 'IIT Bombay',
      branch: 'CSE',
      cgpa: 8.5,
      drive: 'mock-drive-3',
      status: 'selected',
      atsScore: 94,
      skills: ['React', 'Vue.js', 'TypeScript', 'CSS'],
      createdAt: new Date().toISOString(),
    }
  ],
  users: [
    {
      _id: 'mock-user-1',
      name: 'John Recruiter',
      email: 'john@company.com',
      role: 'recruiter',
      approvalStatus: 'approved',
      isActive: true,
      createdAt: new Date().toISOString(),
    }
  ],
  dashboardStats: {
    totalCandidates: 4,
    totalDrives: 3,
    activeDrives: 1,
    selectedCandidates: 2,
    waitlistedCandidates: 1,
    rejectedCandidates: 0,
    underReviewCandidates: 1,
    averageAtsScore: 87.25,
    topSkills: [
      { skill: 'JavaScript', count: 2 },
      { skill: 'React', count: 2 },
      { skill: 'Python', count: 2 },
      { skill: 'Node.js', count: 1 },
      { skill: 'Java', count: 1 }
    ]
  },
  monthlyData: [
    { month: 'Jan', applications: 45, selected: 12, drives: 3 },
    { month: 'Feb', applications: 52, selected: 15, drives: 4 },
    { month: 'Mar', applications: 38, selected: 8, drives: 2 },
    { month: 'Apr', applications: 61, selected: 18, drives: 5 },
    { month: 'May', applications: 49, selected: 14, drives: 3 },
    { month: 'Jun', applications: 55, selected: 16, drives: 4 }
  ],
  heatmap: [
    { skill: 'JavaScript', level: 'Beginner', count: 15 },
    { skill: 'JavaScript', level: 'Intermediate', count: 25 },
    { skill: 'JavaScript', level: 'Advanced', count: 12 },
    { skill: 'React', level: 'Beginner', count: 20 },
    { skill: 'React', level: 'Intermediate', count: 18 },
    { skill: 'React', level: 'Advanced', count: 8 },
    { skill: 'Python', level: 'Beginner', count: 22 },
    { skill: 'Python', level: 'Intermediate', count: 16 },
    { skill: 'Python', level: 'Advanced', count: 10 },
    { skill: 'Java', level: 'Beginner', count: 18 },
    { skill: 'Java', level: 'Intermediate', count: 14 },
    { skill: 'Java', level: 'Advanced', count: 6 }
  ]
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
      // Dashboard stats endpoint
      if (url.includes('/candidates/dashboard-stats')) {
        resolve({ data: { stats: mockData.dashboardStats } });
      }
      // Drives endpoints
      else if (url.includes('/drives')) {
        if (method === 'GET') {
          if (url.includes('/drives/')) {
            // Get single drive
            const id = url.split('/drives/')[1];
            const drive = mockData.drives.find(d => d._id === id);
            resolve({ data: { drive } });
          } else {
            // Get all drives with pagination
            const urlParams = new URLSearchParams(url.split('?')[1] || '');
            const limit = parseInt(urlParams.get('limit')) || 10;
            const page = parseInt(urlParams.get('page')) || 1;
            const start = (page - 1) * limit;
            const paginatedDrives = mockData.drives.slice(start, start + limit);
            resolve({ 
              data: { 
                drives: paginatedDrives, 
                total: mockData.drives.length,
                totalPages: Math.ceil(mockData.drives.length / limit)
              } 
            });
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
      }
      // Candidates endpoints
      else if (url.includes('/candidates')) {
        if (url.includes('/candidates/heatmap')) {
          resolve({ data: { heatmap: mockData.heatmap } });
        } else if (method === 'GET') {
          // Get candidates with filters
          const urlParams = new URLSearchParams(url.split('?')[1] || '');
          const limit = parseInt(urlParams.get('limit')) || 10;
          const page = parseInt(urlParams.get('page')) || 1;
          const status = urlParams.get('status');
          const drive = urlParams.get('drive');
          const search = urlParams.get('search');
          
          let filteredCandidates = [...mockData.candidates];
          
          if (status) {
            filteredCandidates = filteredCandidates.filter(c => c.status === status);
          }
          if (drive) {
            filteredCandidates = filteredCandidates.filter(c => c.drive === drive);
          }
          if (search) {
            filteredCandidates = filteredCandidates.filter(c => 
              c.name.toLowerCase().includes(search.toLowerCase()) ||
              c.email.toLowerCase().includes(search.toLowerCase())
            );
          }
          
          const start = (page - 1) * limit;
          const paginatedCandidates = filteredCandidates.slice(start, start + limit);
          
          resolve({ 
            data: { 
              candidates: paginatedCandidates, 
              total: filteredCandidates.length,
              totalPages: Math.ceil(filteredCandidates.length / limit)
            } 
          });
        } else if (method === 'POST') {
          // Create candidate
          const newCandidate = {
            ...data,
            _id: 'mock-candidate-' + Date.now(),
            createdAt: new Date().toISOString(),
            status: 'under_review',
            atsScore: Math.floor(Math.random() * 40) + 60 // Random score 60-100
          };
          mockData.candidates.push(newCandidate);
          resolve({ data: { candidate: newCandidate } });
        } else if (method === 'DELETE') {
          // Delete candidate
          const id = url.split('/candidates/')[1];
          const index = mockData.candidates.findIndex(c => c._id === id);
          if (index !== -1) {
            mockData.candidates.splice(index, 1);
          }
          resolve({ data: { success: true } });
        }
      }
      // Admin analytics endpoint
      else if (url.includes('/admin/analytics')) {
        resolve({ data: { monthlyData: mockData.monthlyData } });
      }
      // Admin users endpoint
      else if (url.includes('/admin/users')) {
        if (method === 'GET') {
          resolve({ data: { users: mockData.users, total: mockData.users.length } });
        }
      }
      
      // Default success response
      else {
        resolve({ data: { success: true } });
      }
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
