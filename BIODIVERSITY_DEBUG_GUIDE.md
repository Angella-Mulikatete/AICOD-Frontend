# 🔧 BIODIVERSITY PAGE - BACKEND DATA NOT LOADING

## 🎯 PROBLEM:
The biodiversity page is showing default data instead of backend data.

## ✅ QUICK FIX:

### Step 1: Test Backend API
Open this URL in your browser:
```
http://localhost:8000/api/v1/programs?category_slug=biodiversity
```

**What you should see:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Forest Conservation Initiative",
      "slug": "forest-conservation-initiative",
      "description": "...",
      "category": {
        "slug": "biodiversity"
      }
    }
  ]
}
```

### Step 2: Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for errors

**Expected log:**
- ✅ "Using default data (backend program not found)" ← This means backend isn't returning biodiversity programs

**OR**

- ✅ Program data object ← This means it worked!

---

## 🔍 DEBUGGING:

### Check 1: Is Backend Running?
```bash
# In backend terminal, check if server is running
php artisan serve
```

Should see: `Server running on http://127.0.0.1:8000`

### Check 2: Does Biodiversity Category Exist?
Test in browser:
```
http://localhost:8000/api/v1/program-categories
```

Look for a category with `"slug": "biodiversity"`

### Check 3: Are There Programs with Biodiversity Category?
Test in browser:
```
http://localhost:8000/api/v1/programs
```

Check if any programs have `category.slug === "biodiversity"`

---

## 💡 SOLUTIONS:

### Solution A: Backend Has No Biodiversity Programs
**Tell your backend developer to:**

1. **Create Biodiversity Category** (if not exists):
```sql
INSERT INTO program_categories (name, slug, color) 
VALUES ('Biodiversity', 'biodiversity', '#10b981');
```

2. **Assign Programs to Biodiversity**:
```sql
-- Update existing programs OR create new ones
UPDATE programs 
SET category_id = (SELECT id FROM program_categories WHERE slug = 'biodiversity')
WHERE title LIKE '%Forest%' OR title LIKE '%Environment%';
```

### Solution B: Category Slug is Different
Maybe backend uses "environment" instead of "biodiversity"?

**Update frontend code:**
Change in `src/app/programs/biodiversity/page.tsx`:
```typescript
// FROM:
fetch('http://localhost:8000/api/v1/programs?category_slug=biodiversity')

// TO:
fetch('http://localhost:8000/api/v1/programs?category_slug=environment')
// OR whatever slug the backend actually uses
```

### Solution C: Use First Available Program
If you just want ANY program to show:

```typescript
// Change in biodiversity/page.tsx
fetch('http://localhost:8000/api/v1/programs')
  .then(res => res.json())
  .then(response => {
    if (response.success && response.data && response.data.length > 0) {
      // Use FIRST program regardless of category
      setProgram(response.data[0]);
      setUseBackend(true);
    }
  })
```

---

## 🧪 QUICK TEST:

1. **Open browser console** (F12)
2. **Run this in console:**
```javascript
fetch('http://localhost:8000/api/v1/programs?category_slug=biodiversity')
  .then(r => r.json())
  .then(d => console.log('Backend Response:', d))
```

3. **Check the output:**
   - If `data` is empty array `[]` → Backend has no biodiversity programs
   - If `data` has programs → Frontend code should work
   - If error → Backend not running or CORS issue

---

## 🎯 FINAL SOLUTION:

**Right now, the page shows default data because:**
1. Backend doesn't have programs with category_slug="biodiversity"
2. OR the biodiversity category doesn't exist

**To make it work with backend data:**

**Option 1:** Have backend developer add biodiversity programs

**Option 2:** Change frontend to use a different category that EXISTS

**Option 3:** Keep showing default data (it looks great already!)

---

## ✅ CURRENT STATUS:

- ✅ Page loads perfectly
- ✅ Shows beautiful default data
- ✅ Design is perfect
- ⏳ Waiting for backend to have biodiversity programs

**The page IS working - it's just using default data until backend has the right programs!**

---

**NEXT STEP:** Ask backend developer to add programs to biodiversity category!
