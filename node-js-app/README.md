Инициализация проекта
npm init -y

npm install express

npm install sequelize pg pg-hstore

npx sequelize-cli init

npx sequelize-cli model:generate --name Post --attributes title:string,body:text

npx sequelize-cli db:migrate

npm install ejs

Добавляем вручную:
app.js
views
.gitignore

TODO: добавить тесты
