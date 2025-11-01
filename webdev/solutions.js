// Global variables
let currentJobId = null;
let currentAnalysisResult = null;
let progressInterval = null;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeSectionTabs();
    setupFileUpload();
});

// Tab switching for input methods
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab') + '-tab';
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Section tabs for results
function initializeSectionTabs() {
    const sectionTabs = document.querySelectorAll('.section-tab');
    const sectionContents = document.querySelectorAll('.section-content');

    sectionTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            sectionTabs.forEach(t => t.classList.remove('active'));
            sectionContents.forEach(content => content.classList.remove('active'));

            tab.classList.add('active');
            const sectionId = tab.getAttribute('data-section') + '-section';
            document.getElementById(sectionId).classList.add('active');
        });
    });
}

// File upload handling
function setupFileUpload() {
    const uploadArea = document.getElementById('file-upload-area');
    const fileInput = document.getElementById('file-upload');

    if (!uploadArea || !fileInput) {
        console.error('File upload elements not found');
        return;
    }

    // Click on area triggers file input
    uploadArea.addEventListener('click', (e) => {
        if (e.target.id !== 'file-upload') {
            fileInput.click();
        }
    });

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.style.borderColor = '#00D4FF';
        uploadArea.style.background = 'rgba(0, 212, 255, 0.1)';
    });

    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.style.borderColor = 'rgba(0, 212, 255, 0.3)';
        uploadArea.style.background = 'rgba(0, 8, 20, 0.6)';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.style.borderColor = 'rgba(0, 212, 255, 0.3)';
        uploadArea.style.background = 'rgba(0, 8, 20, 0.6)';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            handleFileSelect({ target: fileInput });
        }
    });
}


function handleFileSelect(event) {
    const file = event.target.files[0];
    const fileInfo = document.getElementById('file-info');
    
    if (file) {
        const fileName = file.name || 'Unknown';
        const fileSize = file.size || 0;
        const fileType = file.type || 'Unknown';
        
        fileInfo.innerHTML = `
            <strong>📄 Selected File:</strong> ${fileName}<br>
            <strong>Size:</strong> ${formatFileSize(fileSize)}<br>
            <strong>Type:</strong> ${fileType}
        `;
        fileInfo.classList.add('show');
    } else {
        fileInfo.innerHTML = '';
        fileInfo.classList.remove('show');
    }
}


function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    if (isNaN(bytes) || bytes === undefined) return 'Unknown size';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}


// Analyze GitHub Repository
async function analyzeGitHub() {
    const githubUrl = document.getElementById('github-url').value.trim();
    
    if (!githubUrl) {
        alert('Please enter a GitHub repository URL');
        return;
    }

    if (!isValidGitHubUrl(githubUrl)) {
        alert('Please enter a valid GitHub repository URL');
        return;
    }

    showProgress();
    
    try {
        const response = await fetch('https://neurashield.onrender.com/api/analyze/github', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ repo_url: githubUrl })
        });

        const result = await response.json();
        
        if (response.ok) {
            currentJobId = result.job_id;
            pollAnalysisStatus();
        } else {
            hideProgress();
            alert('Error: ' + (result.error || 'Failed to start analysis'));
        }
    } catch (error) {
        hideProgress();
        console.error('Error:', error);
        // For demo purposes, simulate analysis
        simulateAnalysis('github', githubUrl);
    }
}

// Analyze Pasted Code
async function analyzeCode() {
    const code = document.getElementById('code-input').value.trim();
    
    if (!code) {
        alert('Please paste some code to analyze');
        return;
    }

    showProgress();
    
    try {
        const response = await fetch('https://neurashield.onrender.com/api/analyze/code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: code })
        });

        const result = await response.json();
        
        if (response.ok) {
            currentJobId = result.job_id;
            pollAnalysisStatus();
        } else {
            hideProgress();
            alert('Error: ' + (result.error || 'Failed to start analysis'));
        }
    } catch (error) {
        hideProgress();
        console.error('Error:', error);
        // For demo purposes, simulate analysis
        simulateAnalysis('code', code);
    }
}

// Analyze Uploaded File
async function analyzeFile() {
    const fileInput = document.getElementById('file-upload');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select a file to upload');
        return;
    }

    showProgress();
    
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('https://neurashield.onrender.com/api/analyze/file', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        
        if (response.ok) {
            currentJobId = result.job_id;
            pollAnalysisStatus();
        } else {
            hideProgress();
            alert('Error: ' + (result.error || 'Failed to start analysis'));
        }
    } catch (error) {
        hideProgress();
        console.error('Error:', error);
        // For demo purposes, simulate analysis
        const reader = new FileReader();
        reader.onload = (e) => {
            simulateAnalysis('file', e.target.result);
        };
        reader.readAsText(file);
    }
}


// Poll analysis status
async function pollAnalysisStatus() {
    if (!currentJobId) return;

    // Simulate progress while waiting for real results
    let pollCount = 0;
    const maxPolls = 30; // Maximum 60 seconds (30 * 2s)

    const pollLoop = async () => {
        pollCount++;
        
        // Update progress based on poll count
        const progressPercent = Math.min(90, (pollCount / maxPolls) * 90);
        const stepIndex = Math.floor((pollCount / maxPolls) * 5);
        const steps = ['step-1', 'step-2', 'step-3', 'step-4', 'step-5'];
        const messages = [
            'Extracting code files...',
            'Analyzing security vulnerabilities...',
            'Detecting potential bugs...',
            'Identifying optimization opportunities...',
            'Generating comprehensive report...'
        ];
        
        if (stepIndex < steps.length) {
            updateProgress(progressPercent, messages[stepIndex], steps[stepIndex]);
        }

        try {

            const result = await response.json();

            if (result.status === 'completed') {
                updateProgress(100, 'Analysis complete!', 'step-5');
                currentAnalysisResult = result.analysis;
                setTimeout(() => {
                    hideProgress();
                    displayResults(result.analysis);
                }, 800);
            } else if (result.status === 'failed') {
                hideProgress();
                alert('Analysis failed: ' + (result.error || 'Unknown error'));
            } else if (pollCount < maxPolls) {
                // Still processing, poll again
                setTimeout(pollLoop, 2000);
            } else {
                hideProgress();
                alert('Analysis timed out. Please try again.');
            }
        } catch (error) {
            console.error('Error polling status:', error);
            if (pollCount < maxPolls) {
                setTimeout(pollLoop, 2000);
            } else {
                hideProgress();
                alert('Connection error. Please check if the backend is running.');
            }
        }
    };

    // Start polling
    pollLoop();
}

// Simulate analysis (for demo when backend is not available)
function simulateAnalysis(type, content) {
    let step = 0;
    const steps = ['step-1', 'step-2', 'step-3', 'step-4', 'step-5'];
    const messages = [
        'Extracting code files...',
        'Analyzing security vulnerabilities...',
        'Detecting potential bugs...',
        'Identifying optimization opportunities...',
        'Generating comprehensive report...'
    ];

    // Show first step immediately
    updateProgress(0, messages[0], steps[0]);

    progressInterval = setInterval(() => {
        if (step < steps.length) {
            updateProgress((step + 1) * 20, messages[step], steps[step]);
            step++;
        } else {
            clearInterval(progressInterval);
            // Generate mock analysis result
            const mockResult = generateMockAnalysis(type, content);
            currentAnalysisResult = mockResult;
            setTimeout(() => {
                hideProgress();
                displayResults(mockResult);
            }, 500);
        }
    }, 1200);  // Reduced to 1.2 seconds per step for faster feedback
}

// Generate mock analysis for demo
function generateMockAnalysis(type, content) {
    const codeLength = typeof content === 'string' ? content.length : 1000;
    const hasSQL = content && content.toLowerCase().includes('select');
    const hasLoop = content && (content.includes('for ') || content.includes('while '));
    
    return {
        timestamp: new Date().toISOString(),
        type: type,
        security_analysis: {
            overall_security_score: hasSQL ? 7.5 : 3.2,
            overall_severity: hasSQL ? 'High' : 'Low',
            vulnerabilities: hasSQL ? [
                {
                    type: 'SQL Injection',
                    cvss_score: 8.5,
                    cvss_vector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N',
                    cwe_id: 'CWE-89',
                    description: 'Potential SQL injection vulnerability detected in database query',
                    line: '5',
                    remediation: 'Use parameterized queries or prepared statements instead of string concatenation'
                }
            ] : [],
            risk_summary: hasSQL ? 'High risk vulnerabilities detected. Immediate action required.' : 'No major security issues found.',
            immediate_actions: hasSQL ? ['Replace string concatenation with parameterized queries', 'Implement input validation'] : []
        },
        bug_analysis: {
            has_bugs: hasLoop,
            bugs_found: hasLoop ? [
                {
                    type: 'Performance Issue',
                    severity: 'medium',
                    line: '8',
                    description: 'Inefficient loop iteration pattern detected',
                    exploit_difficulty: 'Low',
                    impact: {
                        confidentiality: 'None',
                        integrity: 'None',
                        availability: 'Low'
                    },
                    fix: 'Use list comprehension or vectorized operations for better performance',
                    cwe_id: 'CWE-407'
                }
            ] : [],
            overall_risk: hasLoop ? 'medium' : 'low'
        },
        optimization_analysis: {
            current_complexity: {
                time: hasLoop ? 'O(n)' : 'O(1)',
                space: 'O(n)',
                bottlenecks: hasLoop ? ['Loop iteration'] : []
            },
            optimizations: hasLoop ? [
                {
                    type: 'Performance',
                    description: 'Replace explicit loop with list comprehension',
                    improvement: '2-3x faster execution',
                    trade_offs: 'None significant'
                }
            ] : [],
            estimated_speedup: hasLoop ? '2-3x' : 'N/A'
        },
        code_quality: {
            score: 75,
            grade: 'B',
            issues: Math.floor(codeLength / 200)
        }
    };
}

// Display results
function displayResults(analysis) {
    // Show results container
    document.getElementById('results-container').style.display = 'block';
    document.getElementById('results-container').scrollIntoView({ behavior: 'smooth' });

    // Update summary cards
    const securityScore = analysis.security_analysis.overall_security_score || 0;
    document.getElementById('security-score').textContent = securityScore.toFixed(1) + '/10';
    document.getElementById('security-label').textContent = analysis.security_analysis.overall_severity || 'Unknown';

    const bugsCount = analysis.bug_analysis.bugs_found ? analysis.bug_analysis.bugs_found.length : 0;
    document.getElementById('bugs-count').textContent = bugsCount;
    document.getElementById('bugs-label').textContent = bugsCount === 0 ? 'No issues' : bugsCount === 1 ? '1 issue found' : `${bugsCount} issues found`;

    const optimizationsCount = analysis.optimization_analysis.optimizations ? analysis.optimization_analysis.optimizations.length : 0;
    document.getElementById('optimization-count').textContent = optimizationsCount;
    document.getElementById('optimization-label').textContent = optimizationsCount === 0 ? 'Well optimized' : `${optimizationsCount} suggestions`;

    const qualityScore = analysis.code_quality ? analysis.code_quality.score : 70;
    document.getElementById('quality-score').textContent = qualityScore;
    document.getElementById('quality-label').textContent = getQualityGrade(qualityScore);

    // Display detailed sections
    displaySecurityDetails(analysis.security_analysis);
    displayBugDetails(analysis.bug_analysis);
    displayOptimizationDetails(analysis.optimization_analysis);
    displayInsights(analysis);
}

// Display security details
function displaySecurityDetails(security) {
    const container = document.getElementById('security-details');
    
    if (!security.vulnerabilities || security.vulnerabilities.length === 0) {
        container.innerHTML = `
            <div class="detail-card">
                <p style="color: #059669; text-align: center; padding: 2rem;">
                    ✓ No security vulnerabilities detected
                </p>
            </div>
        `;
        return;
    }

    container.innerHTML = security.vulnerabilities.map(vuln => `
        <div class="detail-card">
            <div class="detail-header">
                <div class="detail-title">${vuln.type}</div>
                <span class="severity-badge severity-${getSeverityClass(vuln.cvss_score)}">${getSeverity(vuln.cvss_score)}</span>
            </div>
            <div class="detail-description">${vuln.description}</div>
            <div class="detail-code">
                <strong>Line ${vuln.line}</strong><br>
                CVSS Score: ${vuln.cvss_score} | CWE: ${vuln.cwe_id}
            </div>
            <div class="detail-recommendation">
                <strong>Recommendation:</strong> ${vuln.remediation}
            </div>
        </div>
    `).join('');
}

// Display bug details
function displayBugDetails(bugAnalysis) {
    const container = document.getElementById('bugs-details');
    
    if (!bugAnalysis.bugs_found || bugAnalysis.bugs_found.length === 0) {
        container.innerHTML = `
            <div class="detail-card">
                <p style="color: #059669; text-align: center; padding: 2rem;">
                    ✓ No bugs detected
                </p>
            </div>
        `;
        return;
    }

    container.innerHTML = bugAnalysis.bugs_found.map(bug => `
        <div class="detail-card">
            <div class="detail-header">
                <div class="detail-title">${bug.type}</div>
                <span class="severity-badge severity-${bug.severity}">${bug.severity.toUpperCase()}</span>
            </div>
            <div class="detail-description">${bug.description}</div>
            <div class="detail-code">
                <strong>Line ${bug.line}</strong> | CWE: ${bug.cwe_id || 'N/A'}<br>
                Impact: C:${bug.impact.confidentiality} I:${bug.impact.integrity} A:${bug.impact.availability}
            </div>
            <div class="detail-recommendation">
                <strong>Fix:</strong> ${bug.fix}
            </div>
        </div>
    `).join('');
}

// Display optimization details
function displayOptimizationDetails(optimization) {
    const container = document.getElementById('optimization-details');
    
    if (!optimization.optimizations || optimization.optimizations.length === 0) {
        container.innerHTML = `
            <div class="detail-card">
                <p style="color: #059669; text-align: center; padding: 2rem;">
                    ✓ Code is well-optimized
                </p>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="detail-card">
            <h4 style="color: #00D4FF; margin-bottom: 1rem;">Current Complexity</h4>
            <p style="color: #B0BEC5;">
                <strong>Time Complexity:</strong> ${optimization.current_complexity.time}<br>
                <strong>Space Complexity:</strong> ${optimization.current_complexity.space}
            </p>
        </div>
        ${optimization.optimizations.map(opt => `
            <div class="detail-card">
                <div class="detail-header">
                    <div class="detail-title">${opt.type}</div>
                    <span class="severity-badge severity-low">${opt.improvement}</span>
                </div>
                <div class="detail-description">${opt.description}</div>
                ${opt.trade_offs ? `
                    <div class="detail-recommendation">
                        <strong>Trade-offs:</strong> ${opt.trade_offs}
                    </div>
                ` : ''}
            </div>
        `).join('')}
    `;
}

// Display key insights
function displayInsights(analysis) {
    const container = document.getElementById('insights-details');
    const insights = [];

    // Generate insights based on analysis
    if (analysis.security_analysis.overall_security_score > 7) {
        insights.push({
            title: '🚨 Critical Security Issues',
            description: 'High-severity security vulnerabilities detected that require immediate attention.',
            recommendation: analysis.security_analysis.risk_summary
        });
    }

    if (analysis.bug_analysis.has_bugs) {
        insights.push({
            title: '🐛 Bug Detection',
            description: `Found ${analysis.bug_analysis.bugs_found.length} potential bug(s) in the code.`,
            recommendation: 'Review and fix identified issues to improve code reliability.'
        });
    }

    if (analysis.optimization_analysis.optimizations && analysis.optimization_analysis.optimizations.length > 0) {
        insights.push({
            title: '⚡ Performance Optimization',
            description: `${analysis.optimization_analysis.optimizations.length} optimization opportunity(ies) identified.`,
            recommendation: `Estimated speedup: ${analysis.optimization_analysis.estimated_speedup}`
        });
    }

    if (insights.length === 0) {
        container.innerHTML = `
            <div class="detail-card">
                <p style="color: #059669; text-align: center; padding: 2rem;">
                    ✓ Great job! Your code follows best practices with no major issues detected.
                </p>
            </div>
        `;
    } else {
        container.innerHTML = insights.map(insight => `
            <div class="detail-card">
                <div class="detail-title">${insight.title}</div>
                <div class="detail-description">${insight.description}</div>
                <div class="detail-recommendation">
                    <strong>Recommendation:</strong> ${insight.recommendation}
                </div>
            </div>
        `).join('');
    }
}

// Helper functions
function isValidGitHubUrl(url) {
    return url.includes('github.com') && (url.includes('http://') || url.includes('https://'));
}

function getSeverityClass(cvssScore) {
    if (cvssScore >= 9) return 'critical';
    if (cvssScore >= 7) return 'high';
    if (cvssScore >= 4) return 'medium';
    return 'low';
}

function getSeverity(cvssScore) {
    if (cvssScore >= 9) return 'CRITICAL';
    if (cvssScore >= 7) return 'HIGH';
    if (cvssScore >= 4) return 'MEDIUM';
    return 'LOW';
}

function getQualityGrade(score) {
    if (score >= 90) return 'Grade A - Excellent';
    if (score >= 80) return 'Grade B - Good';
    if (score >= 70) return 'Grade C - Fair';
    if (score >= 60) return 'Grade D - Poor';
    return 'Grade F - Critical';
}

// Progress management
function showProgress() {
    document.getElementById('progress-container').style.display = 'block';
    document.getElementById('results-container').style.display = 'none';
    document.getElementById('progress-container').scrollIntoView({ behavior: 'smooth' });
    updateProgress(0, 'Initializing analysis...', null);
}

function hideProgress() {
    document.getElementById('progress-container').style.display = 'none';
    if (progressInterval) {
        clearInterval(progressInterval);
    }
}

function updateProgress(percentage, message, activeStep) {
    document.getElementById('progress-fill').style.width = percentage + '%';
    document.getElementById('progress-text').textContent = message;
    
    if (activeStep) {
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
        });
        document.getElementById(activeStep).classList.add('active');
    }
}

// Download report
async function downloadReport(format) {
    if (!currentAnalysisResult) {
        alert('No analysis results available');
        return;
    }

    try {
        if (currentJobId) {
            // Download from backend
            window.open(`https://neurashield.onrender.com/api/download/${currentJobId}/${format}`, '_blank');
        } else {
            // Generate client-side download
            generateClientSideReport(format);
        }
    } catch (error) {
        console.error('Error downloading report:', error);
        generateClientSideReport(format);
    }
}

function generateClientSideReport(format) {
    const report = generateReportText(currentAnalysisResult);
    
    if (format === 'txt') {
        downloadTextFile(report, 'neurashield-analysis-report.txt');
    } else if (format === 'html') {
        downloadHTMLFile(report, 'neurashield-analysis-report.html');
    } else if (format === 'pdf') {
        alert('PDF download requires backend server. Downloading as TXT instead.');
        downloadTextFile(report, 'neurashield-analysis-report.txt');
    }
}

function generateReportText(analysis) {
    return `
========================================
NEURASHIELD.AI - CODE ANALYSIS REPORT
========================================
Timestamp: ${new Date().toLocaleString()}
Analysis Type: Comprehensive Security & Quality Scan

----------------------------------------
SUMMARY
----------------------------------------
Security Score: ${analysis.security_analysis.overall_security_score}/10
Severity: ${analysis.security_analysis.overall_severity}
Bugs Found: ${analysis.bug_analysis.bugs_found ? analysis.bug_analysis.bugs_found.length : 0}
Optimizations: ${analysis.optimization_analysis.optimizations ? analysis.optimization_analysis.optimizations.length : 0}

----------------------------------------
SECURITY ANALYSIS
----------------------------------------
${analysis.security_analysis.risk_summary}

Vulnerabilities: ${analysis.security_analysis.vulnerabilities ? analysis.security_analysis.vulnerabilities.length : 0}
${analysis.security_analysis.vulnerabilities ? analysis.security_analysis.vulnerabilities.map((v, i) => `
${i + 1}. ${v.type} (CVSS: ${v.cvss_score})
   Line: ${v.line}
   Description: ${v.description}
   Remediation: ${v.remediation}
`).join('\n') : 'None detected'}

----------------------------------------
BUG DETECTION
----------------------------------------
${analysis.bug_analysis.has_bugs ? 
    analysis.bug_analysis.bugs_found.map((b, i) => `
${i + 1}. ${b.type} (Severity: ${b.severity})
   Line: ${b.line}
   Description: ${b.description}
   Fix: ${b.fix}
`).join('\n') : 'No bugs detected'}

----------------------------------------
OPTIMIZATION OPPORTUNITIES
----------------------------------------
Current Complexity:
- Time: ${analysis.optimization_analysis.current_complexity.time}
- Space: ${analysis.optimization_analysis.current_complexity.space}

${analysis.optimization_analysis.optimizations ? 
    analysis.optimization_analysis.optimizations.map((o, i) => `
${i + 1}. ${o.type}
   Description: ${o.description}
   Improvement: ${o.improvement}
`).join('\n') : 'Code is well-optimized'}

========================================
END OF REPORT
========================================
Generated by NeuraShield AI
© 2025 NeuraShield AI. All rights reserved.
    `.trim();
}

function downloadTextFile(content, filename) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

function downloadHTMLFile(content, filename) {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>NeuraShield Analysis Report</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 2rem; background: #f5f5f5; }
        .container { max-width: 900px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; }
        h1 { color: #00D4FF; }
        h2 { color: #0099CC; border-bottom: 2px solid #00D4FF; padding-bottom: 0.5rem; }
        pre { background: #f8f9fa; padding: 1rem; border-radius: 4px; overflow-x: auto; }
    </style>
</head>
<body>
    <div class="container">
        <pre>${content}</pre>
    </div>
</body>
</html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}
