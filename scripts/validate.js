#!/usr/bin/env node

/**
 * API Security Learning Platform
 * Project Validator & Health Check
 */

const fs = require('fs');
const path = require('path');

console.log('\n===========================================');
console.log('🔍 API Security Learning Platform');
console.log('   Project Structure Validator');
console.log('===========================================\n');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function checkFile(filePath, description) {
  const exists = fs.existsSync(filePath);
  const status = exists ? '✓' : '✗';
  const color = exists ? colors.green : colors.red;
  console.log(`${color}${status}${colors.reset} ${description}`);
  return exists;
}

function checkDirectory(dirPath, description) {
  const exists = fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  const status = exists ? '✓' : '✗';
  const color = exists ? colors.green : colors.red;
  console.log(`${color}${status}${colors.reset} ${description}`);
  return exists;
}

let totalChecks = 0;
let passedChecks = 0;

console.log(`${colors.cyan}Checking Core Files...${colors.reset}`);
totalChecks++; if (checkFile('package.json', 'package.json exists')) passedChecks++;
totalChecks++; if (checkFile('tsconfig.json', 'tsconfig.json exists')) passedChecks++;
totalChecks++; if (checkFile('next.config.js', 'next.config.js exists')) passedChecks++;
totalChecks++; if (checkFile('.gitignore', '.gitignore exists')) passedChecks++;
totalChecks++; if (checkFile('.eslintrc.json', '.eslintrc.json exists')) passedChecks++;

console.log(`\n${colors.cyan}Checking App Structure...${colors.reset}`);
totalChecks++; if (checkDirectory('app', 'app/ directory exists')) passedChecks++;
totalChecks++; if (checkFile('app/page.tsx', 'app/page.tsx exists')) passedChecks++;
totalChecks++; if (checkFile('app/layout.tsx', 'app/layout.tsx exists')) passedChecks++;
totalChecks++; if (checkFile('app/globals.css', 'app/globals.css exists')) passedChecks++;

console.log(`\n${colors.cyan}Checking API Routes...${colors.reset}`);
totalChecks++; if (checkDirectory('app/api', 'app/api/ directory exists')) passedChecks++;
totalChecks++; if (checkFile('app/api/content/route.ts', 'Content API route exists')) passedChecks++;
totalChecks++; if (checkFile('app/api/proxy/route.ts', 'Proxy API route exists')) passedChecks++;

console.log(`\n${colors.cyan}Checking Libraries...${colors.reset}`);
totalChecks++; if (checkDirectory('lib', 'lib/ directory exists')) passedChecks++;
totalChecks++; if (checkFile('lib/contentStructure.ts', 'Content structure exists')) passedChecks++;
totalChecks++; if (checkFile('lib/theme.ts', 'Theme configuration exists')) passedChecks++;

console.log(`\n${colors.cyan}Checking Documentation...${colors.reset}`);
totalChecks++; if (checkFile('README.md', 'README.md exists')) passedChecks++;
totalChecks++; if (checkFile('QUICKSTART.md', 'QUICKSTART.md exists')) passedChecks++;
totalChecks++; if (checkFile('DOCUMENTATION.md', 'DOCUMENTATION.md exists')) passedChecks++;
totalChecks++; if (checkDirectory('docs', 'docs/ directory exists')) passedChecks++;
totalChecks++; if (checkFile('docs/WINDOWS-SETUP.md', 'Windows Setup guide exists')) passedChecks++;
totalChecks++; if (checkFile('docs/TESTING-CHEATSHEET.md', 'Testing cheatsheet exists')) passedChecks++;
totalChecks++; if (checkFile('docs/PRACTICE-EXERCISES.md', 'Practice exercises exist')) passedChecks++;

console.log(`\n${colors.cyan}Checking Examples...${colors.reset}`);
totalChecks++; if (checkDirectory('examples', 'examples/ directory exists')) passedChecks++;
totalChecks++; if (checkFile('examples/api-testing-examples.js', 'API testing examples exist')) passedChecks++;

console.log(`\n${colors.cyan}Checking Scripts...${colors.reset}`);
totalChecks++; if (checkDirectory('scripts', 'scripts/ directory exists')) passedChecks++;
totalChecks++; if (checkFile('scripts/helper.ps1', 'PowerShell helper script exists')) passedChecks++;
totalChecks++; if (checkFile('start.bat', 'Batch launcher exists')) passedChecks++;

console.log(`\n${colors.cyan}Checking Content Directories...${colors.reset}`);
totalChecks++; if (checkDirectory('Bunyadi Maloomat', 'Bunyadi Maloomat/ exists')) passedChecks++;
totalChecks++; if (checkDirectory('Shurwati Hamle', 'Shurwati Hamle/ exists')) passedChecks++;
totalChecks++; if (checkDirectory('Hamlon Ki Iqsam', 'Hamlon Ki Iqsam/ exists')) passedChecks++;

// Check if node_modules exists
console.log(`\n${colors.cyan}Checking Dependencies...${colors.reset}`);
const nodeModulesExists = fs.existsSync('node_modules');
if (nodeModulesExists) {
  console.log(`${colors.green}✓${colors.reset} node_modules/ exists (dependencies installed)`);
} else {
  console.log(`${colors.yellow}!${colors.reset} node_modules/ not found (run: npm install)`);
}

// Summary
console.log('\n===========================================');
console.log('Summary:');
console.log('===========================================');
console.log(`Total Checks: ${totalChecks}`);
console.log(`${colors.green}Passed: ${passedChecks}${colors.reset}`);
console.log(`${colors.red}Failed: ${totalChecks - passedChecks}${colors.reset}`);

const percentage = ((passedChecks / totalChecks) * 100).toFixed(1);
console.log(`Success Rate: ${percentage}%`);

if (passedChecks === totalChecks) {
  console.log(`\n${colors.green}✓ All checks passed! Project is ready.${colors.reset}`);
  
  if (!nodeModulesExists) {
    console.log(`\n${colors.yellow}⚠ Next step: Run 'npm install' to install dependencies${colors.reset}`);
  } else {
    console.log(`\n${colors.green}✓ Ready to start! Run 'npm run dev' to start the server${colors.reset}`);
  }
} else {
  console.log(`\n${colors.red}✗ Some checks failed. Please review the issues above.${colors.reset}`);
}

console.log('\n===========================================\n');

// Exit with appropriate code
process.exit(passedChecks === totalChecks ? 0 : 1);
