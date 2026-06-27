<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

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
            'cv' => 'Download CV',
        ],
        'profile' => [
            'headline' => 'Python | SQL | Developer | IA | Open Source | Engenharia de Dados | Consultor',
            'summary' => "Sou um 'Builder' de coração — Engenheiro de Dados & IA com mais de 10 anos de experiência operacional em Logística e Suprimentos. Conecto requisitos de negócio a soluções técnicas robustas.",
        ],
        'about' => [
            'title' => 'Sobre',
            'text' => 'Especialista em arquitetura de dados, ETL, BI e agentes inteligentes. Atuo da estratégia à execução com foco em impacto de negócio.',
        ],
        'portfolio' => [
            'title' => 'SaaS & Products',
            'items' => [
                ['title' => 'Pipeline Observer', 'text' => 'Monitoramento de jobs de dados com alertas e histórico de execução.'],
                ['title' => 'Cost Insight', 'text' => 'Dashboard para otimização de custos de cloud em ambientes de analytics.'],
                ['title' => 'Agent Helpdesk', 'text' => 'Assistente de suporte técnico com IA para triagem e resolução inicial.'],
            ],
        ],
        'opensource' => [
            'title' => 'Open Source',
            'subtitle' => 'Repositórios recentes no GitHub.',
            'empty' => 'Não foi possível carregar os repositórios agora.',
            'featuredTitle' => 'Principais Repositórios',
            'latestTitle' => 'Outros Repositórios',
            'featuredBadge' => 'Principal',
            'viewRepo' => 'Ver repositório',
            'noDescription' => 'Sem descrição.',
        ],
        'experience' => [
            'title' => 'Experiência',
            'items' => [
                [
                    'company' => 'ScoraS',
                    'role' => 'Desenvolvedor de Agentes de IA',
                    'period' => 'Agosto 2025 - Presente',
                    'location' => 'Porto Feliz, SP',
                    'achievements' => [
                        'Migração de chatbot com PostgreSQL do Azure para AWS.',
                        'Refatoração de fluxo LangGraph para prompts com alta acurácia.',
                        'Integrações com Databricks, Azure AD local e Bdesk.',
                    ],
                ],
                [
                    'company' => 'Ninecon',
                    'role' => 'Consultor de Dados Sênior',
                    'period' => 'Outubro 2024 - Presente',
                    'location' => 'Brasil',
                    'achievements' => [
                        'Suporte a Finanças e Supply com Data Warehouse Oracle.',
                        'ETL com IBM DataStage e migração ERP para Oracle Fusion.',
                    ],
                ],
                [
                    'company' => 'IBM',
                    'role' => 'Desenvolvedor de BI',
                    'period' => 'Fevereiro 2022 - Fevereiro 2024',
                    'location' => 'Brasil',
                    'achievements' => [
                        'Pipelines em Azure Data Factory para múltiplas fontes.',
                        'Modelagem dimensional para análises em escala.',
                    ],
                ],
            ],
        ],
        'contact' => [
            'title' => 'Contato',
            'cta' => 'Vamos construir algo útil juntos.',
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
            'cv' => 'Download CV',
        ],
        'profile' => [
            'headline' => 'Python | SQL | Developer | AI | Open Source | Data Engineering | Consultant',
            'summary' => "I am a 'Builder' at heart — a Data & AI Engineer with 10+ years of operational experience in Logistics and Procurement, bridging business requirements and technical solutions.",
        ],
        'about' => [
            'title' => 'About',
            'text' => 'Specialized in data architecture, ETL, BI, and intelligent agents. I work from strategy to delivery with focus on business impact.',
        ],
        'portfolio' => [
            'title' => 'SaaS & Products',
            'items' => [
                ['title' => 'Pipeline Observer', 'text' => 'Data jobs monitoring with alerts and execution history.'],
                ['title' => 'Cost Insight', 'text' => 'Cloud analytics cost optimization dashboard.'],
                ['title' => 'Agent Helpdesk', 'text' => 'AI technical support assistant for triage and first response.'],
            ],
        ],
        'opensource' => [
            'title' => 'Open Source',
            'subtitle' => 'Latest repositories from GitHub.',
            'empty' => 'Could not load repositories right now.',
            'featuredTitle' => 'Featured Repositories',
            'latestTitle' => 'Other Repositories',
            'featuredBadge' => 'Featured',
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
                        'Refactored LangGraph node flow to high-accuracy prompt architecture.',
                        'Integrated tools such as Databricks, Azure AD on-prem, and Bdesk.',
                    ],
                ],
                [
                    'company' => 'Ninecon',
                    'role' => 'Senior Data Consultant',
                    'period' => 'October 2024 - Present',
                    'location' => 'Brazil',
                    'achievements' => [
                        'Data support for Finance and Supply teams with Oracle DWH.',
                        'ETL with IBM DataStage and ERP migration to Oracle Fusion.',
                    ],
                ],
                [
                    'company' => 'IBM',
                    'role' => 'Business Intelligence Developer',
                    'period' => 'February 2022 - February 2024',
                    'location' => 'Brazil',
                    'achievements' => [
                        'Built Azure Data Factory pipelines for multi-source ingestion.',
                        'Delivered dimensional models for large-scale analytics.',
                    ],
                ],
            ],
        ],
        'contact' => [
            'title' => 'Contact',
            'cta' => "Let's build something useful together.",
        ],
    ],
];

echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
