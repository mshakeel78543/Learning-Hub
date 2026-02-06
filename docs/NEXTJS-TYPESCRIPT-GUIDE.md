# Next.js 14 with TypeScript - Complete Guide 🚀

## Table of Contents
1. [Installation & Setup](#installation--setup)
2. [Project Structure](#project-structure)
3. [App Router (Next.js 14)](#app-router)
4. [TypeScript Configuration](#typescript-configuration)
5. [API Routes](#api-routes)
6. [Components](#components)
7. [Styling](#styling)
8. [Best Practices](#best-practices)

---

## Installation & Setup

### 1. Create New Next.js Project
```bash
npx create-next-app@latest my-app --typescript
cd my-app
npm run dev
```

### 2. Manual Setup (Our Project)
```bash
npm install next@latest react@latest react-dom@latest typescript @types/react @types/node
```

### 3. Required Files

**package.json** - Minimum dependencies:
```json
{
  "name": "my-nextjs-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.19",
    "@types/react": "^18.2.55",
    "@types/react-dom": "^18.2.19",
    "typescript": "^5.3.3"
  }
}
```

**tsconfig.json** - TypeScript config:
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**next.config.js** - Next.js config:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
```

---

## Project Structure

### Next.js 14 App Router Structure
```
my-app/
├── app/                          # App Router (Next.js 14)
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   ├── api/                     # API routes
│   │   └── hello/
│   │       └── route.ts         # API endpoint
│   ├── dashboard/               # Dashboard page
│   │   ├── page.tsx            # /dashboard route
│   │   └── layout.tsx          # Dashboard layout
│   └── about/
│       └── page.tsx            # /about route
│
├── components/                   # React components
│   ├── Header.tsx
│   └── Footer.tsx
│
├── lib/                         # Utility functions
│   ├── utils.ts
│   └── api.ts
│
├── types/                       # TypeScript types
│   └── index.ts
│
├── public/                      # Static files
│   ├── images/
│   └── favicon.ico
│
├── package.json
├── tsconfig.json
├── next.config.js
└── .gitignore
```

---

## App Router (Next.js 14)

### 1. Root Layout (`app/layout.tsx`)
```typescript
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'My Next.js App',
  description: 'Created with Next.js 14 and TypeScript',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### 2. Home Page (`app/page.tsx`)
```typescript
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>Welcome to Next.js 14!</h1>
      <Link href="/dashboard">Go to Dashboard</Link>
    </main>
  )
}
```

### 3. Dynamic Routes (`app/blog/[slug]/page.tsx`)
```typescript
interface PageProps {
  params: {
    slug: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default function BlogPost({ params, searchParams }: PageProps) {
  return (
    <div>
      <h1>Blog Post: {params.slug}</h1>
    </div>
  )
}

// Generate static params for SSG
export async function generateStaticParams() {
  return [
    { slug: 'post-1' },
    { slug: 'post-2' },
  ]
}
```

### 4. Loading States (`app/dashboard/loading.tsx`)
```typescript
export default function Loading() {
  return <div>Loading...</div>
}
```

### 5. Error Handling (`app/error.tsx`)
```typescript
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

---

## API Routes

### REST API Route (`app/api/users/route.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server'

// GET /api/users
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
  ]
  
  return NextResponse.json({ users })
}

// POST /api/users
export async function POST(request: NextRequest) {
  const body = await request.json()
  
  // Process data
  const newUser = {
    id: Date.now(),
    ...body
  }
  
  return NextResponse.json(newUser, { status: 201 })
}
```

### Dynamic API Route (`app/api/users/[id]/route.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  const id = params.id
  
  // Fetch user by ID
  const user = { id, name: 'John Doe' }
  
  return NextResponse.json(user)
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  const id = params.id
  
  // Delete user
  return NextResponse.json({ message: 'User deleted' })
}
```

---

## TypeScript Configuration

### 1. Type Definitions (`types/index.ts`)
```typescript
// User types
export interface User {
  id: number
  name: string
  email: string
  createdAt: Date
}

// API Response types
export interface ApiResponse<T> {
  data: T
  error?: string
  success: boolean
}

// Component Props
export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

// Page Props (Next.js 14)
export interface PageProps<T = {}> {
  params: T
  searchParams: { [key: string]: string | string[] | undefined }
}
```

### 2. Using Types in Components
```typescript
import { User, ButtonProps } from '@/types'

// Component with typed props
export default function UserCard({ user }: { user: User }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  )
}

// Button component
export function Button({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false 
}: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={variant}
    >
      {children}
    </button>
  )
}
```

### 3. Async Data Fetching
```typescript
// Server Component (default in Next.js 14)
async function getUser(id: string): Promise<User> {
  const res = await fetch(`https://api.example.com/users/${id}`)
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

export default async function UserPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const user = await getUser(params.id)
  
  return <UserCard user={user} />
}
```

---

## Components

### 1. Server Components (Default)
```typescript
// app/components/Header.tsx
import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  )
}
```

### 2. Client Components
```typescript
'use client' // Required for client-side features

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}
```

### 3. Custom Hooks
```typescript
// hooks/useUser.ts
'use client'

import { useState, useEffect } from 'react'
import { User } from '@/types'

export function useUser(id: string) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then(res => res.json())
      .then(data => {
        setUser(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])
  
  return { user, loading, error }
}
```

---

## Styling

### 1. CSS Modules
```typescript
// components/Button.module.css
.button {
  padding: 10px 20px;
  border-radius: 4px;
}

.primary {
  background: blue;
  color: white;
}

// components/Button.tsx
import styles from './Button.module.css'

export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className={`${styles.button} ${styles.primary}`}>
      {children}
    </button>
  )
}
```

### 2. Tailwind CSS
```typescript
// Install: npm install -D tailwindcss postcss autoprefixer
// npx tailwindcss init -p

// components/Card.tsx
export default function Card({ title, content }: { title: string; content: string }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-gray-600">{content}</p>
    </div>
  )
}
```

---

## Best Practices

### 1. File Organization
```
✅ Good:
app/
├── (auth)/          # Route group
│   ├── login/
│   └── register/
├── (dashboard)/
│   ├── profile/
│   └── settings/

❌ Avoid:
app/
├── login.tsx        # Don't put pages at root
├── register.tsx
```

### 2. Data Fetching
```typescript
// ✅ Server Component (Recommended)
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store' // or 'force-cache'
  })
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <div>{data.title}</div>
}

// ❌ Client Component (Only when needed)
'use client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch('/api/data').then(/* ... */)
  }, [])
  return <div>{data?.title}</div>
}
```

### 3. Environment Variables
```typescript
// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://...

// Usage
const apiUrl = process.env.NEXT_PUBLIC_API_URL
const dbUrl = process.env.DATABASE_URL // Only available server-side
```

### 4. TypeScript Strict Mode
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

---

## Common Patterns

### 1. Layout with Header/Footer
```typescript
// app/layout.tsx
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

### 2. Protected Routes
```typescript
// app/dashboard/layout.tsx
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/login')
  }
  
  return <div>{children}</div>
}
```

### 3. Form Handling
```typescript
'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    
    const data = await response.json()
    console.log(data)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <button type="submit">Submit</button>
    </form>
  )
}
```

---

## Performance Optimization

### 1. Image Optimization
```typescript
import Image from 'next/image'

export default function Profile() {
  return (
    <Image
      src="/profile.jpg"
      alt="Profile"
      width={500}
      height={500}
      priority // Load immediately
    />
  )
}
```

### 2. Font Optimization
```typescript
import { Inter, Roboto } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

### 3. Code Splitting
```typescript
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('@/components/Heavy'), {
  loading: () => <p>Loading...</p>,
  ssr: false // Client-side only
})

export default function Page() {
  return <DynamicComponent />
}
```

---

## Debugging

### 1. Console Logging
```typescript
// Server Component logs appear in terminal
console.log('Server log:', data)

// Client Component logs appear in browser
'use client'
console.log('Client log:', data)
```

### 2. Error Boundaries
```typescript
// app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  console.error('Error:', error)
  
  return (
    <div>
      <h2>Error: {error.message}</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

---

**Next**: Check `VERCEL-DEPLOYMENT.md` for deployment guide!
