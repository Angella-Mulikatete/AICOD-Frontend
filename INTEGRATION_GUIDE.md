# 🚀 API Integration Quick Start Guide

Welcome! This guide will help you integrate the AICOD backend API with your Next.js frontend.

## ✅ Setup Complete!

The following files have been created:
- ✅ `API_DOCUMENTATION.md` - Full API reference
- ✅ `src/lib/api.ts` - TypeScript API service
- ✅ `.env.local` - Environment configuration
- ✅ `ENV_SETUP.md` - Environment setup guide

## 📋 Next Steps

### 1. Test the API Connection

First, make sure your Laravel backend is running on `http://localhost:8000`:

```bash
# In your backend directory
php artisan serve
```

### 2. Test API Endpoints in Browser

Open these URLs to verify the backend is working:
- http://localhost:8000/api/v1/programs
- http://localhost:8000/api/v1/team
- http://localhost:8000/api/v1/partners
- http://localhost:8000/api/v1/company

You should see JSON responses for each.

### 3. Start Your Frontend Development Server

```bash
npm run dev
```

### 4. Quick Integration Examples

#### Example 1: Fetch Programs (Server Component)

```typescript
// src/app/programs/page.tsx
import { api } from '@/lib/api';

export default async function ProgramsPage() {
  try {
    const response = await api.getPrograms();
    const programs = response.data || [];

    return (
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8">Our Programs</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <div key={program.id} className="border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-2">{program.title}</h2>
              <p className="text-gray-600 mb-4">{program.description}</p>
              <a 
                href={`/programs/${program.slug}`}
                className="text-blue-600 hover:underline"
              >
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return <div>Error loading programs. Please try again later.</div>;
  }
}
```

#### Example 2: Contact Form (Client Component)

```typescript
// src/components/ContactForm.tsx
'use client';

import { api, type ContactFormData } from '@/lib/api';
import { useState, FormEvent } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [referenceNumber, setReferenceNumber] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await api.submitContact(formData);
      setReferenceNumber(response.data.reference_number);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', category: 'general' });
    } catch (error) {
      setStatus('error');
      console.error('Contact form error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
      <div>
        <label className="block mb-2 font-medium">Name</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Email</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Subject</label>
        <input
          type="text"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Message</label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          ✅ Message sent successfully! Reference: {referenceNumber}
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          ❌ Failed to send message. Please try again.
        </div>
      )}
    </form>
  );
}
```

#### Example 3: Newsletter Subscription

```typescript
// src/components/NewsletterForm.tsx
'use client';

import { api } from '@/lib/api';
import { useState, FormEvent } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await api.subscribeNewsletter(email);
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-lg"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  );
}
```

#### Example 4: Fetch Company Info

```typescript
// src/app/about/page.tsx
import { api, getMediaUrl } from '@/lib/api';

export default async function AboutPage() {
  try {
    const response = await api.getCompany();
    const company = response.data;

    return (
      <div className="container mx-auto py-12">
        <h1 className="text-5xl font-bold mb-4">{company.full_name}</h1>
        <p className="text-xl text-gray-600 mb-8">{company.tagline}</p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700">{company.mission}</p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-gray-700">{company.vision}</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p>Email: {company.email}</p>
          <p>Phone: {company.phone}</p>
          <p>Address: {company.address}</p>
        </div>
      </div>
    );
  } catch (error) {
    return <div>Error loading company information.</div>;
  }
}
```

## 📝 Integration Checklist

- [x] Created API service file (`src/lib/api.ts`)
- [x] Created environment configuration (`.env.local`)
- [ ] Test backend API endpoints in browser
- [ ] Update Programs page to use API
- [ ] Update Team page to use API
- [ ] Update Partners page to use API
- [ ] Update About/Company page to use API
- [ ] Implement Contact form with API
- [ ] Implement Newsletter subscription with API
- [ ] Test all forms and verify submissions
- [ ] Check browser console for errors
- [ ] Review Network tab to verify API calls

## 🔧 Troubleshooting

### CORS Errors
If you see CORS errors, make sure your Laravel backend has CORS configured for `localhost:3000`:

```php
// config/cors.php
'allowed_origins' => ['http://localhost:3000'],
```

### API Not Responding
1. Verify Laravel backend is running: `php artisan serve`
2. Test endpoints directly in browser
3. Check `.env.local` has correct API_URL

### TypeScript Errors
If you see TypeScript errors, try:
```bash
npm run build
```

## 📚 Resources

- **Full API Documentation:** See `API_DOCUMENTATION.md`
- **API Service:** `src/lib/api.ts`
- **Environment Setup:** `ENV_SETUP.md`

## 🎉 You're Ready!

Your frontend is now configured to work with the AICOD backend API. Start by:
1. Testing the backend endpoints
2. Integrating one page at a time (start with Programs or About)
3. Testing forms and submissions

Happy coding! 🚀
