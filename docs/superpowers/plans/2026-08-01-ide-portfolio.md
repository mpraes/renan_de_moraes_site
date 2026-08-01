# IDE Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a VS Code Dark IDE-themed portfolio for Renan De Moraes featuring interactive file explorer, multi-tab code editor view, grounded resume & project content, a technical blog section (`articles/`), and a heuristic AI Copilot assistant.

**Architecture:** A lightweight, high-performance web app using Vanilla JavaScript & CSS in `public_html`. Data is structured in a central JSON repository (`public_html/assets/data/content.json`) and Markdown files (`public_html/articles/`). The Heuristic Copilot operates 100% client-side with regex/token intent matching to provide instant, zero-latency responses.

**Tech Stack:** HTML5, CSS3 (Vanilla design system with CSS custom properties), JavaScript (ES6+ Vanilla), PHP (for server-side entry points & cache-busting).

## Global Constraints

- Design System: VS Code Dark theme (`#1e1e1e` background, `#252526` sidebar, `#3c3c3c` borders, `#007acc` accents).
- Content Integrity: Resume data strictly sourced from official PDF (Ninecon, Bluer Tecnologia, ScoraS, AB InBev, IBM, Grupo Petrópolis).
- Heuristic Chatbot: Pure deterministic rule/token matching, 0 external API dependencies.
- No External Framework Overhead: Native JS/CSS for instant performance.

---

### Task 1: Create Grounded Content Repository & Markdown Articles

**Files:**
- Create: `public_html/assets/data/content.json`
- Create: `public_html/articles/01-fabric-medallion-architecture.md`
- Create: `public_html/articles/02-langgraph-n1-support-agent.md`
- Create: `public_html/articles/03-high-volume-sap-migrations.md`
- Create: `public_html/articles/04-constrained-data-engineering.md`

**Interfaces:**
- Produces: `window.PortfolioData` structure containing `profile`, `experience`, `projects`, `skills`, `contact`, and `articles`.

- [ ] **Step 1: Write `content.json` with PDF resume data**
- [ ] **Step 2: Create sample technical blog articles (`01-*.md`, `02-*.md`, `03-*.md`, `04-*.md`)**
- [ ] **Step 3: Verify JSON validity via node or php CLI**
- [ ] **Step 4: Commit content repository and articles**

---

### Task 2: Implement VS Code Dark CSS Design Tokens & IDE Layout Grid

**Files:**
- Modify: `public_html/assets/css/style.css`

**Interfaces:**
- Consumes: CSS custom properties (`--bg-editor`, `--bg-sidebar`, `--bg-activity`, `--accent-blue`, etc.)
- Produces: 3-column layout grid (`.ide-container`, `.activity-bar`, `.sidebar-pane`, `.editor-pane`, `.copilot-pane`, `.status-bar`).

- [ ] **Step 1: Write CSS variables and reset rules**
- [ ] **Step 2: Implement flex/grid container layout for Activity Bar, Explorer, Editor, Copilot, Status Bar**
- [ ] **Step 3: Implement scrollbars, tab styles, line number gutter, and responsive media queries**
- [ ] **Step 4: Verify CSS layout in local server (`http://localhost:8000`)**
- [ ] **Step 5: Commit CSS updates**

---

### Task 3: Build IDE Shell HTML Structure in `index.php` and `index.html`

**Files:**
- Modify: `public_html/index.php`
- Modify: `public_html/index.html`

**Interfaces:**
- Consumes: CSS classes from Task 2
- Produces: DOM structure with `#file-tree`, `#editor-tabs`, `#breadcrumbs`, `#code-buffer`, `#copilot-messages`, `#copilot-input-form`, `#status-bar`.

- [ ] **Step 1: Update `index.php` with window header, activity bar, file tree, editor pane, copilot pane, and status bar**
- [ ] **Step 2: Mirror static structure in `index.html`**
- [ ] **Step 3: Test page rendering in browser**
- [ ] **Step 4: Commit HTML structure**

---

### Task 4: Develop IDE Tab Manager, File Explorer & Code Buffer Renderer in `app.js`

**Files:**
- Modify: `public_html/assets/js/app.js`

**Interfaces:**
- Consumes: `window.PortfolioData`, DOM IDs (`#file-tree`, `#editor-tabs`, `#breadcrumbs`, `#code-buffer`)
- Produces: `window.IDEManager.openFile(filePath)`, dynamic tab switching, line number rendering, markdown parsing for articles.

- [ ] **Step 1: Write `app.js` state manager for active tabs, open files, and file tree click handlers**
- [ ] **Step 2: Build code buffer renderer with line numbers, code syntax highlighting, and article viewer**
- [ ] **Step 3: Implement search filter in file tree & command palette shortcut (`Ctrl+K` / `Cmd+K`)**
- [ ] **Step 4: Test file switching and tab closing**
- [ ] **Step 5: Commit `app.js`**

---

### Task 5: Build Heuristic AI Copilot Engine in `copilot-heuristics.js`

**Files:**
- Create: `public_html/assets/js/copilot-heuristics.js`
- Modify: `public_html/index.php` (script tag addition)

**Interfaces:**
- Consumes: User text input & quick chip clicks
- Produces: `CopilotEngine.matchQuery(text)` returning formatted message + action deep-links to open specific IDE files (`IDEManager.openFile`).

- [ ] **Step 1: Implement intent pattern matcher (Fabric/Lakehouse, AI/LangGraph, SAP Migration, Skills, Contact, Blog)**
- [ ] **Step 2: Build chat UI updater with avatar icons, typing indicator animation, and interactive chip buttons**
- [ ] **Step 3: Implement deep-linking so bot answers include "📂 Open profile.ts" or "📝 Read Article" buttons**
- [ ] **Step 4: Test chat responses against sample queries**
- [ ] **Step 5: Commit `copilot-heuristics.js`**

---

### Task 6: End-to-End Testing, Responsive Tuning & Verification

**Files:**
- All touched files in `public_html/`

- [ ] **Step 1: Verify full site functionality on `http://localhost:8000`**
- [ ] **Step 2: Test mobile/tablet responsiveness (activity bar panel toggles)**
- [ ] **Step 3: Create Walkthrough document and verify zero console errors**
- [ ] **Step 4: Final commit**
