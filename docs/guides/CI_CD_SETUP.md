# CI/CD Setup Guide

## 🚀 Automated Deployment Setup

### Prerequisites
- GitHub repository
- Vercel account
- Project linked to Vercel

### Step 1: Get Vercel Token
1. Go to [Vercel Dashboard](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Name it "GitHub Actions"
4. Copy the token (save it securely)

### Step 2: Add GitHub Secret
1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `VERCEL_TOKEN`
5. Value: Paste your Vercel token
6. Click "Add secret"

### Step 3: Link Project (One-time)
```bash
# In your project root
vercel link
```
Follow the prompts to link to your Vercel project.

### Step 4: Test the Workflow
```bash
# Make any change and push to main/master
git add .
git commit -m "test: trigger CI/CD deployment"
git push origin main
```

## 📊 Workflow Overview

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will:

1. **Install dependencies** for both frontend and backend
2. **Run tests** for both applications
3. **Build production assets** with optimizations
4. **Deploy to Vercel** automatically if all tests pass

## 🔍 Monitoring

### Check Deployment Status
- **GitHub**: Go to your repo → Actions tab
- **Vercel**: Check your Vercel dashboard
- **Logs**: Use `vercel logs` command

### Deployment URLs
- **Production**: https://book-store-bfc7ur6yz-engpetershakers-projects.vercel.app
- **API**: https://book-store-bfc7ur6yz-engpetershakers-projects.vercel.app/api/books

## 🛠️ Manual Deployment (Backup)

If CI/CD fails, you can still deploy manually:
```bash
vercel --prod
```

## 🔧 Customization

### Deploy to Preview
Push to any branch other than main/master to create preview deployments.

### Environment Variables
Add more environment variables in:
- **Local**: `.env` files
- **Production**: Vercel dashboard → Environment Variables
- **CI/CD**: GitHub repository secrets

The CI/CD pipeline ensures consistent, tested deployments every time you push code!
