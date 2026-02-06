# 📚 API Security Learning Platform - Documentation Index

Welcome to the complete documentation for the API Security Learning Platform!

---

## 🚀 Getting Started

### First Time Setup
1. **[Windows Setup Guide](docs/WINDOWS-SETUP.md)** ⭐ START HERE
   - Node.js installation
   - Project setup
   - Troubleshooting common issues
   - Complete step-by-step guide

2. **[Quick Start Guide](QUICKSTART.md)**
   - Fast setup instructions
   - Basic usage
   - Practice APIs
   - Example requests

---

## 📖 Main Documentation

### Platform Overview
- **[README.md](README.md)**
  - Platform features
  - Technologies used
  - Project structure
  - Development commands

---

## 🎯 Learning Resources

### 1. Practice & Testing
- **[Practice Exercises](docs/PRACTICE-EXERCISES.md)** 💪
  - Beginner to Expert level exercises
  - Hands-on API testing scenarios
  - Step-by-step challenges
  - Real-world scenarios

- **[Testing Cheat Sheet](docs/TESTING-CHEATSHEET.md)** 📋
  - Common vulnerabilities
  - Testing methods
  - Code examples
  - Security best practices

### 2. Code Examples
- **[API Testing Examples](examples/api-testing-examples.js)** 💻
  - Fetch API examples
  - Different HTTP methods
  - Error handling
  - Authentication examples
  - IDOR testing
  - Rate limiting tests

---

## 🛠️ Tools & Utilities

### Helper Scripts
- **[PowerShell Helper](scripts/helper.ps1)**
  - Interactive menu
  - Common tasks automation
  - Port management
  - Build & deployment

- **[Batch Launcher](start.bat)**
  - Quick start launcher
  - Simple menu interface
  - For Windows users

---

## 📚 Content Structure

### Available Topics

#### 1️⃣ بنیادی معلومات (Basic Information)
**API کی پہچان**
- API کیا ہے؟
- RESTful APIs
- GraphQL APIs
- SOAP APIs
- HTTP Methods
- API Endpoints
- Web Services Types

**HTTP Protocol**
- Request-Response
- Status Codes
- Headers کی اہمیت
- Authentication Methods
- Cookies & Sessions
- TLS/SSL
- Proxy Servers

#### 2️⃣ شروعاتی حملے (Initial Attacks)
**معلومات جمع کرنا**
- API Documentation پڑھنا
- Google Dorking
- Shodan استعمال
- Wayback Machine
- Subdomain Enumeration
- Directory Brute-Forcing
- Burp Suite کا استعمال

**Authentication Bypass**
- Weak Credentials
- Default Passwords
- Brute-Force Attacks
- Broken Authentication Logic
- Session Token Manipulation
- API Keys Compromise
- OTP Bypass

#### 3️⃣ حملوں کی اقسام (Attack Types)
**Broken Access Control**
- IDOR - Insecure Direct Object References
- Horizontal Privilege Escalation
- Vertical Privilege Escalation
- Parameter Tampering
- Missing Function Level Access

---

## 🎨 Platform Features

### 1. Content Viewer 📖
- Organized sidebar navigation
- Search functionality
- All HTML lessons accessible
- Easy topic switching

### 2. Code Playground 💻
- Monaco Editor (VS Code engine)
- Syntax highlighting
- Auto-completion
- JavaScript/TypeScript support
- Practice code in real-time

### 3. API Testing Tool 🔧
- Send live API requests
- Test different HTTP methods
- Custom headers support
- Request body editor
- Response viewer
- Real-time testing

---

## 🔧 Technical Details

### Project Structure
```
API Hacking/
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   │   ├── content/         # Content loader
│   │   └── proxy/           # API proxy
│   ├── page.tsx             # Main platform
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── lib/                      # Utility libraries
│   ├── contentStructure.ts  # Content organization
│   └── theme.ts             # Material UI theme
├── docs/                     # Documentation
├── examples/                 # Code examples
├── scripts/                  # Helper scripts
├── Bunyadi Maloomat/        # Basic info content
├── Shurwati Hamle/          # Initial attacks content
├── Hamlon Ki Iqsam/         # Attack types content
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
└── next.config.js           # Next.js config
```

### Technologies
- **Framework**: Next.js 14
- **UI Library**: Material UI (MUI)
- **Editor**: Monaco Editor
- **Language**: TypeScript
- **Styling**: Emotion (CSS-in-JS)
- **HTTP Client**: Axios

---

## 📝 Usage Guides

### How to Use the Platform

#### 1. Reading Content
1. Open sidebar
2. Select a category
3. Click on a topic
4. Content loads automatically
5. Use search to find topics quickly

#### 2. Writing Code
1. Go to "Code Practice" tab
2. Write JavaScript/TypeScript
3. Use browser console (F12) for output
4. Copy and test examples

#### 3. Testing APIs
1. Go to "API Testing" tab
2. Enter API URL
3. Select HTTP method
4. Add headers (optional)
5. Add request body (optional)
6. Click "Send Request"
7. View response

---

## 🎓 Learning Path

### Recommended Order:

1. **Setup** (30 minutes)
   - Follow Windows Setup Guide
   - Install dependencies
   - Run development server

2. **Basic Concepts** (2-3 days)
   - Read "بنیادی معلومات" section
   - Practice basic exercises
   - Test simple APIs

3. **Information Gathering** (1 week)
   - Learn reconnaissance techniques
   - Practice with tools
   - Document findings

4. **Attack Techniques** (2-3 weeks)
   - Study each attack type
   - Practice in safe environments
   - Complete all exercises

5. **Advanced Topics** (Ongoing)
   - Expert level exercises
   - Real-world scenarios
   - Contribute to community

---

## 🔒 Safety & Ethics

### Important Reminders:
- ⚠️ Only test authorized applications
- 📜 Follow bug bounty program rules
- 🤝 Practice responsible disclosure
- 🎯 Use designated practice targets
- 📚 Learn for educational purposes

### Safe Practice Targets:
- JSONPlaceholder (https://jsonplaceholder.typicode.com)
- HTTPBin (https://httpbin.org)
- ReqRes (https://reqres.in)
- Your own local APIs

---

## 🆘 Getting Help

### Troubleshooting Steps:
1. Check [Windows Setup Guide](docs/WINDOWS-SETUP.md)
2. Review error messages carefully
3. Check browser console (F12)
4. Check PowerShell/terminal output
5. Try clean install (delete node_modules)
6. Clear Next.js cache (delete .next)

### Common Issues:
- **Port in use**: See Windows Setup Guide
- **Module not found**: Run `npm install`
- **Build errors**: Clear cache and rebuild
- **Permission errors**: Run as Administrator

---

## 📊 Progress Tracking

### Checklist for Complete Learning:

**Setup** ✅
- [ ] Node.js installed
- [ ] Dependencies installed
- [ ] Server running successfully
- [ ] Platform accessible in browser

**Basic Concepts** 📚
- [ ] All "بنیادی معلومات" topics read
- [ ] Basic exercises completed
- [ ] API basics understood

**Reconnaissance** 🔍
- [ ] Information gathering techniques learned
- [ ] Tools practice completed
- [ ] Documentation review done

**Attacks** 🎯
- [ ] Authentication attacks understood
- [ ] IDOR testing practiced
- [ ] Privilege escalation learned
- [ ] All attack types covered

**Practice** 💪
- [ ] Beginner exercises completed
- [ ] Intermediate exercises completed
- [ ] Advanced exercises completed
- [ ] Expert challenges attempted

---

## 🚀 Next Steps

After completing this platform:

1. **Bug Bounty Programs**
   - HackerOne
   - Bugcrowd
   - Intigriti

2. **CTF Platforms**
   - HackTheBox
   - TryHackMe
   - PortSwigger Academy

3. **Certifications**
   - eWPT (Web Application Penetration Testing)
   - OSWE (Offensive Security Web Expert)
   - CEH (Certified Ethical Hacker)

4. **Community**
   - Join security forums
   - Read security blogs
   - Follow researchers on Twitter
   - Contribute to open source

---

## 📞 Additional Resources

### External Links:
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security)
- [API Security Best Practices](https://owasp.org/www-project-api-security/)
- [HackerOne Hacktivity](https://hackerone.com/hacktivity)

### Recommended Tools:
- Burp Suite
- Postman
- OWASP ZAP
- Wireshark
- Fiddler

### Books:
- "Web Application Hacker's Handbook"
- "API Security in Action"
- "Real-World Bug Hunting"

---

## 📄 License & Credits

This platform is created for educational purposes.

**Built with**:
- Next.js
- Material UI
- Monaco Editor
- TypeScript

---

## 🎉 Final Notes

**Remember**:
- Learning takes time - be patient
- Practice regularly
- Always test ethically
- Document your learning
- Share knowledge responsibly

**Happy Learning! 🚀**

---

*Last Updated: February 2026*
*Platform Version: 1.0.0*
