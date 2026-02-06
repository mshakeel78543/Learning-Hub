# 🎯 Installation & Testing Guide

## Quick Installation (3 Easy Steps) ⚡

### Step 1: Open PowerShell
```powershell
# Windows Search میں "PowerShell" type کریں
# Right-click اور "Run as Administrator" select کریں
```

### Step 2: Navigate to Project
```powershell
cd "C:\Program Files\USPTO Trademark Scraper\New Data\API Hacking"
```

### Step 3: Install & Run
```powershell
# Dependencies install کریں
npm install

# Development server start کریں
npm run dev
```

### Step 4: Open Browser
```
http://localhost:3000
```

**Done! 🎉 Ab platform use karna shuru kar dein!**

---

## Alternative: Use Helper Scripts 🚀

### Option 1: Batch File (Easiest)
```powershell
# Project directory میں جائیں
cd "C:\Program Files\USPTO Trademark Scraper\New Data\API Hacking"

# Double-click on start.bat
# یا command line سے:
start.bat
```

### Option 2: PowerShell Helper (Recommended)
```powershell
# Project directory میں جائیں
cd "C:\Program Files\USPTO Trademark Scraper\New Data\API Hacking"

# Helper script چلائیں
.\scripts\helper.ps1
```

**Interactive menu نظر آئے گا جہاں سے آپ options choose کر سکتے ہیں!**

---

## Verify Installation ✅

### Run Validation Script
```powershell
# Project structure validate کریں
node scripts/validate.js
```

**Expected Output**:
```
===========================================
🔍 API Security Learning Platform
   Project Structure Validator
===========================================

✓ package.json exists
✓ tsconfig.json exists
✓ next.config.js exists
...
Success Rate: 100%
✓ All checks passed! Project is ready.
```

---

## Testing the Platform 🧪

### Test 1: Content Viewer
1. Server start کریں (`npm run dev`)
2. Browser میں `http://localhost:3000` کھولیں
3. Left sidebar میں کوئی topic click کریں
4. Content load ہونا چاہیے

**Expected**: ✓ Content properly loads اور displayed ہے

---

### Test 2: Code Playground
1. Platform میں "Code Practice" tab click کریں
2. یہ code paste کریں:
```javascript
console.log("Hello API Security!");
fetch('https://jsonplaceholder.typicode.com/users/1')
  .then(res => res.json())
  .then(data => console.log(data));
```
3. Browser console (F12) کھولیں
4. Output دیکھیں

**Expected**: ✓ Code editor works اور console میں output نظر آتا ہے

---

### Test 3: API Testing Tool
1. "API Testing" tab click کریں
2. یہ details بھریں:
   - **URL**: `https://jsonplaceholder.typicode.com/users`
   - **Method**: `GET`
   - **Headers**: Default رہنے دیں
3. "Send Request" click کریں
4. Response panel میں data دیکھیں

**Expected**: ✓ API request successful اور response displayed ہے

---

### Test 4: Search Functionality
1. Left sidebar میں search box استعمال کریں
2. "IDOR" type کریں
3. Filtered results نظر آنے چاہیے

**Expected**: ✓ Search works اور relevant topics show ہوتے ہیں

---

### Test 5: Navigation
1. مختلف categories expand/collapse کریں
2. Different topics پر click کریں
3. Content automatically update ہونا چاہیے

**Expected**: ✓ Smooth navigation اور content loading

---

## Troubleshooting Quick Fixes 🔧

### Issue: "npm: command not found"
```powershell
# Fix: Node.js install کریں
# Download from: https://nodejs.org
# Restart PowerShell after installation
```

---

### Issue: "Port 3000 already in use"
```powershell
# Fix Option 1: Kill process
netstat -ano | findstr :3000
# Note PID and run:
taskkill /PID <PID> /F

# Fix Option 2: Use different port
npm run dev -- -p 3001
```

---

### Issue: "Module not found"
```powershell
# Fix: Reinstall dependencies
Remove-Item -Recurse -Force node_modules
npm install
```

---

### Issue: TypeScript errors
```powershell
# Fix: Check TypeScript
npx tsc --noEmit

# If errors persist:
npm install typescript --save-dev
```

---

### Issue: Build fails
```powershell
# Fix: Clear cache and rebuild
Remove-Item -Recurse -Force .next
npm run build
```

---

### Issue: Content not loading
**Check**:
1. Are HTML files in correct directories?
2. Is file path correct in `contentStructure.ts`?
3. Check browser console for errors (F12)

---

## Performance Checks ⚡

### 1. Server Startup Time
```powershell
# Should be under 5 seconds
npm run dev
```
**Expected**: ✓ Server ready in 2-5 seconds

---

### 2. Page Load Time
- Initial load: < 3 seconds
- Content switching: < 1 second
- API requests: < 2 seconds

---

### 3. Memory Usage
```powershell
# Check Node.js memory
# Task Manager > Details > node.exe
```
**Expected**: ✓ Under 500MB normal operation

---

## Feature Checklist ✅

**Core Features**:
- [x] Sidebar navigation
- [x] Content viewer
- [x] Search functionality
- [x] Code playground
- [x] API testing tool
- [x] Responsive design
- [x] Dark theme
- [x] Urdu support

**Content Sections**:
- [x] بنیادی معلومات (Basic Info)
- [x] شروعاتی حملے (Initial Attacks)
- [x] حملوں کی اقسام (Attack Types)

**Tools & Utilities**:
- [x] Monaco Editor
- [x] API Proxy
- [x] Request Builder
- [x] Response Viewer

---

## Browser Compatibility 🌐

Tested on:
- ✅ Chrome (Recommended)
- ✅ Edge
- ✅ Firefox
- ✅ Safari (limited testing)

**Recommended**: Latest Chrome for best experience

---

## Known Limitations ⚠️

1. **API Proxy**: Some APIs may block requests due to CORS
   - **Solution**: Use CORS-friendly test APIs

2. **File Paths**: Windows long paths may cause issues
   - **Solution**: Keep project in shorter path

3. **Console Output**: Code playground output shows in browser console only
   - **Expected behavior**: Use F12 to view

---

## Next Steps After Installation 🚀

### 1. Explore Content (30 minutes)
- Browse different categories
- Read a few topics
- Try search functionality

### 2. Practice Code (1 hour)
- Open Code Playground
- Copy examples from `examples/api-testing-examples.js`
- Run and modify code

### 3. Test APIs (1 hour)
- Use API Testing tool
- Try different HTTP methods
- Test with JSONPlaceholder API

### 4. Complete Exercises (Ongoing)
- Start with beginner exercises in `docs/PRACTICE-EXERCISES.md`
- Progress to intermediate
- Challenge yourself with advanced

---

## Getting Maximum Value 💎

### Daily Practice Routine:
1. **Read** (15 min): One new topic per day
2. **Code** (20 min): Practice in Code Playground
3. **Test** (25 min): Try API Testing tool with real APIs

### Weekly Goals:
- Complete 5-7 topics
- Finish 3-5 exercises
- Test 10+ different API endpoints

### Monthly Milestones:
- Complete one full section
- All exercises at one level
- Document your learning

---

## Support & Resources 📚

### Documentation:
- `README.md` - Platform overview
- `QUICKSTART.md` - Quick start guide
- `DOCUMENTATION.md` - Complete documentation
- `docs/WINDOWS-SETUP.md` - Detailed setup
- `docs/TESTING-CHEATSHEET.md` - Testing reference
- `docs/PRACTICE-EXERCISES.md` - Hands-on practice

### Scripts:
- `start.bat` - Quick launcher
- `scripts/helper.ps1` - Helper menu
- `scripts/validate.js` - Structure validator

### Examples:
- `examples/api-testing-examples.js` - Code examples

---

## Final Checks Before You Start ✅

```powershell
# 1. Verify Node.js
node --version
# Expected: v18.x.x or higher

# 2. Verify NPM
npm --version
# Expected: 9.x.x or higher

# 3. Validate project structure
node scripts/validate.js
# Expected: 100% success rate

# 4. Start development server
npm run dev
# Expected: Server running on http://localhost:3000

# 5. Open in browser
start http://localhost:3000
# Expected: Platform loads successfully
```

---

## Success Indicators 🎯

You're ready when:
- ✅ Server starts without errors
- ✅ Platform loads in browser
- ✅ Content displays correctly
- ✅ Code editor works
- ✅ API tester functional
- ✅ No console errors

---

## Common Success Patterns 📈

**First Week**:
- Setup complete ✓
- Basic concepts understood ✓
- First exercises completed ✓

**First Month**:
- All basic topics covered ✓
- Comfortable with API testing ✓
- Intermediate exercises completed ✓

**Three Months**:
- Advanced topics mastered ✓
- Expert challenges attempted ✓
- Real-world practice started ✓

---

## Ready to Begin! 🚀

```powershell
# Start your journey:
cd "C:\Program Files\USPTO Trademark Scraper\New Data\API Hacking"
npm run dev
```

**Browser**: http://localhost:3000

**Happy Learning!** 🎉

---

*Remember: Learning API security is a journey, not a race. Take your time, practice regularly, and always test ethically!*
