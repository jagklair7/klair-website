# Vercel Deployment Guide

## Prerequisites
- Node.js 18+ installed locally
- GitHub account with repository: https://github.com/jagklair7/klair-website
- Vercel account (https://vercel.com)
- RESEND API Key (https://resend.com)

## Step 1: Set Up Locally (Optional but Recommended)

```bash
# Install dependencies
npm install

# Add your RESEND API key to .env.local
# Edit .env.local and add:
# RESEND_API_KEY=your_actual_resend_api_key

# Test locally
npm run dev
```

## Step 2: Deploy to Vercel

### Option A: Connect GitHub Repository (Recommended)

1. Go to https://vercel.com and sign in
2. Click "Add New..." → "Project"
3. Select "Import Git Repository"
4. Paste your GitHub URL: https://github.com/jagklair7/klair-website
5. Click "Import"

### Option B: Deploy Using Vercel CLI

```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Deploy from project root
vercel
```

## Step 3: Configure Environment Variables

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add a new environment variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Your RESEND API key from https://resend.com/api-keys
   - **Select all environments** (Production, Preview, Development)
4. Click "Save"

## Step 4: Verify RESEND Configuration

Before testing the contact form:

1. Go to https://resend.com and sign in
2. Verify that `noreply@klair.ca` is configured as a verified domain sender
3. If not verified, follow RESEND's domain verification process

## Testing the Contact Form

1. After deployment, navigate to your Vercel project URL
2. Go to the Contact page
3. Fill out the contact form
4. Click Submit
5. Check that emails are received at `info@klair.ca`
6. Monitor Vercel logs (Project → Deployments → View Logs) for any API errors

## Troubleshooting

### API Returns 500 Error
- Check Vercel function logs in the Deployments tab
- Verify `RESEND_API_KEY` is set correctly in Environment Variables
- Ensure the key is not accidentally truncated

### Emails Not Received
- Verify `noreply@klair.ca` is a verified RESEND domain
- Check RESEND activity dashboard for bounced emails
- Verify `info@klair.ca` is a valid receiving address

### Build Fails
- Ensure all dependencies are in package.json
- Check that `npm run build` works locally
- Review Vercel build logs for specific errors

## Deployment Configuration Files

- `vercel.json` - Handles API routes and environment variable injection
- `vite.config.js` - PWA and build configuration
- `api/contact.js` - Serverless function for handling emails
- `.env.example` - Template for environment variables

## Automatic Deployments

Every push to your GitHub repository will automatically trigger a new Vercel deployment. To disable auto-deploy, go to Project Settings → Git → Disable Auto-Deploy.
