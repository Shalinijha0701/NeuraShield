# NeuraShield AI - Deployment Guide

## Quick Deployment Options

### Option 1: Render.com (Recommended - Free Tier Available)

1. **Push your code to GitHub** (Already done ✓)
   ```
   https://github.com/Shalinijha0701/NeuraShield.git
   ```

2. **Deploy to Render**
   - Go to https://render.com
   - Sign up/Login with GitHub
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `Shalinijha0701/NeuraShield`
   - Render will auto-detect the `render.yaml` configuration
   - Add environment variables:
     - `OPENAI_API_KEY`: Your OpenAI API key
     - `GITHUB_TOKEN`: Your GitHub token
   - Click "Create Web Service"
   - Your API will be live at: `https://neurashield-api.onrender.com`

3. **Deploy Frontend (Static Site)**
   - Click "New +" → "Static Site"
   - Connect same repository
   - Set publish directory: `webdev`
   - Click "Create Static Site"
   - Your frontend will be live at: `https://neurashield.onrender.com`

---

### Option 2: Railway.app (Easy & Fast)

1. **Deploy Backend**
   - Go to https://railway.app
   - Click "Start a New Project"
   - Select "Deploy from GitHub repo"
   - Choose `Shalinijha0701/NeuraShield`
   - Railway auto-detects Python
   - Add environment variables in Settings:
     - `OPENAI_API_KEY`
     - `GITHUB_TOKEN`
   - Deploy automatically starts
   - Get your URL from Settings → Domains

2. **Deploy Frontend**
   - Add new service → "Empty Service"
   - Connect to same repo
   - Set root directory: `webdev`
   - Add domain

---

### Option 3: Heroku (Classic Platform)

1. **Install Heroku CLI**
   ```bash
   # Download from: https://devcli.heroku.com/install
   ```

2. **Deploy**
   ```bash
   cd "c:\Users\SHALINI JHA\OneDrive\文档\neurashield-ai\neurashield-ai"
   
   # Login to Heroku
   heroku login
   
   # Create app
   heroku create neurashield-api
   
   # Set environment variables
   heroku config:set OPENAI_API_KEY=your_key_here
   heroku config:set GITHUB_TOKEN=your_token_here
   
   # Deploy
   git push heroku main
   
   # Open app
   heroku open
   ```

---

### Option 4: Vercel (Serverless)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd "c:\Users\SHALINI JHA\OneDrive\文档\neurashield-ai\neurashield-ai"
   
   # Login
   vercel login
   
   # Deploy
   vercel
   
   # Add environment variables in Vercel dashboard
   # Settings → Environment Variables
   ```

---

### Option 5: AWS (Production-Grade)

#### Deploy Backend on AWS Elastic Beanstalk

1. **Install AWS CLI & EB CLI**
   ```bash
   pip install awsebcli
   ```

2. **Initialize and Deploy**
   ```bash
   cd "c:\Users\SHALINI JHA\OneDrive\文档\neurashield-ai\neurashield-ai"
   
   # Initialize
   eb init -p python-3.10 neurashield-api --region us-east-1
   
   # Create environment
   eb create neurashield-prod
   
   # Set environment variables
   eb setenv OPENAI_API_KEY=your_key GITHUB_TOKEN=your_token
   
   # Deploy
   eb deploy
   
   # Open
   eb open
   ```

#### Deploy Frontend on AWS S3 + CloudFront

1. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://neurashield-frontend
   aws s3 sync webdev/ s3://neurashield-frontend --acl public-read
   aws s3 website s3://neurashield-frontend --index-document home.html
   ```

2. **Setup CloudFront** (Optional - for HTTPS)
   - Go to AWS CloudFront Console
   - Create distribution
   - Origin: Your S3 bucket
   - Enable HTTPS

---

### Option 6: Google Cloud Platform

1. **Install gcloud CLI**
   ```bash
   # Download from: https://cloud.google.com/sdk/docs/install
   ```

2. **Deploy to Cloud Run**
   ```bash
   # Login
   gcloud auth login
   
   # Set project
   gcloud config set project YOUR_PROJECT_ID
   
   # Deploy
   gcloud run deploy neurashield-api \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars OPENAI_API_KEY=your_key,GITHUB_TOKEN=your_token
   ```

---

### Option 7: Azure (Microsoft Cloud)

1. **Install Azure CLI**
   ```bash
   # Download from: https://aka.ms/installazurecliwindows
   ```

2. **Deploy to Azure App Service**
   ```bash
   # Login
   az login
   
   # Create resource group
   az group create --name neurashield-rg --location eastus
   
   # Create app service plan
   az appservice plan create --name neurashield-plan --resource-group neurashield-rg --sku B1 --is-linux
   
   # Create web app
   az webapp create --resource-group neurashield-rg --plan neurashield-plan --name neurashield-api --runtime "PYTHON:3.10"
   
   # Configure environment variables
   az webapp config appsettings set --resource-group neurashield-rg --name neurashield-api --settings OPENAI_API_KEY=your_key GITHUB_TOKEN=your_token
   
   # Deploy
   az webapp up --name neurashield-api --resource-group neurashield-rg
   ```

---

## Environment Variables Required

For all deployment options, you need to set these environment variables:

```
OPENAI_API_KEY=your-openai-api-key-here
GITHUB_TOKEN=your-github-token-here
```

⚠️ **IMPORTANT**: 
- Get your OpenAI API key from: https://platform.openai.com/api-keys
- Get your GitHub token from: https://github.com/settings/tokens
- Never commit these values to Git. Use the platform's environment variable settings.
- Copy your actual keys from your local .env file

---

## Testing Your Deployment

Once deployed, test your API:

```bash
# Test health endpoint
curl https://your-app-url.com/

# Test code analysis
curl -X POST https://your-app-url.com/api/analyze/code \
  -H "Content-Type: application/json" \
  -d '{"code": "def hello():\n    print(\"Hello World\")"}'
```

---

## Recommended: Render.com (Easiest)

**Why Render?**
- ✓ Free tier available
- ✓ Auto-deploys from GitHub
- ✓ Easy environment variable management
- ✓ Built-in SSL/HTTPS
- ✓ No credit card required for free tier

**Steps:**
1. Go to https://render.com
2. Sign up with GitHub
3. New Web Service → Connect `Shalinijha0701/NeuraShield`
4. Add environment variables
5. Deploy! 🚀

Your app will be live in ~5 minutes at: `https://neurashield-api.onrender.com`

---

## Frontend Deployment

### GitHub Pages (Free & Simple)

1. **Enable GitHub Pages**
   - Go to your repo: https://github.com/Shalinijha0701/NeuraShield
   - Settings → Pages
   - Source: Deploy from branch `main`
   - Folder: `/webdev`
   - Save

2. **Update API URL in Frontend**
   - Edit `webdev/solutions.js`
   - Change API URL to your deployed backend URL

3. **Access your site**
   - https://shalinijha0701.github.io/NeuraShield/

---

## Post-Deployment Checklist

- [ ] Backend API is accessible
- [ ] Frontend loads correctly
- [ ] Environment variables are set
- [ ] API endpoints respond correctly
- [ ] CORS is configured for frontend domain
- [ ] SSL/HTTPS is enabled
- [ ] Monitor logs for errors
- [ ] Set up custom domain (optional)

---

## Monitoring & Logs

### Render.com
```
Dashboard → Your Service → Logs
```

### Heroku
```bash
heroku logs --tail
```

### Railway
```
Dashboard → Your Project → Deployments → View Logs
```

---

## Need Help?

- Check deployment logs for errors
- Verify environment variables are set correctly
- Ensure all dependencies are in requirements.txt
- Test locally first: `python solutions_api.py`

---

## Cost Estimates

| Platform | Free Tier | Paid Tier |
|----------|-----------|-----------|
| Render.com | 750 hrs/month | $7/month |
| Railway | $5 credit/month | Pay as you go |
| Heroku | 550 hrs/month | $7/month |
| Vercel | 100GB bandwidth | $20/month |
| AWS | 12 months free | Variable |
| GCP | $300 credit | Variable |
| Azure | $200 credit | Variable |

**Recommendation**: Start with Render.com free tier, upgrade as needed.
