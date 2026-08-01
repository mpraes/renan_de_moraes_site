/**
 * VS Code IDE Layout & Workspace Manager - Renan De Moraes Portfolio (With GitHub Starred Projects Folder)
 */

(function () {
  'use strict';

  // Global State
  let portfolioRawData = null;
  let currentLang = localStorage.getItem('ide_lang') || 'en';
  const openTabs = [];
  let activeTab = '';
  const articleCache = {};

  // File Registry Definition
  const fileRegistry = [
    {
      folder: 'src',
      folderName: 'src 📁',
      files: [
        { path: 'src/profile.md', name: 'profile.md', lang: 'Markdown', iconClass: 'icon-md', icon: '📄' },
        { path: 'src/experience.md', name: 'experience.md', lang: 'Markdown', iconClass: 'icon-md', icon: '📄' },
        { path: 'src/skills.md', name: 'skills.md', lang: 'Markdown', iconClass: 'icon-md', icon: '📄' },
        { path: 'src/contact.md', name: 'contact.md', lang: 'Markdown', iconClass: 'icon-md', icon: '📄' }
      ]
    },
    {
      folder: 'projects',
      folderName: 'projects (featured & starred) ⭐',
      files: [
        { path: 'projects/verometric.md', name: 'verometric.md', title: 'Verometric 🔒', lang: 'Markdown', iconClass: 'icon-md', icon: '🌐' },
        { path: 'projects/canicodewithoutai.md', name: 'canicodewithoutai.md', title: 'Can I Code Without AI? 🤖', lang: 'Markdown', iconClass: 'icon-md', icon: '🌐' },
        { path: 'projects/quickelt.md', name: 'quickelt.md', title: 'QuickELT ⭐ 31', lang: 'Markdown', iconClass: 'icon-md', icon: '⭐' },
        { path: 'projects/ingestao-no-limite.md', name: 'ingestao-no-limite.md', title: 'Ingestão no Limite ⭐ 24', lang: 'Markdown', iconClass: 'icon-md', icon: '⭐' },
        { path: 'projects/pandas-pipeline-agent.md', name: 'pandas-pipeline-agent.md', title: 'Pandas Pipeline Agent ⭐ 10', lang: 'Markdown', iconClass: 'icon-md', icon: '⭐' },
        { path: 'projects/awesome-faith-tech.md', name: 'awesome-faith-tech.md', title: 'Awesome Faith Tech ⭐ 8', lang: 'Markdown', iconClass: 'icon-md', icon: '⭐' },
        { path: 'projects/webapp-gas-mais-barato.md', name: 'webapp-gas-mais-barato.md', title: 'Gás Mais Barato ⭐ 6', lang: 'Markdown', iconClass: 'icon-md', icon: '⭐' },
        { path: 'projects/data-scout.md', name: 'data-scout.md', title: 'Data Scout ⭐ 5', lang: 'Markdown', iconClass: 'icon-md', icon: '⭐' },
        { path: 'projects/single-node-dw.md', name: 'single-node-dw.md', title: 'Single Node DW ⭐ 5', lang: 'Markdown', iconClass: 'icon-md', icon: '⭐' }
      ]
    },
    {
      folder: 'articles',
      folderName: 'articles (blog) 📝',
      files: [
        { path: 'articles/01-projetos-consultoria-p1.md', name: '01-projetos-consultoria-p1.md', title: 'Consultoria Projetos (Parte 1)', lang: 'Markdown', iconClass: 'icon-md', icon: '📝' },
        { path: 'articles/02-projetos-consultoria-p2.md', name: '02-projetos-consultoria-p2.md', title: 'Consultoria Projetos (Parte 2)', lang: 'Markdown', iconClass: 'icon-md', icon: '📝' },
        { path: 'articles/03-pyspark-vs-pandas-vs-duckdb.md', name: '03-pyspark-vs-pandas-vs-duckdb.md', title: 'PySpark vs Pandas vs DuckDB', lang: 'Markdown', iconClass: 'icon-md', icon: '📝' },
        { path: 'articles/04-normalization-in-action.md', name: '04-normalization-in-action.md', title: 'Normalization in Data Modeling', lang: 'Markdown', iconClass: 'icon-md', icon: '📝' },
        { path: 'articles/05-mastering-data-modeling-p2.md', name: '05-mastering-data-modeling-p2.md', title: 'Mastering Data Modeling P2', lang: 'Markdown', iconClass: 'icon-md', icon: '📝' },
        { path: 'articles/06-inmon-vs-kimball-dw.md', name: '06-inmon-vs-kimball-dw.md', title: 'Inmon vs Kimball Data Warehouse', lang: 'Markdown', iconClass: 'icon-md', icon: '📝' },
        { path: 'articles/07-relational-foundations-sql.md', name: '07-relational-foundations-sql.md', title: 'Relational Foundations SQL', lang: 'Markdown', iconClass: 'icon-md', icon: '📝' },
        { path: 'articles/08-sql-fundamentals.md', name: '08-sql-fundamentals.md', title: 'SQL Fundamentals for Analytics', lang: 'Markdown', iconClass: 'icon-md', icon: '📝' },
        { path: 'articles/09-caso-bndes-csv-datalake.md', name: '09-caso-bndes-csv-datalake.md', title: 'Caso BNDES CSV Data Lake', lang: 'Markdown', iconClass: 'icon-md', icon: '📝' },
        { path: 'articles/10-infraestrutura-moderna-dados.md', name: '10-infraestrutura-moderna-dados.md', title: 'Infraestrutura Moderna de Dados', lang: 'Markdown', iconClass: 'icon-md', icon: '📝' }
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
    const headerLangBtn = document.getElementById('header-lang-btn');
    const welcomeLangBtn = document.getElementById('welcome-lang-btn');

    const label = currentLang === 'en' ? '🌐 EN / PT-BR' : '🌐 PT-BR / EN';
    if (langElem) langElem.textContent = label;
    if (headerLangBtn) headerLangBtn.textContent = label;
    if (welcomeLangBtn) {
      welcomeLangBtn.textContent = currentLang === 'en' ? '🌐 Mudar para Português (PT-BR)' : '🌐 Switch to English (EN)';
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
    const root = document.getElementById('app-root');
    if (root) root.classList.remove('welcome-mode');

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

    if (!activeTab || activeTab === 'welcome' || !data) {
      renderWelcomeLanding(lineNumbers, lineContent);
      return;
    }

    if (activeTab === 'src/profile.md' || activeTab === 'src/profile.ts') {
      renderProfileMD(data.profile, lineNumbers, lineContent);
    } else if (activeTab === 'src/experience.md' || activeTab === 'src/experience.json') {
      renderExperienceMD(data.experience, lineNumbers, lineContent);
    } else if (activeTab === 'src/skills.md' || activeTab === 'src/skills.sql') {
      renderSkillsMD(data.skills, lineNumbers, lineContent);
    } else if (activeTab === 'src/contact.md') {
      renderContactMD(data.contact, lineNumbers, lineContent);
    } else if (activeTab.startsWith('projects/') || activeTab.startsWith('articles/')) {
      await renderMarkdownArticle(activeTab, lineNumbers, lineContent);
    }
  }

  function renderWelcomeLanding(lineNumElem, contentElem) {
    const root = document.getElementById('app-root');
    if (root) root.classList.add('welcome-mode');

    if (lineNumElem) lineNumElem.innerHTML = '1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15';
    
    contentElem.innerHTML = `
      <div class="welcome-landing">
        <div class="welcome-logo-badge">🚀 RENAN DE MORAES | PORTFOLIO IDE</div>
        <h1 class="welcome-title">${currentLang === 'pt' ? 'Bem-vindo ao Meu Portfolio IDE' : 'Welcome to My Engineering Workspace'}</h1>
        <div class="welcome-subtitle">Data Engineer | Microsoft Fabric & Azure | Data Architecture | Applied AI</div>
        <p class="welcome-desc">
          ${currentLang === 'pt' 
            ? 'Explore projetos de arquitetura de dados enterprise, repositórios open-source populares no GitHub, artigos técnicos e um assistente de IA heurístico integrado.' 
            : 'Explore enterprise data architecture projects, popular open-source repositories, technical blog posts, and an interactive AI copilot.'}
        </p>
        <div style="display: flex; gap: 14px; align-items: center; justify-content: center; flex-wrap: wrap;">
          <button class="btn-access-now" id="btn-access-now">
            🚀 ${currentLang === 'pt' ? 'Acessar Agora' : 'Access Now'} →
          </button>
          <button class="btn-lang-welcome" id="welcome-lang-btn">
            🌐 ${currentLang === 'en' ? 'Mudar para Português (PT-BR)' : 'Switch to English (EN)'}
          </button>
        </div>
        <div class="welcome-shortcuts">
          <div class="welcome-shortcut-item">📁 <strong>Files</strong>: src/profile.md</div>
          <div class="welcome-shortcut-item">⭐ <strong>Projects</strong>: projects/</div>
          <div class="welcome-shortcut-item">📝 <strong>Blog</strong>: articles/</div>
          <div class="welcome-shortcut-item">🤖 <strong>Copilot</strong>: Instant AI Chat</div>
        </div>
      </div>
    `;

    const accessBtn = document.getElementById('btn-access-now');
    if (accessBtn) {
      accessBtn.addEventListener('click', () => {
        openFile('src/profile.md');
      });
    }

    const welcomeLangBtn = document.getElementById('welcome-lang-btn');
    if (welcomeLangBtn) {
      welcomeLangBtn.addEventListener('click', toggleLanguage);
    }
  }

  function renderProfileMD(p, lineNumElem, contentElem) {
    const skillsBadges = p.topSkills.map(s => `<span class="tech-badge">${escapeHtml(s)}</span>`).join(' ');
    const certsList = p.certifications.map(c => `<li style="margin-bottom: 6px;">🏆 ${escapeHtml(c)}</li>`).join('');

    contentElem.innerHTML = `
      <div style="font-family: var(--font-ui); max-width: 850px;">
        <h1 style="color: var(--text-high); margin-top: 0; font-size: 26px; border-bottom: 1px solid var(--ide-border); padding-bottom: 10px;">👨‍💻 ${escapeHtml(p.name)}</h1>
        <p style="color: var(--accent-cyan); font-weight: 600; font-size: 15px; margin-top: -4px;">${escapeHtml(p.title)} | 📍 ${escapeHtml(p.location)}</p>
        <p style="line-height: 1.7; font-size: 14px; color: var(--text-main);">${escapeHtml(p.summary)}</p>
        
        <div style="margin: 24px 0;">
          <h3 style="color: var(--text-high); margin-bottom: 12px; font-size: 16px;">${currentLang === 'pt' ? '🎯 Foco Principal em Engenharia' : '🎯 Top Engineering Focus'}</h3>
          <div class="tech-badge-container" style="gap: 8px;">${skillsBadges}</div>
        </div>

        <div style="margin-top: 24px;">
          <h3 style="color: var(--text-high); margin-bottom: 12px; font-size: 16px;">🏆 ${currentLang === 'pt' ? 'Certificações' : 'Certifications'}</h3>
          <ul style="list-style: none; padding: 0; margin: 0; line-height: 1.8; font-size: 14px;">${certsList}</ul>
        </div>
      </div>
    `;

    updateContentLineNumbers(lineNumElem, contentElem);
  }

  function renderExperienceMD(exp, lineNumElem, contentElem) {
    const expCards = exp.map(item => `
      <div class="code-card">
        <h3 class="code-card-title">${escapeHtml(item.role)}</h3>
        <div class="code-card-subtitle">${escapeHtml(item.company)} | ${escapeHtml(item.period)} | ${escapeHtml(item.location)}</div>
        <ul style="padding-left: 18px; margin: 8px 0; font-size: 13px; line-height: 1.6;">
          ${item.highlights.map(h => `<li style="margin-bottom: 6px;">${escapeHtml(h)}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    contentElem.innerHTML = `
      <div style="font-family: var(--font-ui);">
        <h2 style="color: var(--text-high); margin-top: 0; border-bottom: 1px solid var(--ide-border); padding-bottom: 8px;">💼 ${currentLang === 'pt' ? 'Trajetória Profissional' : 'Professional Experience Timeline'} (${exp.length} ${currentLang === 'pt' ? 'posições' : 'positions'})</h2>
        <div class="code-card-grid" style="margin-top: 16px;">${expCards}</div>
      </div>
    `;

    updateContentLineNumbers(lineNumElem, contentElem);
  }

  function renderSkillsMD(s, lineNumElem, contentElem) {
    contentElem.innerHTML = `
      <div style="font-family: var(--font-ui);">
        <h2 style="color: var(--text-high); margin-top: 0; border-bottom: 1px solid var(--ide-border); padding-bottom: 8px;">🛠️ ${currentLang === 'pt' ? 'Matriz de Habilidades Técnicas' : 'Technical Capabilities Matrix'}</h2>
        <div class="code-card-grid" style="margin-top: 16px;">
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

    updateContentLineNumbers(lineNumElem, contentElem);
  }

  function renderContactMD(c, lineNumElem, contentElem) {
    contentElem.innerHTML = `
      <div class="markdown-article" style="font-family: var(--font-ui);">
        <h1 style="color: var(--text-high); margin-top: 0;">📫 ${currentLang === 'pt' ? 'Contato e Links Profissionais' : 'Contact & Professional Links'}</h1>
        <p style="font-size: 15px; color: var(--text-main); margin-bottom: 24px;">${currentLang === 'pt' ? 'Entre em contato para projetos de arquitetura de dados, engenharia de IA ou consultoria técnica.' : 'Feel free to reach out for data architecture consulting, AI engineering projects, or technical collaboration.'}</p>
        
        <div class="code-card" style="max-width: 550px;">
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

    updateContentLineNumbers(lineNumElem, contentElem);
  }

  async function renderMarkdownArticle(path, lineNumElem, contentElem) {
    let fetchPath = path;
    if (path.startsWith('articles/')) {
      const parts = path.split('/');
      const filename = parts[parts.length - 1];
      const langDir = currentLang === 'pt' ? 'pt' : 'en';
      fetchPath = `articles/${langDir}/${filename}`;
    }

    const cacheKey = `${currentLang}:${fetchPath}`;
    let mdText = articleCache[cacheKey];
    if (!mdText) {
      try {
        const res = await fetch(`./${fetchPath}`);
        mdText = await res.text();
        articleCache[cacheKey] = mdText;
      } catch (e) {
        mdText = `# File Not Found\nCould not load file at ${fetchPath}`;
      }
    }

    const parsedHtml = parseSimpleMarkdown(mdText);
    contentElem.innerHTML = `<div class="markdown-article">${parsedHtml}</div>`;
    updateContentLineNumbers(lineNumElem, contentElem);
  }

  function updateContentLineNumbers(lineNumElem, contentElem) {
    setTimeout(() => {
      const height = contentElem.offsetHeight || 400;
      const linesCount = Math.max(15, Math.ceil(height / 22));
      let numbersHtml = '';
      for (let i = 1; i <= linesCount; i++) {
        numbersHtml += `${i}<br>`;
      }
      lineNumElem.innerHTML = numbersHtml;
    }, 50);
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

    const headerLangBtn = document.getElementById('header-lang-btn');
    if (headerLangBtn) {
      headerLangBtn.addEventListener('click', toggleLanguage);
    }

    const cmdBtn = document.getElementById('cmd-palette-btn');
    if (cmdBtn) {
      cmdBtn.addEventListener('click', () => {
        if (searchInput) searchInput.focus();
      });
    }

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
