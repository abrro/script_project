const express = require('express');
const { sequelize } = require('./models');
const users = require('./routes/users');
const categories = require('./routes/categories');
const movies = require('./routes/movies');
const celebrities = require('./routes/celebrities');
const reviews = require('./routes/reviews');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use('/api', users);
app.use('/api', categories);
app.use('/api', movies);
app.use('/api', celebrities);
app.use('/api', reviews);

function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
  
    if (token == null) return res.redirect(301, '/login');
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.redirect(301, '/login');
    
        req.user = user;
    
        next();
    });
}


// app.get('/categories', (req, res) => {
//     res.sendFile('categories.html', { root: './static/categories' });
// });

app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './static/auth' });
});

app.get('/', authToken, (req, res) => {
    res.sendFile('index.html', { root: './static' });
});


app.use(express.static(path.join(__dirname, 'static')));

app.listen({ port: 8000 }, async () => {
    console.log("app started.");
    await sequelize.authenticate();
});