# Deployment Checklist - Go Live Today

## Current Status
✅ Vercel project exists: `book-store-app-kappa-khaki.vercel.app`  
✅ Frontend builds successfully  
✅ Backend builds successfully  
✅ Deployment configuration ready (`vercel.json`)  
✅ CI/CD workflow configured (`.github/workflows/deploy.yml`)  
✅ Serverless entry point exists (`backend/src/main.vercel.ts`)

## 🚨 Critical Items to Complete

### 1. Set Up Production Database
**Status:** ❌ Not configured  
**Priority:** CRITICAL - App cannot run without this

#### Recommended Options:
- **Vercel Postgres** (easiest integration)
- **Supabase** (generous free tier)
- **Neon** (serverless PostgreSQL)
- **Railway** (simple setup)

#### Required Environment Variables:
```bash
DB_HOST=<your-db-host>
DB_PORT=5432
DB_USERNAME=<your-db-username>
DB_PASSWORD=<your-db-password>
DB_NAME=bookstore
DB_SSL=true
NODE_ENV=production
```

#### Steps:
1. Choose a database provider
2. Create a new PostgreSQL database
3. Copy connection credentials
4. Add environment variables to Vercel dashboard:
   - Go to: https://vercel.com/engpetershakers-projects/book-store-app/settings/environment-variables
   - Add each variable above
   - Ensure variables are available for "Production" environment

---

### 2. Configure GitHub Secret for CI/CD
**Status:** ❌ Not configured  
**Priority:** HIGH - Required for automated deployments

#### Steps:
1. Generate Vercel Token:
   - Go to: https://vercel.com/account/tokens
   - Click "Create Token"
   - Name it "GitHub Actions - book-store-app"
   - Copy the token

2. Add to GitHub Secrets:
   - Go to: https://github.com/[your-username]/book-store-app/settings/secrets/actions
   - Click "New repository secret"
   - Name: `VERCEL_TOKEN`
   - Paste the token value
   - Click "Add secret"

---

### 3. Seed Production Database
**Status:** ⏸️ Pending database setup  
**Priority:** MEDIUM - Required for demo/testing

#### Steps (after database is configured):
```bash
cd backend
corepack yarn seed:prod
```

Or manually run seed operations through Vercel Functions once deployed.

---

## 🚀 Deployment Options

### Option 1: Manual Deploy (Fastest - 5 minutes)
**Best for:** Quick verification, testing

```bash
# From project root
vercel --prod
```

**After deployment:**
- Configure database environment variables in Vercel dashboard
- Test the deployment URL
- Run database seeding if needed

---

### Option 2: Automated CI/CD Deploy (15 minutes)
**Best for:** Production-ready setup with automated deployments

#### Prerequisites:
- ✅ Complete Step 1 (Production Database)
- ✅ Complete Step 2 (GitHub Secret)
- ✅ Configure Vercel environment variables

#### Steps:
```bash
# Commit any pending changes
git add .
git commit -m "Configure production deployment"

# Push to main branch - triggers automatic deployment
git push origin main
```

#### Monitor Deployment:
- GitHub Actions: https://github.com/[your-username]/book-store-app/actions
- Vercel Dashboard: https://vercel.com/engpetershakers-projects/book-store-app

---

## 📋 Post-Deployment Verification

### 1. Test Backend API
```bash
# Check health endpoint
curl https://book-store-app-kappa-khaki.vercel.app/api/health

# Test books endpoint
curl https://book-store-app-kappa-khaki.vercel.app/api/books
```

### 2. Test Frontend
- Visit: https://book-store-app-kappa-khaki.vercel.app
- Verify book list loads
- Test navigation
- Check responsive design

### 3. Check Logs
```bash
# View function logs
vercel logs book-store-app-kappa-khaki.vercel.app
```

---

## 🐛 Common Issues & Solutions

### Database Connection Fails
- Verify all DB environment variables are set in Vercel
- Ensure `DB_SSL=true` for production databases
- Check database allows connections from Vercel IPs

### Build Fails
- Check build logs in Vercel dashboard
- Verify `corepack` is properly configured
- Ensure all dependencies are in `package.json`

### API Routes Return 404
- Verify `vercel.json` routes configuration
- Check `main.vercel.ts` exports handler correctly
- Ensure backend build succeeded

### CORS Issues
- Verify CORS is configured in `backend/src/main.ts`
- Check production URL is allowed in CORS settings

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Postgres Guide](https://vercel.com/docs/storage/vercel-postgres)
- [GitHub Actions Logs](https://github.com/[your-username]/book-store-app/actions)
- [Project Context](./WARP.md)

---

## ✅ Final Checklist

Before marking deployment complete:

- [ ] Production database created and configured
- [ ] All environment variables added to Vercel
- [ ] `VERCEL_TOKEN` added to GitHub secrets
- [ ] Successful deployment (manual or automated)
- [ ] Database seeded with sample data
- [ ] Backend API endpoints tested and working
- [ ] Frontend loads and displays data correctly
- [ ] No console errors in browser
- [ ] Mobile responsive design verified
- [ ] Custom domain configured (optional)

---

**Estimated Time to Live:** 15-30 minutes (depending on database setup choice)

**Next Action:** Choose a database provider and complete Step 1
