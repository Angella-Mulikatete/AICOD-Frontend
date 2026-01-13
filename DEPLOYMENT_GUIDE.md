# 🚀 AICOD Website - cPanel Deployment Guide

This guide will help you deploy your AICOD Next.js website to cPanel shared hosting.

## 📦 Prerequisites
- Access to your cPanel account
- FTP client (FileZilla recommended) or cPanel File Manager
- Your domain configured in cPanel

## 🛠️ Step-by-Step Deployment Process

### **Step 1: Build the Static Site Locally**

1. Open your terminal in the project directory
2. Run the build command:
   ```bash
   npm run build
   ```
   OR
   ```bash
   npx next build
   ```

3. After building, you should see an `out` folder in your project directory containing all the static files

**If the `out` folder is not created:**
- Make sure `next.config.ts` has `output: 'export'` (✅ Already configured)
- Delete the `.next` folder and try building again
- Check for TypeScript errors that might prevent the build

### **Step 2: Prepare Files for Upload**

The `out` folder contains all the files you need to upload:
- HTML files (index.html, about.html, etc.)
- `_next` folder (CSS, JavaScript, images)
- `public` assets
- Other static resources

### **Step 3: Access Your cPanel**

1. Log in to your cPanel account
2. Navigate to **File Manager**
3. Go to `public_html` directory (or your domain's root directory)
   - If deploying to a subdomain, navigate to that subdomain's folder
   - If deploying to main domain, use `public_html`

### **Step 4: Upload Files**

**Option A: Using cPanel File Manager**
1. In File Manager, navigate to `public_html`
2. Delete any existing files (if fresh install) OR backup existing files first
3. Click **Upload** button
4. Upload ALL contents from the `out` folder
   - Make sure you upload the CONTENTS of `out`, not the `out` folder itself
   - Upload the `.htaccess` file (already created in your project root)

**Option B: Using FTP (Recommended for large sites)**
1. Download FileZilla: https://filezilla-project.org/
2. Connect using your cPanel FTP credentials:
   - Host: Your domain or FTP server address
   - Username: Your cPanel username
   - Password: Your cPanel password
   - Port: 21
3. Navigate to `public_html` on the remote side
4. Drag and drop all files from the `out` folder to `public_html`
5. Upload the `.htaccess` file

### **Step 5: Verify .htaccess File**

Make sure the `.htaccess` file is in the root directory (`public_html`). This file:
- ✅ Already created in your project root
- Enables clean URLs
- Provides security headers
- Enables GZIP compression
- Sets up browser caching
- Handles SPA routing

### **Step 6: Configure Environment Variables (if needed)**

If your app uses API connections:
1. Check if you have environment variables in `.env.local`
2. These need to be built into the app during `npm run build`
3. Make sure `NEXT_PUBLIC_API_URL` is set to your production API URL before building

### **Step 7: Test Your Website**

1. Visit your domain in a browser
2. Test all pages:
   - Home page
   - About page
   - Programs page
   - Contact page
   - Any other pages
3. Check browser console for errors (F12 → Console tab)
4. Test navigation and links

### **Step 8: Troubleshooting**

**Problem: 404 errors on page refresh**
- ✅ Solution: The `.htaccess` file should handle this
- Verify `.htaccess` is uploaded and in the correct location

**Problem: Images not loading**
- Check if images are in the correct folder
- Verify paths in your code use `/` for root-relative paths
- Clear browser cache

**Problem: CSS/JavaScript not loading**
- Verify the `_next` folder was uploaded correctly
- Check browser console for 404 errors
- Clear browser cache

**Problem: White screen/blank page**
- Check browser console for errors
- Verify all files uploaded successfully
- Check file permissions (should be 644 for files, 755 for directories)

**Problem: API calls failing**
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check CORS settings on your backend
- Ensure backend API is accessible from the hosting server

## 🔧 Quick Commands Reference

```bash
# Build the site
npm run build

# Check if out folder was created
ls out

# If using Git, you can create deployment package
tar -czf aicod-deployment.tar.gz -C out .
```

## 📁 File Structure After Upload

Your `public_html` should look like this:
```
public_html/
├── .htaccess
├── index.html
├── about.html
├── programs.html
├── contact.html
├── _next/
│   ├── static/
│   └── ...
├── images/
└── other assets...
```

## 🎯 Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Images display properly
- [ ] Forms submit correctly (if applicable)
- [ ] Mobile responsive design works
- [ ] No console errors
- [ ] SSL certificate installed (https://)
- [ ] Site speed is acceptable

## 🔒 Security Recommendations

1. **Enable SSL/HTTPS** in cPanel (free Let's Encrypt certificate)
2. Keep `.htaccess` security headers enabled
3. Regularly update dependencies
4. Monitor access logs in cPanel

## 📞 Need Help?

If you encounter issues:
1. Check browser console (F12)
2. Check cPanel error logs
3. Verify all files uploaded correctly
4. Test in incognito mode to rule out cache issues

---

**Last Updated:** January 8, 2026
**Project:** AICOD NGO Website
**Framework:** Next.js 16 (Static Export)
