# Navegando pela Arquitetura de Data Warehouse: Abordagens Inmon vs Kimball

*Publicado no Medium*: [https://medium.com/@renan.de.moraes777/navigating-the-data-warehouse-landscape-inmon-vs-kimball-approaches-19ce48d082ed](https://medium.com/@renan.de.moraes777/navigating-the-data-warehouse-landscape-inmon-vs-kimball-approaches-19ce48d082ed)

---

Um comparativo clássico e essencial sobre as duas maiores filosofias de arquitetura de Data Warehouse: Bill Inmon vs Ralph Kimball.

### Inmon (Top-Down):
- Constrói primeiro um modelo relacional corporativo altamente normalizado (3FN).
- Consome mais tempo inicial, mas fornece uma única fonte da verdade centralizada.

### Kimball (Bottom-Up):
- Constrói Data Marts dimensionais (Star Schema) orientados aos processos de negócio.
- Entrega valor rápido para as áreas de negócio com ciclos iterativos agilidade.

### Tendência Moderna:
Plataformas como Lakehouse combinam a governança centralizada do Inmon com a velocidade dimensional do Kimball.
