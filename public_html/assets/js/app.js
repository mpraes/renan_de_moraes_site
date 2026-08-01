/**
 * VS Code IDE Layout & Workspace Manager - Renan De Moraes Portfolio (All src files in Markdown)
 */

(function () {
  'use strict';

  // Global State
  let portfolioRawData = null;
  let currentLang = localStorage.getItem('ide_lang') || 'en';
  const openTabs = ['src/profile.md'];
  let activeTab = 'src/profile.md';
  const articleCache = {};

  // File Registry Definition - ALL src files are Markdown (.md)
  const fileRegistry = [
    {
      folder: 'src',
      files: [
        { path: 'src/profile.md', name: 'profile.md', lang: 'Markdown', iconClass: 'icon-md', icon: '📄' },
        { path: 'src/experience.md', name: 'experience.md', lang: 'Markdown', iconClass: 'icon-md', icon: '📄' },
        { path: 'src/projects.md', name: 'projects.md', lang: 'Markdown', iconClass: 'icon-md', icon: '📄' },
        { path: 'src/skills.md', name: 'skills.md', lang: 'Markdown', iconClass: 'icon-md', icon: '📄' },
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

  function getActiveLangData() {
    if (!portfolioRawData) return null;
    return portfolioRawData[currentLang] || portfolioRawData['en'];
  }

  function findFileObj(path) {
    for (const group of fileRegistry) {
      const found = group.files.find(f => f.path === path);
      if (found) return found;
    }
    return null;
  }

  async function init() {
    try {
      const res = await fetch('./assets/data/content.json');
      portfolioRawData = await res.json();
      window.PortfolioRawData = portfolioRawData;
      window.getCurrentLang = () => currentLang;
    } catch (e) {
      console.error('Failed to load portfolio content data', e);
    }

    renderFileTree();
    renderTabs();
    renderActiveFileContent();
    renderLangToggle();
    setupEventListeners();
  }

  function renderLangToggle() {
    const langElem = document.getElementById('lang-toggle-btn');
    if (langElem) {
      langElem.textContent = currentLang === 'en' ? '🌐 EN / PT-BR' : '🌐 PT-BR / EN';
    }
  }

  function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'pt' : 'en';
    localStorage.setItem('ide_lang', currentLang);
    renderLangToggle();
    renderFileTree();
    renderTabs();
    renderActiveFileContent();
    if (window.onLangChange) window.onLangChange(currentLang);
  }

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

    treeContainer.querySelectorAll('.tree-file-item').forEach(item => {
      item.addEventListener('click', () => {
        const path = item.getAttribute('data-path');
        openFile(path);
      });
    });
  }

  function openFile(path) {
    if (!openTabs.includes(path)) {
      openTabs.push(path);
    }
    activeTab = path;
    renderTabs();
    renderFileTree();
    renderActiveFileContent();
  }

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

    const currentFile = findFileObj(activeTab);
    if (currentFile) {
      if (breadcrumbsPath) breadcrumbsPath.textContent = currentFile.path.replace('/', ' > ');
      if (statusLang) statusLang.textContent = currentFile.lang;
    }

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

  async function renderActiveFileContent() {
    const lineNumbers = document.getElementById('line-numbers');
    const lineContent = document.getElementById('line-content');
    if (!lineNumbers || !lineContent) return;

    const data = getActiveLangData();

    if (!activeTab || !data) {
      lineNumbers.innerHTML = '1';
      lineContent.innerHTML = `<p style="color: var(--text-muted); padding: 20px;">Select a file from the explorer on the left to view its contents.</p>`;
      return;
    }

    if (activeTab === 'src/profile.md' || activeTab === 'src/profile.ts') {
      renderProfileMD(data.profile, lineNumbers, lineContent);
    } else if (activeTab === 'src/experience.md' || activeTab === 'src/experience.json') {
      renderExperienceMD(data.experience, lineNumbers, lineContent);
    } else if (activeTab === 'src/projects.md' || activeTab === 'src/projects.py') {
      renderProjectsMD(data.projects, lineNumbers, lineContent);
    } else if (activeTab === 'src/skills.md' || activeTab === 'src/skills.sql') {
      renderSkillsMD(data.skills, lineNumbers, lineContent);
    } else if (activeTab === 'src/contact.md') {
      renderContactMD(data.contact, lineNumbers, lineContent);
    } else if (activeTab.startsWith('articles/')) {
      await renderMarkdownArticle(activeTab, lineNumbers, lineContent);
    }
  }

  function renderProfileMD(p, lineNumElem, contentElem) {
    const mdCode = `# ${p.name}
> ${p.title}
> 📍 ${p.location}

## ${currentLang === 'pt' ? 'Resumo Executivo' : 'Executive Summary'}
${p.summary}

## ${currentLang === 'pt' ? 'Foco de Engenharia' : 'Top Engineering Focus'}
${p.topSkills.map(s => `- **${s}**`).join('\n')}

## ${currentLang === 'pt' ? 'Certificações' : 'Certifications'}
${p.certifications.map(c => `- 🏆 ${c}`).join('\n')}`;

    updateLineNumbers(lineNumElem, mdCode);

    const skillsBadges = p.topSkills.map(s => `<span class="tech-badge">${escapeHtml(s)}</span>`).join(' ');
    const certsList = p.certifications.map(c => `<li>🏆 ${escapeHtml(c)}</li>`).join('');

    contentElem.innerHTML = `
      <pre style="margin: 0; font-family: var(--font-mono); color: var(--syn-comment); font-size: 13px;">${escapeHtml(mdCode)}</pre>
      
      <div style="margin-top: 24px; border-top: 1px dashed var(--ide-border); padding-top: 16px; font-family: var(--font-ui);">
        <h2 style="color: var(--text-high); margin-top: 0;">👨‍💻 ${escapeHtml(p.name)}</h2>
        <p style="color: var(--accent-cyan); font-weight: 600; margin-top: -6px;">${escapeHtml(p.title)} | 📍 ${escapeHtml(p.location)}</p>
        <p style="line-height: 1.7;">${escapeHtml(p.summary)}</p>
        
        <div style="margin: 16px 0;">
          <h4 style="color: var(--text-high); margin-bottom: 8px;">${currentLang === 'pt' ? 'Foco de Engenharia:' : 'Top Engineering Focus:'}</h4>
          <div class="tech-badge-container">${skillsBadges}</div>
        </div>

        <div style="margin-top: 16px;">
          <h4 style="color: var(--text-high); margin-bottom: 8px;">${currentLang === 'pt' ? 'Certificações:' : 'Certifications:'}</h4>
          <ul style="list-style: none; padding: 0; margin: 0; line-height: 1.8;">${certsList}</ul>
        </div>
      </div>
    `;
  }

  function renderExperienceMD(exp, lineNumElem, contentElem) {
    const mdCode = `# ${currentLang === 'pt' ? 'Histórico de Experiência Profissional' : 'Professional Experience History'}

${exp.map(item => `## ${item.role} @ ${item.company}
*${item.period} | ${item.location}*

${item.highlights.map(h => `- ${h}`).join('\n')}`).join('\n\n')}`;

    updateLineNumbers(lineNumElem, mdCode);

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
      <pre style="margin: 0; font-family: var(--font-mono); color: var(--syn-comment); font-size: 12px;">${escapeHtml(mdCode)}</pre>
      <div style="margin-top: 20px; border-top: 1px dashed var(--ide-border); padding-top: 16px;">
        <h3 style="color: var(--text-high); margin-top: 0;">${currentLang === 'pt' ? 'Trajetória Profissional' : 'Career Timeline'} (${exp.length} ${currentLang === 'pt' ? 'posições' : 'positions'})</h3>
        <div class="code-card-grid">${expCards}</div>
      </div>
    `;
  }

  function renderProjectsMD(proj, lineNumElem, contentElem) {
    const mdCode = `# ${currentLang === 'pt' ? 'Projetos em Destaque' : 'Featured Projects'}

${proj.map(p => `### ${p.title}
${p.description}
- **Tech**: ${p.tech.join(', ')}
- **Link**: [${p.link}](${p.link})`).join('\n\n')}`;

    updateLineNumbers(lineNumElem, mdCode);

    const projCards = proj.map(p => `
      <div class="code-card">
        <h3 class="code-card-title">🚀 ${escapeHtml(p.title)}</h3>
        <p style="font-size: 13px; color: var(--text-main); line-height: 1.6;">${escapeHtml(p.description)}</p>
        <div class="tech-badge-container">
          ${p.tech.map(t => `<span class="tech-badge">${escapeHtml(t)}</span>`).join('')}
        </div>
        <div style="margin-top: 14px;">
          <a href="${p.link}" target="_blank" rel="noopener" style="color: var(--accent-cyan); font-weight: 600; text-decoration: none; font-size: 12px;">🔗 ${currentLang === 'pt' ? 'Ver Repositório' : 'View Repository'} →</a>
        </div>
      </div>
    `).join('');

    contentElem.innerHTML = `
      <pre style="margin: 0; font-family: var(--font-mono); color: var(--syn-comment); font-size: 12px;">${escapeHtml(mdCode)}</pre>
      <div style="margin-top: 20px; border-top: 1px dashed var(--ide-border); padding-top: 16px;">
        <h3 style="color: var(--text-high); margin-top: 0;">${currentLang === 'pt' ? 'Projetos em Destaque & Open Source' : 'Featured Engineering & Open Source Projects'}</h3>
        <div class="code-card-grid">${projCards}</div>
      </div>
    `;
  }

  function renderSkillsMD(s, lineNumElem, contentElem) {
    const mdCode = `# ${currentLang === 'pt' ? 'Habilidades Técnicas & Stack' : 'Technical Capabilities & Stack'}

### Data Engineering
${s.dataEngineering.map(x => `- ${x}`).join('\n')}

### Enterprise Databases
${s.databases.map(x => `- ${x}`).join('\n')}

### Applied AI & Languages
${s.aiAndLanguages.map(x => `- ${x}`).join('\n')}

### BI & Analytics
${s.biAndAnalytics.map(x => `- ${x}`).join('\n')}`;

    updateLineNumbers(lineNumElem, mdCode);

    contentElem.innerHTML = `
      <pre style="margin: 0; font-family: var(--font-mono); color: var(--syn-comment); font-size: 13px;">${escapeHtml(mdCode)}</pre>
      <div style="margin-top: 24px; border-top: 1px dashed var(--ide-border); padding-top: 16px; font-family: var(--font-ui);">
        <h3 style="color: var(--text-high); margin-top: 0;">${currentLang === 'pt' ? 'Matriz de Habilidades Técnicas' : 'Technical Capabilities Matrix'}</h3>
        <div class="code-card-grid">
          <div class="code-card">
            <h4 style="color: var(--accent-cyan); margin-top: 0;">🏗️ ${currentLang === 'pt' ? 'Arquitetura de Dados' : 'Data Architecture & Engineering'}</h4>
            <div class="tech-badge-container">${s.dataEngineering.map(x => `<span class="tech-badge">${escapeHtml(x)}</span>`).join('')}</div>
          </div>
          <div class="code-card">
            <h4 style="color: var(--accent-cyan); margin-top: 0;">🗄️ ${currentLang === 'pt' ? 'Bancos de Dados Enterprise' : 'Enterprise Databases'}</h4>
            <div class="tech-badge-container">${s.databases.map(x => `<span class="tech-badge">${escapeHtml(x)}</span>`).join('')}</div>
          </div>
          <div class="code-card">
            <h4 style="color: var(--accent-cyan); margin-top: 0;">🤖 ${currentLang === 'pt' ? 'IA Aplicada & Linguagens' : 'Applied AI & Programming'}</h4>
            <div class="tech-badge-container">${s.aiAndLanguages.map(x => `<span class="tech-badge">${escapeHtml(x)}</span>`).join('')}</div>
          </div>
          <div class="code-card">
            <h4 style="color: var(--accent-cyan); margin-top: 0;">📊 ${currentLang === 'pt' ? 'Business Intelligence & Analytics' : 'Business Intelligence & Analytics'}</h4>
            <div class="tech-badge-container">${s.biAndAnalytics.map(x => `<span class="tech-badge">${escapeHtml(x)}</span>`).join('')}</div>
          </div>
        </div>
      </div>
    `;
  }

  function renderContactMD(c, lineNumElem, contentElem) {
    const mdCode = `# Contact Information & Links (${currentLang.toUpperCase()})

- **Email**: [${c.email}](mailto:${c.email})
- **Phone / Mobile**: ${c.phone}
- **LinkedIn**: [${c.linkedin}](${c.linkedin})
- **GitHub**: [${c.github}](${c.github})
- **Location**: ${c.location}
- **Status**: 🟢 ${currentLang === 'pt' ? 'Disponível para Projetos & Consultoria' : 'Open for Senior Consulting & Lead Engineering Roles'}`;

    updateLineNumbers(lineNumElem, mdCode);

    contentElem.innerHTML = `
      <div class="markdown-article">
        <h1>📫 ${currentLang === 'pt' ? 'Contato e Links Profissionais' : 'Contact & Professional Links'}</h1>
        <p style="font-size: 15px; color: var(--text-main); margin-bottom: 24px;">${currentLang === 'pt' ? 'Entre em contato para projetos de arquitetura de dados, engenharia de IA ou consultoria técnica.' : 'Feel free to reach out for data architecture consulting, AI engineering projects, or technical collaboration.'}</p>
        
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
    const parsedHtml = parseSimpleMarkdown(mdText);
    contentElem.innerHTML = `<div class="markdown-article">${parsedHtml}</div>`;
  }

  function updateLineNumbers(lineNumElem, text) {
    const linesCount = text.split('\n').length;
    let numbersHtml = '';
    for (let i = 1; i <= linesCount; i++) {
      numbersHtml += `${i}<br>`;
    }
    lineNumElem.innerHTML = numbersHtml;
  }

  function parseSimpleMarkdown(md) {
    let html = md
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener" style="color: var(--accent-cyan);">$1</a>')
      .replace(/^-\s+(.*$)/gim, '<li>$1</li>');

    html = html.replace(/```python([\s\S]*?)```/gim, '<pre><code class="language-python">$1</code></pre>');
    html = html.replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');

    return html;
  }

  function setupEventListeners() {
    const searchInput = document.getElementById('file-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        renderFileTree(e.target.value.trim());
      });
    }

    const langToggleBtn = document.getElementById('lang-toggle-btn');
    if (langToggleBtn) {
      langToggleBtn.addEventListener('click', toggleLanguage);
    }

    const cmdBtn = document.getElementById('cmd-palette-btn');
    if (cmdBtn) {
      cmdBtn.addEventListener('click', () => {
        if (searchInput) searchInput.focus();
      });
    }

    // Toggle / Hide Sidebar Pane
    const toggleExplorer = document.getElementById('btn-toggle-explorer');
    const closeSidebar = document.getElementById('btn-close-sidebar');
    const sidebar = document.getElementById('sidebar-pane');

    function toggleSidebarState(forceHide) {
      if (!sidebar) return;
      if (forceHide === true) {
        sidebar.classList.add('hidden');
        if (toggleExplorer) toggleExplorer.classList.remove('active');
      } else if (forceHide === false) {
        sidebar.classList.remove('hidden');
        if (toggleExplorer) toggleExplorer.classList.add('active');
      } else {
        const isHidden = sidebar.classList.toggle('hidden');
        if (toggleExplorer) {
          if (isHidden) toggleExplorer.classList.remove('active');
          else toggleExplorer.classList.add('active');
        }
      }
    }

    if (toggleExplorer) toggleExplorer.addEventListener('click', () => toggleSidebarState());
    if (closeSidebar) closeSidebar.addEventListener('click', () => toggleSidebarState(true));

    // Toggle / Hide Copilot Pane
    const toggleCopilot = document.getElementById('btn-toggle-copilot');
    const closeCopilot = document.getElementById('btn-close-copilot');
    const copilotPane = document.getElementById('copilot-pane');

    function toggleCopilotState(forceHide) {
      if (!copilotPane) return;
      if (forceHide === true) {
        copilotPane.classList.add('hidden');
        if (toggleCopilot) toggleCopilot.classList.remove('active');
      } else if (forceHide === false) {
        copilotPane.classList.remove('hidden');
        if (toggleCopilot) toggleCopilot.classList.add('active');
      } else {
        const isHidden = copilotPane.classList.toggle('hidden');
        if (toggleCopilot) {
          if (isHidden) toggleCopilot.classList.remove('active');
          else toggleCopilot.classList.add('active');
        }
      }
    }

    if (toggleCopilot) toggleCopilot.addEventListener('click', () => toggleCopilotState());
    if (closeCopilot) closeCopilot.addEventListener('click', () => toggleCopilotState(true));

    // Keyboard Shortcuts (Ctrl+K for Search, Ctrl+B for Sidebar)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (searchInput) searchInput.focus();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleSidebarState();
      }
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  window.IDEManager = {
    openFile,
    switchTab: openFile,
    getActiveTab: () => activeTab,
    getPortfolioData: getActiveLangData,
    toggleLanguage
  };

  document.addEventListener('DOMContentLoaded', init);
})();
