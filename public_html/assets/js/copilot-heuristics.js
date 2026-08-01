/**
 * Renan Copilot - Heuristic Rule Engine & AI Assistant UI (Bilingual EN / PT-BR)
 */

(function () {
  'use strict';

  // Knowledge Base Intent Rules (Bilingual)
  const intentRules = [
    {
      intent: 'FABRIC_LAKEHOUSE',
      keywords: ['fabric', 'lakehouse', 'medallion', 'azure', 'synapse', 'power bi', 'powerbi', 'ninecon'],
      response: {
        en: `🔥 <strong>Microsoft Fabric & Lakehouse Experience:</strong><br>
Renan has extensive experience architecting Microsoft Fabric Lakehouses (Medallion architecture) managing 30+ production tables, multi-country reporting pipelines (BR/AR/CL/PE), and automated Fabric-Oracle EBS connectors replacing legacy Excel workflows.<br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('articles/01-fabric-medallion-architecture.md')">📝 Read Fabric Architecture Article</button>
<button class="chat-chip" onclick="window.IDEManager.openFile('src/experience.md')">📂 View Experience File</button>`,
        pt: `🔥 <strong>Experiência com Microsoft Fabric & Lakehouse:</strong><br>
Renan possui ampla experiência em arquitetura de Lakehouses no Microsoft Fabric (arquitetura Medallion) gerenciando 30+ tabelas em produção, pipelines multicountry (BR/AR/CL/PE) e conectores automatizados Fabric-Oracle EBS substituindo processos manuais em Excel.<br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('articles/01-fabric-medallion-architecture.md')">📝 Ler Artigo de Arquitetura Fabric</button>
<button class="chat-chip" onclick="window.IDEManager.openFile('src/experience.md')">📂 Ver Histórico de Experiência</button>`
      }
    },
    {
      intent: 'AI_LANGGRAPH',
      keywords: ['ai', 'ia', 'agent', 'agente', 'langgraph', 'n1', 'support', 'suporte', 'fastapi', 'llm', 'scoras', 'chatbot', 'bot'],
      response: {
        en: `🤖 <strong>Applied AI & LangGraph Multi-Agent Systems:</strong><br>
Renan built N1 support automation handling 20-50 tickets/day using LangGraph with deterministic regex fallbacks, Databricks OAuth, and Prometheus observability. He also developed WhatsApp chatbots with long-term memory (LangGraph + Redis ElastiCache).<br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('articles/02-langgraph-n1-support-agent.md')">📝 Read LangGraph Agent Article</button>
<button class="chat-chip" onclick="window.IDEManager.openFile('projects/pandas-pipeline-agent.md')">⭐ View AI Agent Project</button>`,
        pt: `🤖 <strong>IA Aplicada & Agentes Multi-Agente LangGraph:</strong><br>
Renan desenvolveu automação de suporte N1 resolvendo 20-50 chamados/dia usando LangGraph com fallback determinístico via regex, OAuth Databricks e observabilidade via Prometheus. Também construiu chatbots para WhatsApp com memória de longo prazo (LangGraph + Redis).<br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('articles/02-langgraph-n1-support-agent.md')">📝 Ler Artigo sobre Agentes de IA</button>
<button class="chat-chip" onclick="window.IDEManager.openFile('projects/pandas-pipeline-agent.md')">⭐ Ver Projeto de Agentes IA</button>`
      }
    },
    {
      intent: 'SAP_MIGRATION',
      keywords: ['sap', 'migration', 'migracao', 'migração', 'hana', 'exadata', 'oracle', 'abap', '200m', 'table', 'tabela'],
      response: {
        en: `⚡ <strong>High-Volume SAP HANA Migrations:</strong><br>
Renan engineered a custom Python parallel processing framework (multiprocessing/threading) and ABAP export routines that successfully migrated 1,000+ tables and over 200M rows from SAP HANA Cloud to Oracle Exadata.<br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('articles/03-high-volume-sap-migrations.md')">📝 Read SAP Migration Article</button>
<button class="chat-chip" onclick="window.IDEManager.openFile('src/experience.md')">📂 View Experience File</button>`,
        pt: `⚡ <strong>Migrações SAP HANA de Alto Volume:</strong><br>
Renan desenvolveu um framework customizado em Python (multiprocessing/threading) e rotinas ABAP que migraram com sucesso 1.000+ tabelas e mais de 200 milhões de registros do SAP HANA Cloud para Oracle Exadata.<br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('articles/03-high-volume-sap-migrations.md')">📝 Ler Artigo sobre Migração SAP</button>
<button class="chat-chip" onclick="window.IDEManager.openFile('src/experience.md')">📂 Ver Experiência Profissional</button>`
      }
    },
    {
      intent: 'BLOG_ARTICLES',
      keywords: ['blog', 'article', 'artigo', 'post', 'text', 'texto', 'writing', 'read', 'posts', 'articles', 'artigos'],
      response: {
        en: `📝 <strong>Technical Articles & Medium Blog Posts:</strong><br>
Here are Renan's 10 technical articles published on Medium:<br>
1. <strong>Consulting Projects Retrospective (Part 1 & 2)</strong><br>
2. <strong>PySpark vs Pandas vs DuckDB Framework Comparison</strong><br>
3. <strong>Normalization & Data Modeling Best Practices</strong><br>
4. <strong>Data Warehouse Architectures: Inmon vs Kimball</strong><br>
5. <strong>SQL Relational Foundations & BNDES Data Lake Case</strong><br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('articles/01-projetos-consultoria-p1.md')">📖 Consulting (Part 1)</button>
<button class="chat-chip" onclick="window.IDEManager.openFile('articles/03-pyspark-vs-pandas-vs-duckdb.md')">📖 PySpark vs Pandas vs DuckDB</button>
<button class="chat-chip" onclick="window.IDEManager.openFile('articles/06-inmon-vs-kimball-dw.md')">📖 Inmon vs Kimball DW</button>`,
        pt: `📝 <strong>Artigos Técnicos & Posts do Medium:</strong><br>
Confira os 10 artigos técnicos do Renan publicados no Medium:<br>
1. <strong>Retrospectiva de Projetos em Consultoria (Parte 1 e 2)</strong><br>
2. <strong>PySpark vs Pandas vs DuckDB: Qual Escolher?</strong><br>
3. <strong>Normalização e Melhores Práticas de Modelagem</strong><br>
4. <strong>Arquitetura Data Warehouse: Inmon vs Kimball</strong><br>
5. <strong>Fundamentos de SQL & Caso Data Lake BNDES</strong><br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('articles/01-projetos-consultoria-p1.md')">📖 Consultoria (Parte 1)</button>
<button class="chat-chip" onclick="window.IDEManager.openFile('articles/03-pyspark-vs-pandas-vs-duckdb.md')">📖 PySpark vs Pandas vs DuckDB</button>
<button class="chat-chip" onclick="window.IDEManager.openFile('articles/06-inmon-vs-kimball-dw.md')">📖 Inmon vs Kimball DW</button>`
      }
    },
    {
      intent: 'VEROMETRIC',
      keywords: ['verometric', 'verometric.space', 'verometric space', 'metrics product'],
      response: {
        en: `📊 <strong>Verometric (Applied Data Intelligence Platform):</strong><br>
Renan is the author of <strong>Verometric</strong>, a data intelligence platform built to transform enterprise metrics into automated business narratives and executive dashboards.<br><br>
• 🌐 <strong>Live Platform</strong>: <a href="https://verometric.space" target="_blank" rel="noopener" style="color: var(--accent-cyan);">verometric.space</a><br>
• 🔒 <strong>GitHub Repo (Private)</strong>: <a href="https://github.com/mpraes/verometric" target="_blank" rel="noopener" style="color: var(--accent-cyan);">github.com/mpraes/verometric</a><br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('projects/verometric.md')">📄 Open Verometric File</button>`,
        pt: `📊 <strong>Verometric (Plataforma de Inteligência de Dados):</strong><br>
Renan é o criador do <strong>Verometric</strong>, produto voltado para inteligência de dados aplicada e automação de relatórios executivos.<br><br>
• 🌐 <strong>Plataforma no Ar</strong>: <a href="https://verometric.space" target="_blank" rel="noopener" style="color: var(--accent-cyan);">verometric.space</a><br>
• 🔒 <strong>Repositório GitHub (Privado)</strong>: <a href="https://github.com/mpraes/verometric" target="_blank" rel="noopener" style="color: var(--accent-cyan);">github.com/mpraes/verometric</a><br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('projects/verometric.md')">📄 Abrir Arquivo do Verometric</button>`
      }
    },
    {
      intent: 'CAN_I_CODE_WITHOUT_AI',
      keywords: ['can i code without ai', 'canicodewithoutai', 'code without ai', 'without ai', 'quiz', 'benchmark'],
      response: {
        en: `🤖 <strong>Can I Code Without AI? (Interactive Web App & Benchmark):</strong><br>
Renan built <strong>Can I Code Without AI?</strong>, a web application that tests developers on their reliance on AI coding assistants (Copilot, ChatGPT, Cursor).<br><br>
• 🌐 <strong>Live App</strong>: <a href="https://canicodewithoutai.site/?lang=en" target="_blank" rel="noopener" style="color: var(--accent-cyan);">canicodewithoutai.site</a><br>
• 🐙 <strong>GitHub Repo</strong>: <a href="https://github.com/mpraes/canicodewithoutai_site" target="_blank" rel="noopener" style="color: var(--accent-cyan);">github.com/mpraes/canicodewithoutai_site</a><br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('projects/canicodewithoutai.md')">📄 Open Project File</button>`,
        pt: `🤖 <strong>Can I Code Without AI? (Aplicação Web & Quiz Interativo):</strong><br>
Renan desenvolveu a aplicação web <strong>Can I Code Without AI?</strong> para desafiar programadores sobre o nível de dependência de assistentes de IA (Copilot, ChatGPT, Cursor).<br><br>
• 🌐 <strong>Aplicação no Ar</strong>: <a href="https://canicodewithoutai.site/?lang=pt" target="_blank" rel="noopener" style="color: var(--accent-cyan);">canicodewithoutai.site</a><br>
• 🐙 <strong>Repositório GitHub</strong>: <a href="https://github.com/mpraes/canicodewithoutai_site" target="_blank" rel="noopener" style="color: var(--accent-cyan);">github.com/mpraes/canicodewithoutai_site</a><br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('projects/canicodewithoutai.md')">📄 Abrir Arquivo do Projeto</button>`
      }
    },
    {
      intent: 'PROJECTS_STARRED',
      keywords: ['project', 'projects', 'projeto', 'projetos', 'github', 'starred', 'stars', 'quickelt', 'ingestao', 'limite', 'repo'],
      response: {
        en: `⭐ <strong>Top Featured & Starred Projects:</strong><br>
Explore Renan's top projects in the <strong>projects/</strong> folder:<br>
• <strong>Can I Code Without AI?</strong> — Developer AI Reliance Quiz App<br>
• <strong>QuickELT</strong> (⭐ 31 Stars) — Data Engineering ELT Template<br>
• <strong>Ingestão no Limite</strong> (⭐ 24 Stars) — 70M Lightweight Hardware Challenge<br>
• <strong>Pandas Pipeline Agent</strong> (⭐ 10 Stars) — AI Data Cleaning Generator<br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('projects/canicodewithoutai.md')">🤖 Can I Code Without AI?</button>
<button class="chat-chip" onclick="window.IDEManager.openFile('projects/quickelt.md')">⭐ QuickELT (31★)</button>`,
        pt: `⭐ <strong>Projetos em Destaque & Populares no GitHub:</strong><br>
Explore os principais projetos do Renan na pasta <strong>projects/</strong>:<br>
• <strong>Can I Code Without AI?</strong> — Quiz sobre Dependência de IA em Código<br>
• <strong>QuickELT</strong> (⭐ 31 Stars) — Template de Engenharia de Dados<br>
• <strong>Ingestão no Limite</strong> (⭐ 24 Stars) — Desafio 70M em Hardware Leve<br>
• <strong>Pandas Pipeline Agent</strong> (⭐ 10 Stars) — Gerador de Pipelines com IA<br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('projects/canicodewithoutai.md')">🤖 Can I Code Without AI?</button>
<button class="chat-chip" onclick="window.IDEManager.openFile('projects/quickelt.md')">⭐ QuickELT (31★)</button>`
      }
    },
    {
      intent: 'SKILLS_STACK',
      keywords: ['skill', 'skills', 'habilidade', 'habilidades', 'stack', 'python', 'sql', 'tools', 'ferramentas', 'language', 'languages', 'tech', 'databricks'],
      response: {
        en: `🛠️ <strong>Technical Capabilities & Core Stack:</strong><br>
• <strong>Data Eng</strong>: Microsoft Fabric, Databricks, Azure Data Factory, Synapse, Delta Lake, Trino.<br>
• <strong>Databases</strong>: Oracle, SQL Server, SAP HANA, PostgreSQL, PL/SQL, T-SQL.<br>
• <strong>AI & Code</strong>: Python, TypeScript, LangGraph, FastAPI, Docker, Azure Container Apps.<br>
• <strong>BI</strong>: Power BI, DAX, Dash/Plotly.<br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('src/skills.md')">📂 View skills.md File</button>`,
        pt: `🛠️ <strong>Matriz de Habilidades Técnicas & Stack:</strong><br>
• <strong>Eng de Dados</strong>: Microsoft Fabric, Databricks, Azure Data Factory, Synapse, Delta Lake, Trino.<br>
• <strong>Bancos de Dados</strong>: Oracle, SQL Server, SAP HANA, PostgreSQL, PL/SQL, T-SQL.<br>
• <strong>IA & Código</strong>: Python, TypeScript, LangGraph, FastAPI, Docker, Azure Container Apps.<br>
• <strong>BI</strong>: Power BI, DAX, Dash/Plotly.<br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('src/skills.md')">📂 Ver Arquivo skills.md</button>`
      }
    },
    {
      intent: 'LUMENEX',
      keywords: ['lumenex', 'lumen', 'lumenex.com.br', 'biblical exegesis', 'exegese'],
      response: {
        en: `📖 <strong>Lumenex / Lumen (Guided Exegesis Platform):</strong><br>
Renan built <strong>Lumenex</strong>, an interactive web platform for biblical exegesis and textual research based on Eric Lund rules and Gordon Fee workflows.<br><br>
• 🌐 <strong>Live Platform</strong>: <a href="https://www.lumenex.com.br/" target="_blank" rel="noopener" style="color: var(--accent-cyan);">lumenex.com.br</a><br>
• 🔒 <strong>GitHub Repo (Private)</strong>: <a href="https://github.com/mpraes/lumen" target="_blank" rel="noopener" style="color: var(--accent-cyan);">github.com/mpraes/lumen</a><br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('projects/lumenex.md')">📄 Open Lumenex File</button>`,
        pt: `📖 <strong>Lumenex / Lumen (Plataforma de Exegese Bíblica):</strong><br>
Renan desenvolveu o <strong>Lumenex</strong>, produto web para exegese bíblica guiada e pesquisa textual baseada nas regras de Lund e fluxo de Gordon Fee.<br><br>
• 🌐 <strong>Plataforma no Ar</strong>: <a href="https://www.lumenex.com.br/" target="_blank" rel="noopener" style="color: var(--accent-cyan);">lumenex.com.br</a><br>
• 🔒 <strong>Repositório GitHub (Privado)</strong>: <a href="https://github.com/mpraes/lumen" target="_blank" rel="noopener" style="color: var(--accent-cyan);">github.com/mpraes/lumen</a><br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('projects/lumenex.md')">📄 Abrir Arquivo do Lumenex</button>`
      }
    },
    {
      intent: 'CONTACT_INFO',
      keywords: ['contact', 'contato', 'email', 'phone', 'telefone', 'linkedin', 'github', 'twitter', 'x', 'hire', 'contratar', 'job', 'vaga', 'consulting', 'consultoria'],
      response: {
        en: `📫 <strong>Contact Renan De Moraes:</strong><br>
• 📧 Email: <a href="mailto:renan.de.moraes777@gmail.com" style="color: var(--accent-cyan);">renan.de.moraes777@gmail.com</a><br>
• 📱 Phone: +55 15 99136-7797<br>
• 💼 LinkedIn: <a href="https://www.linkedin.com/in/renan-moraes-data-ai-engineer/" target="_blank" rel="noopener" style="color: var(--accent-cyan);">linkedin.com/in/renan-moraes-data-ai-engineer</a><br>
• 🐙 GitHub: <a href="https://github.com/mpraes" target="_blank" rel="noopener" style="color: var(--accent-cyan);">github.com/mpraes</a><br>
• 🐦 𝕏 (Twitter): <a href="https://x.com/DeMoraes777" target="_blank" rel="noopener" style="color: var(--accent-cyan);">x.com/DeMoraes777</a><br>
• 📍 Location: Porto Feliz, SP, Brazil<br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('src/contact.md')">📂 Open contact.md File</button>`,
        pt: `📫 <strong>Contato de Renan De Moraes:</strong><br>
• 📧 E-mail: <a href="mailto:renan.de.moraes777@gmail.com" style="color: var(--accent-cyan);">renan.de.moraes777@gmail.com</a><br>
• 📱 Telefone / WhatsApp: +55 15 99136-7797<br>
• 💼 LinkedIn: <a href="https://www.linkedin.com/in/renan-moraes-data-ai-engineer/" target="_blank" rel="noopener" style="color: var(--accent-cyan);">linkedin.com/in/renan-moraes-data-ai-engineer</a><br>
• 🐙 GitHub: <a href="https://github.com/mpraes" target="_blank" rel="noopener" style="color: var(--accent-cyan);">github.com/mpraes</a><br>
• 🐦 𝕏 (Twitter): <a href="https://x.com/DeMoraes777" target="_blank" rel="noopener" style="color: var(--accent-cyan);">x.com/DeMoraes777</a><br>
• 📍 Localização: Porto Feliz, SP, Brasil<br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('src/contact.md')">📂 Abrir Arquivo contact.md</button>`
      }
    }
  ];

  function getLang() {
    return window.getCurrentLang ? window.getCurrentLang() : 'en';
  }

  function initCopilot() {
    const form = document.getElementById('copilot-form');
    const input = document.getElementById('copilot-input');
    const chipsContainer = document.getElementById('copilot-chips');

    if (form && input) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;
        
        addUserMessage(text);
        input.value = '';
        
        setTimeout(() => {
          processQuery(text);
        }, 200);
      });
    }

    if (chipsContainer) {
      chipsContainer.querySelectorAll('.chat-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const query = chip.getAttribute('data-query');
          if (query) {
            addUserMessage(chip.textContent.trim());
            processQuery(query);
          }
        });
      });
    }
  }

  function addUserMessage(text) {
    const messagesElem = document.getElementById('copilot-messages');
    if (!messagesElem) return;

    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble chat-bubble-user';
    userBubble.textContent = text;
    messagesElem.appendChild(userBubble);
    messagesElem.scrollTop = messagesElem.scrollHeight;
  }

  function addBotMessage(htmlContent) {
    const messagesElem = document.getElementById('copilot-messages');
    if (!messagesElem) return;

    const botBubble = document.createElement('div');
    botBubble.className = 'chat-bubble chat-bubble-bot';
    botBubble.innerHTML = htmlContent;
    messagesElem.appendChild(botBubble);
    messagesElem.scrollTop = messagesElem.scrollHeight;
  }

  function processQuery(queryText) {
    const lower = queryText.toLowerCase();
    const lang = getLang();
    
    let matchedRule = null;
    let maxMatchCount = 0;

    for (const rule of intentRules) {
      let count = 0;
      for (const kw of rule.keywords) {
        if (lower.includes(kw)) {
          count++;
        }
      }
      if (count > maxMatchCount) {
        maxMatchCount = count;
        matchedRule = rule;
      }
    }

    if (matchedRule && maxMatchCount > 0) {
      addBotMessage(matchedRule.response[lang] || matchedRule.response['en']);
    } else {
      if (lang === 'pt') {
        addBotMessage(`💡 Posso ajudar a explorar a trajetória do Renan! Tente perguntar sobre:<br>
• <strong>Projetos no GitHub</strong> (QuickELT, Ingestão no Limite)<br>
• <strong>Microsoft Fabric</strong> & Arquitetura Lakehouse<br>
• Agentes de IA em <strong>LangGraph</strong><br>
• <strong>Artigos Técnicos</strong> e Blog<br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('projects/quickelt.md')">⭐ QuickELT (31★)</button>
<button class="chat-chip" onclick="window.IDEManager.openFile('src/profile.md')">📂 Abrir Perfil</button>`);
      } else {
        addBotMessage(`💡 I can help you explore Renan's background! Try asking about:<br>
• <strong>GitHub Starred Projects</strong> (QuickELT, Ingestão no Limite)<br>
• <strong>Microsoft Fabric</strong> & Lakehouse Architecture<br>
• <strong>LangGraph</strong> AI Agents & Support Automation<br>
• <strong>Technical Articles</strong> & Blog posts<br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('projects/quickelt.md')">⭐ QuickELT (31★)</button>
<button class="chat-chip" onclick="window.IDEManager.openFile('src/profile.md')">📂 Open Profile</button>`);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', initCopilot);
})();
