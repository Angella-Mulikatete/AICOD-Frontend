# 🎯 Quick Start - cPanel Deployment Steps

## ✅ What's Ready in Your Project

I've created these files for you:

1. **`server.js`** - Node.js server file (✅ Ready)
2. **`CPANEL_NODEJS_DEPLOYMENT.md`** - Full deployment guide (✅ Ready)
3. **`next.config.ts`** - Updated for standalone deployment (✅ Ready)
4. **`.htaccess`** - Apache configuration (if needed)

---

## 🚀 Deploy in 10 Steps

### **Step 1: Build Your Project**
```bash
npm run build
```
✅ This creates the `.next` folder with all compiled code

### **Step 2: Check What You Have**
After build completes, you should see:
- ✅ `.next/` folder
- ✅ `public/` folder
- ✅ `server.js` file
- ✅ `package.json` file
- ✅ `next.config.ts` file

### **Step 3: Create Environment File**
Create `.env.production` file with:
```
NODE_ENV=production
GOOGLE_GENERATIVE_AI_API_KEY=your-api-key-here
PORT=3000
```

### **Step 4: Upload Files to cPanel**

**Upload these folders/files:**
```
✅ .next/              (entire folder)
✅ public/             (entire folder)  
✅ server.js
✅ package.json
✅ package-lock.json
✅ next.config.ts
✅ .env.production
```

**DO NOT upload:**
```
❌ src/
❌ node_modules/ (install on server instead)
❌ .git/
```

### **Step 5: Access cPanel Terminal**

In cPanel, open **Terminal** and navigate to your app:
```bash
cd ~/public_html/your-app-folder
```

### **Step 6: Install Dependencies**
```bash
npm install --production
```

### **Step 7: Setup Node.js App in cPanel**

1. Go to cPanel → **Setup Node.js App**
2. Click **Create Application**
3. Fill in:
   - **Node.js version**: 18.x or 20.x
   - **Application mode**: Production
   - **Application root**: `/home/username/public_html/your-app-folder`
   - **Application URL**: `your-domain.com`
   - **Application startup file**: `server.js`
4. Click **Create**

### **Step 8: Add Environment Variables**

In the Node.js App interface:
1. Find **Environment Variables** section
2. Add:
   ```
   NODE_ENV = production
   GOOGLE_GENERATIVE_AI_API_KEY = your-actual-api-key
   PORT = 3000
   ```
3. Click **Save**

### **Step 9: Start the Application**

In Node.js App interface, click **Start Application** or **Restart**

### **Step 10: Test Your Site**

Visit your domain: `http://your-domain.com`

---

## 🔥 Common Issues & Quick Fixes

### **Issue: Build fails locally**
```bash
# Clear cache and rebuild
Remove-Item -Path .next -Recurse -Force
npm run build
```

### **Issue: Module not found on server**
```bash
# Reinstall dependencies
npm install --production
```

### **Issue: App won't start**
- Check Node.js App logs in cPanel
- Verify environment variables are set
- Make sure port 3000 is available
- Check `.next` folder uploaded correctly

### **Issue: API routes return 500**
- Verify `GOOGLE_GENERATIVE_AI_API_KEY` is set
- Check server logs for specific error
- Ensure API route files are in `.next/server/app/api/`

---

## 📦 Deployment Package Preparation

### **Option A: ZIP for Upload**

Create a deployment package:
```bash
# After successful build
# Create a zip with only what's needed
```

Include:
- `.next/`
- `public/`
- `server.js`
- `package.json`
- `package-lock.json`
- `next.config.ts`

### **Option B: Git Deploy**

If you have Git on server:
```bash
cd ~/public_html
git clone https://github.com/your-username/AICOD-Frontend.git
cd AICOD-Frontend
npm install --production
npm run build
# Then setup Node.js app in cPanel
```

---

## 📝 Pre-Deployment Checklist

Before uploading to cPanel, verify:

- [ ] `npm run build` completes successfully
- [ ] `.next` folder exists with `server/` and `static/` subdirectories
- [ ] `server.js` file is in project root
- [ ] Environment variables prepared
- [ ] cPanel has Node.js Selector available
- [ ] You have your API keys ready

---

## 🎯 After Deployment

Once deployed:

1. **Test all pages**: Home, About, Programs, Contact, etc.
2. **Test the AI chat** (if using it)
3. **Check browser console** for errors
4. **Enable SSL** in cPanel (Let's Encrypt - free)
5. **Setup auto-restart** on server reboot

---

## 🔄 For Updates

When you make changes:

1. Build locally: `npm run build`
2. Upload new `.next` folder to server (overwrite)
3. Restart app in cPanel Node.js interface

**That's it!**

---

## 📞 Still Need Help?

Check the full guide: **`CPANEL_NODEJS_DEPLOYMENT.md`**

Or if you're having trouble with the build, let me know and I can help debug!

---

**Current Status:**
✅ `server.js` created
✅ `next.config.ts` configured for standalone
✅ API routes restored
❓ Need to run `npm run build` successfully
❓ Then upload to cPanel

**Next: Run `npm run build` and verify .next folder is created!**
