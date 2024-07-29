# Gerar uma migration
npx sequelize-cli migration:generate --name nome

# Rodar todas Migrations
npx sequelize-cli db:migrate

# Desfazer uma Migration
npx sequelize-cli db:migrate:undo

# Ver o status
npx sequelize-cli db:migrate:status
