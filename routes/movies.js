const express = require('express');
const { sequelize, Movies, Users, Roles, Celebrities } = require('../models');
const jwt = require('jsonwebtoken');
const JoiBase = require('joi');
const JoiDate = require('@hapi/joi-date');
const Joi = JoiBase.extend(JoiDate);
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ msg: err });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}

route.use(authToken);

const scheme = Joi.object({
    title: Joi.string().max(120).required(),
    synopsis: Joi.string().min(50).max(200).required(),
    release_date: Joi.date().format("YYYY-MM-DD").required(),
    categoryId: Joi.number().integer().required()
});

route.get('/movies', (req, res) => {
    Movies.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/category/:id/movies', (req, res) => {
    Movies.findAll({where : {categoryId : req.params.id}})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/movies/:id', (req, res) => {
    const id = req.params.id;

    Movies.findAll({
        where: {
            id: id
        },
        include: [{
            model: Roles,
            as: 'roles',
            through: {
                attributes: []
            },
            include: [{
                model: Celebrities,
                as: 'celebrities',
                through: {
                    attributes: []
                }
            }]
        }]
    })
    .then( rows => res.json(rows) )
    .catch( err => res.status(500).json(err) );
});

route.post('/movies', (req, res) => {

    //prvo proveriti da li postoji kategorija u kojoj se pravi movie
    //da li praviti objekte ovde ili to kroz body kontrolisati
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role = 'admin' || 'content_creator') {
            
                const result = scheme.validate(req.body);
                const { value, error } = result; 
                const valid = error == null;

                if(!valid){
                    res.status(422).json({msg : error.details[0].message});
                }else{
                    Movies.create(req.body)
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
                }
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

route.put('/movies/:id', (req, res) => {
    const id = req.params.id;

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role = 'admin' || 'content_creator') {
               
                const result = scheme.validate(req.body);
                const { value, error } = result; 
                const valid = error == null;

                if(!valid){
                    res.status(422).json({msg : error.details[0].message});
                }else{
                    Movies.update(req.body, { where: { id: id } })
                    .then( num => {
                        if (num == 1){
                            res.status(200).json({msg : "Update successful"});
                        } else {
                            res.status(404).json({msg : "Cannot delete category with id :" + id + ". Resource might not exist."});
                        }
                    } )
                    .catch( err => res.status(500).json(err) );
                }
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

route.delete('/movies/:id', (req, res) => {
    const id = req.params.id;

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role = 'admin' || 'content_creator') {
                Movies.destroy({ where: { id: id } })
                    .then( num => {
                        if (num == 1){
                            res.status(200).json({msg : "Deletion successful"});
                        } else {
                            res.status(404).json({msg : "Cannot delete category with id :" + id + ". Resource might not exist."});
                        }
                    } )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;