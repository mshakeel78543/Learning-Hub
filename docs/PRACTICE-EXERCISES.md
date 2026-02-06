# Practice Exercises - Hands-On API Security Testing 🎯

## Beginner Level 🌱

### Exercise 1: Basic GET Request
**Goal**: Simple API request بھیجنا سیکھیں

**Task**:
1. JSONPlaceholder API سے users کی list fetch کریں
2. Console میں first 3 users print کریں

**Endpoint**: `https://jsonplaceholder.typicode.com/users`

**Solution**:
```javascript
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => {
    console.log('First 3 users:');
    users.slice(0, 3).forEach(user => {
      console.log(`${user.id}: ${user.name} (${user.email})`);
    });
  });
```

---

### Exercise 2: POST Request Practice
**Goal**: نیا data create کرنا سیکھیں

**Task**:
1. JSONPlaceholder API پر نیا post create کریں
2. Response میں created post کی ID دیکھیں

**Endpoint**: `https://jsonplaceholder.typicode.com/posts`

**Required Data**:
- title: "My First API Post"
- body: "Learning API security"
- userId: 1

**Hints**:
- Method: POST
- Content-Type: application/json
- body کو JSON.stringify() کریں

---

### Exercise 3: Headers Practice
**Goal**: Custom headers بھیجنا سیکھیں

**Task**:
HTTPBin API کو request بھیجیں اور اپنے headers دیکھیں

**Endpoint**: `https://httpbin.org/headers`

**Add These Headers**:
- X-Custom-Header: "MyValue"
- X-API-Version: "1.0"

---

## Intermediate Level 🔥

### Exercise 4: IDOR Testing
**Goal**: Sequential IDs کو test کرنا سیکھیں

**Task**:
1. User IDs 1 سے 10 تک iterate کریں
2. ہر user کا name اور email console میں print کریں
3. کون سے IDs valid ہیں نوٹ کریں

**Endpoint**: `https://jsonplaceholder.typicode.com/users/{id}`

**Questions**:
- کیا تمام IDs accessible ہیں?
- کیا sequential pattern ہے؟
- Real world میں یہ vulnerability کیوں خطرناک ہے?

---

### Exercise 5: Parameter Tampering
**Goal**: URL parameters modify کرنا سیکھیں

**Task**:
1. Posts API سے userId=1 کے posts fetch کریں
2. پھر userId=2 کے posts fetch کریں
3. Results compare کریں

**Base Endpoint**: `https://jsonplaceholder.typicode.com/posts`

**Parameters to Test**:
- ?userId=1
- ?userId=2
- ?userId=1&_limit=3

**Questions**:
- Parameters change کرنے سے کیا فرق پڑا؟
- کیا unauthorized data access ہو سکتا ہے؟

---

### Exercise 6: Authentication Testing
**Goal**: Authentication headers کی testing

**Task**:
HTTPBin API کو different Bearer tokens کے ساتھ test کریں

**Endpoint**: `https://httpbin.org/bearer`

**Test Cases**:
1. Valid token: "test_token_123"
2. Empty token: ""
3. Invalid token: "invalid"
4. No Authorization header

**Expected Results**:
- کیا API tokens validate کر رہا ہے؟
- کیا error messages informative ہیں؟

---

## Advanced Level 🚀

### Exercise 7: Rate Limiting Test
**Goal**: API rate limits کی testing

**Task**:
1. 20 rapid requests ایک ہی endpoint پر بھیجیں
2. ہر request کا response time note کریں
3. کیا API slow ہو رہا ہے یا block کر رہا ہے؟

**Endpoint**: `https://jsonplaceholder.typicode.com/posts`

**Metrics to Track**:
- Request number
- Response status
- Response time
- Any errors

**Challenge**: Code لکھیں جو یہ automatically test کرے

---

### Exercise 8: Error Message Analysis
**Goal**: Error messages سے information gathering

**Task**:
Invalid inputs بھیج کر errors analyze کریں

**Test Cases**:
```javascript
// Test 1: Invalid user ID
fetch('https://jsonplaceholder.typicode.com/users/99999')

// Test 2: Invalid endpoint
fetch('https://jsonplaceholder.typicode.com/invalid')

// Test 3: Malformed JSON
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: 'invalid json'
})
```

**Analysis**:
- Error messages کتنے detailed ہیں؟
- کیا sensitive information leak ہو رہی ہے؟
- Status codes کیا ہیں؟

---

### Exercise 9: HTTP Methods Testing
**Goal**: مختلف HTTP methods کی testing

**Task**:
ایک ہی endpoint پر مختلف methods try کریں

**Endpoint**: `https://jsonplaceholder.typicode.com/posts/1`

**Methods to Test**:
- GET
- POST
- PUT
- DELETE
- PATCH
- OPTIONS

**Questions**:
- کون سے methods allowed ہیں؟
- کیا OPTIONS method endpoint information reveal کرتا ہے؟
- کیا DELETE method بغیر authentication کے work کرتا ہے؟

---

### Exercise 10: CORS Testing
**Goal**: CORS configuration کی testing

**Task**:
Different origins سے request بھیج کر CORS headers analyze کریں

**Endpoint**: `https://httpbin.org/get`

**Test**:
```javascript
fetch('https://httpbin.org/get', {
  headers: {
    'Origin': 'https://evil.com'
  }
})
.then(res => {
  console.log('CORS Headers:');
  console.log('Access-Control-Allow-Origin:', 
    res.headers.get('Access-Control-Allow-Origin'));
  console.log('Access-Control-Allow-Credentials:', 
    res.headers.get('Access-Control-Allow-Credentials'));
});
```

---

## Expert Level 💎

### Exercise 11: Complex IDOR Scenario
**Goal**: Multi-step IDOR attack simulation

**Scenario**:
آپ نے ایک API discover کیا ہے جو users اور ان کے documents return کرتا ہے۔

**Tasks**:
1. اپنا user profile fetch کریں
2. اپنے documents list fetch کریں
3. دوسرے user کا profile access کرنے کی کوشش کریں
4. دوسرے user کے documents access کرنے کی کوشش کریں

**Endpoints**:
```
GET /users/{userId}
GET /users/{userId}/documents
GET /documents/{documentId}
```

**Use**: JSONPlaceholder endpoints simulate کریں
- Users: `https://jsonplaceholder.typicode.com/users/{id}`
- Posts (documents کے بجائے): `https://jsonplaceholder.typicode.com/posts?userId={id}`

---

### Exercise 12: Privilege Escalation Attempt
**Goal**: Authorization bypass testing

**Scenario**:
آپ ایک normal user ہیں اور admin privileges حاصل کرنے کی کوشش کر رہے ہیں۔

**Tasks**:
1. User update endpoint پر extra parameters بھیجیں
2. Role field modify کرنے کی کوشش کریں
3. Admin-only endpoints access کرنے کی کوشش کریں

**Practice Endpoint**: `https://jsonplaceholder.typicode.com/users/1`

**Test Payloads**:
```javascript
// Attempt 1: Role modification
{
  "id": 1,
  "name": "Test User",
  "role": "admin",
  "isAdmin": true
}

// Attempt 2: Extra privileges
{
  "id": 1,
  "permissions": ["read", "write", "delete", "admin"]
}
```

---

### Exercise 13: Business Logic Testing
**Goal**: Application logic vulnerabilities

**Scenario**:
E-commerce API میں price manipulation

**Tasks**:
1. Product create کریں
2. Price field negative number بھیجیں
3. Quantity 0 یا negative بھیجیں
4. Discount 100% سے زیادہ بھیجیں

**Test Data**:
```javascript
{
  "productId": 123,
  "quantity": -1,
  "price": -10.00,
  "discount": 150
}
```

---

### Exercise 14: Race Condition Testing
**Goal**: Concurrent requests کی testing

**Scenario**:
ایک ہی resource پر multiple simultaneous requests

**Task**:
```javascript
// Simulate race condition
const promises = [];
for (let i = 0; i < 10; i++) {
  promises.push(
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Race condition test',
        body: 'Testing concurrent requests',
        userId: 1
      })
    })
  );
}

Promise.all(promises).then(responses => {
  console.log('All requests completed');
  responses.forEach((res, i) => {
    console.log(`Request ${i + 1}: ${res.status}`);
  });
});
```

---

## Real-World Scenarios 🌍

### Exercise 15: Full Security Assessment
**Goal**: Complete API security audit

**Target**: https://jsonplaceholder.typicode.com

**Checklist**:
- [ ] All endpoints discover کریں
- [ ] Authentication mechanism check کریں
- [ ] IDOR vulnerabilities test کریں
- [ ] Rate limiting verify کریں
- [ ] CORS policy check کریں
- [ ] Error handling analyze کریں
- [ ] Input validation test کریں
- [ ] HTTP methods enumerate کریں
- [ ] Response headers review کریں
- [ ] Documentation review کریں

**Deliverable**:
ایک detailed report بنائیں:
1. Findings summary
2. Vulnerability details
3. Risk ratings
4. Recommendations

---

## Bonus Challenges 🎁

### Challenge 1: API Fuzzing
Random/malformed inputs بھیج کر API کو test کریں

### Challenge 2: Token Manipulation
JWT tokens decode اور modify کریں (jwt.io استعمال کریں)

### Challenge 3: GraphQL Testing
GraphQL endpoints کی introspection queries test کریں

### Challenge 4: Mobile API Testing
Mobile app کے API calls intercept کریں (Burp Suite استعمال کریں)

---

## Practice Tips 💡

1. **Start Simple**: Basic exercises سے شروع کریں
2. **Document Everything**: Findings note کریں
3. **Understand Why**: ہر vulnerability کی وجہ سمجھیں
4. **Be Ethical**: صرف authorized testing کریں
5. **Learn Tools**: Burp Suite, Postman سیکھیں
6. **Read Docs**: API documentation thoroughly پڑھیں
7. **Network Tab**: Browser DevTools استعمال کریں
8. **Error Messages**: Carefully analyze کریں

---

## Submission Template 📝

ہر exercise کے لیے:

```markdown
## Exercise [Number]: [Name]

### Approach:
[آپ نے کیا strategy استعمال کی]

### Code:
```javascript
// آپ کا code
```

### Results:
[کیا discover کیا]

### Vulnerabilities Found:
- [Vulnerability 1]
- [Vulnerability 2]

### Lessons Learned:
[کیا سیکھا]

### Real-World Impact:
[Production میں یہ کتنا خطرناک ہو سکتا ہے]
```

---

## Additional Resources 📚

- OWASP API Security Top 10
- PortSwigger Web Security Academy
- HackerOne Reports
- Bug Bounty Platforms
- API Security Best Practices

---

Happy Learning & Testing! 🚀
Remember: **Ethical Hacking Only!** ⚠️
