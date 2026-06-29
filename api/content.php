<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');

$data = [
    'pt' => [
        'nav' => [
            'home' => 'Home',
            'about' => 'Sobre',
            'portfolio' => 'Portfólio',
            'experience' => 'Experiência',
            'contact' => 'Contato',
        ],
        'hero' => [
            'kicker' => 'Builder Mindset',
            'cv' => 'Baixar CV',
            'cvUrl' => './assets/resume/Curriculo_Renan_De_Moraes_PT_AI_Engineer.pdf',
            'cvDownload' => 'Curriculo_Renan_De_Moraes_PT_AI_Engineer.pdf',
            'linkedinAria' => 'Abrir perfil no LinkedIn em nova aba',
            'githubAria' => 'Abrir perfil no GitHub em nova aba',
        ],
        'ui' => [
            'skipToContent' => 'Pular para o conteudo principal',
            'mainNavAria' => 'Navegacao principal',
            'languageSwitchAria' => 'Selecao de idioma',
        ],
        'profile' => [
            'headline' => 'Python | SQL | Developer | IA | Open Source | Engenharia de Dados | Consultor',
            'summary' => "Sou um 'Builder' de coração — Engenheiro de Dados & IA com mais de 10 anos de experiência operacional em Logística e Suprimentos. Conecto requisitos de negócio a soluções técnicas robustas.",
        ],
        'about' => [
            'title' => 'Sobre',
            'text' => 'Especialista de Dados & IA com mais de 10 anos de experiência operacional em Logística e Suprimentos. Conecto requisitos de negócio a soluções técnicas robustas.',
        ],
        'portfolio' => [
            'title' => 'Produtos & SaaS',
            'viewProduct' => 'Visitar produto',
            'items' => [
                ['title' => 'RFX Made Easy', 'text' => 'Plataforma para simplificar e acelerar fluxos de RFx com experiência orientada a resultados.', 'url' => 'https://rfxmadeeasy.com'],
                ['title' => 'Verometric', 'text' => 'Produto com foco em inteligência de dados aplicada para apoiar decisões de negócio.', 'url' => 'https://verometric.space'],
                ['title' => 'DeepSQL Pro', 'text' => 'Solução para produtividade em SQL e análise de dados com suporte de IA.', 'url' => 'https://deepsql.pro'],
            ],
        ],
        'opensource' => [
            'title' => 'Open Source',
            'subtitle' => 'Repositórios mais recentes no GitHub.',
            'empty' => 'Não foi possível carregar os repositórios agora.',
            'featuredTitle' => 'Principais Repositórios',
            'featuredBadge' => 'Em destaque',
            'viewRepo' => 'Ver repositório',
            'noDescription' => 'Sem descrição.',
        ],
        'experience' => [
            'title' => 'Experiência',
            'items' => [
                [
                    'company' => 'ScoraS',
                    'role' => 'Desenvolvedor de Agentes Inteligentes',
                    'period' => 'Agosto 2025 - Presente',
                    'location' => 'Porto Feliz, SP',
                    'achievements' => [
                        'Migração de infraestrutura de container de chatbot com PostgreSQL do Azure para AWS.',
                        'Refatoração de fluxo LangGraph para prompts com alta acurácia.',
                        'Integrações com Databricks, Azure AD local e Bdesk para chamados de suporte técnico.',
                    ],
                ],
                [
                    'company' => 'Ninecon',
                    'role' => 'Consultor de Dados & IA Sênior',
                    'period' => 'Outubro 2024 - Presente',
                    'location' => 'São Paulo, Brasil',
                    'achievements' => [
                        'Suporte a Finanças e Supply com Data Warehouse Oracle RDBMS.',
                        'Desenvolvimento e manutenção de ETL com IBM DataStage.',
                        'Atuação na migração do sistema ERP principal de Protheus (Totvs) para Oracle Fusion, englobando mais de 50 tabelas de Stage e Destino para manter relatórios em Power BI.',
                    ],
                ],
                [
                    'company' => 'IBM',
                    'role' => 'Desenvolvedor de Business Intelligence',
                    'period' => 'Fevereiro 2022 - Fevereiro 2024',
                    'location' => 'São Paulo, Brasil',
                    'achievements' => [
                        'Pipelines em Azure Data Factory para múltiplas fontes.',
                        'Modelagem dimensional para análises em escala com Databricks (SQL e PySpark).',
                        'Desenvolvimento de Dashboards em Analysis Services e Power BI.',
                        'Liderança pontual de equipes de melhoria e atuação sob metodologias ágeis com Azure DevOps.',
                    ],
                ],
                [
                    'company' => 'Bluer Tecnologia',
                    'role' => 'Engenheiro de Dados / Especialista em BI',
                    'period' => 'Fevereiro 2024 - Presente',
                    'location' => 'Sorocaba, São Paulo, Brasil',
                    'achievements' => [
                        'Desenvolvimento de pipeline de leitura de dados de API de locação de veículos minuto a minuto para SQL Server com modelagem dimensional (VM AWS + Jenkins).',
                        'Arquitetura, design e coordenação de implementação de soluções em Microsoft Fabric focado em engenharia de dados.',
                        'Criação de API em Azure Functions para automação de envio de boletins escolares para pais de alunos.',
                        'Desenvolvimento de diversos processos puramente de ETL em Python consumindo APIs variadas e escrevendo em MSSQL.',
                    ],
                ],
                [
                    'company' => 'AB InBev',
                    'role' => 'Desenvolvedor de BI',
                    'period' => 'Março 2024 - Setembro 2024',
                    'location' => 'Remoto',
                    'achievements' => [
                        'Atuação no setor de Revenue com dados de precificação estratégica através da consultoria Peapply.',
                        'Desenvolvimento de Dashboards analíticos utilizando o ambiente de nuvem Azure.',
                        'Modelagem de dados e relatórios utilizando Databricks (SQL e PySpark), Analysis Services e Power BI.',
                    ],
                ],
                [
                    'company' => 'Grupo Petrópolis',
                    'role' => 'Analista de BI',
                    'period' => 'Dezembro 2020 - Fevereiro 2022',
                    'location' => 'Boituva, São Paulo, Brasil',
                    'achievements' => [
                        'Desenvolvimento de fluxos de dados com RPA (Python) e dashboards para a área de Logística corporativa de todas as fábricas.',
                        'Suporte e manutenção de Packages, Procedures, e Views em PL/SQL (Oracle) cruciais para o planejamento diário de distribuição de produtos acabados para mais de 250 revendas.',
                        'Criação e deploy do zero do "Boletim Diário de Logística", infográfico web moderno em Python (NumPy, Pandas, Dash, HTML/CSS) enviado de forma automatizada por e-mail.',
                    ],
                ],
            ],
        ],
        'certifications' => [
            'title' => 'Certificações',
            'items' => [
                ['title' => 'Certificação Microsoft Fabric Data Engineer (DP-700)', 'url' => 'https://learn.microsoft.com/api/credentials/share/en-us/RenanDeMoraes-1317/F1FC41CE1358FBBF?sharingId=65756B3A55ACF52F'],
                ['title' => 'Certificação Microsoft Azure Data Fundamentals (DP-900)', 'url' => 'https://learn.microsoft.com/api/credentials/share/en-us/RenanDeMoraes-1317/58F87144611C6BED?sharingId=65756B3A55ACF52F'],
                ['title' => 'Certificação Microsoft Azure Fundamentals (AZ-900)', 'url' => 'https://learn.microsoft.com/api/credentials/share/en-us/RenanDeMoraes-1317/2CB1030C8849DBA5?sharingId=65756B3A55ACF52F'],
                ['title' => 'Certificação Oracle Cloud Infrastructure Foundations 2024 Associate (OCP-100)', 'url' => 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=275E2665349054E1E0B070F3094542753396AF533A82B6DAD0660102AFD5A6DE'],
                ['title' => 'Certificação Oracle Fusion AI Agent Studio Certified', 'url' => 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=5D4ECC0EAAA995AB19975EA8B21B5A37D04E2075AB78D50019504725F83C71F4'],
            ],
        ],
        'contact' => [
            'title' => 'Contato',
            'cta' => 'Vamos construir algo útil juntos? Entre em contato comigo.',
        ],
    ],
    'en' => [
        'nav' => [
            'home' => 'Home',
            'about' => 'About',
            'portfolio' => 'Portfolio',
            'experience' => 'Experience',
            'contact' => 'Contact',
        ],
        'hero' => [
            'kicker' => 'Builder Mindset',
            'cv' => 'Download Resume',
            'cvUrl' => './assets/resume/Resume_Renan_De_Moraes_EN_AI_Engineer.pdf',
            'cvDownload' => 'Resume_Renan_De_Moraes_EN_AI_Engineer.pdf',
            'linkedinAria' => 'Open LinkedIn profile in a new tab',
            'githubAria' => 'Open GitHub profile in a new tab',
        ],
        'ui' => [
            'skipToContent' => 'Skip to main content',
            'mainNavAria' => 'Main navigation',
            'languageSwitchAria' => 'Language selection',
        ],
        'profile' => [
            'headline' => 'Python | SQL | Developer | AI | Open Source | Data Engineering & Consultant',
            'summary' => "I am a 'Builder' at heart — a Data & AI Engineer with 10+ years of operational experience in Logistics and Procurement, bridging business requirements and technical solutions.",
        ],
        'about' => [
            'title' => 'About',
            'text' => 'Specialized in Data & AI Engineering with 10+ years of operational experience in Logistics and Procurement. I bridge the gap between complex business requirements and technical solutions.',
        ],
        'portfolio' => [
            'title' => 'Products & SaaS',
            'viewProduct' => 'Visit product',
            'items' => [
                ['title' => 'RFX Made Easy', 'text' => 'Platform to simplify and accelerate RFx workflows with an results-driven experience.', 'url' => 'https://rfxmadeeasy.com'],
                ['title' => 'Verometric', 'text' => 'Product focused on applied data intelligence to support business decisions.', 'url' => 'https://verometric.space'],
                ['title' => 'DeepSQL Pro', 'text' => 'Solution for SQL productivity and data analysis with AI support.', 'url' => 'https://deepsql.pro'],
            ],
        ],
        'opensource' => [
            'title' => 'Open Source',
            'subtitle' => 'Most recent repositories from GitHub.',
            'empty' => 'Could not load repositories right now.',
            'featuredTitle' => 'Featured Repositories',
            'featuredBadge' => 'In spotlight',
            'viewRepo' => 'View repository',
            'noDescription' => 'No description.',
        ],
        'experience' => [
            'title' => 'Experience',
            'items' => [
                [
                    'company' => 'ScoraS',
                    'role' => 'AI Agent Developer',
                    'period' => 'August 2025 - Present',
                    'location' => 'Porto Feliz, SP',
                    'achievements' => [
                        'Migrated chatbot infrastructure with PostgreSQL from Azure to AWS.',
                        'Refactored LangGraph node flow to simple system prompt architecture for high accuracy results.',
                        'Built chatbot container apps in Azure from scratch interacting with tools like Databricks, Azure AD on-prem, and Bdesk for tech support calls.',
                    ],
                ],
                [
                    'company' => 'Ninecon',
                    'role' => 'Senior Data Consultant',
                    'period' => 'October 2024 - Present',
                    'location' => 'São Paulo, Brazil',
                    'achievements' => [
                        'Supported Finance and Supply teams with Oracle RDBMS Data Warehouse.',
                        'Developed and maintained ETL jobs using IBM DataStage.',
                        'Acted in the migration of the core ERP system from Protheus (Totvs) to Oracle Fusion involving 50+ tables in Stage and Destination to maintain Power BI reports.',
                    ],
                ],
                [
                    'company' => 'IBM',
                    'role' => 'Business Intelligence Developer',
                    'period' => 'February 2022 - February 2024',
                    'location' => 'Brazil',
                    'achievements' => [
                        'Built Azure Data Factory pipelines for multi-source ingestion.',
                        'Delivered dimensional models for large-scale analytics with Databricks (SQL and PySpark).',
                        'Developed Dashboards in Analysis Services and Power BI.',
                        'Led improvement teams and aligned tech solutions using Agile/Azure DevOps.',
                    ],
                ],
                [
                    'company' => 'Bluer Tecnologia',
                    'role' => 'Data Engineer / BI Specialist',
                    'period' => 'February 2024 - Present',
                    'location' => 'Sorocaba, São Paulo, Brazil',
                    'achievements' => [
                        'Developed a minute-by-minute vehicle rental API ingestion pipeline into SQL Server with dimensional modeling (AWS VM + Jenkins).',
                        'Designed architecture and coordinated implementation of Microsoft Fabric solutions focused on data engineering.',
                        'Created an Azure Functions API to automate school report delivery for students parents.',
                        'Developed multiple ETL pipelines in Python consuming varied APIs and writing to MSSQL.',
                    ],
                ],
                [
                    'company' => 'AB InBev',
                    'role' => 'BI Developer',
                    'period' => 'March 2024 - September 2024',
                    'location' => 'Remote',
                    'achievements' => [
                        'Worked in the Revenue area with strategic pricing data through Peapply consulting.',
                        'Developed analytical dashboards using the Azure cloud environment.',
                        'Built data models and reports using Databricks (SQL and PySpark), Analysis Services, and Power BI.',
                    ],
                ],
                [
                    'company' => 'Grupo Petrópolis',
                    'role' => 'BI Analyst',
                    'period' => 'December 2020 - February 2022',
                    'location' => 'Boituva, São Paulo, Brazil',
                    'achievements' => [
                        'Developed data flows with RPA (Python) and Dashboards for the Logistics department across all factories.',
                        'Maintained PL/SQL Packages, Procedures, and Views running daily for distribution planning across 8 factories and 250+ resellers, securing critical high-value operations.',
                        'Created the "Logistic Daily Bulletin" web infographic from scratch using Python, NumPy, Pandas, and Dash, automating reporting into corporate emails.',
                    ],
                ],
            ],
        ],
        'certifications' => [
            'title' => 'Certifications',
            'items' => [
                ['title' => 'Microsoft Fabric Data Engineer (DP-700)', 'url' => 'https://learn.microsoft.com/api/credentials/share/en-us/RenanDeMoraes-1317/F1FC41CE1358FBBF?sharingId=65756B3A55ACF52F'],
                ['title' => 'Microsoft Azure Data Fundamentals (DP-900)', 'url' => 'https://learn.microsoft.com/api/credentials/share/en-us/RenanDeMoraes-1317/58F87144611C6BED?sharingId=65756B3A55ACF52F'],
                ['title' => 'Microsoft Azure Fundamentals (AZ-900)', 'url' => 'https://learn.microsoft.com/api/credentials/share/en-us/RenanDeMoraes-1317/2CB1030C8849DBA5?sharingId=65756B3A55ACF52F'],
                ['title' => 'Oracle Cloud Infrastructure Foundations 2024 Associate (OCP-100)', 'url' => 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=275E2665349054E1E0B070F3094542753396AF533A82B6DAD0660102AFD5A6DE'],
                ['title' => 'Oracle Fusion AI Agent Studio Certified', 'url' => 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=5D4ECC0EAAA995AB19975EA8B21B5A37D04E2075AB78D50019504725F83C71F4'],
            ],
        ],
        'contact' => [
            'title' => 'Contact',
            'cta' => "Let's build something useful together.",
        ],
    ],
];
echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
