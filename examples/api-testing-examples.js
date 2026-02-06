// API Testing Examples - Practice کے لیے مثالیں

/**
 * مثال 1: Basic GET Request
 * کسی API سے data fetch کرنا
 */
async function basicGetRequest() {
  const url = 'https://jsonplaceholder.typicode.com/users';
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('Users:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

/**
 * مثال 2: GET Request with Parameters
 * Query parameters کے ساتھ request
 */
async function getWithParams() {
  const baseUrl = 'https://jsonplaceholder.typicode.com/posts';
  const userId = 1;
  const url = `${baseUrl}?userId=${userId}`;
  
  try {
    const response = await fetch(url);
    const posts = await response.json();
    console.log(`User ${userId} Posts:`, posts);
    return posts;
  } catch (error) {
    console.error('Error:', error);
  }
}

/**
 * مثال 3: POST Request
 * نیا data create کرنا
 */
async function createPost() {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  
  const newPost = {
    title: 'API Security Learning',
    body: 'Learning how to test APIs',
    userId: 1
  };
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost)
    });
    
    const data = await response.json();
    console.log('Created Post:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

/**
 * مثال 4: PUT Request
 * Existing data کو update کرنا
 */
async function updatePost() {
  const postId = 1;
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
  
  const updatedPost = {
    id: postId,
    title: 'Updated Title',
    body: 'Updated content',
    userId: 1
  };
  
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPost)
    });
    
    const data = await response.json();
    console.log('Updated Post:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

/**
 * مثال 5: DELETE Request
 * Data کو delete کرنا
 */
async function deletePost() {
  const postId = 1;
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
  
  try {
    const response = await fetch(url, {
      method: 'DELETE'
    });
    
    console.log('Delete Status:', response.status);
    console.log('Delete Successful:', response.ok);
    return response.ok;
  } catch (error) {
    console.error('Error:', error);
  }
}

/**
 * مثال 6: Authentication Header
 * Bearer token کے ساتھ request
 */
async function authenticatedRequest() {
  const url = 'https://httpbin.org/bearer';
  const token = 'your_token_here';
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    console.log('Authenticated Response:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

/**
 * مثال 7: Custom Headers
 * Multiple custom headers کے ساتھ request
 */
async function requestWithHeaders() {
  const url = 'https://httpbin.org/headers';
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Custom-Header': 'CustomValue',
        'X-API-Key': 'test_api_key',
        'User-Agent': 'API-Learning-Platform',
        'Accept': 'application/json'
      }
    });
    
    const data = await response.json();
    console.log('Headers Echo:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

/**
 * مثال 8: Error Handling
 * Proper error handling کی practice
 */
async function robustRequest() {
  const url = 'https://jsonplaceholder.typicode.com/users/999999';
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Data:', data);
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error('Network Error:', error.message);
    } else {
      console.error('Error:', error.message);
    }
    return null;
  }
}

/**
 * مثال 9: Async/Await with Multiple Requests
 * Multiple APIs کو parallel میں call کرنا
 */
async function multipleRequests() {
  const urls = [
    'https://jsonplaceholder.typicode.com/users/1',
    'https://jsonplaceholder.typicode.com/users/2',
    'https://jsonplaceholder.typicode.com/users/3'
  ];
  
  try {
    const promises = urls.map(url => fetch(url).then(res => res.json()));
    const results = await Promise.all(promises);
    
    console.log('All Users:', results);
    return results;
  } catch (error) {
    console.error('Error:', error);
  }
}

/**
 * مثال 10: Timeout Implementation
 * Request timeout set کرنا
 */
async function requestWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      signal: controller.signal
    });
    clearTimeout(id);
    
    const data = await response.json();
    console.log('Data:', data);
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Request Timeout!');
    } else {
      console.error('Error:', error);
    }
    return null;
  }
}

/**
 * مثال 11: IDOR Testing Example
 * Insecure Direct Object Reference کی testing
 */
async function testIDOR() {
  // مثال: User IDs کو iterate کرنا
  for (let userId = 1; userId <= 5; userId++) {
    const url = `https://jsonplaceholder.typicode.com/users/${userId}`;
    
    try {
      const response = await fetch(url);
      const userData = await response.json();
      
      console.log(`User ${userId}:`, userData.name);
      // Note: یہ صرف learning کے لیے ہے، real applications پر unauthorized testing نہ کریں
    } catch (error) {
      console.error(`Error for user ${userId}:`, error);
    }
  }
}

/**
 * مثال 12: Rate Limiting Test
 * API rate limits کی testing
 */
async function testRateLimit() {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const requests = 10; // 10 rapid requests
  
  console.log(`Sending ${requests} rapid requests...`);
  
  for (let i = 1; i <= requests; i++) {
    try {
      const startTime = Date.now();
      const response = await fetch(url);
      const endTime = Date.now();
      
      console.log(`Request ${i}: Status ${response.status}, Time: ${endTime - startTime}ms`);
    } catch (error) {
      console.error(`Request ${i} failed:`, error);
    }
  }
}

// Testing Functions کو run کرنے کے لیے uncomment کریں:
// basicGetRequest();
// getWithParams();
// createPost();
// updatePost();
// deletePost();
// authenticatedRequest();
// requestWithHeaders();
// robustRequest();
// multipleRequests();
// requestWithTimeout('https://jsonplaceholder.typicode.com/users/1', 5000);
// testIDOR();
// testRateLimit();

/**
 * Axios کے ساتھ Examples (agar axios install ہو)
 */

// مثال: Axios GET Request
async function axiosGetExample() {
  // Note: یہ code tab run ہوگا جب axios available ہو
  const axios = require('axios'); // یا import axios from 'axios';
  
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    console.log('Users:', response.data);
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
  } catch (error) {
    console.error('Error:', error.response?.status, error.message);
  }
}

// مثال: Axios POST Request
async function axiosPostExample() {
  const axios = require('axios');
  
  const postData = {
    title: 'New Post',
    body: 'Content here',
    userId: 1
  };
  
  try {
    const response = await axios.post(
      'https://jsonplaceholder.typicode.com/posts',
      postData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Created:', response.data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * Security Testing Tips:
 * 
 * 1. IDOR Testing:
 *    - Sequential IDs test کریں (1, 2, 3, ...)
 *    - GUIDs try کریں
 *    - Other users کا data access کرنے کی کوشش کریں
 * 
 * 2. Authentication Bypass:
 *    - Tokens remove کر کے test کریں
 *    - Expired tokens test کریں
 *    - Invalid tokens try کریں
 * 
 * 3. Parameter Tampering:
 *    - URL parameters modify کریں
 *    - Body parameters change کریں
 *    - Extra parameters add کریں
 * 
 * 4. Rate Limiting:
 *    - Rapid requests بھیجیں
 *    - Response times monitor کریں
 *    - 429 status codes دیکھیں
 * 
 * 5. Error Messages:
 *    - Invalid input بھیجیں
 *    - Error responses analyze کریں
 *    - Stack traces دیکھیں (production میں نہیں honi chahiye)
 * 
 * ⚠️ IMPORTANT: صرف authorized applications پر testing کریں!
 */

console.log('API Examples loaded! اوپر دیے گئے functions کو uncomment کر کے run کریں۔');
