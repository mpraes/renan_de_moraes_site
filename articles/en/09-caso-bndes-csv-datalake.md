# Case Study: Ingesting BNDES Expense CSV Data Directly into Data Lake

*Published on Medium*: [https://medium.com/@renan.de.moraes777/exemplo-de-caso-copiando-dados-de-despesas-de-viagens-bndes-csv-direto-do-site-para-o-datalake-db1418b22288](https://medium.com/@renan.de.moraes777/exemplo-de-caso-copiando-dados-de-despesas-de-viagens-bndes-csv-direto-do-site-para-o-datalake-db1418b22288)

---

A practical Data Engineering case study showing how to automate the ingestion of public BNDES expense CSV files directly into the Data Lake Bronze layer.

### Solution Architecture:
- **Automated Ingestion**: Python script capturing public CSV endpoints using Requests.
- **Schema Validation**: Data typing and validation prior to persistence.
- **Lake Persistence**: Partitioned Parquet/Delta format storage for optimized downstream queries.
