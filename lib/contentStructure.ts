export interface Topic {
  id: string;
  title: string;
  file: string;
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  topics: Topic[];
}

export interface Section {
  id: string;
  title: string;
  categories: Category[];
}

export const contentStructure: Section[] = [
  {
    id: 'bunyadi-maloomat',
    title: 'Bunyadi Maloomat (Basic Information)',
    categories: [
      {
        id: 'api-ki-pehchan',
        title: 'API Ki Pehchan (API Recognition)',
        icon: '🔍',
        topics: [
          { id: 'api-kya-hai', title: 'API Kya Hai? (What is API?)', file: 'Bunyadi Maloomat/API Ki Pehchan/API-Kya-Hai.html' },
          { id: 'restful-apis', title: 'RESTful APIs', file: 'Bunyadi Maloomat/API Ki Pehchan/RESTful-APIs.html' },
          { id: 'graphql-apis', title: 'GraphQL APIs', file: 'Bunyadi Maloomat/API Ki Pehchan/GraphQL-APIs.html' },
          { id: 'soap-apis', title: 'SOAP APIs', file: 'Bunyadi Maloomat/API Ki Pehchan/SOAP-APIs.html' },
          { id: 'http-methods', title: 'HTTP Methods', file: 'Bunyadi Maloomat/API Ki Pehchan/HTTP-Methods.html' },
          { id: 'api-endpoints', title: 'API Endpoints', file: 'Bunyadi Maloomat/API Ki Pehchan/API-Endpoints.html' },
          { id: 'web-services', title: 'Web Services Types', file: 'Bunyadi Maloomat/API Ki Pehchan/Web-Services-Types.html' },
        ]
      },
      {
        id: 'http-protocol',
        title: 'HTTP Protocol',
        icon: '🌐',
        topics: [
          { id: 'request-response', title: 'Request-Response', file: 'Bunyadi Maloomat/HTTP Protocol/Request-Response.html' },
          { id: 'status-codes', title: 'Status Codes', file: 'Bunyadi Maloomat/HTTP Protocol/Status-Codes.html' },
          { id: 'headers', title: 'Headers Ki Ahmiyat (Importance of Headers)', file: 'Bunyadi Maloomat/HTTP Protocol/Headers-Ki-Ahmiyat.html' },
          { id: 'auth-methods', title: 'Authentication Methods', file: 'Bunyadi Maloomat/HTTP Protocol/Authentication-Methods.html' },
          { id: 'cookies-sessions', title: 'Cookies & Sessions', file: 'Bunyadi Maloomat/HTTP Protocol/Cookies-Sessions.html' },
          { id: 'tls-ssl', title: 'TLS/SSL', file: 'Bunyadi Maloomat/HTTP Protocol/TLS-SSL.html' },
          { id: 'proxy-servers', title: 'Proxy Servers', file: 'Bunyadi Maloomat/HTTP Protocol/Proxy-Servers.html' },
        ]
      }
    ]
  },
  {
    id: 'shurwati-hamle',
    title: 'Shurwati Hamle (Initial Attacks)',
    categories: [
      {
        id: 'maloomat-jama-karna',
        title: 'Maloomat Jama Karna (Information Gathering)',
        icon: '🔎',
        topics: [
          { id: 'api-documentation', title: 'API Documentation Parhna (Reading Documentation)', file: 'Shurwati Hamle/Maloomat Jama Karna/API-Documentation-Padhna.html' },
          { id: 'google-dorking', title: 'Google Dorking', file: 'Shurwati Hamle/Maloomat Jama Karna/Google-Dorking.html' },
          { id: 'shodan', title: 'Shodan Istemal (Using Shodan)', file: 'Shurwati Hamle/Maloomat Jama Karna/Shodan-Istemal.html' },
          { id: 'wayback-machine', title: 'Wayback Machine Istemal (Using Wayback)', file: 'Shurwati Hamle/Maloomat Jama Karna/Wayback-Machine-Istemal.html' },
          { id: 'subdomain-enum', title: 'Subdomain Enumeration', file: 'Shurwati Hamle/Maloomat Jama Karna/Subdomain-Enumeration.html' },
          { id: 'directory-brute', title: 'Directory Brute-Forcing', file: 'Shurwati Hamle/Maloomat Jama Karna/Directory-Brute-Forcing.html' },
          { id: 'burp-suite', title: 'Burp Suite Ka Istemal (Using Burp Suite)', file: 'Shurwati Hamle/Maloomat Jama Karna/Burp-Suite-Ka-Istemal.html' },
        ]
      },
      {
        id: 'auth-bypass',
        title: 'Authentication Bypass',
        icon: '🔓',
        topics: [
          { id: 'weak-credentials', title: 'Weak Credentials', file: 'Shurwati Hamle/Authentication Bypass/Weak-Credentials.html' },
          { id: 'default-passwords', title: 'Default Passwords', file: 'Shurwati Hamle/Authentication Bypass/Default-Passwords.html' },
          { id: 'brute-force', title: 'Brute-Force Attacks', file: 'Shurwati Hamle/Authentication Bypass/Brute-Force-Attacks.html' },
          { id: 'broken-auth', title: 'Broken Authentication Logic', file: 'Shurwati Hamle/Authentication Bypass/Broken-Authentication-Logic.html' },
          { id: 'session-token', title: 'Session Token Manipulation', file: 'Shurwati Hamle/Authentication Bypass/Session-Token-Manipulation.html' },
          { id: 'api-keys', title: 'API Keys Compromise', file: 'Shurwati Hamle/Authentication Bypass/API-Keys-Compromise.html' },
          { id: 'otp-bypass', title: 'OTP Bypass', file: 'Shurwati Hamle/Authentication Bypass/OTP-Bypass.html' },
        ]
      }
    ]
  },
  {
    id: 'hamlon-ki-iqsam',
    title: 'Hamlon Ki Iqsam (Attack Types)',
    categories: [
      {
        id: 'broken-access-control',
        title: 'Broken Access Control',
        icon: '🚫',
        topics: [
          { id: 'idor', title: 'IDOR - Insecure Direct Object References', file: 'Hamlon Ki Iqsam/Broken Access Control/IDOR-Insecure-Direct-Object-References.html' },
          { id: 'horizontal-priv-esc', title: 'Horizontal Privilege Escalation', file: 'Hamlon Ki Iqsam/Broken Access Control/Horizontal-Privilege-Escalation.html' },
          { id: 'vertical-priv-esc', title: 'Vertical Privilege Escalation', file: 'Hamlon Ki Iqsam/Broken Access Control/Vertical-Privilege-Escalation.html' },
          { id: 'param-tampering', title: 'Parameter Tampering', file: 'Hamlon Ki Iqsam/Broken Access Control/Parameter-Tampering.html' },
          { id: 'missing-function-level', title: 'Missing Function Level Access', file: 'Hamlon Ki Iqsam/Broken Access Control/Missing-Function-Level-Access.html' },
        ]
      }
    ]
  }
];
