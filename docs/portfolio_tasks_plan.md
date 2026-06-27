# Plano de Desenvolvimento do Site-Portfólio (Multilíngue)

Este documento funciona como um roteiro de tarefas estruturado em Markdown (`TASKS.md`) para ser consumido diretamente no **Cursor IDE** (utilizando regras de IA, Composer ou chat local). Ele foi gerado a partir do seu histórico profissional e foi adaptado para criar um site moderno que funcione como Currículo (EN/PT), Portfólio de Produtos/SaaS e Vitrine Open Source.

---

## 🛠️ Stack Recomendada para o Projeto
*   **Framework:** Next.js (App Router) ou Astro (excelente para performance e SEO de portfólios).
*   **Estilização:** Tailwind CSS (rápido, limpo e responsivo).
*   **Internacionalização (i18n):** `next-intl` (se usar Next.js) ou rotas nativas do Astro (`/en/` e `/pt/`).
*   **Consumo de APIs:** Octokit (GitHub API) para puxar repositórios em tempo real.
*   **Hospedagem:** Vercel ou Netlify (Deploy automático via Git).

---

## 📋 Lista de Tarefas (Cursor / Local Tracker)

### 📊 [FASE 1] Configuração Inicial e Arquitetura
- [ ] **Task 1.1:** Inicializar o repositório git e configurar o boilerplate do projeto (Next.js/Astro) com Tailwind CSS.
- [ ] **Task 1.2:** Configurar a estrutura de pastas para suporte a múltiplos idiomas (i18n) para as rotas `/` (PT-BR) e `/en` (EN).
- [ ] **Task 1.3:** Criar o arquivo de configuração de layout global (Fontes, Cores escuras/técnicas condizentes com Engenharia de Dados/IA).
- [ ] **Task 1.4:** Configurar variáveis de ambiente (`.env.local`) para armazenar o Token do GitHub (para evitar rate limit ao buscar repositórios).

### 🏠 [FASE 2] Desenvolvimento da UI (Componentes Core)
- [ ] **Task 2.1:** Criar componente `Navbar` responsivo com seletor de idioma (PT/EN) e links fixos (Home, Sobre, Portfólio, Experiência, Contato).
- [ ] **Task 2.2:** Desenvelver a seção `Hero` com foco no mindset "Builder", headline de impacto traduzida, links para LinkedIn, GitHub e botão de Download direto do CV físico.
- [ ] **Task 2.3:** Criar componente `TechStack` usando cards visuais ou badges categorizados (Data Engineering, AI/Agents, Full Stack, Tools).

### 🚀 [FASE 3] Seção de Portfólio (Produtos & Open Source)
- [ ] **Task 3.1:** Criar seção `SaaS & Products` para listar seus MVPs e soluções independentes com descrição de stack, problema resolvido e link de live demo.
- [ ] **Task 3.2:** Desenvolver componente `OpenSource` que consome a API do GitHub para trazer dinamicamente seus repositórios públicos mais relevantes ou cards estáticos customizados com métricas de estrelas/forks.

### 💼 [FASE 4] Seção de Experiência e Dados estruturados (O Core do seu CV)
- [ ] **Task 4.1:** Estruturar os dados profissionais no dicionário/JSON de tradução (PT/EN) mapeando as empresas ordens cronológicas (ScoraS, Ninecon, Bluer, AB InBev, IBM, Grupo Petrópolis).
- [ ] **Task 4.2:** Criar uma Timeline interativa onde cada experiência mostra conquistas chave (ex: redução de custos, migração AWS/Azure, automações Python/Langgraph).
- [ ] **Task 4.3:** Adicionar seção de Certificações e Educação de forma limpa e compacta.

---

## 💾 Banco de Dados de Conteúdo do Currículo (Pronto para i18n)

Guarde as estruturas abaixo nos seus arquivos de tradução (`en.json` / `pt.json`) ou use diretamente no prompt do Cursor para gerar as páginas.

### 🇬🇧 Versão em Inglês (English Data)

```json
{
  "profile": {
    "name": "Renan De Moraes",
    "headline": "Python | SQL | Developer | AI | Open Source | Data Engineering | Consultant",
    "summary": "I am a 'Builder' at heart—a Data & AI Engineer with over 10 years of operational experience in Logistics and Procurement. This unique background allows me to bridge the gap between complex business requirements and technical solutions. I architect end-to-end solutions, design intelligent agents using LangGraph, and develop modern web applications."
  },
  "experience": [
    {
      "company": "ScoraS",
      "role": "AI Agent Developer",
      "period": "August 2025 - Present",
      "location": "Porto Feliz, São Paulo, Brazil",
      "achievements": [
        "Migrated a project chatbot container with PostgreSQL from Azure to AWS infrastructure.",
        "Refactored a chatbot code project from LangGraph nodes to a simple system prompt, achieving high accuracy results.",
        "Built chatbot container apps in Azure from scratch interacting with tools like Databricks, Azure AD on-premises, and Bdesk for tech support calls."
      ]
    },
    {
      "company": "Ninecon",
      "role": "Senior Data Consultant",
      "period": "October 2024 - Present",
      "location": "Brazil",
      "achievements": [
        "Senior Data Consultant for the Data Team supporting Finance and Supply Management Teams.",
        "Developed and maintained a Data Warehouse in Oracle RDBMS using Star Schema.",
        "Developed and maintained ETL jobs using IBM DataStage.",
        "Acted in the migration of the core ERP system from Protheus (Totvs) to Oracle Fusion involving 50+ tables in Stage and Destination to maintain Power BI reports."
      ]
    },
    {
      "company": "Bluer Tecnologia",
      "role": "Data Engineer / BI Specialist",
      "period": "February 2024 - Present",
      "location": "Sorocaba, São Paulo, Brazil",
      "achievements": [
        "Completed a project reading vehicle rental API data every minute and writing to SQL Server with Dimensional modeling on an AWS VM via Jenkins orchestration.",
        "Designed, architected, and coordinated a Microsoft Fabric solution focused on data engineering.",
        "Created an API on Azure Functions to automate student report emails to parents.",
        "Developed pure ETL processes in Python consuming diverse APIs and writing to MSSQL databases."
      ]
    },
    {
      "company": "AB InBev",
      "role": "BI Developer",
      "period": "March 2024 - September 2024",
      "location": "Remote",
      "achievements": [
        "Provided services via Peapply consulting in the Revenue sector dealing with Price data.",
        "Developed Dashboards using Azure Cloud environment.",
        "Modeled dashboards within Databricks (SQL and PySpark) and Analysis Services/Power BI."
      ]
    },
    {
      "company": "IBM",
      "role": "Business Intelligence Developer",
      "period": "February 2022 - February 2024",
      "location": "Brazil",
      "achievements": [
        "Allocated to Vale BI Engineering team, developing a large asset monitoring portal.",
        "Collected data from CSV, XLSX, SQL Server, Oracle, and SAP HANA using Azure Data Factory.",
        "Developed ADF pipelines applying business rules, storing data into SQL Server on Azure with dimensional modeling.",
        "Led improvement teams and aligned tech solutions using Agile/Azure DevOps."
      ]
    },
    {
      "company": "Grupo Petrópolis",
      "role": "BI Analyst",
      "period": "December 2020 - February 2022",
      "location": "Boituva, São Paulo, Brazil",
      "achievements": [
        "Developed data flows with RPA (Python) and Dashboards for the Logistics department across all factories.",
        "Maintained PL/SQL Packages, Procedures, and Views running daily for distribution planning across 8 factories and 250+ resellers, securing critical high-value operations.",
        "Created the 'Logistic Daily Bulletin' web infographic from scratch using Python, NumPy, Pandas, and Dash, automating reporting into corporate emails."
      ]
    }
  ]
}
```

### 🇧🇷 Versão em Português (Portuguese Data)

```json
{
  "profile": {
    "name": "Renan De Moraes",
    "headline": "Python | SQL | Developer | IA | Open Source | Engenharia de Dados | Consultor",
    "summary": "Sou um 'Builder' de coração — um Engenheiro de Dados & IA com mais de 10 anos de experiência operacional prévia em Logística e Suprimentos. Esse background único me permite conectar perfeitamente requisitos complexos de negócio a soluções técnicas robustas. Especialista no ecossistema Microsoft e no desenvolvimento de agentes inteligentes de IA com LangGraph."
  },
  "experience": [
    {
      "company": "ScoraS",
      "role": "Desenvolvedor de Agentes de IA",
      "period": "Agosto 2025 - Presente",
      "location": "Porto Feliz, São Paulo, Brasil",
      "achievements": [
        "Migração de infraestrutura de container de chatbot com banco PostgreSQL do Azure para a AWS.",
        "Refatoração de código de chatbot baseados em nós do LangGraph para prompts de sistema simplificados, otimizando drasticamente a acurácia.",
        "Construção do zero de aplicações de container de chatbot no Azure integradas com Databricks, Azure AD local e Bdesk para chamados de suporte técnico."
      ]
    },
    {
      "company": "Ninecon",
      "role": "Consultor de Dados Sênior",
      "period": "Outubro 2024 - Presente",
      "location": "Brasil",
      "achievements": [
        "Consultor Sênior atuando junto ao time de Finanças e Gestão de Suprimentos (Supply Management).",
        "Desenvolvimento e manutenção de Data Warehouse em Oracle RDBMS utilizando arquitetura Star Schema.",
        "Desenvolvimento e manutenção de jobs de ETL usando a ferramenta IBM DataStage.",
        "Atuação na migração do sistema ERP principal de Protheus (Totvs) para Oracle Fusion, englobando mais de 50 tabelas de Stage e Destino para manter relatórios em Power BI."
      ]
    },
    {
      "company": "Bluer Tecnologia",
      "role": "Engenheiro de Dados / Especialista em BI",
      "period": "Fevereiro 2024 - Presente",
      "location": "Sorocaba, São Paulo, Brasil",
      "achievements": [
        "Desenvolvimento de pipeline de leitura de dados de API de locação de veículos minuto a minuto para SQL Server com modelagem dimensional (VM AWS + Jenkins).",
        "Arquitetura, design e coordenação de implementação de soluções em Microsoft Fabric focado em engenharia de dados.",
        "Criação de API em Azure Functions para automação de envio de boletins escolares para pais de alunos.",
        "Desenvolvimento de diversos processos puramente de ETL em Python consumindo APIs variadas e escrevendo em MSSQL."
      ]
    },
    {
      "company": "AB InBev",
      "role": "Desenvolvedor de BI",
      "period": "Março 2024 - Setembro 2024",
      "location": "Remoto",
      "achievements": [
        "Atuação no setor de Revenue com dados de precificação estratégica através da consultoria Peapply.",
        "Desenvolvimento de Dashboards analíticos utilizando o ambiente de nuvem Azure.",
        "Modelagem de dados e relatórios utilizando Databricks (SQL e PySpark), Analysis Services e Power BI."
      ]
    },
    {
      "company": "IBM",
      "role": "Desenvolvedor de Business Intelligence",
      "period": "Fevereiro 2022 - Fevereiro 2024",
      "location": "Brasil",
      "achievements": [
        "Alocado no time de Engenharia de BI da Vale, responsável por portal de monitoramento em larga escala de ativos da empresa.",
        "Coleta e ingestão de dados multiplataforma (CSV, XLSX, SQL Server, Oracle, SAP HANA) utilizando Azure Data Factory.",
        "Desenvolvimento de pipelines no ADF aplicando regras de negócio complexas e estruturando o DW conceitual em Star Schema/Snowflake.",
        "Liderança pontual de equipes de melhoria e atuação sob metodologias ágeis com Azure DevOps."
      ]
    },
    {
      "company": "Grupo Petrópolis",
      "role": "Analista de BI",
      "period": "Dezembro 2020 - Fevereiro 2022",
      "location": "Boituva, São Paulo, Brasil",
      "achievements": [
        "Desenvolvimento de fluxos de dados com RPA (Python) e dashboards para a área de Logística corporativa de todas as fábricas.",
        "Suporte e manutenção de Packages, Procedures e Views em PL/SQL (Oracle) cruciais para o planejamento diário de distribuição de produtos acabados para mais de 250 revendas.",
        "Criação e deploy do zero do 'Boletim Diário de Logística', infográfico web moderno em Python (NumPy, Pandas, Dash, HTML/CSS) enviado de forma automatizada por e-mail."
      ]
    }
  ]
}
```

---

## 🤖 Dicas de Prompts Prontos para usar no Cursor (Composer / Chat)

### Para construir a seção do Portfólio do GitHub automaticamente:
> *"Cursor, crie um componente React/Astro que use a API pública do GitHub (`https://api.github.com/users/SEU-USUARIO/repos?sort=updated`) para listar meus repositórios. Filtre para mostrar os que possuem tópicos específicos como 'open-source' ou 'ai-agent', aplique um grid responsivo com Tailwind CSS usando um tema dark e moderno."*

### Para alternância de idiomas limpa:
> *"Cursor, com base no arquivo TASKS.md, configure uma lógica simples de estado para alternar entre o JSON de PT e EN na página principal sem quebrar o layout, garantindo que as conquistas profissionais mudem instantaneamente ao clicar na flag do idioma."*
