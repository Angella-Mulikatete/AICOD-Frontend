# 🚀 Complete cPanel Node.js Deployment Guide for AICOD Website

This guide is for deploying your Next.js app to a **cPanel server with Node.js support** (VPS/Dedicated Server).

## 📋 Prerequisites

Before you start, you need:
- ✅ cPanel account with **Node.js Selector** enabled
- ✅ SSH access to your server (optional but recommended)
- ✅ Your project files ready to upload

---

## 🎯 Deployment Steps

### **Step 1: Build Your Project Locally**

1. Open terminal in your project directory
2. Run the production build:
   ```bash
   npm run build
   ```

3. This creates a `.next` folder with all compiled files

### **Step 2: Prepare Files for Upload**

You need to upload these files/folders to your cPanel server:

**Required Files & Folders:**
```
✅ .next/              (entire folder - build output)
✅ public/             (static assets)
✅ node_modules/       (dependencies - OR install on server)
✅ package.json        (dependency list)
✅ package-lock.json   (lock file)
✅ next.config.ts      (Next.js config)
✅ .env.production     (environment variables - if you have one)
```

**Files NOT needed on server:**
```
❌ src/                (source code - already built)
❌ .git/               (git history)
❌ .next/cache/        (build cache)
❌ node_modules/       (can install on server instead)
```

### **Step 3: Upload to cPanel**

**Option A: Using FTP/SFTP (Recommended for first deployment)**

1. Download **FileZilla** (free FTP client)
2. Connect to your server:
   - Host: `your-domain.com` or FTP server address
   - Username: Your cPanel username
   - Password: Your cPanel password
   - Port: 21 (FTP) or 22 (SFTP/SSH)

3. Navigate to your application directory (usually `~/public_html` or a subdomain folder)

4. Upload ALL the required files listed above

**Option B: Using cPanel File Manager**

1. Log in to cPanel
2. Open **File Manager**
3. Navigate to your target directory
4. Click **Upload**
5. Upload a ZIP file of your project, then **Extract** it

**Option C: Using Git (Best for updates)**

If your server has Git access:
```bash
cd ~/public_html
git clone https://github.com/your-username/AICOD-Frontend.git
cd AICOD-Frontend
```

### **Step 4: Setup Node.js Application in cPanel**

1. **Log in to cPanel**

2. **Find "Setup Node.js App"** (or "Node.js Selector")
   - Look in the Software section
   - If you don't see it, your hosting doesn't support Node.js

3. **Create New Application**:
   ```
   Node.js Version: 18.x or 20.x (latest LTS)
   Application Mode: Production
   Application Root: /home/username/public_html/AICOD-Frontend
   Application URL: your-domain.com (or subdomain)
   Application Startup File: server.js
   ```

4. **Click "Create"**

### **Step 5: Create server.js File**

You need to create a `server.js` file in your project root on the server:

**Connect via SSH** or use cPanel Terminal, then create the file:

```bash
cd ~/public_html/AICOD-Frontend
nano server.js
```

**Add this code to server.js:**
```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Initialize Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
```

**Save and exit** (Ctrl+X, then Y, then Enter)

### **Step 6: Install Dependencies on Server**

In cPanel Terminal or SSH:

```bash
cd ~/public_html/AICOD-Frontend
npm install --production
```

This installs all the packages listed in `package.json`.

### **Step 7: Set Environment Variables**

1. In cPanel Node.js App manager, find **Environment Variables** section

2. Add your environment variables:
   ```
   NODE_ENV=production
   GOOGLE_GENERATIVE_AI_API_KEY=your-api-key-here
   PORT=3000
   ```

3. Click **Save**

### **Step 8: Start the Application**

1. In the Node.js App interface, click **"Start App"** or **"Restart"**

2. Your app should now be running!

3. The app will be available at your configured domain/URL

### **Step 9: Configure Domain/Subdomain (if needed)**

**For Main Domain:**
- The app should be accessible at `your-domain.com`

**For Subdomain:**
1. In cPanel, go to **Subdomains**
2. Create subdomain: `app.your-domain.com`
3. Point document root to: `/home/username/public_html/AICOD-Frontend`
4. Update Node.js app URL settings

### **Step 10: Setup Process Manager (Keep App Running)**

To ensure your app stays running even after server restart:

1. In Node.js App settings, enable **"Run App on server startup"**
2. Or use **PM2** (if available):
   ```bash
   npm install -g pm2
   pm2 start server.js --name aicod-app
   pm2 save
   pm2 startup
   ```

---

## 🔧 Troubleshooting

### **App Not Starting**

Check the error logs:
```bash
cd ~/public_html/AICOD-Frontend
tail -f logs/error.log
```

Or check cPanel Node.js App interface for error messages.

### **Port Already in Use**

Change the port in environment variables:
```
PORT=3001
```

### **Module Not Found Errors**

Reinstall dependencies:
```bash
npm install
```

### **API Routes Not Working**

1. Check environment variables are set correctly
2. Verify `GOOGLE_GENERATIVE_AI_API_KEY` is set
3. Check logs for specific API errors

### **Static Files Not Loading**

Your `.next` folder must be properly uploaded with all subdirectories intact.

### **Domain Not Pointing to App**

1. Check Node.js App URL settings
2. Verify domain DNS is pointing to your server
3. Check Apache/Nginx proxy settings in cPanel

---

## 📦 Quick Deployment Checklist

- [ ] Build project locally (`npm run build`)
- [ ] Upload required files to server
- [ ] Create `server.js` file
- [ ] Install dependencies (`npm install`)
- [ ] Set environment variables in cPanel
- [ ] Configure Node.js app in cPanel
- [ ] Start the application
- [ ] Test all pages and features
- [ ] Enable auto-restart on server boot

---

## 🔄 Updating Your Deployment

When you make changes:

1. Build locally: `npm run build`
2. Upload new `.next` folder (overwrite old one)
3. Upload any changed files (`package.json`, etc.)
4. Restart app in cPanel Node.js interface

**Or using Git:**
```bash
cd ~/public_html/AICOD-Frontend
git pull origin master
npm install
# Restart app in cPanel
```

---

## 🌐 Alternative: Using PM2 (Advanced)

If your server has PM2 available:

1. Create `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'aicod-frontend',
    script: 'server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

2. Start with PM2:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## 🎖️ Important Notes

1. **Memory**: Next.js apps can use significant memory. Ensure your server has at least 1GB RAM available.

2. **Build Time**: Always build BEFORE uploading. Don't build on the server (uses too much memory).

3. **HTTPS**: Enable SSL in cPanel for secure connections (free with Let's Encrypt).

4. **Backups**: Always backup before updating deployment.

5. **Logs**: Regularly check logs for errors.

---

## 📞 Need Help?

If you encounter issues:
1. Check cPanel error logs
2. Check Node.js app logs in cPanel interface
3. Verify all files uploaded correctly
4. Ensure Node.js version is 18.x or higher
5. Confirm environment variables are set

**Your `.next` folder structure should look like:**
```
.next/
├── server/
│   ├── app/
│   └── chunks/
├── static/
└── package.json
```

If this structure is missing, rebuild locally and re-upload.

---

**Good luck with your deployment! 🚀**
