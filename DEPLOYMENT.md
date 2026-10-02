# FraudGuard Deployment Guide

Here are the 3 easiest ways to deploy **FraudGuard** to get a live shareable URL for your college presentation:

---

## ⚡ Option 1: Netlify Drag & Drop (Fastest - 30 Seconds, No CLI required)

Your app has already been built into production-ready static assets in the `dist` folder:
- **Build Directory**: `c:\Users\saija\OneDrive\Desktop\Fraud Guard\dist`

**Steps**:
1. Open [app.netlify.com/drop](https://app.netlify.com/drop) in your browser.
2. Drag and drop the `dist` folder from your desktop onto the Netlify drop zone.
3. Done! Netlify will instantly generate a live HTTPS link (e.g., `https://fraudguard-demo.netlify.app`).

---

## 🚀 Option 2: Vercel CLI (1-Minute Terminal Deploy)

1. Open PowerShell or Terminal in your project folder (`c:\Users\saija\OneDrive\Desktop\Fraud Guard`).
2. Run:
   ```bash
   npx vercel
   ```
3. Press `Enter` to confirm the default prompts. Vercel will open a browser window to log in and output your live URL.

*(Note: We have already added `vercel.json` with single-page app rewrites so deep routes like `/live` and `/analytics` load properly without 404 errors).*

---

## 🐙 Option 3: GitHub + Vercel / Netlify (Recommended for Portfolios)

1. **Initialize Git & Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Deploy FraudGuard AI Dashboard Prototype"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/fraud-guard.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Select your `fraud-guard` GitHub repository.
   - Click **Deploy**. Vercel will automatically build and publish updates whenever you push code!
