# API Security Learning Platform 🚀

یہ ایک جامع API Security learning platform ہے جو Material UI کے ساتھ بنایا گیا ہے۔

## خصوصیات ✨

### 1. **Content Viewer** 📚
- تمام HTML lessons کو organize طریقے سے دیکھیں
- Sidebar navigation سے topics میں آسانی سے navigate کریں
- Search functionality سے فوری طور پر topics تلاش کریں

### 2. **Code Playground** 💻
- Monaco Editor (VS Code editor) کے ساتھ code practice کریں
- Syntax highlighting اور autocomplete
- JavaScript/TypeScript code لکھیں اور test کریں

### 3. **API Testing Tool** 🔧
- Live API requests بھیجیں
- مختلف HTTP methods test کریں (GET, POST, PUT, DELETE, etc.)
- Custom headers اور request body set کریں
- Real-time response دیکھیں

### 4. **Modern UI** 🎨
- Material UI کی خوبصورت dark theme
- Responsive design - mobile اور desktop دونوں پر کام کرے گا
- Smooth animations اور transitions

## Installation 📥

```bash
# Dependencies install کریں
npm install

# Development server start کریں
npm run dev

# Browser میں کھولیں
http://localhost:3000
```

## Project Structure 📁

```
API Hacking/
├── app/
│   ├── api/
│   │   ├── content/route.ts      # HTML content load کرنے کے لیے
│   │   └── proxy/route.ts        # API requests proxy کرنے کے لیے
│   ├── page.tsx                  # Main learning platform
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── lib/
│   ├── contentStructure.ts       # Content organization
│   └── theme.ts                  # Material UI theme
├── Bunyadi Maloomat/             # Basic information
├── Shurwati Hamle/               # Initial attacks
├── Hamlon Ki Iqsam/              # Attack types
├── package.json
├── tsconfig.json
└── next.config.js
```

## Usage 🎯

### Content پڑھنا
1. Left sidebar سے topic select کریں
2. Content tab میں lesson پڑھیں
3. Code examples copy کریں

### Code Practice کرنا
1. "Code Practice" tab پر جائیں
2. Monaco Editor میں اپنا code لکھیں
3. Browser console میں output دیکھیں

### API Testing کرنا
1. "API Testing" tab پر جائیں
2. API URL enter کریں
3. Method select کریں (GET, POST, etc.)
4. Headers اور body set کریں
5. "Send Request" button دبائیں
6. Response دیکھیں

## Features Details 📝

### Content Organization
- **Bunyadi Maloomat**: API basics اور HTTP protocol
- **Shurwati Hamle**: Information gathering اور authentication bypass
- **Hamlon Ki Iqsam**: Different attack types (IDOR, Privilege Escalation, etc.)

### Code Editor Features
- Syntax highlighting
- Auto-completion
- Line numbers
- Dark theme
- Multi-language support

### API Tester Features
- Support برائے تمام HTTP methods
- Custom headers
- JSON request body
- Formatted response
- Error handling

## Technologies Used 🛠️

- **Next.js 14**: React framework
- **Material UI**: Component library
- **Monaco Editor**: Code editor (VS Code کا engine)
- **TypeScript**: Type safety
- **Axios**: HTTP client

## Tips 💡

1. **Learning Path**:
   - پہلے "Bunyadi Maloomat" سے شروع کریں
   - پھر "Shurwati Hamle" پڑھیں
   - آخر میں "Hamlon Ki Iqsam" study کریں

2. **Practice**:
   - ہر lesson کے بعد Code Playground میں practice کریں
   - API Testing tool سے real APIs test کریں
   - مثال: `https://jsonplaceholder.typicode.com` استعمال کریں

3. **Testing**:
   - Safe testing کے لیے test APIs استعمال کریں
   - Real production APIs پر testing سے پہلے permission لیں

## Development Commands 🖥️

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm build

# Start production server
npm start

# Run linter
npm run lint
```

## Browser Support 🌐

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Notes ⚠️

- یہ platform **educational purposes** کے لیے ہے
- Unauthorized testing **illegal** ہے
- ہمیشہ permission لے کر testing کریں
- Ethical hacking practices follow کریں

## Future Enhancements 🚀

- [ ] Notes taking functionality
- [ ] Progress tracking
- [ ] Code snippets library
- [ ] Video tutorials integration
- [ ] Quiz system
- [ ] Certificate generation

---

Made with ❤️ for API Security Learning
