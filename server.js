const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql2');

const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
//sequelize.sync({ force: false }).then(() => { //production version
sequelize.sync({ alter: true }).then(() => { //development version
  app.listen(PORT, () => console.log('Now listening on http://localhost:3001'));
});
//app.listen(PORT, () => console.log('Now listening on http://localhost:3001'));