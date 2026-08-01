/**
 * Renan Copilot - Heuristic Rule Engine & AI Assistant UI
 */

(function () {
  'use strict';

  // Knowledge Base Intent Rules
  const intentRules = [
    {
      intent: 'FABRIC_LAKEHOUSE',
      keywords: ['fabric', 'lakehouse', 'medallion', 'azure', 'synapse', 'power bi', 'powerbi', 'ninecon'],
      response: `🔥 <strong>Microsoft Fabric & Lakehouse Experience:</strong><br>
Renan has extensive experience architecting Microsoft Fabric Lakehouses (Medallion architecture) managing 30+ production tables, multi-country reporting pipelines (BR/AR/CL/PE), and automated Fabric-Oracle EBS connectors replacing legacy Excel workflows.<br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('articles/01-fabric-medallion-architecture.md')">📝 Read Fabric Architecture Article</button>
<button class="chat-chip" onclick="window.IDEManager.openFile('src/experience.json')">📂 View Experience File</button>`
    },
    {
      intent: 'AI_LANGGRAPH',
      keywords: ['ai', 'agent', 'langgraph', 'n1', 'support', 'fastapi', 'llm', 'scoras', 'chatbot', 'bot'],
      response: `🤖 <strong>Applied AI & LangGraph Multi-Agent Systems:</strong><br>
Renan built N1 support automation handling 20-50 tickets/day using LangGraph with deterministic regex fallbacks, Databricks OAuth, and Prometheus observability. He also developed WhatsApp chatbots with long-term memory (LangGraph + Redis ElastiCache).<br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('articles/02-langgraph-n1-support-agent.md')">📝 Read LangGraph Agent Article</button>
<button class="chat-chip" onclick="window.IDEManager.openFile('src/projects.py')">📂 View AI Projects</button>`
    },
    {
      intent: 'SAP_MIGRATION',
      keywords: ['sap', 'migration', 'hana', 'exadata', 'oracle', 'abap', '200m', 'table'],
      response: `⚡ <strong>High-Volume SAP HANA Migrations:</strong><br>
Renan engineered a custom Python parallel processing framework (multiprocessing/threading) and ABAP export routines that successfully migrated 1,000+ tables and over 200M rows from SAP HANA Cloud to Oracle Exadata.<br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('articles/03-high-volume-sap-migrations.md')">📝 Read SAP Migration Article</button>
<button class="chat-chip" onclick="window.IDEManager.openFile('src/experience.json')">📂 View Experience File</button>`
    },
    {
      intent: 'BLOG_ARTICLES',
      keywords: ['blog', 'article', 'post', 'text', 'writing', 'read', 'posts', 'articles'],
      response: `📝 <strong>Technical Articles & Blog Section:</strong><br>
Here are the technical articles available in the IDE workspace:<br>
1. <strong>Fabric Medallion Architecture</strong><br>
2. <strong>LangGraph N1 Support Agent</strong><br>
3. <strong>200M+ SAP HANA Migration</strong><br>
4. <strong>70M Constrained Data Engineering</strong><br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('articles/01-fabric-medallion-architecture.md')">📖 Open Article 1</button>
<button class="chat-chip" onclick="window.IDEManager.openFile('articles/02-langgraph-n1-support-agent.md')">📖 Open Article 2</button>
<button class="chat-chip" onclick="window.IDEManager.openFile('articles/03-high-volume-sap-migrations.md')">📖 Open Article 3</button>
<button class="chat-chip" onclick="window.IDEManager.openFile('articles/04-constrained-data-engineering.md')">📖 Open Article 4</button>`
    },
    {
      intent: 'SKILLS_STACK',
      keywords: ['skill', 'skills', 'stack', 'python', 'sql', 'tools', 'language', 'languages', 'tech', 'databricks'],
      response: `🛠️ <strong>Technical Capabilities & Core Stack:</strong><br>
• <strong>Data Eng</strong>: Microsoft Fabric, Databricks, Azure Data Factory, Synapse, Delta Lake, Trino.<br>
• <strong>Databases</strong>: Oracle, SQL Server, SAP HANA, PostgreSQL, PL/SQL, T-SQL.<br>
• <strong>AI & Code</strong>: Python, TypeScript, LangGraph, FastAPI, Docker, Azure Container Apps.<br>
• <strong>BI</strong>: Power BI, DAX, Dash/Plotly.<br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('src/skills.sql')">📂 View skills.sql File</button>`
    },
    {
      intent: 'CONTACT_INFO',
      keywords: ['contact', 'email', 'phone', 'linkedin', 'github', 'hire', 'job', 'consulting', 'reach'],
      response: `📫 <strong>Contact Renan De Moraes:</strong><br>
• 📧 Email: <a href="mailto:renan.de.moraes777@gmail.com" style="color: var(--accent-cyan);">renan.de.moraes777@gmail.com</a><br>
• 📱 Phone: +55 15 99136-7797<br>
• 💼 LinkedIn: <a href="https://www.linkedin.com/in/renan-moraes-data-ai-engineer/" target="_blank" rel="noopener" style="color: var(--accent-cyan);">linkedin.com/in/renan-moraes-data-ai-engineer</a><br>
• 📍 Location: Porto Feliz, SP, Brazil<br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('src/contact.md')">📂 Open contact.md File</button>`
    },
    {
      intent: 'PROJECTS_LIST',
      keywords: ['project', 'projects', 'saas', 'whatsapp', 'repo', 'open source', 'challenge'],
      response: `🚀 <strong>Featured Engineering & SaaS Projects:</strong><br>
• <strong>WhatsApp Campaign SaaS</strong> (Next.js 16 monorepo, Node queue, Postgres, Docker).<br>
• <strong>LangGraph Multi-Agent System</strong> (Databricks, AD, Prometheus).<br>
• <strong>70M Record Ingestion Challenge</strong> (Constrained Python engineering).<br>
• <strong>Logistic Infographic Automation</strong> (Pandas, Plotly, Dash).<br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('src/projects.py')">📂 Open projects.py File</button>`
    }
  ];

  // Initialize Copilot Chat UI
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

  // Add User Message to Chat History
  function addUserMessage(text) {
    const messagesElem = document.getElementById('copilot-messages');
    if (!messagesElem) return;

    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble chat-bubble-user';
    userBubble.textContent = text;
    messagesElem.appendChild(userBubble);
    messagesElem.scrollTop = messagesElem.scrollHeight;
  }

  // Add Bot Response to Chat History
  function addBotMessage(htmlContent) {
    const messagesElem = document.getElementById('copilot-messages');
    if (!messagesElem) return;

    const botBubble = document.createElement('div');
    botBubble.className = 'chat-bubble chat-bubble-bot';
    botBubble.innerHTML = htmlContent;
    messagesElem.appendChild(botBubble);
    messagesElem.scrollTop = messagesElem.scrollHeight;
  }

  // Heuristic Process Query Engine
  function processQuery(queryText) {
    const lower = queryText.toLowerCase();
    
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
      addBotMessage(matchedRule.response);
    } else {
      // Default Fallback
      addBotMessage(`💡 I can help you explore Renan's background! Try asking about:<br>
• <strong>Microsoft Fabric</strong> & Lakehouse Architecture<br>
• <strong>LangGraph</strong> AI Agents & Support Automation<br>
• <strong>SAP 200M+ Migration</strong> Projects<br>
• <strong>Technical Articles</strong> & Blog posts<br><br>
<button class="chat-chip" onclick="window.IDEManager.openFile('src/profile.ts')">📂 Open Profile</button>
<button class="chat-chip" onclick="window.IDEManager.openFile('articles/01-fabric-medallion-architecture.md')">📝 Read Blog</button>`);
    }
  }

  document.addEventListener('DOMContentLoaded', initCopilot);
})();
