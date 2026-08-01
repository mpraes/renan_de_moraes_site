# Estudo de Caso: Ingestão Automática de Despesas BNDES para o Data Lake

*Publicado no Medium*: [https://medium.com/@renan.de.moraes777/exemplo-de-caso-copiando-dados-de-despesas-de-viagens-bndes-csv-direto-do-site-para-o-datalake-db1418b22288](https://medium.com/@renan.de.moraes777/exemplo-de-caso-copiando-dados-de-despesas-de-viagens-bndes-csv-direto-do-site-para-o-datalake-db1418b22288)

---

Estudo de caso prático de Engenharia de Dados demonstrando como automatizar o download e ingestão de arquivos CSV públicos de despesas do BNDES diretamente para a camada Bronze do Data Lake.

### Arquitetura da Solução:
- **Download Automatizado**: Script Python utilizando Requests para captura de arquivos CSV públicos.
- **Validação de Schema**: Garantia de tipagem e integridade antes do salvamento.
- **Persistência no Lake**: Armazenamento particionado em formato Parquet/Delta.
