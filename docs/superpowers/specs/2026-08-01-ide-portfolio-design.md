# Design Spec: IDE-Themed Portfolio with Heuristic AI Copilot & Technical Blog

**Date**: 2026-08-01  
**Author**: Antigravity & Renan De Moraes  
**Status**: Draft for User Approval  

---

## 1. Overview & Objectives

Transform the personal portfolio website of **Renan De Moraes** (Data & AI Engineer) into an interactive, high-credibility **IDE Editor interface** (inspired by VS Code Dark / One Dark). 

### Key Goals:
1. **IDE Interface Disposition**:
   - Left Activity Bar & File Tree Explorer (`📁 src/` & `📁 articles/`).
   - Middle Code Editor area with open tabs, breadcrumbs, line numbers, and formatted content cards.
   - Right Copilot Panel housing a rule-based/heuristic AI assistant.
   - Top Header Bar with window controls & search bar.
   - Bottom IDE Status Bar with branch name, file type, UTF-8 status, and contact actions.
2. **Updated Resume & Profile Data**:
   - Comprehensive update of all career experience, projects, skills, education, and certifications directly extracted from the official PDF resume (Ninecon, Bluer Tecnologia, ScoraS, AB InBev, IBM, Grupo Petrópolis, etc.).
3. **Integrated Technical Blog Section (`📁 articles/`)**:
   - Dedicated blog section formatted as markdown files inside the IDE explorer.
   - Dynamic loading architecture making it seamless to add future posts (via Markdown or JSON entries).
   - Rich syntax highlighting, reading time indicators, tags (`#Fabric`, `#LangGraph`, `#Python`, `#ETL`), and publication dates.
4. **Heuristic AI Assistant**:
   - 100% client-side deterministic response engine using keyword/pattern intent matching.
   - Answers queries about experience, skills, projects, certifications, contact details, AND blog posts.
   - Provides instant quick-prompt chips for common recruiter questions.
   - Deep-links directly to corresponding file tabs in the editor pane.

---

## 2. Architecture & Component Layout

```
+-----------------------------------------------------------------------------------+
| Top Bar: [● ● ●]  renan-de-moraes-site - Visual Studio Code         [ 🔍 Search ] |
+----+-----------------------+----------------------------------+-------------------+
| Act| EXPLORER              | tabs: [profile.ts ×] [article.md]| 🤖 RENAN COPILOT  |
|    | > src                 |----------------------------------|-------------------|
| 📁 |   📄 profile.ts       | breadcrumbs: articles > post.md  | Chat history:     |
| 🔍 |   📄 experience.json  | 1 | # Fabric Architecture        | [Bot]: Hi! I can  |
| 🌿 |   📄 projects.py      | 2 | *Date: 2026-08-01*           | answer questions  |
| ⚙️ |   📄 skills.sql       | 3 |                              | about experience..|
|    |   📄 contact.md       | 4 | Building medallion lakes...  |                   |
|    | > articles 📝         | [ Rendered Markdown / Code ]     | [Input: Type...]  |
|    |   📄 fabric-lakes.md  |                                  |                   |
|    |   📄 langgraph-bot.md |                                  |                   |
+----+-----------------------+----------------------------------+-------------------+
| Status Bar: 🌿 main* | 🟢 Ready | UTF-8 | TypeScript | 💼 Open for Opportunities  |
+-----------------------------------------------------------------------------------+
```

---

## 3. Data Structure & Sources

All profile data is grounded in the user's PDF resume, GitHub project repositories, and technical articles.

### Files in Editor & Explorer Tree:
- **`src/profile.ts`**: Overview, summary statement, senior consultant background in Microsoft Fabric, Azure, Data Engineering, and Applied AI.
- **`src/experience.json`**: Structured timeline:
  - **Ninecon** (Senior Data Consultant, Oct 2024 - Present): Fabric Lakehouse, SAP HANA to Exadata migration (200M+ rows), Oracle DW migration.
  - **Bluer Tecnologia** (Data Engineer / BI Specialist, Feb 2024 - Present): WhatsApp SaaS platform (Next.js/Postgres/Node queue), Payroll automation, Fabric solution, SAP RFC.
  - **ScoraS** (AI Agent Developer, Aug 2025 - May 2026): WhatsApp AI Chatbot (LangGraph + Redis fallback), Multi-agent support system (Databricks, AD, Prometheus).
  - **AB InBev** (Senior Analytics Engineer, Mar 2024 - Sep 2024): Competitor pricing dashboard (Databricks 15M rows, Trino semantic layer to Power BI).
  - **IBM** (Data & BI Engineer, Feb 2022 - Feb 2024): Asset monitoring portal for Vale (Azure Data Factory, AAS, Power BI).
  - **Grupo Petrópolis** (BI Analyst, Dec 2020 - Feb 2022): Logistics daily bulletin (Python/Dash), Oracle PL/SQL.
- **`src/projects.py`**: Open-source and production engineering highlights:
  - WhatsApp Campaign Platform (SaaS, Next.js 16, PostgreSQL, Docker, Node.js queue)
  - LangGraph Multi-Agent Support System
  - 70M Record Data Engineering Challenge
  - Infographic Dashboard Automation (Pandas, Plotly, Dash)
  - SAP HANA Cloud to Oracle Exadata Migration Scripts
- **`src/skills.sql`**: Categorized technical stack.
- **`src/contact.md`**: Email (`renan.de.moraes777@gmail.com`), Phone (`+55 15 99136-7797`), LinkedIn, GitHub, Location.
- **`articles/` (Technical Blog)**:
  - `01-fabric-medallion-architecture.md` → Designing Medallion Lakehouse on Microsoft Fabric
  - `02-langgraph-n1-support-agent.md` → Building Deterministic Fallbacks for LangGraph AI Agents
  - `03-high-volume-sap-migrations.md` → Migrating 200M+ Rows from SAP HANA with Python Multiprocessing
  - `04-constrained-data-engineering.md` → Ingesting 70M Records without Expensive Infrastructure

---

## 4. Heuristic Chatbot Engine Design

- **Engine Location**: Pure client-side JavaScript (`assets/js/copilot-heuristics.js`).
- **Matching Rules**: Regex patterns and keyword token matching:
  - Keyword `fabric` / `lakehouse` → Returns summary of Ninecon & Bluer Fabric architecture projects and suggests related blog articles.
  - Keyword `ai` / `langgraph` / `agent` / `chatbot` → Returns summary of ScoraS AI agent projects and N1 support automation.
  - Keyword `blog` / `article` / `post` / `reading` → Lists available technical articles and opens selected article tab in editor.
  - Keyword `sap` / `migration` / `oracle` → Returns high-volume migration achievements (200M+ records).
  - Keyword `contact` / `hire` / `email` / `linkedin` → Displays contact card and opens `contact.md`.
  - Keyword `skills` / `stack` / `python` / `sql` → Returns tech stack matrix.
- **Quick Suggestion Chips**:
  - `🔥 Fabric & Lakehouse`
  - `🤖 AI Agents & LangGraph`
  - `📝 Technical Articles / Blog`
  - `⚡ High-Volume SAP Migration`
  - `📫 Contact Info`

---

## 5. UI/UX Details & Styling

- **CSS Variables**: Predefined in `style.css`:
  - `--bg-editor`: `#1e1e1e`
  - `--bg-sidebar`: `#252526`
  - `--bg-activity`: `#333333`
  - `--bg-tab-active`: `#1e1e1e`
  - `--bg-tab-inactive`: `#2d2d2d`
  - `--border-color`: `#3c3c3c`
  - `--accent-blue`: `#007acc`
  - `--text-high`: `#cccccc`
  - `--text-muted`: `#858585`
  - `--syntax-keyword`: `#569cd6`
  - `--syntax-string`: `#ce9178`
  - `--syntax-comment`: `#6a9955`
  - `--syntax-function`: `#dcdcaa`
- **Responsive Layout**:
  - Desktop (>1024px): 3 columns (Sidebar 240px, Editor Flex, Chatbot 320px).
  - Tablet/Mobile (<1024px): Collapsible panels using activity bar icons to toggle Sidebar and Chatbot pane.

---

## 6. Verification & Validation

- **Visual Verification**: Tested via local server (`http://localhost:8000`) and browser subagent/snapshots.
- **Functional Tests**:
  - Tab switching between all files (`profile.ts`, `experience.json`, `projects.py`, `skills.sql`, `contact.md`, and `articles/*.md`).
  - Blog post opening and rendering test.
  - Chatbot heuristic query tests (verifying quick chips and blog article lookup).
  - Responsive toggle buttons on activity bar.
