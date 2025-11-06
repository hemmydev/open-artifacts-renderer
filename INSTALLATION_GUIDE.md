# Complete Installation & Build Guide for Open Artifacts Renderer

> **A beginner-friendly guide to get the project running on your machine**

This guide assumes you're starting from scratch with no prior Node.js or React experience.

---

## Table of Contents
1. [Install Node.js](#1-install-nodejs)
2. [Install pnpm Package Manager](#2-install-pnpm-package-manager)
3. [Clone the Repository](#3-clone-the-repository)
4. [Install Project Dependencies](#4-install-project-dependencies)
5. [Run Development Server](#5-run-development-server)
6. [Build for Production](#6-build-for-production)
7. [Understanding the Project](#7-understanding-the-project)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Install Node.js

Node.js is a JavaScript runtime that allows you to run JavaScript code outside of a browser. We need it to run React and Next.js.

### Option A: Using Official Installer (Recommended for Beginners)

#### **Windows:**
1. Visit https://nodejs.org/
2. Download the **LTS (Long Term Support)** version
3. Run the installer (`.msi` file)
4. Follow the installation wizard:
   - Accept the license agreement
   - Use default installation path
   - **Important:** Make sure "Add to PATH" is checked
5. Click "Install" and wait for completion

#### **macOS:**
1. Visit https://nodejs.org/
2. Download the **LTS** version for macOS
3. Open the downloaded `.pkg` file
4. Follow the installation wizard
5. Click "Install" and enter your password when prompted

#### **Linux (Ubuntu/Debian):**
```bash
# Update package index
sudo apt update

# Install Node.js LTS (v20.x)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### Option B: Using Node Version Manager (nvm) - For Advanced Users

**Why use nvm?** It lets you easily switch between different Node.js versions.

#### **macOS/Linux:**
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Close and reopen your terminal, then:
nvm install --lts
nvm use --lts
```

#### **Windows:**
1. Download nvm-windows from: https://github.com/coreybutler/nvm-windows/releases
2. Install `nvm-setup.exe`
3. Open Command Prompt as Administrator:
```cmd
nvm install lts
nvm use lts
```

### Verify Node.js Installation

Open a **new** terminal/command prompt and run:

```bash
node --version
# Should output something like: v20.11.0

npm --version
# Should output something like: 10.2.4
```

✅ If you see version numbers, Node.js is installed correctly!

---

## 2. Install pnpm Package Manager

**What is pnpm?** It's a fast, disk-space efficient package manager (alternative to npm).

### Why pnpm?
- ⚡ Faster than npm and yarn
- 💾 Saves disk space by sharing packages across projects
- 🔒 Stricter dependency management

### Installation Methods

#### **Using npm (Simplest):**
```bash
npm install -g pnpm
```

#### **Using Standalone Script:**

**Windows (PowerShell):**
```powershell
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

**macOS/Linux:**
```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

### Verify pnpm Installation

```bash
pnpm --version
# Should output something like: 8.15.0
```

✅ pnpm is ready to use!

---

## 3. Clone the Repository

**What is cloning?** Downloading a copy of the project from GitHub to your computer.

### Prerequisites
- Install Git: https://git-scm.com/downloads
- Verify: `git --version`

### Clone the Project

```bash
# Navigate to where you want the project
# For example, your Documents folder:
cd ~/Documents  # macOS/Linux
cd %USERPROFILE%\Documents  # Windows

# Clone the repository
git clone https://github.com/hemmydev/open-artifacts-renderer.git

# Enter the project directory
cd open-artifacts-renderer

# Check that you're on the correct branch
git branch
# You should see: claude/rewrite-app-modern-011CUrDmeZDbLkr5Q5t8sQSo

# If not, switch to it:
git checkout claude/rewrite-app-modern-011CUrDmeZDbLkr5Q5t8sQSo
```

---

## 4. Install Project Dependencies

**What are dependencies?** External libraries and packages that the project needs to run (React, Next.js, etc.).

### Install All Dependencies

```bash
# Make sure you're in the project directory
pwd  # Should show: .../open-artifacts-renderer

# Install dependencies (this may take 1-3 minutes)
pnpm install
```

**What happens during installation:**
- pnpm reads `package.json` to see what packages are needed
- Downloads ~516 packages to `node_modules/` folder
- Creates a `pnpm-lock.yaml` file (tracks exact versions)

### Expected Output

```
Packages: +515
++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 516, reused 0, downloaded 515, added 515, done

dependencies:
+ @babel/standalone 7.24.7
+ @hookform/resolvers 3.9.0
+ html2canvas 1.4.1
...
(many more packages)

Done in 45.2s
```

✅ All dependencies installed!

---

## 5. Run Development Server

**What is the dev server?** A local web server that runs on your computer, letting you see the app in your browser with live updates.

### Start the Development Server

```bash
pnpm dev
```

### Expected Output

```
> open-artifacts-renderer@0.1.0 dev
> next dev

  ▲ Next.js 14.2.4
  - Local:        http://localhost:3000
  - Environments: .env

 ✓ Ready in 2.5s
```

### View the Application

1. Open your web browser
2. Go to: **http://localhost:3000**
3. You should see a blank page (this is normal - the app renders components sent via postMessage)

### Understanding the Dev Server

- **Hot Reload:** Changes you make to code automatically refresh in the browser
- **Port 3000:** Default port for Next.js (can be changed)
- **Stop Server:** Press `Ctrl + C` in the terminal

### Change the Port (Optional)

If port 3000 is already in use:

```bash
pnpm dev -- --port 3001
# App will run on http://localhost:3001
```

---

## 6. Build for Production

**What is a production build?** An optimized version of your app ready for deployment.

### Create Production Build

```bash
# Stop the dev server first (Ctrl + C)

# Build the application
pnpm build
```

### Expected Output

```
> open-artifacts-renderer@0.1.0 build
> next build

  ▲ Next.js 14.2.4

   Creating an optimized production build ...
 ✓ Compiled successfully
   Linting and checking validity of types ...
   Collecting page data ...
   Generating static pages (5/5) ...
 ✓ Generating static pages (5/5)
   Finalizing page optimization ...

Route (app)                              Size     First Load JS
┌ ○ /                                    1.1 MB         1.18 MB
└ ○ /_not-found                          875 B          88.2 kB

○  (Static)  prerendered as static content
```

✅ Build successful!

### Run Production Build Locally

```bash
pnpm start
# Runs on http://localhost:3000
```

### Build Artifacts

The build creates a `.next/` folder containing:
- Compiled JavaScript bundles
- Optimized static assets
- Server-side rendering code

---

## 7. Understanding the Project

### Project Structure

```
open-artifacts-renderer/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Main page (22 lines - very clean!)
│   ├── layout.tsx           # Root layout wrapper
│   └── globals.css          # Global styles
│
├── lib/                      # Core logic and utilities
│   ├── transform.ts         # Babel code transformation
│   ├── capture.ts           # Screenshot functionality
│   ├── types.ts             # TypeScript type definitions
│   ├── utils.ts             # Utility functions (cn for Tailwind)
│   └── hooks/               # Custom React hooks
│       ├── useComponentRenderer.ts
│       └── useParentMessaging.ts
│
├── components/               # React components
│   └── ui/                  # shadcn/ui component library (46 components)
│
├── public/                   # Static assets (images, fonts, etc.)
│
├── package.json              # Project metadata & dependencies
├── pnpm-lock.yaml           # Locked dependency versions
├── tsconfig.json            # TypeScript configuration
├── next.config.mjs          # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── components.json          # shadcn/ui configuration
```

### Key Technologies

| Technology | Purpose | Learn More |
|------------|---------|------------|
| **Next.js 14** | React framework for production | https://nextjs.org/docs |
| **React 18** | UI library for building components | https://react.dev |
| **TypeScript** | Type-safe JavaScript | https://www.typescriptlang.org/docs |
| **Tailwind CSS** | Utility-first CSS framework | https://tailwindcss.com/docs |
| **shadcn/ui** | Beautiful, accessible components | https://ui.shadcn.com |
| **Babel** | JavaScript compiler | https://babeljs.io/docs |
| **html2canvas** | Screenshot/capture library | https://html2canvas.hertzen.com |

### How the App Works

1. **Iframe Communication:** App runs in an iframe and communicates with parent via `postMessage`
2. **Dynamic Rendering:** Receives React component code as a string
3. **Transformation:** Uses Babel to compile the code in the browser
4. **Rendering:** Creates and displays the component
5. **Screenshots:** Can capture images of rendered components

### Available Scripts

```bash
# Development
pnpm dev          # Start dev server (http://localhost:3000)

# Production
pnpm build        # Create optimized production build
pnpm start        # Run production server

# Code Quality
pnpm lint         # Run ESLint to check code quality

# Package Management
pnpm install      # Install dependencies
pnpm add [pkg]    # Add a new dependency
pnpm remove [pkg] # Remove a dependency
pnpm update       # Update all dependencies
```

---

## 8. Troubleshooting

### Common Issues & Solutions

#### **Issue: "command not found: node"**

**Cause:** Node.js not installed or not in PATH

**Solution:**
1. Reinstall Node.js from https://nodejs.org
2. Make sure to check "Add to PATH" during installation
3. Restart your terminal/command prompt
4. Verify: `node --version`

---

#### **Issue: "command not found: pnpm"**

**Cause:** pnpm not installed globally

**Solution:**
```bash
# Reinstall pnpm globally
npm install -g pnpm

# Verify
pnpm --version
```

---

#### **Issue: Port 3000 already in use**

**Cause:** Another application is using port 3000

**Solution:**
```bash
# Option 1: Use a different port
pnpm dev -- --port 3001

# Option 2: Find and kill the process using port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Windows (PowerShell):
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

---

#### **Issue: "Cannot find module" errors**

**Cause:** Dependencies not installed or corrupted

**Solution:**
```bash
# Remove node_modules and lockfile
rm -rf node_modules pnpm-lock.yaml  # macOS/Linux
# OR
rmdir /s /q node_modules            # Windows
del pnpm-lock.yaml                  # Windows

# Reinstall
pnpm install
```

---

#### **Issue: Build fails with TypeScript errors**

**Cause:** Type errors in the code

**Solution:**
```bash
# Check for type errors
pnpm tsc --noEmit

# If errors persist, check:
# 1. TypeScript version matches package.json
# 2. All dependencies are installed
# 3. tsconfig.json is not modified
```

---

#### **Issue: Styles not loading**

**Cause:** Tailwind CSS not compiling

**Solution:**
1. Check `globals.css` has Tailwind directives
2. Verify `tailwind.config.ts` exists
3. Restart dev server: `Ctrl+C` then `pnpm dev`

---

#### **Issue: Permission denied errors (Linux/macOS)**

**Cause:** Insufficient permissions

**Solution:**
```bash
# Don't use sudo with pnpm install!
# Instead, fix npm global directory permissions:

mkdir -p ~/.pnpm-global
pnpm config set global-dir ~/.pnpm-global
pnpm config set global-bin-dir ~/.pnpm-global/bin

# Add to PATH in ~/.bashrc or ~/.zshrc:
export PATH="$HOME/.pnpm-global/bin:$PATH"
```

---

### Getting Help

- **Next.js Docs:** https://nextjs.org/docs
- **React Docs:** https://react.dev
- **pnpm Docs:** https://pnpm.io
- **Project Issues:** https://github.com/hemmydev/open-artifacts-renderer/issues

---

## Quick Reference Card

```bash
# 1. Install Node.js
Download from: https://nodejs.org/

# 2. Install pnpm
npm install -g pnpm

# 3. Clone & Setup
git clone https://github.com/hemmydev/open-artifacts-renderer.git
cd open-artifacts-renderer
pnpm install

# 4. Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Run production build
pnpm lint             # Check code quality

# 5. Access App
Open: http://localhost:3000
```

---

## Next Steps

Now that you have the project running, here are some things to explore:

1. **Learn React Basics:** https://react.dev/learn
2. **Explore Next.js:** https://nextjs.org/learn
3. **Understand TypeScript:** https://www.typescriptlang.org/docs/handbook/intro.html
4. **Study the Code:** Start with `app/page.tsx` (only 22 lines!)
5. **Modify Something:** Try changing the page title in `app/layout.tsx`

Happy coding! 🚀
