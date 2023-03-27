- Sintaxe do MySQL requer terminar os comandos com ;

COMANDOS NECESSÁRIOS:

- Para acessar CLI do mysql:
sudo mysql -u root -p
(Usar MySql CLI)

- Para criar novo modelo:
npx sequelize-cli model:create --name Pessoas --attributes nome:string,ativo:boolean,email:string,role:string;

- Próximos comandos:
npx sequelize-cli db:create;
npx sequelize-cli db:migrate;

- Para popular o banco:
insert into Pessoas (nome, ativo, email, role, createdAt, updatedAt) values ("Moises Carniel", 1, "moises@email.com", "estudante", NOW(), NOW());

# Seeds são meio de criar amostras para testes.
npx sequelize-cli seed:generate --name demo-pessoa

Na pasta seeders, crie as seeds para importar ao banco de dados com o comando:
npx sequelize-cli db:seed:all

# Para associar diferentes tabelas:
- .hasMany para usar um identificador de uma tabela em outra
- .belongsTo para informar de qual tabela vem esse novo valor, chamado de foreign key

As associações devem ser feitas dos dois lados. Depois, os arquivos de migração devem receber as chaves estrangeiras como novo parâmetros:
docente_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Pessoas', key: 'id'}
      }

Fazer a migração depois de terminar as associações: npx sequelize-cli db:migrate




