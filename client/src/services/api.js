// Frontend API Client connected to Node/Express API Gateway

const BASE_URL = '/api';

async function fetchJson(endpoint, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Server error' }));
      throw new Error(err.message || `HTTP ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.warn(`API call to ${endpoint} failed:`, error.message);
    throw error;
  }
}

// Cyber Incident API Methods
export const IncidentsAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchJson(`/incidents?${query}`);
  },
  getById: (id) => fetchJson(`/incidents/${id}`),
  create: (data) => fetchJson('/incidents', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => fetchJson(`/incidents/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  getAnalytics: () => fetchJson('/incidents/meta/analytics'),
};

// AI Career Coach API Methods
export const CareerAPI = {
  reviewResume: (resumeText, targetRole) => fetchJson('/career/resume-review', {
    method: 'POST',
    body: JSON.stringify({ resumeText, targetRole })
  }),
  getATSScore: (resumeText, jobDescription) => fetchJson('/career/ats-score', {
    method: 'POST',
    body: JSON.stringify({ resumeText, jobDescription })
  }),
  getMockQuestions: (role, difficulty) => fetchJson(`/career/mock-interview/questions?role=${encodeURIComponent(role)}&difficulty=${encodeURIComponent(difficulty)}`),
  evaluateAnswer: (question, userAnswer) => fetchJson('/career/mock-interview/evaluate', {
    method: 'POST',
    body: JSON.stringify({ question, userAnswer })
  }),
  getRoadmap: (roleId) => fetchJson(`/career/roadmap/${roleId}`),
  getSkillGap: () => fetchJson('/career/skill-gap'),
  getJobs: () => fetchJson('/career/jobs'),
};

// AI Shopping Assistant API Methods
export const ShopAPI = {
  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchJson(`/shop/products?${query}`);
  },
  getProductById: (id) => fetchJson(`/shop/products/${id}`),
  placeOrder: (orderData) => fetchJson('/shop/orders', {
    method: 'POST',
    body: JSON.stringify(orderData)
  }),
  getOrders: () => fetchJson('/shop/orders'),
  chatWithAI: (message) => fetchJson('/ai/chat', {
    method: 'POST',
    body: JSON.stringify({ message })
  }),
  getAIHealth: () => fetchJson('/ai/health'),
};
