const express = require('express');
const { sequelize, Reviews, Users } = require('./models');
const Joi = require('joi');
const users = require('./routes/users');
const categories = require('./routes/categories');
const movies = require('./routes/movies');
const celebrities = require('./routes/celebrities');
const reviews = require('./routes/reviews');
const roles = require('./routes/roles');
const movielists = require('./routes/movielist');
const guest_routes = require('./routes/guest');
const path = require('path');
const jwt = require('jsonwebtoken');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://127.0.0.1:8080',
        methods: ['GET', 'POST'],
        withCredentials : true
    },
    allowEIO3: true
});
var corsOptions = {
    origin: 'http://127.0.0.1:8080',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.use('/api', guest_routes);
app.use('/api', users);
app.use('/api', categories);
app.use('/api', movies);
app.use('/api', celebrities);
app.use('/api', reviews);
app.use('/api', roles);
app.use('/api', movielists);

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
};

function authSocket(msg, next) {
    if (msg[1].token == null) {
        next(new Error("Not authenticated"));
    } else {
        jwt.verify(msg[1].token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                next(new Error(err));
            } else {
                msg[1].user = user;
                next();
            }
        });
    }
};

const scheme = Joi.object({
    summary : Joi.string().trim().min(10).max(50).required(),
    comment : Joi.string().trim().min(40).max(200).required(),
    rating: Joi.number().integer().min(1).max(10).required(),
    userId : Joi.number().required(),
    movieId : Joi.number().required()
});

io.on('connection', socket => {
    socket.use(authSocket);
 
    socket.on('review', msg => {
        Users.findOne({ where: { id: msg.user.userId } })
        .then( usr => {
            if (usr.role == 'user') {
                const result = scheme.validate(msg.review);
                const { value, error } = result; 
                const valid = error == null;

                if(!valid){
                    socket.emit('error', {message: error.details[0].message});
                }else{
                    Reviews.create(msg.review)
                    .then( rows => {
                        Reviews.findOne({where: {id : rows.id}, include: ['user']})
                        .then(review => io.emit('review', JSON.stringify(review)));
                    })
                    .catch(err => socket.emit('error', { message : err.message }));
                }
            } else {
                socket.emit('error', {message: "Invalid credentials"});
            }
        })
        .catch(err => socket.emit('error', {message : err.message }));
    });

    socket.on('error', err => socket.emit('error', err.message) );
});

app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './static' });
});

app.get('/', authToken, (req, res) => {
    res.sendFile('index.html', { root: './static' });
});

app.use(express.static(path.join(__dirname, 'static')));

server.listen({ port: 8000 }, async () => {
    console.log("app started.");
    await sequelize.authenticate();
});