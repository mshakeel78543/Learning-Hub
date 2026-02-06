# Windows Installation Guide 🪟

## Prerequisites - پہلے یہ install کریں

### 1. Node.js Install کریں

**Download**:
1. https://nodejs.org پر جائیں
2. "LTS" (Long Term Support) version download کریں
3. Installer چلائیں اور "Next" کرتے رہیں
4. Installation complete ہونے دیں

**Verify Installation**:
```powershell
# PowerShell یا Command Prompt میں یہ commands چلائیں
node --version
# Output: v20.x.x (یا similar)

npm --version
# Output: 10.x.x (یا similar)
```

**اگر error آئے تو**:
- PowerShell/CMD restart کریں
- System environment variables check کریں
- Node.js کو uninstall اور reinstall کریں

---

## Installation Steps - Step by Step 📝

### Step 1: Project Folder میں جائیں

```powershell
# PowerShell میں یہ command چلائیں
cd "C:\Program Files\USPTO Trademark Scraper\New Data\API Hacking"
```

**Note**: اگر path میں spaces ہیں تو quotes استعمال کریں۔

---

### Step 2: Dependencies Install کریں

```powershell
# NPM packages install کریں (یہ 2-5 minutes لے سکتا ہے)
npm install
```

**Installation Progress**:
```
npm WARN deprecated ...
npm WARN ...
added 500+ packages in 3m
```

**Common Issues**:

**Issue 1: "npm is not recognized"**
```powershell
# Solution: Node.js properly install نہیں ہوا
# Node.js reinstall کریں اور PATH variable check کریں
```

**Issue 2: Permission Errors**
```powershell
# Solution: PowerShell کو Administrator mode میں چلائیں
# Start menu > PowerShell > Right-click > Run as Administrator
```

**Issue 3: Network Errors**
```powershell
# Solution: Internet connection check کریں
# یا npm cache clear کریں:
npm cache clean --force
npm install
```

**Issue 4: Long Path Names**
```powershell
# Solution: Git config update کریں
git config --system core.longpaths true
```

---

### Step 3: Development Server چلائیں

```powershell
# Development mode میں server start کریں
npm run dev
```

**Expected Output**:
```
  ▲ Next.js 14.1.0
  - Local:        http://localhost:3000
  - Environments: .env

 ✓ Ready in 2.5s
```

**اگر server start نہ ہو**:

**Problem: Port already in use**
```powershell
# Solution: Different port استعمال کریں
npm run dev -- -p 3001
# اب http://localhost:3001 استعمال کریں
```

**Problem: Module not found errors**
```powershell
# Solution: node_modules delete کر کے reinstall کریں
Remove-Item -Recurse -Force node_modules
npm install
```

---

### Step 4: Browser میں کھولیں

1. اپنا browser کھولیں (Chrome recommended)
2. یہ URL type کریں: `http://localhost:3000`
3. Platform load ہو جائے گا! 🎉

---

## PowerShell Execution Policy Issue 🔒

اگر scripts run نہیں ہو رہیں:

```powershell
# Execution policy check کریں
Get-ExecutionPolicy

# اگر "Restricted" ہے تو:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Confirm کریں جب پوچھا جائے
```

---

## Complete Project Setup Checklist ✅

```
[ ] Node.js installed (v18 یا higher)
[ ] npm installed
[ ] Project folder میں navigate کیا
[ ] npm install successfully run ہوا
[ ] npm run dev successfully چل رہا ہے
[ ] http://localhost:3000 browser میں کھلا
[ ] Platform UI نظر آ رہا ہے
```

---

## Troubleshooting Guide 🔧

### Issue: TypeScript Errors

```powershell
# TypeScript check کریں
npx tsc --noEmit

# اگر errors ہیں تو:
npm install typescript --save-dev
```

---

### Issue: ESLint Errors

```powershell
# ESLint run کریں
npm run lint

# Auto-fix try کریں:
npm run lint -- --fix
```

---

### Issue: Build Errors

```powershell
# Production build try کریں
npm run build

# اگر fail ہو:
# 1. Dependencies reinstall کریں
Remove-Item -Recurse -Force node_modules
npm install

# 2. Next.js cache clear کریں
Remove-Item -Recurse -Force .next
npm run build
```

---

### Issue: Port 3000 Already in Use

**Option 1: Kill the Process**
```powershell
# Port 3000 استعمال کرنے والے process کو find کریں
netstat -ano | findstr :3000

# Process ID (PID) note کریں اور kill کریں:
taskkill /PID <PID_NUMBER> /F
```

**Option 2: Use Different Port**
```powershell
npm run dev -- -p 3001
```

---

## Development Workflow 🔄

### Normal Development:
```powershell
# 1. Project folder میں جائیں
cd "C:\Program Files\USPTO Trademark Scraper\New Data\API Hacking"

# 2. Dev server start کریں
npm run dev

# 3. Browser میں کام کریں
# http://localhost:3000

# 4. Changes automatically reload ہوں گے (Hot Reload)
```

### Stop Server:
```
Ctrl + C (PowerShell میں)
```

---

## Optional: Git Setup 🌿

```powershell
# Git repository initialize کریں (optional)
git init

# .gitignore already included ہے

# First commit:
git add .
git commit -m "Initial commit: API Security Learning Platform"
```

---

## VS Code Setup (Recommended) 💻

### Install VS Code:
1. https://code.visualstudio.com download کریں
2. Install کریں

### Useful Extensions:
- ESLint
- Prettier
- ES7+ React/Redux/React-Native snippets
- Material Icon Theme
- GitLens

### Open in VS Code:
```powershell
# Project کو VS Code میں کھولیں
code "C:\Program Files\USPTO Trademark Scraper\New Data\API Hacking"
```

---

## Environment Variables (Future Use) 🔐

```powershell
# .env.local file بنائیں (if needed)
Copy-Item .env.example .env.local

# اپنی settings add کریں
notepad .env.local
```

---

## Update Dependencies (Future) 📦

```powershell
# Outdated packages check کریں
npm outdated

# All dependencies update کریں
npm update

# Specific package update کریں
npm install <package-name>@latest
```

---

## Production Build 🚀

```powershell
# Production build بنائیں
npm run build

# Production server چلائیں
npm start
```

---

## Backup & Restore 💾

### Backup:
```powershell
# Project folder کی copy بنائیں
# node_modules folder exclude کر دیں (وہ بڑا ہے)
```

### Restore:
```powershell
# Backup folder میں جائیں
cd "path\to\backup"

# Dependencies reinstall کریں
npm install
```

---

## Performance Tips ⚡

1. **Close Unnecessary Programs**: Memory free رکھیں
2. **Use SSD**: اگر ممکن ہو
3. **Clear Browser Cache**: DevTools > Application > Clear Storage
4. **Restart Dev Server**: کبھی کبھار restart کریں

---

## Getting Help 🆘

### Check Logs:
```powershell
# Console errors دیکھیں (PowerShell میں)
# Browser console دیکھیں (F12)
```

### Common Errors Reference:

**"Cannot find module"**
→ `npm install`

**"Port already in use"**
→ Different port استعمال کریں یا process kill کریں

**"Permission denied"**
→ Administrator mode میں run کریں

**"Network error"**
→ Internet connection check کریں

---

## Next Steps 🎯

1. ✅ Installation complete
2. 📚 README.md پڑھیں
3. 🚀 QUICKSTART.md follow کریں
4. 💻 Practice exercises شروع کریں
5. 🔧 API testing tool use کریں

---

## System Requirements 💻

**Minimum**:
- Windows 10/11
- 4GB RAM
- 2GB free disk space
- Internet connection

**Recommended**:
- Windows 11
- 8GB+ RAM
- SSD storage
- Stable internet

---

Happy Coding! 🎉
