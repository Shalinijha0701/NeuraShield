#!/bin/bash
# Quick deployment script for NeuraShield AI

echo "🚀 NeuraShield AI - Quick Deploy"
echo "================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Not a git repository. Please run from project root."
    exit 1
fi

# Commit latest changes
echo "📦 Committing latest changes..."
git add .
git commit -m "Deployment: $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Code pushed to GitHub!"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. RENDER.COM (Recommended - Easiest):"
echo "   → Go to https://render.com"
echo "   → New Web Service → Connect GitHub repo"
echo "   → Add environment variables (OPENAI_API_KEY, GITHUB_TOKEN)"
echo "   → Deploy!"
echo ""
echo "2. RAILWAY.APP (Fast):"
echo "   → Go to https://railway.app"
echo "   → New Project → Deploy from GitHub"
echo "   → Add environment variables"
echo ""
echo "3. HEROKU (Classic):"
echo "   → heroku create neurashield-api"
echo "   → heroku config:set OPENAI_API_KEY=your_key"
echo "   → git push heroku main"
echo ""
echo "📖 Full deployment guide: See DEPLOYMENT.md"
echo ""
