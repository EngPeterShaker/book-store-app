## Prerequisites
- GitHub repository connected to your project
- Vercel account and project already linked
- PostgreSQL database (can be Vercel Postgres, Supabase, or any external provider)
- Yarn package manager installed

## Step 1: Install Vercel CLI

Install the Vercel CLI globally using yarn:

```bash
yarn global add vercel
```

## Build Commands

The project uses yarn for package management:

- **Backend build**: `yarn vercel-build`
- **Frontend build**: `yarn build`
- **Install dependencies**: `yarn install`
