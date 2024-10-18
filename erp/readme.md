#  Flyway


## Instruções
- **V\<version>__\<description>.sql** para scripts versionados
- **U\<version>__\<description>.sql** para desfazer scripts
- **R__\<description>.sql** para scripts repetíveis

### Exemplo
- **V1__Create_table.sql**
- **U1__Drop_table.sql**
- **R__Insert_data.sql**

## Configurações Properties
- **flyway.baselineOnMigrate**: Se definido como `true`, o Flyway criará automaticamente a linha de base para seu banco de dados quando você executar a migração. Isso é útil se você estiver começando do zero e não tiver nenhum banco de dados existente.

- **flyway.locations**: Esta propriedade especifica os locais onde o Flyway deve procurar os scripts de migração. Por padrão, o Flyway irá procurá-los no `classpath:db/migration` diretório, mas você pode especificar um local diferente, se necessário.

- **flyway.schemas**: Esta propriedade especifica os esquemas que o Flyway deve gerenciar. Você pode especificar um único esquema ou vários esquemas separados por vírgulas.

## Referência
[Set up Flyway with Spring Boot](https://medium.com/hprog99/set-up-flyway-with-spring-boot-1b24b8abe56e)

```
@Henrique Marcelino :D