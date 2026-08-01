/**
 * VS Code IDE Layout & Workspace Manager - Renan De Moraes Portfolio
 */

(function () {
  'use strict';

  // Global State
  let portfolioData = null;
  const openTabs = ['src/profile.ts'];
  let activeTab = 'src/profile.ts';
  const articleCache = {};

  // File Registry Definition
  const fileRegistry = [
    {
      folder: 'src',
      files: [
        { path: 'src/profile.ts', name: 'profile.ts', lang: 'TypeScript', iconClass: 'icon-ts', icon: '📄' },
        { path: 'src/experience.json', name: 'experience.json', lang: 'JSON', iconClass: 'icon-json', icon: '📄' },
        { path: 'src/projects.py', name: 'projects.py', lang: 'Python', iconClass: 'icon-py', icon: '📄' },
        { path: 'src/skills.sql', name: 'skills.sql', lang: 'SQL', iconClass: 'icon-sql', icon: '📄' },
        { path: 'src/contact.md', name: 'contact.md', lang: 'Markdown', iconClass: 'icon-md', icon: '📄' }
      ]
    },
    {
      folder: 'articles',
      folderName: 'articles (blog) 📝',
      files: [
        { path: 'articles/01-fabric-medallion-architecture.md', name: '01-fabric-medallion.md', title: 'Fabric Medallion Architecture', lang: 'Markdown', iconClass: 'icon-md', icon: '📝' },
        { path: 'articles/02-langgraph-n1-support-agent.md', name: '02-langgraph-agent.md', title: 'LangGraph N1 Support Agent', lang: 'Markdown', iconClass: 'icon-md', icon: '📝' },
        { path: 'articles/03-high-volume-sap-migrations.md', name: '03-sap-migrations.md', title: '200M+ SAP Migration', lang: 'Markdown', iconClass: 'icon-md', icon: '📝' },
        { path: 'articles/04-constrained-data-engineering.md', name: '04-constrained-engineering.md', title: '70M Constrained Engineering', lang: 'Markdown', iconClass: 'icon-md', icon: '📝' }
      ]
    }
  ];

  // Helper: Find File Object
  function findFileObj(path) {
    for (const group of fileRegistry) {
      const found = group.files.find(f => f.path === path);
      if (found) return found;
    }
    return null;
  }

  // Initialize Portfolio
  async function init() {
    try {
      const res = await fetch('./assets/data/content.json');
      portfolioData = await res.json();
      window.PortfolioData = portfolioData;
    } catch (e) {
      console.error('Failed to load portfolio content data', e);
    }

    renderFileTree();
    renderTabs();
    renderActiveFileContent();
    setupEventListeners();
  }

  // Render Left Explorer Tree
  function renderFileTree(filter = '') {
    const treeContainer = document.getElementById('file-tree');
    if (!treeContainer) return;

    let html = '';
    fileRegistry.forEach(group => {
      const folderTitle = group.folderName || group.folder;
      const matchingFiles = group.files.filter(f => 
        !filter || f.name.toLowerCase().includes(filter.toLowerCase()) || (f.title && f.title.toLowerCase().includes(filter.toLowerCase()))
      );

      if (matchingFiles.length > 0) {
        html += `<div class="tree-folder">
          <div class="tree-folder-title">
            <span>📂</span>
            <span>${escapeHtml(folderTitle)}</span>
          </div>
          <ul class="tree-file-list">`;
        
        matchingFiles.forEach(file => {
          const isActive = file.path === activeTab ? 'active' : '';
          html += `<li class="tree-file-item ${isActive}" data-path="${file.path}">
            <span class="file-icon ${file.iconClass}">${file.icon}</span>
            <span>${escapeHtml(file.name)}</span>
          </li>`;
        });

        html += `</ul></div>`;
      }
    });

    treeContainer.innerHTML = html;

    // Attach File Click Handlers
    treeContainer.querySelectorAll('.tree-file-item').forEach(item => {
      item.addEventListener('click', () => {
        const path = item.getAttribute('data-path');
        openFile(path);
      });
    });
  }

  // Tab Management: Open File
  function openFile(path) {
    if (!openTabs.includes(path)) {
      openTabs.push(path);
    }
    activeTab = path;
    renderTabs();
    renderFileTree();
    renderActiveFileContent();
  }

  // Tab Management: Close Tab
  function closeTab(path, event) {
    if (event) event.stopPropagation();
    const idx = openTabs.indexOf(path);
    if (idx !== -1) {
      openTabs.splice(idx, 1);
    }
    if (activeTab === path) {
      activeTab = openTabs.length > 0 ? openTabs[Math.max(0, idx - 1)] : '';
    }
    renderTabs();
    renderFileTree();
    renderActiveFileContent();
  }

  // Render Top Tab Bar
  function renderTabs() {
    const tabBar = document.getElementById('tab-bar');
    const breadcrumbsPath = document.getElementById('breadcrumb-active-path');
    const statusLang = document.getElementById('language-mode-status');
    if (!tabBar) return;

    if (openTabs.length === 0) {
      tabBar.innerHTML = `<div class="editor-tab active"><span>No File Open</span></div>`;
      if (breadcrumbsPath) breadcrumbsPath.textContent = 'workspace';
      return;
    }

    let html = '';
    openTabs.forEach(path => {
      const file = findFileObj(path);
      if (!file) return;
      const isActive = path === activeTab ? 'active' : '';
      html += `<div class="editor-tab ${isActive}" data-path="${path}">
        <span class="file-icon ${file.iconClass}">${file.icon}</span>
        <span>${escapeHtml(file.name)}</span>
        <button class="tab-close-btn" data-close="${path}">✕</button>
      </div>`;
    });

    tabBar.innerHTML = html;

    // Active File Header Info
    const currentFile = findFileObj(activeTab);
    if (currentFile) {
      if (breadcrumbsPath) breadcrumbsPath.textContent = currentFile.path.replace('/', ' > ');
      if (statusLang) statusLang.textContent = currentFile.lang;
    }

    // Attach Tab Click Events
    tabBar.querySelectorAll('.editor-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-close-btn')) return;
        const path = tab.getAttribute('data-path');
        activeTab = path;
        renderTabs();
        renderFileTree();
        renderActiveFileContent();
      });
    });

    tabBar.querySelectorAll('.tab-close-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const path = btn.getAttribute('data-close');
        closeTab(path, e);
      });
    });
  }

  // Render Active File Content in Code Buffer
  async function renderActiveFileContent() {
    const lineNumbers = document.getElementById('line-numbers');
    const lineContent = document.getElementById('line-content');
    if (!lineNumbers || !lineContent) return;

    if (!activeTab || !portfolioData) {
      lineNumbers.innerHTML = '1';
      lineContent.innerHTML = `<p style="color: var(--text-muted); padding: 20px;">Select a file from the explorer on the left to view its contents.</p>`;
      return;
    }

    if (activeTab === 'src/profile.ts') {
      renderProfileTS(lineNumbers, lineContent);
    } else if (activeTab === 'src/experience.json') {
      renderExperienceJSON(lineNumbers, lineContent);
    } else if (activeTab === 'src/projects.py') {
      renderProjectsPY(lineNumbers, lineContent);
    } else if (activeTab === 'src/skills.sql') {
      renderSkillsSQL(lineNumbers, lineContent);
    } else if (activeTab === 'src/contact.md') {
      renderContactMD(lineNumbers, lineContent);
    } else if (activeTab.startsWith('articles/')) {
      await renderMarkdownArticle(activeTab, lineNumbers, lineContent);
    }
  }

  // Render profile.ts
  function renderProfileTS(lineNumElem, contentElem) {
    const p = portfolioData.profile;
    const code = `/**
 * @file profile.ts
 * @author ${p.name}
 * @role ${p.title}
 * @location ${p.location}
 */

export interface SeniorConsultant {
  name: string;
  role: string;
  summary: string;
  topSkills: string[];
  certifications: string[];
}

export const engineer: SeniorConsultant = {
  name: "${p.name}",
  role: "${p.title}",
  summary: "${p.summary.replace(/"/g, '\\"')}",
  topSkills: ${JSON.stringify(p.topSkills, null, 2)},
  certifications: ${JSON.stringify(p.certifications, null, 2)}
};`;

    updateLineNumbers(lineNumElem, code);

    const skillsBadges = p.topSkills.map(s => `<span class="tech-badge">${escapeHtml(s)}</span>`).join(' ');
    const certsList = p.certifications.map(c => `<li>🏆 ${escapeHtml(c)}</li>`).join('');

    contentElem.innerHTML = `
      <pre style="margin: 0; font-family: var(--font-mono); color: var(--syn-comment); font-size: 13px;">${escapeHtml(code)}</pre>
      
      <div style="margin-top: 24px; border-top: 1px dashed var(--ide-border); padding-top: 16px; font-family: var(--font-ui);">
        <h2 style="color: var(--text-high); margin-top: 0;">👨‍💻 ${escapeHtml(p.name)}</h2>
        <p style="color: var(--accent-cyan); font-weight: 600; margin-top: -6px;">${escapeHtml(p.title)} | 📍 ${escapeHtml(p.location)}</p>
        <p style="line-height: 1.7;">${escapeHtml(p.summary)}</p>
        
        <div style="margin: 16px 0;">
          <h4 style="color: var(--text-high); margin-bottom: 8px;">Top Engineering Focus:</h4>
          <div class="tech-badge-container">${skillsBadges}</div>
        </div>

        <div style="margin-top: 16px;">
          <h4 style="color: var(--text-high); margin-bottom: 8px;">Certifications:</h4>
          <ul style="list-style: none; padding: 0; margin: 0; line-height: 1.8;">${certsList}</ul>
        </div>
      </div>
    `;
  }

  // Render experience.json
  function renderExperienceJSON(lineNumElem, contentElem) {
    const exp = portfolioData.experience;
    const jsonStr = JSON.stringify(exp, null, 2);
    updateLineNumbers(lineNumElem, jsonStr);

    const expCards = exp.map(item => `
      <div class="code-card">
        <h3 class="code-card-title">${escapeHtml(item.role)}</h3>
        <div class="code-card-subtitle">${escapeHtml(item.company)} | ${escapeHtml(item.period)}</div>
        <ul style="padding-left: 18px; margin: 8px 0; font-size: 13px; line-height: 1.6;">
          ${item.highlights.map(h => `<li style="margin-bottom: 6px;">${escapeHtml(h)}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    contentElem.innerHTML = `
      <div style="margin-bottom: 16px; color: var(--syn-comment); font-size: 12px;">// experience.json - Professional Career History (${exp.length} positions)</div>
      <div class="code-card-grid">${expCards}</div>
    `;
  }

  // Render projects.py
  function renderProjectsPY(lineNumElem, contentElem) {
    const proj = portfolioData.projects;
    const pythonCode = `import dataclasses
from typing import List

@dataclasses.dataclass
class Project:
    title: str
    tech_stack: List[str]
    description: str
    repo_url: str

projects: List[Project] = [
${proj.map(p => `    Project(title="${p.title}", tech_stack=${JSON.stringify(p.tech)}, description="${p.description}", repo_url="${p.link}")`).join(',\n')}
]`;

    updateLineNumbers(lineNumElem, pythonCode);

    const projCards = proj.map(p => `
      <div class="code-card">
        <h3 class="code-card-title">🚀 ${escapeHtml(p.title)}</h3>
        <p style="font-size: 13px; color: var(--text-main); line-height: 1.6;">${escapeHtml(p.description)}</p>
        <div class="tech-badge-container">
          ${p.tech.map(t => `<span class="tech-badge">${escapeHtml(t)}</span>`).join('')}
        </div>
        <div style="margin-top: 14px;">
          <a href="${p.link}" target="_blank" rel="noopener" style="color: var(--accent-cyan); font-weight: 600; text-decoration: none; font-size: 12px;">🔗 View Repository →</a>
        </div>
      </div>
    `).join('');

    contentElem.innerHTML = `
      <pre style="margin: 0; font-family: var(--font-mono); color: var(--syn-comment); font-size: 12px;">${escapeHtml(pythonCode)}</pre>
      <div style="margin-top: 20px; border-top: 1px dashed var(--ide-border); padding-top: 16px;">
        <h3 style="color: var(--text-high); margin-top: 0;">Featured Engineering & Open Source Projects</h3>
        <div class="code-card-grid">${projCards}</div>
      </div>
    `;
  }

  // Render skills.sql
  function renderSkillsSQL(lineNumElem, contentElem) {
    const s = portfolioData.skills;
    const sqlCode = `-- skills.sql - Categorized Data Engineering & AI Stack

SELECT 'Data Engineering' AS category, ARRAY[${s.dataEngineering.map(x => `'${x}'`).join(', ')}] AS stack
UNION ALL
SELECT 'Databases & Storage', ARRAY[${s.databases.map(x => `'${x}'`).join(', ')}]
UNION ALL
SELECT 'AI & Languages', ARRAY[${s.aiAndLanguages.map(x => `'${x}'`).join(', ')}]
UNION ALL
SELECT 'BI & Analytics', ARRAY[${s.biAndAnalytics.map(x => `'${x}'`).join(', ')}];`;

    updateLineNumbers(lineNumElem, sqlCode);

    contentElem.innerHTML = `
      <pre style="margin: 0; font-family: var(--font-mono); color: var(--syn-keyword); font-size: 13px;">${escapeHtml(sqlCode)}</pre>
      <div style="margin-top: 24px; border-top: 1px dashed var(--ide-border); padding-top: 16px; font-family: var(--font-ui);">
        <h3 style="color: var(--text-high); margin-top: 0;">Technical Capabilities Matrix</h3>
        <div class="code-card-grid">
          <div class="code-card">
            <h4 style="color: var(--accent-cyan); margin-top: 0;">🏗️ Data Architecture & Engineering</h4>
            <div class="tech-badge-container">${s.dataEngineering.map(x => `<span class="tech-badge">${escapeHtml(x)}</span>`).join('')}</div>
          </div>
          <div class="code-card">
            <h4 style="color: var(--accent-cyan); margin-top: 0;">🗄️ Enterprise Databases</h4>
            <div class="tech-badge-container">${s.databases.map(x => `<span class="tech-badge">${escapeHtml(x)}</span>`).join('')}</div>
          </div>
          <div class="code-card">
            <h4 style="color: var(--accent-cyan); margin-top: 0;">🤖 Applied AI & Programming</h4>
            <div class="tech-badge-container">${s.aiAndLanguages.map(x => `<span class="tech-badge">${escapeHtml(x)}</span>`).join('')}</div>
          </div>
          <div class="code-card">
            <h4 style="color: var(--accent-cyan); margin-top: 0;">📊 Business Intelligence & Analytics</h4>
            <div class="tech-badge-container">${s.biAndAnalytics.map(x => `<span class="tech-badge">${escapeHtml(x)}</span>`).join('')}</div>
          </div>
        </div>
      </div>
    `;
  }

  // Render contact.md
  function renderContactMD(lineNumElem, contentElem) {
    const c = portfolioData.contact;
    const mdCode = `# Contact Information & Links

- **Email**: [${c.email}](mailto:${c.email})
- **Phone / Mobile**: ${c.phone}
- **LinkedIn**: [${c.linkedin}](${c.linkedin})
- **GitHub**: [${c.github}](${c.github})
- **Location**: ${c.location}
- **Status**: 🟢 Open for Senior Consulting & Lead Engineering Roles`;

    updateLineNumbers(lineNumElem, mdCode);

    contentElem.innerHTML = `
      <div class="markdown-article">
        <h1>📫 Contact & Professional Links</h1>
        <p style="font-size: 15px; color: var(--text-main); margin-bottom: 24px;">Feel free to reach out for data architecture consulting, AI engineering projects, or technical collaboration.</p>
        
        <div class="code-card" style="max-width: 500px;">
          <ul style="list-style: none; padding: 0; margin: 0; line-height: 2.2; font-size: 14px;">
            <li>📧 <strong>Email</strong>: <a href="mailto:${c.email}" style="color: var(--accent-cyan);">${escapeHtml(c.email)}</a></li>
            <li>📱 <strong>Phone</strong>: ${escapeHtml(c.phone)}</li>
            <li>💼 <strong>LinkedIn</strong>: <a href="${c.linkedin}" target="_blank" rel="noopener" style="color: var(--accent-cyan);">${escapeHtml(c.linkedin)}</a></li>
            <li>🐙 <strong>GitHub</strong>: <a href="${c.github}" target="_blank" rel="noopener" style="color: var(--accent-cyan);">${escapeHtml(c.github)}</a></li>
            <li>📍 <strong>Location</strong>: ${escapeHtml(c.location)}</li>
          </ul>
        </div>
      </div>
    `;
  }

  // Render Markdown Article from articles/ directory
  async function renderMarkdownArticle(path, lineNumElem, contentElem) {
    let mdText = articleCache[path];
    if (!mdText) {
      try {
        const res = await fetch(`./${path}`);
        mdText = await res.text();
        articleCache[path] = mdText;
      } catch (e) {
        mdText = `# Article Not Found\nCould not load article at ${path}`;
      }
    }

    updateLineNumbers(lineNumElem, mdText);

    // Simple Markdown Parser for Articles
    const parsedHtml = parseSimpleMarkdown(mdText);
    contentElem.innerHTML = `<div class="markdown-article">${parsedHtml}</div>`;
  }

  // Update Line Numbers Gutter
  function updateLineNumbers(lineNumElem, text) {
    const linesCount = text.split('\n').length;
    let numbersHtml = '';
    for (let i = 1; i <= linesCount; i++) {
      numbersHtml += `${i}<br>`;
    }
    lineNumElem.innerHTML = numbersHtml;
  }

  // Simple Markdown Parser
  function parseSimpleMarkdown(md) {
    let html = md
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener" style="color: var(--accent-cyan);">$1</a>')
      .replace(/^-\s+(.*$)/gim, '<li>$1</li>');

    // Code blocks handling
    html = html.replace(/```python([\s\S]*?)```/gim, '<pre><code class="language-python">$1</code></pre>');
    html = html.replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');

    return html;
  }

  // Event Listeners for UI Actions
  function setupEventListeners() {
    // Search input filter in sidebar
    const searchInput = document.getElementById('file-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        renderFileTree(e.target.value.trim());
      });
    }

    // Command palette / header search click
    const cmdBtn = document.getElementById('cmd-palette-btn');
    if (cmdBtn) {
      cmdBtn.addEventListener('click', () => {
        if (searchInput) {
          searchInput.focus();
        }
      });
    }

    // Toggle Sidebar
    const toggleExplorer = document.getElementById('btn-toggle-explorer');
    const sidebar = document.getElementById('sidebar-pane');
    if (toggleExplorer && sidebar) {
      toggleExplorer.addEventListener('click', () => {
        sidebar.classList.toggle('visible');
        toggleExplorer.classList.toggle('active');
      });
    }

    // Toggle Copilot Chatbot Pane
    const toggleCopilot = document.getElementById('btn-toggle-copilot');
    const copilotPane = document.getElementById('copilot-pane');
    if (toggleCopilot && copilotPane) {
      toggleCopilot.addEventListener('click', () => {
        copilotPane.classList.toggle('visible');
        toggleCopilot.classList.toggle('active');
      });
    }

    // Keyboard Shortcuts (Ctrl+K or Cmd+K)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (searchInput) searchInput.focus();
      }
    });
  }

  // HTML Escape Utility
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Expose Global IDE Manager API
  window.IDEManager = {
    openFile,
    switchTab: openFile,
    getActiveTab: () => activeTab,
    getPortfolioData: () => portfolioData
  };

  // Run Initialization on DOM Load
  document.addEventListener('DOMContentLoaded', init);
})();
