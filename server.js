const path = require('path');
const express = require('express');
const session = require('express-session');

const exphbs = require('express-handlebars');
const mysql = require('mysql2');

const routes = require('./controllers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

// Configure and link a session object with the sequelize store
const sess = {
  secret: 'Farmers Market secret',
  cookie: { },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000, //15 minutes refresh on usage
    expiration: 9 * 60 * 60 * 60 * 1000 //9 hours max
  })
};

// Add express-session and store as Express.js middleware
app.use(session(sess));

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