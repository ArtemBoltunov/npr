// Подключение необходимых модулей
const express = require('express');
const { Sequelize } = require('sequelize');
const { Post } = require('./models');
const config = require('./config/config.json')['development']; // Подключение конфига (пример для среды разработки)

// Инициализация Express приложения
const app = express();

app.set('view engine', 'ejs');

// Подключение к PostgreSQL через Sequelize
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

// Проверка подключения
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Настройка Express использовать EJS в качестве шаблонизатора
app.set('view engine', 'ejs');

// Настройка middleware для разбора JSON и urlencoded тел запросов
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Маршрут для главной страницы
app.get('/', (req, res) => {
  res.send('Welcome to the Blog!');
});

// Маршрут для отображения списка постов
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.render('posts/index', { posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Error fetching posts');
  }
});

// Маршрут для страницы создания нового поста
app.get('/posts/new', (req, res) => {
  res.render('posts/new');
});

// Маршрут для обработки создания нового поста
app.post('/posts', async (req, res) => {
  try {
    await Post.create({
      title: req.body.title,
      body: req.body.body
    });
    res.redirect('/posts');
  } catch (error) {
    console.error('Error creating a new post:', error);
    res.status(500).send('Error creating a new post');
  }
});

// Запуск сервера на порту 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
