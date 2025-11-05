# Vercel Deployment Guide for FreshFridge

## ⚠️ Important Note

Your app currently uses SQLite (`better-sqlite3`), which **will not work** on Vercel's serverless functions. You have two options:

1. **Use Supabase** (Recommended) - Your app already has Supabase configured
2. **Migrate to a different platform** - Use Railway, Render, or similar platforms that support persistent file storage

This guide covers Option 1: Using Supabase for Vercel deployment.

## Prerequisites

- A GitHub account (or GitLab/Bitbucket)
- A Vercel account ([sign up here](https://vercel.com/signup))
- A Supabase project ([sign up here](https://supabase.com))

## Step 1: Prepare Your Code

### 1.1 Environment Variables

Your Supabase configuration is already documented in `SUPABASE_SETUP.md`. The environment variables you'll need are:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- Any AI API keys (e.g., `GEMINI_API_KEY`, `OPENAI_API_KEY`)

See `SUPABASE_SETUP.md` lines 27-28 for your specific values, or check your `.env.local` file if you've already created it locally.

✅ **Note**: The `lib/supabase.ts` file has been updated to use environment variables, so it will automatically pick up these values when deployed.

### 1.2 Database Migration

⚠️ **Important**: Your API routes currently use SQLite. You'll need to migrate them to use Supabase instead of the `db` from `@/lib/database`. This requires updating all API routes.

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended for beginners)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Import your project in Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Select the repository containing FreshFridge

3. **Configure the project**:
   - **Root Directory**: Set to `FreshFridge` (if your repo root is the parent directory)
   - **Framework Preset**: Next.js (should auto-detect)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add the following (values can be found in `SUPABASE_SETUP.md`):
     - `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase URL (see SUPABASE_SETUP.md line 27)
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your Supabase Anon Key (see SUPABASE_SETUP.md line 28)
     - `GEMINI_API_KEY` = Your Google Gemini API key (if using AI features)
     - `OPENAI_API_KEY` = Your OpenAI API key (if using OpenAI features)
     - Add any other environment variables your app needs

5. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `your-project.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Navigate to your project**:
   ```bash
   cd FreshFridge
   ```

4. **Deploy**:
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project? No (first time) or Yes (if updating)
   - Project name: freshfridge (or your preferred name)
   - Directory: `./`
   - Override settings: No

5. **Set Environment Variables**:
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

6. **Deploy to production**:
   ```bash
   vercel --prod
   ```

## Step 3: Post-Deployment

### 3.1 Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### 3.2 Environment Variables for Preview Deployments

Make sure to add environment variables for:
- **Production**: Your production Supabase instance
- **Preview**: Can use the same or a separate Supabase project for testing
- **Development**: Your local `.env.local` file

### 3.3 Monitoring

- Vercel Analytics is already included in your dependencies
- Check the Vercel dashboard for deployment logs and analytics

## Troubleshooting

### Build Errors

- **SQLite errors**: Make sure you've migrated all API routes to use Supabase instead of SQLite
- **Missing environment variables**: Verify all required env vars are set in Vercel dashboard
- **Build timeout**: Increase function timeout in `vercel.json` if needed

### Runtime Errors

- Check Vercel function logs in the dashboard
- Verify Supabase connection and table structure matches your schema
- Ensure Row Level Security (RLS) policies are set correctly in Supabase

## Next Steps

1. ✅ Update `lib/supabase.ts` to use environment variables (already done)
2. ✅ Review `SUPABASE_SETUP.md` for Supabase configuration details
3. ⚠️ **IMPORTANT**: Migrate API routes from SQLite to Supabase (required for Vercel)
4. ✅ Test locally with environment variables from `SUPABASE_SETUP.md`
5. ✅ Deploy to Vercel using the steps above
6. ✅ Set up monitoring and error tracking

## Related Documentation

- `SUPABASE_SETUP.md` - Complete Supabase setup guide with database schema and environment variables

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/concepts/next.js/overview)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
