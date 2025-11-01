# NeuraShield AI 🛡️

AI-powered code security analysis platform with RAG-based vulnerability detection, bug analysis, and optimization recommendations.

## 🚀 Quick Deploy (5 Minutes)

### Recommended: Render.com

1. **Go to [Render.com](https://render.com)** and sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. Connect repository: `Shalinijha0701/NeuraShield`
4. Render auto-detects settings from `render.yaml`
5. Add environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `GITHUB_TOKEN`: Your GitHub token
6. Click **"Create Web Service"**
7. ✅ Done! Your API will be live in ~5 minutes

**Your API URL**: `https://neurashield-api.onrender.com`

---

## 📋 Features

- **🔒 Security Analysis**: CVSS-based vulnerability detection with CWE mapping
- **🐛 Bug Detection**: Automated bug identification with severity scoring
- **⚡ Code Optimization**: Performance bottleneck detection and recommendations
- **📊 RAG-Powered**: Retrieval-Augmented Generation for context-aware analysis
- **🌐 Web Interface**: Modern, responsive UI for code analysis
- **📄 Report Generation**: Export reports in TXT, HTML, and PDF formats
- **🔄 GitHub Integration**: Direct repository analysis
- **🤖 CI/CD Ready**: GitHub Actions workflows included

---

## 🏗️ Architecture

```
NeuraShield AI
├── Phase 1: Code Analysis Pipeline
│   ├── Code Extraction (GitHub repos)
│   ├── Preprocessing & Chunking
│   ├── Embedding Generation (OpenAI)
│   └── Vector Storage (ChromaDB)
│
├── Phase 2: RAG Analysis Engine
│   ├── Context Retrieval
│   ├── LLM Analysis (GPT-4)
│   ├── Security Scoring (CVSS)
│   └── Report Generation
│
└── Web Interface
    ├── Code Input (Paste/Upload/GitHub)
    ├── Real-time Analysis
    └── Interactive Results
```

---

## 🛠️ Local Development

### Prerequisites
- Python 3.10+
- OpenAI API Key
- GitHub Token (optional)

### Setup

```bash
# Clone repository
git clone https://github.com/Shalinijha0701/NeuraShield.git
cd NeuraShield

# Install dependencies
pip install -r requirements.txt

# Set environment variables
cp .env.template .env
# Edit .env with your API keys

# Run backend
python solutions_api.py

# Open frontend
# Open webdev/home.html in browser
```

---

## 🌐 Deployment Options

| Platform | Difficulty | Free Tier | Deploy Time |
|----------|-----------|-----------|-------------|
| **Render.com** ⭐ | Easy | ✅ Yes | 5 min |
| Railway.app | Easy | ✅ Yes | 5 min |
| Heroku | Medium | ✅ Yes | 10 min |
| Vercel | Medium | ✅ Yes | 10 min |
| AWS | Hard | ✅ 12 months | 20 min |
| GCP | Hard | ✅ $300 credit | 20 min |
| Azure | Hard | ✅ $200 credit | 20 min |

📖 **Full deployment guide**: See [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 📡 API Endpoints

### Analyze Code
```bash
POST /api/analyze/code
Content-Type: application/json

{
  "code": "def vulnerable_function():\n    exec(user_input)"
}
```

### Analyze GitHub Repository
```bash
POST /api/analyze/github
Content-Type: application/json

{
  "repo_url": "https://github.com/username/repo"
}
```

### Check Analysis Status
```bash
GET /api/status/{job_id}
```

### Download Report
```bash
GET /api/download/{job_id}/{format}
# format: txt, html, pdf
```

---

## 🔐 Security Features

- **CVSS v3.1 Scoring**: Industry-standard vulnerability scoring
- **CWE Mapping**: Common Weakness Enumeration classification
- **SAST Analysis**: Static Application Security Testing
- **Secret Detection**: API key and credential scanning
- **Dependency Analysis**: Third-party library vulnerability checks

---

## 📊 Sample Analysis Output

```
======================================================================
NEURASHIELD.AI - CODE ANALYSIS REPORT
======================================================================

## SECURITY SCORING (CVSS v3.1)
----------------------------------------------------------------------
Overall Security Score: 8.5/10
Severity: HIGH

🛡️  VULNERABILITIES: 2

1. SQL Injection
   CVSS Score: 8.5
   CVSS Vector: CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N
   CWE: CWE-89
   Remediation: Use parameterized queries

2. Hardcoded Credentials
   CVSS Score: 7.5
   CWE: CWE-798
   Remediation: Use environment variables

## BUG DETECTION
----------------------------------------------------------------------
⚠️  BUGS FOUND: 3
Overall Risk: MEDIUM

## CODE OPTIMIZATION
----------------------------------------------------------------------
⚡ OPTIMIZATIONS FOUND: 2
Estimated Speedup: 2-3x
```

---

## 🧪 Testing

```bash
# Run Phase 1 pipeline
python phase1_pipeline.py

# Run Phase 2 analysis
python phase_2/auto_analyze_repo.py

# Test API
curl http://localhost:5050/
```

---

## 📦 Tech Stack

- **Backend**: Flask, Python 3.10+
- **AI/ML**: OpenAI GPT-4, ChromaDB, RAG
- **Frontend**: HTML5, CSS3, JavaScript
- **CI/CD**: GitHub Actions
- **Deployment**: Render, Heroku, Vercel, AWS, GCP, Azure

---

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines.

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🔗 Links

- **GitHub**: https://github.com/Shalinijha0701/NeuraShield
- **Documentation**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **Issues**: https://github.com/Shalinijha0701/NeuraShield/issues

---

## 👥 Author

**Shalini Jha**
- GitHub: [@Shalinijha0701](https://github.com/Shalinijha0701)

---

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- ChromaDB for vector storage
- Flask community

---

**⭐ Star this repo if you find it helpful!**
