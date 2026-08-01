# Resumo dos Meus Projetos em Consultoria nos Últimos 2 Anos

*Article published on Medium*: [https://medium.com/@renan.de.moraes777/resumo-dos-meus-projetos-em-consultoria-nos-últimos-2-anos-para-te-dar-insights-de-projetos-8d15e2466064](https://medium.com/@renan.de.moraes777/resumo-dos-meus-projetos-em-consultoria-nos-últimos-2-anos-para-te-dar-insights-de-projetos-8d15e2466064)

---

### Resumo dos meus projetos em consultoria nos últimos 2 anos para te dar insights de projetos portifolio — Parte 1

Nos últimos dois anos surgiu uma oportunidade muito interessante, que era trabalhar como Pessoa Jurídica prestando serviços para empresas de consultoria.

Com certeza não é um “fake CLT”, pois eu trabalhava em horas, projetos e mais de uma empresa.

Porém o foco aqui não é comentar dos aspectos jurídicos, financeiros ou ambiente de trabalho, mas dos projetos técnicos e a experiência que consegui nesses anos como consultor.

Algo que chama atenção nesses dois anos foi que o meu perfil se tornou muito “generalista” e pouco “especialista” em ferramentas ou linguagens. A parte boa disso é que eu consigo me adaptar em novos projetos com certa facilidade, a parte ruim é que muitos projetos em certos casos requerem especialização em certas ferramentas (nível de Senioridade).

Mas existem coisas que não deixam de estar fora da maior parte dos projetos:

- Git;
- Python;
- SQL;
- Configuração de Infra.

Todos os projetos passam, no mínimo, por um pouco de cada tema mencionado acima. E pasme, tive que lidar e configurar muita infra de projetos para que pudesse trabalhar (maquinas virtuais, conexões de bancos de dados, configurações de APIs, contêineres, até Terraform), então é importantíssimo saber um pouco disso. Como são projetos de empresas diferentes, logo as “infras” de cada empresa tem suas particularidades.

Enfim, vamos ao que interessa nesse texto, a parte técnica desses anos. Eu quero que você entenda os cenários e use-os em seu portifólio pessoal tentando simular o máximo a fim de que possa ajudar na sua carreira.

### ETL com Python/Pandas de um sistema de rastreamento de veículos para MSSQL.

Me lembro que esse foi meu primeiro desafio. Uma empresa pequeno porte do ramo imobiliário precisava de dados do sistema de rastreamento dos próprios veículos para criar dashboards no Power BI.

Eles tinham uma VM na Azure com um SQL Server licenciado dentro, e eu tive que, dentro dessa VM, desenvolver um script python que consumiria dados (semi-estruturados) dessa API REST do sistema e jogaria para o SQL Server.

Foi algo simples, pois fiz um star schema padrão entre 4 e 6 tabelas com uma fato e algumas dimensões, mas não tão simples, visto que tive que instalar o Jenkins para que pudesse rodar esse script de minuto em minuto e alimentar o SQL Server (hoje o armazenamento está cheio por causa disso). E também o Jenkins enviava notificações para e-mail de erros. O projeto está lá até hoje. E não trabalhei com o Power BI (ufa!).

### RPA com Python dentro de uma VM para um MSSQL consumindo do SAP RFC.

Nesse projeto, precisava-se de uma automação de relatório em .xls que semanalmente atualizasse o MRP de estoque de uma multinacional e enviasse aos compradores também os rastreamentos de pedidos. Na verdade a automação já existia em parte, porém precisava ser completada.

Com isso eu acessava via python/pandas algumas tabelas do SAP padrão (não lembro os nomes de cabeça), fazia muitas transformações de negócio no código, usava um MSSQL como “staging” (pois havia tabelas oriundas de outros “ETL”, rodava após isso uma procedure no MSSQL e gerava o .xls que enviava por e-mail.

Confesso que esse foi o projeto mais complicado por falta de tempo suficiente (atuava em diversos ao mesmo tempo) então entreguei tempo depois do previsto. Mas está lá até hoje também rodando dentro de uma VM no Jenkins.

Perceba que não uso Apache Airflow para orquestrações. Até poderia mas como foram projetos pequenos o Jenkins resolveu fácil.

### Muitas queries SQL de um banco de Prod do sistema Senior.

Existia um cliente de médio porte que tinha diversos departamentos com demandas de Dashboards de PBI. Logo os desenvolvedores na época sabiam pouco de SQL para lidar com CTEs de diversas tabelas, lidar com interpretação de tabelas e outras coisas do tipo (na época o ChatGPT ainda estava engatinhando).

Infelizmente esse é um dos casos em que o cliente não se importa muito com a parte técnica, contanto que custo seja baixo (só mão de obra e licenças PBI). Como é cliente com pouca volumetria de dados então dava para prosseguir assim, onde o PBI conectava diretamente com banco dados (Oracle) e realizava queries importando para o pbi.

Esse é um caso de trabalhar dezenas de horas com diversas queries (entre 8 e 12 acho), umas grandes outras não.

### Migração de um Data Warehouse construido dentro de VM com SQL Server e SSIS para MS Fabric.

Esse foi um projeto muito interessante, onde eu mais trabalhei na arquitetura e infra do que no desenvolvimento de Fato.

Uma empresa (grupo) tinha projetos iniciais onde se criava relatórios PBI vindos de bancos de dados SQL Server que eram “réplicas” de tabelas do SAP BW (eu acho). Após isso sentiu-se a necessidade de um DW corporativo comercial onde lidava com diversas tabelas SAP (AFKO, MARA, EKKO, MBEW, BSIK, etc) para os principais indicadores gerenciais.

Viu-se que, usando o MS Fabric para esses processos de engenharia seria mais efetivo e menos custoso do que o cenário de uma VM com SQL Server e SSIS, então fez-se toda essa migração de mais de 50 relatórios PBI de diversos setores que foram construídos em anos anteriores (com ctes imensas).

Eu participei muito na arquitetura e orientações técnicas no inicio do projeto, mas outros colegas pegaram o Lakehouse com Bronze/Prata/Ouro e diversas abordagens interessantes. Hoje o projeto está bem avançado, onde os engenheiros vão até a camada prata e o pessoal mais perfil analista/desenvolvedor de BI com as camadas ouro (Usando spark.sql) e modelos semanticos do PBI.

### Atuação no desenvolvimento de Dashboard PBI com base no Bricks

Esse projeto durou 7 meses em uma empresa “imensa” com um time de analytics de mais de 2 mil pessoas na área Tech que parecia ser mais madura na cultura.

Fiquei 7 meses de idas e vindas em homologações e dificuldades com dados. Na verdade tive que fazer algo que não me sentia confortável que era pegar código de pessoa de negócios e refatorar onde fosse possível para lidar com performance (era volumetria de mihões diários).

Nesse caso fui desenvolvedor BI mesmo, onde eu pegava dados da “prata” que era um Lake no Azure, e tratava no Bricks para modelar star schema estilo Kimball (eles nem sabiam disso), mas lá tinha algo diferente que era o famoso CI/CD, onde eu criava e testava em dev os notebooks (cinco ou seis), e quando desse certo tinha que fazer pull request para que outro time (devops) rodasse e testasse em prod (cluster bricks mais parrudo).

Aqui tinha que pegar dados de fornecedores de dados (preços) dos produtos na hora de vendidos para oconsumidor final a nível Brasil.

Lá tinha style guide com bookmarks avançados e layouts no figma para customizar, então fiquei muito focado nessa parte de dataviz.

Mas a parte negativa era resistencia do time negócios em mudanças, na minha visão era um projeto não necessário e com isso achei melhor desistir do mesmo. Confesso que foi frustrante, mas o que mais precisava na época eu consegui, experiência com Bricks e Pyspark.

Saí de lá entregando mais de 70% do projeto (notebooks e painel prontos em prd, mas faltava validação da área de negócios em alguns dos números).

Enfim, Isso foi somente ano passado (e tem mais coisa ainda rs), mas na próxima parte pretendo falar de outros projetos e mais voltando para IA mesmo.

Até mais