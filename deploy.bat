@echo off
REM Quick deployment script for NeuraShield AI (Windows)

echo ========================================
echo   NeuraShield AI - Quick Deploy
echo ========================================
echo.

REM Commit latest changes
echo Committing latest changes...
git add .
git commit -m "Deployment: %date% %time%" 2>nul || echo No changes to commit
echo.

REM Push to GitHub
echo Pushing to GitHub...
git push origin main
echo.

echo ========================================
echo   Code pushed to GitHub successfully!
echo ========================================
echo.
echo Next Steps:
echo.
echo 1. RENDER.COM (Recommended):
echo    - Go to https://render.com
echo    - Sign up with GitHub
echo    - New Web Service
echo    - Connect: Shalinijha0701/NeuraShield
echo    - Add environment variables
echo    - Deploy!
echo.
echo 2. RAILWAY.APP:
echo    - Go to https://railway.app
echo    - New Project from GitHub
echo    - Add environment variables
echo.
echo 3. HEROKU:
echo    - heroku create neurashield-api
echo    - heroku config:set OPENAI_API_KEY=your_key
echo    - git push heroku main
echo.
echo Full guide: See DEPLOYMENT.md
echo.
pause
