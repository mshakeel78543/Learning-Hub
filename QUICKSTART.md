# Quick Start Guide 🚀

## Step 1: Dependencies Install کریں

```powershell
# Project directory میں جائیں
cd "C:\Program Files\USPTO Trademark Scraper\New Data\API Hacking"

# NPM packages install کریں (یہ کچھ وقت لے سکتا ہے)
npm install
```

## Step 2: Development Server چلائیں

```powershell
# Development mode میں server start کریں
npm run dev
```

Server start ہونے کے بعد یہ message نظر آئے گا:
```
✓ Ready in 2.5s
○ Local:   http://localhost:3000
```

## Step 3: Browser میں کھولیں

اپنے browser میں یہ URL کھولیں:
```
http://localhost:3000
```

## Step 4: Platform استعمال کریں

### Content پڑھنا 📚
1. Left sidebar میں سے کوئی topic click کریں
2. Content automatically load ہو جائے گا
3. Topics میں navigate کرنے کے لیے sidebar استعمال کریں

### Code Practice 💻
1. اوپر "Code Practice" tab click کریں
2. Monaco Editor میں اپنا JavaScript code لکھیں
3. Browser console (F12) میں output دیکھیں

مثال:
```javascript
// یہ code editor میں لکھیں
console.log("Hello API Hacking!");

fetch('https://jsonplaceholder.typicode.com/users/1')
  .then(res => res.json())
  .then(data => console.log(data));
```

### API Testing 🔧
1. "API Testing" tab click کریں
2. Test کرنے کے لیے API details بھریں:
   - **URL**: `https://jsonplaceholder.typicode.com/users`
   - **Method**: `GET`
   - **Headers**: Default رکھیں
3. "Send Request" button دبائیں
4. Response دیکھیں

## Troubleshooting 🔍

### Problem: Port already in use
```powershell
# Different port استعمال کریں
npm run dev -- -p 3001
```

### Problem: Dependencies install نہیں ہو رہیں
```powershell
# Cache clear کریں
npm cache clean --force
npm install
```

### Problem: TypeScript errors
```powershell
# TypeScript check کریں
npx tsc --noEmit
```

## Practice APIs 🌐

Testing کے لیے یہ free APIs استعمال کریں:

### 1. JSONPlaceholder (Recommended)
```
GET  https://jsonplaceholder.typicode.com/users
GET  https://jsonplaceholder.typicode.com/posts
POST https://jsonplaceholder.typicode.com/posts
```

### 2. ReqRes
```
GET  https://reqres.in/api/users
POST https://reqres.in/api/users
```

### 3. HTTPBin
```
GET  https://httpbin.org/get
POST https://httpbin.org/post
PUT  https://httpbin.org/put
```

## Example API Tests 🧪

### Test 1: Simple GET Request
```
URL: https://jsonplaceholder.typicode.com/users/1
Method: GET
Headers: {"Content-Type": "application/json"}
```

### Test 2: POST Request
```
URL: https://jsonplaceholder.typicode.com/posts
Method: POST
Headers: {"Content-Type": "application/json"}
Body: {
  "title": "Test Post",
  "body": "This is a test",
  "userId": 1
}
```

### Test 3: Authentication Header Test
```
URL: https://httpbin.org/bearer
Method: GET
Headers: {
  "Authorization": "Bearer test_token_123",
  "Content-Type": "application/json"
}
```

## Keyboard Shortcuts ⌨️

- **Ctrl + /** - Comment/Uncomment code
- **Ctrl + F** - Find in editor
- **Ctrl + H** - Replace in editor
- **F11** - Fullscreen toggle

## Next Steps 📖

1. **Bunyadi Maloomat** سے شروع کریں
2. ہر topic کو پڑھیں اور practice کریں
3. Code examples کو copy کر کے test کریں
4. API Testing tool سے experiments کریں
5. اپنے notes بنائیں

## Need Help? 🆘

- README.md میں detailed documentation دیکھیں
- Console errors (F12) check کریں
- Network tab میں API requests monitor کریں

---

Happy Learning! 🎉
