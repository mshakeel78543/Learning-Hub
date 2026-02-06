# 🎓 API Security Learning Platform - Complete Overview

<div align="center">

## معلومات اور سیکیورٹی سیکھنے کا جامع پلیٹ فارم

**Modern • Interactive • Comprehensive**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Material UI](https://img.shields.io/badge/Material--UI-5-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

</div>

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Screenshots](#screenshots)
4. [Quick Start](#quick-start)
5. [Documentation](#documentation)
6. [Content Structure](#content-structure)
7. [Technologies](#technologies)
8. [Project Structure](#project-structure)
9. [Usage Examples](#usage-examples)
10. [Contributing](#contributing)
11. [License](#license)

---

## 🌟 Overview

یہ ایک **state-of-the-art learning platform** ہے جو API Security اور Hacking سیکھنے کے لیے بنایا گیا ہے۔ اس میں:

- 📚 **45+ Comprehensive Topics** in Urdu
- 💻 **Interactive Code Playground** with Monaco Editor
- 🔧 **Live API Testing Tool** with real-time responses
- 🎨 **Beautiful Material UI Interface** with dark theme
- 🔍 **Smart Search Functionality** across all topics
- 📱 **Fully Responsive Design** for all devices

### Why This Platform?

✅ **Complete in Urdu**: تمام content Urdu میں
✅ **Hands-on Practice**: Real-time coding اور testing
✅ **Beginner Friendly**: Step-by-step learning path
✅ **Modern Tech Stack**: Latest web technologies
✅ **Open Source**: Free اور accessible

---

## ✨ Features

### 1. 📖 Content Management System

- **Organized Navigation**: 3 main sections, 7 categories, 45+ topics
- **Smart Search**: Instant topic search across all content
- **Collapsible Sidebar**: Clean, organized interface
- **Progress Tracking**: Track your learning journey

### 2. 💻 Code Playground

- **Monaco Editor**: Same editor as VS Code
- **Syntax Highlighting**: JavaScript/TypeScript support
- **Auto-completion**: IntelliSense support
- **Real-time Execution**: Test code instantly
- **Multiple Language Support**: JS, TS, and more

**Code Playground Features**:
```javascript
// Example code you can run
const apiUrl = "https://jsonplaceholder.typicode.com/users";

fetch(apiUrl)
  .then(response => response.json())
  .then(users => {
    console.log("Users:", users);
    // Practice API calls
  })
  .catch(error => console.error("Error:", error));
```

### 3. 🔧 API Testing Tool

**Full-featured API client built into the platform**:

- ✅ All HTTP Methods (GET, POST, PUT, DELETE, PATCH)
- ✅ Custom Headers Support
- ✅ Request Body Editor (JSON)
- ✅ Response Viewer with Syntax Highlighting
- ✅ Status Code & Headers Display
- ✅ Error Handling

**Example Test**:
```
Endpoint: https://jsonplaceholder.typicode.com/users
Method: GET
Headers: {"Content-Type": "application/json"}
Response: [Array of users with full details]
```

### 4. 🎨 Modern UI/UX

- **Dark Theme**: Eye-friendly dark mode
- **Material Design**: Google's Material UI components
- **Responsive Layout**: Works on mobile, tablet, desktop
- **Smooth Animations**: Polished user experience
- **Custom Scrollbars**: Themed scrollbars
- **Accessibility**: ARIA labels and keyboard navigation

### 5. 🔍 Search & Discovery

- **Real-time Search**: Instant results as you type
- **Smart Filtering**: Filter across all categories
- **Highlight Matches**: Visual feedback
- **Keyboard Navigation**: Arrow keys support

---

## 📸 Screenshots

### Main Interface
```
┌─────────────────────────────────────────────────────────┐
│  📚 API Hacking Learning Platform      [Learning Mode] │
├───────────┬─────────────────────────────────────────────┤
│           │  Content  │  Code Practice  │  API Testing  │
│ 📚 API    ├───────────────────────────────────────────┤
│ Hacking   │                                             │
│           │  ► HTML Content with syntax highlighting   │
│ 🔍 Search │  ► Images and code examples                │
│ [......] │  ► Interactive elements                    │
│           │  ► Full lesson content                     │
│ بنیادی    │                                             │
│ معلومات   │                                             │
│  🔍 API   │                                             │
│  کی پہچان │                                             │
│   • Topic1│                                             │
│   • Topic2│                                             │
│  🌐 HTTP  │                                             │
│  Protocol │                                             │
│           │                                             │
└───────────┴─────────────────────────────────────────────┘
```

### Code Playground
```
┌─────────────────────────────────────────────────────────┐
│  Code Playground - اپنا کوڈ یہاں practice کریں          │
├─────────────────────────────────────────────────────────┤
│ 1 │ // اپنا code یہاں لکھیں                            │
│ 2 │                                                     │
│ 3 │ const apiUrl = "https://api.example.com";         │
│ 4 │                                                     │
│ 5 │ fetch(apiUrl)                                      │
│ 6 │   .then(res => res.json())                        │
│ 7 │   .then(data => console.log(data));               │
│   │                                                     │
├─────────────────────────────────────────────────────────┤
│ 💡 Tip: Console میں output دیکھیں (F12)               │
└─────────────────────────────────────────────────────────┘
```

### API Testing Tool
```
┌───────────────────┬─────────────────────────────────────┐
│ API Request       │  Response                           │
├───────────────────┼─────────────────────────────────────┤
│ URL:              │  {                                  │
│ [https://...]     │    "status": 200,                   │
│                   │    "statusText": "OK",              │
│ Method:           │    "headers": {...},                │
│ [GET ▼]          │    "body": {                        │
│                   │      "id": 1,                       │
│ Headers (JSON):   │      "name": "User",                │
│ {                 │      "email": "user@example.com"    │
│   "Content-Type": │    }                                │
│   "application/   │  }                                  │
│    json"          │                                     │
│ }                 │                                     │
│                   │                                     │
│ [Send Request]    │                                     │
└───────────────────┴─────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn
- Modern browser (Chrome recommended)

### Installation

```bash
# 1. Navigate to project
cd "C:\Program Files\USPTO Trademark Scraper\New Data\API Hacking"

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# Navigate to http://localhost:3000
```

**That's it! 🎉**

### Using Helper Scripts

**Windows Batch File**:
```bash
# Double-click start.bat
# Or run from command line:
start.bat
```

**PowerShell Helper**:
```powershell
.\scripts\helper.ps1
```

---

## 📚 Documentation

### Complete Documentation Available:

| Document | Description | Link |
|----------|-------------|------|
| **README.md** | Main documentation | [README.md](README.md) |
| **QUICKSTART.md** | Quick start guide | [QUICKSTART.md](QUICKSTART.md) |
| **DOCUMENTATION.md** | Complete docs index | [DOCUMENTATION.md](DOCUMENTATION.md) |
| **INSTALLATION-TESTING.md** | Setup & testing | [INSTALLATION-TESTING.md](INSTALLATION-TESTING.md) |
| **Windows Setup** | Detailed Windows guide | [docs/WINDOWS-SETUP.md](docs/WINDOWS-SETUP.md) |
| **Testing Cheatsheet** | Security testing guide | [docs/TESTING-CHEATSHEET.md](docs/TESTING-CHEATSHEET.md) |
| **Practice Exercises** | Hands-on exercises | [docs/PRACTICE-EXERCISES.md](docs/PRACTICE-EXERCISES.md) |

### Example Code

Complete examples available in:
- `examples/api-testing-examples.js` - 12+ working examples

---

## 📖 Content Structure

### 🟦 Section 1: بنیادی معلومات (Basic Information)

#### 🔍 API کی پہچان (API Recognition)
1. API کیا ہے؟ (What is API?)
2. RESTful APIs
3. GraphQL APIs
4. SOAP APIs
5. HTTP Methods
6. API Endpoints
7. Web Services Types

#### 🌐 HTTP Protocol
1. Request-Response Cycle
2. HTTP Status Codes
3. Headers کی اہمیت (Importance of Headers)
4. Authentication Methods
5. Cookies & Sessions
6. TLS/SSL
7. Proxy Servers

---

### 🟩 Section 2: شروعاتی حملے (Initial Attacks)

#### 🔎 معلومات جمع کرنا (Information Gathering)
1. API Documentation پڑھنا
2. Google Dorking
3. Shodan استعمال
4. Wayback Machine استعمال
5. Subdomain Enumeration
6. Directory Brute-Forcing
7. Burp Suite کا استعمال

#### 🔓 Authentication Bypass
1. Weak Credentials
2. Default Passwords
3. Brute-Force Attacks
4. Broken Authentication Logic
5. Session Token Manipulation
6. API Keys Compromise
7. OTP Bypass

---

### 🟥 Section 3: حملوں کی اقسام (Attack Types)

#### 🚫 Broken Access Control
1. IDOR - Insecure Direct Object References
2. Horizontal Privilege Escalation
3. Vertical Privilege Escalation
4. Parameter Tampering
5. Missing Function Level Access

---

## 🛠️ Technologies

### Frontend
- **Framework**: Next.js 14 (React)
- **UI Library**: Material UI (MUI) v5
- **Language**: TypeScript
- **Styling**: Emotion (CSS-in-JS)
- **Editor**: Monaco Editor (VS Code engine)

### Backend
- **API Routes**: Next.js API Routes
- **HTTP Client**: Axios
- **File System**: Node.js fs module

### Development
- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript compiler

### Dependencies
```json
{
  "@emotion/react": "^11.11.3",
  "@emotion/styled": "^11.11.0",
  "@monaco-editor/react": "^4.6.0",
  "@mui/icons-material": "^5.15.10",
  "@mui/material": "^5.15.10",
  "axios": "^1.6.7",
  "next": "^14.1.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

---

## 📁 Project Structure

```
API Hacking/
│
├── 📁 app/                          # Next.js App Directory
│   ├── 📁 api/                      # API Routes
│   │   ├── 📁 content/              # Content loader API
│   │   │   └── route.ts            # Serves HTML content
│   │   └── 📁 proxy/                # API proxy
│   │       └── route.ts            # Proxies API requests
│   ├── page.tsx                    # Main platform component
│   ├── layout.tsx                  # Root layout
│   └── globals.css                 # Global styles
│
├── 📁 lib/                          # Utility Libraries
│   ├── contentStructure.ts         # Content organization
│   └── theme.ts                    # Material UI theme
│
├── 📁 docs/                         # Documentation
│   ├── WINDOWS-SETUP.md            # Windows installation
│   ├── TESTING-CHEATSHEET.md       # Testing reference
│   └── PRACTICE-EXERCISES.md       # Practice exercises
│
├── 📁 examples/                     # Code Examples
│   └── api-testing-examples.js     # API testing samples
│
├── 📁 scripts/                      # Helper Scripts
│   ├── helper.ps1                  # PowerShell helper
│   └── validate.js                 # Structure validator
│
├── 📁 Bunyadi Maloomat/            # Content: Basic Info
│   ├── 📁 API Ki Pehchan/
│   └── 📁 HTTP Protocol/
│
├── 📁 Shurwati Hamle/              # Content: Initial Attacks
│   ├── 📁 Maloomat Jama Karna/
│   └── 📁 Authentication Bypass/
│
├── 📁 Hamlon Ki Iqsam/             # Content: Attack Types
│   └── 📁 Broken Access Control/
│
├── 📄 package.json                 # Project dependencies
├── 📄 tsconfig.json                # TypeScript config
├── 📄 next.config.js               # Next.js config
├── 📄 .eslintrc.json               # ESLint config
├── 📄 .gitignore                   # Git ignore rules
├── 📄 start.bat                    # Quick launcher
│
├── 📄 README.md                    # Main documentation
├── 📄 QUICKSTART.md                # Quick start guide
├── 📄 DOCUMENTATION.md             # Docs index
├── 📄 INSTALLATION-TESTING.md      # Setup & testing
└── 📄 PROJECT-OVERVIEW.md          # This file
```

---

## 💡 Usage Examples

### Example 1: Reading Content
```typescript
// Automatically handled by the platform
// Just click on any topic in the sidebar
```

### Example 2: Testing API
```javascript
// In Code Playground tab:
const testAPI = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  const data = await response.json();
  console.log('User:', data);
};

testAPI();
```

### Example 3: Testing IDOR
```javascript
// Test sequential user IDs
for (let id = 1; id <= 5; id++) {
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(res => res.json())
    .then(user => console.log(`User ${id}:`, user.name));
}
```

### Example 4: Custom Headers
```javascript
// In API Testing Tool:
// URL: https://httpbin.org/headers
// Method: GET
// Headers:
{
  "X-Custom-Header": "MyValue",
  "Authorization": "Bearer token123"
}
```

---

## 🎯 Learning Path

### Week 1: Foundations
- ✅ Setup platform
- ✅ Read "بنیادی معلومات" section
- ✅ Complete beginner exercises
- ✅ Test basic APIs

### Week 2-3: Reconnaissance
- ✅ Learn information gathering
- ✅ Practice with tools
- ✅ Complete intermediate exercises

### Week 4-6: Attack Techniques
- ✅ Study each attack type
- ✅ Practice in safe environments
- ✅ Complete advanced exercises

### Month 2-3: Mastery
- ✅ Expert level challenges
- ✅ Real-world scenarios
- ✅ Build testing methodology

---

## 🤝 Contributing

Contributions welcome! Here's how:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📜 License

This project is created for **educational purposes only**.

### Usage Terms:
- ✅ Free to use for learning
- ✅ Can be modified
- ✅ Can be shared
- ⚠️ Must be used ethically
- ⚠️ No warranty provided

---

## 🙏 Acknowledgments

### Built With:
- [Next.js](https://nextjs.org/) - React Framework
- [Material UI](https://mui.com/) - Component Library
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code Editor
- [TypeScript](https://www.typescriptlang.org/) - Language

### Inspired By:
- OWASP API Security Project
- PortSwigger Web Security Academy
- Real-world bug bounty experiences

---

## 📞 Support

### Documentation:
- Complete docs in `DOCUMENTATION.md`
- Setup guide in `docs/WINDOWS-SETUP.md`
- Examples in `examples/` directory

### Common Issues:
- Check troubleshooting in `INSTALLATION-TESTING.md`
- Run validation: `node scripts/validate.js`
- Use helper: `.\scripts\helper.ps1`

---

## 🎯 Goals & Roadmap

### ✅ Completed
- [x] Core platform development
- [x] Content management system
- [x] Code playground integration
- [x] API testing tool
- [x] Comprehensive documentation
- [x] Helper scripts
- [x] Practice exercises

### 🚧 Future Enhancements
- [ ] Notes taking feature
- [ ] Progress tracking system
- [ ] Quiz system
- [ ] Video tutorials integration
- [ ] Certificate generation
- [ ] Mobile app version
- [ ] Community features
- [ ] More content sections

---

## 📊 Statistics

- **45+** Comprehensive Topics
- **3** Main Sections
- **7** Categories
- **12+** Code Examples
- **15+** Practice Exercises
- **100+** Documentation Pages

---

## 🌟 Star History

If you find this project helpful, please ⭐ star it on GitHub!

---

## 📝 Final Notes

### Remember:
- 🎓 Learning takes time - be patient
- 💪 Practice regularly
- ⚠️ Always test ethically
- 📝 Document your learning
- 🤝 Share knowledge responsibly

### Important:
This platform is for **educational purposes only**. Always:
- Get proper authorization before testing
- Follow responsible disclosure
- Respect privacy and laws
- Use for legitimate security research

---

<div align="center">

**Made with ❤️ for API Security Learning**

**Happy Learning! 🚀**

---

*Version 1.0.0 | Last Updated: February 2026*

</div>
