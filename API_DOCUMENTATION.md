# 📘 AICOD API Documentation for Frontend Integration

**Version:** 1.0  
**Base URL:** `http://localhost:8000/api/v1`  
**Production URL:** `https://api.aicod.org/api/v1` (when deployed)  
**Date:** January 18, 2026

---

## 📋 Table of Contents

1. [Getting Started](#getting-started)
2. [Authentication](#authentication)
3. [API Endpoints](#api-endpoints)
   - [Programs](#programs)
   - [Program Categories](#program-categories)
   - [Team Members](#team-members)
   - [Partners](#partners)
   - [Pages (CMS)](#pages-cms)
   - [Company/About](#companyabout)
   - [FAQs](#faqs)
   - [Media](#media)
   - [Forms](#forms)
4. [Response Format](#response-format)
5. [Error Handling](#error-handling)
6. [Code Examples](#code-examples)

---

## 🚀 Getting Started

### Base Configuration

**Environment Variables:**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Quick Setup

1. **Create API Service File:** `src/lib/api.js`
2. **Configure CORS:** Backend already configured for `localhost:3000`
3. **Start Fetching:** Use the service in your components

---

## 🔐 Authentication

### Public Endpoints
Most content endpoints are **public** and don't require authentication:
- Programs, Team, Partners, Pages, FAQs, Media, Company Info

### Protected Endpoints
Admin operations require authentication via **Laravel Sanctum**:
- Creating/Updating/Deleting content
- User management
- Dashboard statistics

**Authentication Header:**
```javascript
headers: {
  'Authorization': `Bearer ${token}`,
  'Accept': 'application/json'
}
```

---

## 📡 API Endpoints

### Programs

#### Get All Programs
```
GET /programs
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "School Infrastructure Development",
      "slug": "school-infrastructure-development",
      "description": "Building and renovating schools in rural communities...",
      "long_description": "Our School Infrastructure Development program...",
      "objectives": "• Construct 50 new classrooms...",
      "category_id": 1,
      "category": {
        "id": 1,
        "name": "Education",
        "slug": "education"
      },
      "target_beneficiaries": 5000,
      "status": "active",
      "start_date": "2025-07-18",
      "end_date": null,
      "budget": null,
      "featured_image": null,
      "is_featured": true,
      "is_active": true,
      "order": 0,
      "created_at": "2026-01-18T04:33:54.000000Z",
      "updated_at": "2026-01-18T04:33:54.000000Z"
    }
  ],
  "message": "Programs retrieved successfully"
}
```

#### Get Single Program
```
GET /programs/{slug}
```

**Example:** `/programs/school-infrastructure-development`

---

### Program Categories

#### Get All Categories
```
GET /program-categories
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Education",
      "slug": "education",
      "description": "Programs focused on improving access to quality education...",
      "icon": "academic-cap",
      "color": "#3B82F6",
      "order": 1,
      "is_active": true,
      "programs_count": 2
    }
  ]
}
```

#### Get Single Category
```
GET /program-categories/{slug}
```

**Example:** `/program-categories/education`

---

### Team Members

#### Get All Team Members
```
GET /team
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Dr. Sarah Nakato",
      "slug": "dr-sarah-nakato",
      "position": "Executive Director",
      "department": "Administration",
      "bio": "Dr. Nakato has over 15 years of experience...",
      "photo": null,
      "email": "sarah.nakato@aicod.org",
      "phone": "+256-700-111-111",
      "linkedin_url": null,
      "twitter_url": null,
      "order": 1,
      "is_active": true
    }
  ]
}
```

#### Get Single Team Member
```
GET /team/{id}
```

---

### Partners

#### Get All Partners
```
GET /partners
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "United Nations Development Programme",
      "slug": "united-nations-development-programme",
      "description": "Strategic partner in community development initiatives.",
      "logo": null,
      "website": "https://undp.org",
      "type": "international",
      "order": 0,
      "is_active": true
    }
  ]
}
```

---

### Pages (CMS)

#### Get All Pages
```
GET /pages
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "About Us",
      "slug": "about-us",
      "excerpt": "Learn about AICOD's mission, vision, and impact...",
      "content": "<h2>Our Story</h2><p>Founded in 2015...</p>",
      "template": "default",
      "featured_image": null,
      "meta_title": "About AICOD - Empowering African Communities",
      "meta_description": "Learn about AICOD's mission...",
      "is_active": true,
      "show_in_menu": true,
      "menu_title": "About",
      "published_at": "2026-01-18T04:33:54.000000Z"
    }
  ]
}
```

#### Get Single Page (with Sections)
```
GET /pages/{slug}
```

**Example:** `/pages/about-us`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "About Us",
    "slug": "about-us",
    "content": "<p>...</p>",
    "sections": [
      {
        "id": 1,
        "title": "Our Mission",
        "content": "To empower African communities...",
        "section_type": "text",
        "order": 1
      }
    ]
  }
}
```

---

### Company/About

#### Get Company Information
```
GET /company
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "AICOD",
    "full_name": "African Initiative for Community Development",
    "tagline": "Empowering Communities, Transforming Lives",
    "description": "AICOD is a non-profit organization...",
    "mission": "To empower African communities through...",
    "vision": "A prosperous Africa where every community...",
    "email": "info@aicod.org",
    "phone": "+256-700-123-456",
    "address": "Plot 123, Community Drive, Kampala, Uganda",
    "website": "https://aicod.org",
    "founded_year": 2015,
    "registration_number": "NGO/REG/2015/123",
    "is_active": true
  }
}
```

---

### FAQs

#### Get All FAQs
```
GET /faqs
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "question": "How can I donate to AICOD?",
      "answer": "You can donate through our website...",
      "category": "donations",
      "order": 1,
      "is_active": true
    }
  ]
}
```

---

### Media

#### Get All Media Files
```
GET /media
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Community Health Outreach",
      "file_path": "/storage/media/health-outreach.jpg",
      "file_type": "image",
      "category": "programs",
      "description": "Healthcare services in rural areas"
    }
  ]
}
```

---

### Forms

#### Submit Contact Form
```
POST /contact
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+256700000000",
  "subject": "Partnership Inquiry",
  "message": "I would like to discuss...",
  "category": "partnership"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact message sent successfully",
  "data": {
    "id": 1,
    "reference_number": "CNT-20260118-0001"
  }
}
```

**Categories:** `general`, `partnership`, `volunteer`, `complaint`, `suggestion`

---

#### Subscribe to Newsletter
```
POST /newsletter/subscribe
```

**Request Body:**
```json
{
  "email": "subscriber@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter"
}
```

---

#### Submit Donation Request
```
POST /donations/request
```

**Request Body:**
```json
{
  "donor_name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+256700111222",
  "organization": "ABC Foundation",
  "amount_proposed": 1000.00,
  "currency": "USD",
  "donation_type": "one-time",
  "purpose": "Education programs",
  "message": "I would like to support your education initiatives"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Donation request submitted successfully",
  "data": {
    "id": 1,
    "reference_number": "DON-20260118-0001"
  }
}
```

**Donation Types:** `one-time`, `monthly`, `yearly`  
**Currencies:** `USD`, `UGX`, `EUR`, `GBP`

---

## 📦 Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": {
    "field_name": ["Validation error message"]
  }
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `422` - Validation Error
- `500` - Server Error

---

## ⚠️ Error Handling

### Example Error Handling
```javascript
try {
  const response = await fetch(`${API_URL}/programs`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  
  if (!data.success) {
    console.error('API Error:', data.message);
    return [];
  }
  
  return data.data;
} catch (error) {
  console.error('Failed to fetch programs:', error);
  return [];
}
```

---

## 💻 Code Examples

### React/Next.js API Service

```javascript
// src/lib/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const api = {
  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  },

  async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  },

  // Specific methods
  getPrograms: () => api.get('/programs'),
  getProgram: (slug) => api.get(`/programs/${slug}`),
  getTeam: () => api.get('/team'),
  getPartners: () => api.get('/partners'),
  getCompany: () => api.get('/company'),
  getFAQs: () => api.get('/faqs'),
  getPage: (slug) => api.get(`/pages/${slug}`),
  
  submitContact: (data) => api.post('/contact', data),
  subscribeNewsletter: (email) => api.post('/newsletter/subscribe', { email }),
  submitDonation: (data) => api.post('/donations/request', data)
};
```

### Usage in Next.js Page

```javascript
// app/programs/page.js
import { api } from '@/lib/api';

export default async function ProgramsPage() {
  const response = await api.getPrograms();
  const programs = response.data || [];

  return (
    <div>
      <h1>Our Programs</h1>
      {programs.map(program => (
        <div key={program.id}>
          <h2>{program.title}</h2>
          <p>{program.description}</p>
          <a href={`/programs/${program.slug}`}>Learn More</a>
        </div>
      ))}
    </div>
  );
}
```

### Form Submission Example

```javascript
// components/ContactForm.js
'use client';
import { api } from '@/lib/api';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.submitContact(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
      <input
        type="text"
        placeholder="Subject"
        value={formData.subject}
        onChange={(e) => setFormData({...formData, subject: e.target.value})}
        required
      />
      <textarea
        placeholder="Message"
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
        required
      />
      <button type="submit">Send</button>
      
      {status === 'success' && <p>Message sent!</p>}
      {status === 'error' && <p>Failed to send. Try again.</p>}
    </form>
  );
}
```

---

## 🔧 Testing

### Test All Endpoints

**Browser:** Visit these URLs to see JSON responses:
```
http://localhost:8000/api/v1/programs
http://localhost:8000/api/v1/program-categories
http://localhost:8000/api/v1/team
http://localhost:8000/api/v1/partners
http://localhost:8000/api/v1/company
http://localhost:8000/api/v1/faqs
http://localhost:8000/api/v1/pages
```

**Postman:** Import and test all endpoints

**cURL Examples:**
```bash
# Get Programs
curl http://localhost:8000/api/v1/programs

# Submit Contact Form
curl -X POST http://localhost:8000/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test",
    "message": "Testing API"
  }'
```

---

## 📞 Support

**Backend Developer:** Available for questions  
**API Base URL:** `http://localhost:8000/api/v1`  
**Documentation:** This file  
**Last Updated:** January 18, 2026

---

## ✅ Integration Checklist

- [ ] Created `src/lib/api.js` service file
- [ ] Created `.env.local` with API_URL
- [ ] Tested API endpoints in browser
- [ ] Updated Programs page to fetch from API
- [ ] Updated Team page to fetch from API
- [ ] Updated Partners page to fetch from API
- [ ] Implemented Contact form submission
- [ ] Implemented Newsletter subscription
- [ ] Tested all forms
- [ ] Verified data displays correctly
- [ ] Checked browser console for errors
- [ ] Reviewed Network tab for API calls

---

**🎉 Happy Coding! Your backend is ready and waiting for integration!**
