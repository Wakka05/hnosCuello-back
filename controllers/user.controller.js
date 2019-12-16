const mongoose = require('mongoose');
//const User = require('../models/user.model');
// Pagination of queries
const PAGE = 0;
const LIMIT = 10;
const User = mongoose.model('User');
const passport = require('passport');

exports.getAll = function (req, res) {
    const limit = req.query.limit ? +req.query.limit : LIMIT;
    const page = req.query.page ? +req.query.page : PAGE;

    User.find({}, null, { limit: limit, skip: page }, function (err, docs) {
        if (err) return next(err);
        res.send(docs);
    });
};

exports.details = function (req,res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
};

exports.register = function (req, res, next) {
    const user = new User(
        {
            name: req.body.name,
            surnames: req.body.surnames,
            password: req.body.password,
            //picture: req.body.picture,
            //roles: req.body.roles,
            roles: 'U0',
            email: req.body.email,
            order: {ticket: [], isConfirmed: false}
        }
    );

    user.save(function (err) {
        let token;
        token = user.generateJwt();
        if (err) {
            return next(err);
        }
        res.status(200);
        res.json({
            "token": token
        });
        //res.send('User created successfully');
    })
};

exports.login = function (req, res) {
    passport.authenticate('local', function (err, user, info) {
        let token;

        if (err) {
            res.status(404).json(err);
            return;
        }

        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                'token': token
            });
        } else {
            res.status(401).json(info);
        }
    }) (req, res);
};

exports.update = function (req,res,next) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true},
        function (err, user) {
            if (err) return next(err);
            res.send(user);
        });
};

exports.delete = function (req,res,next) {
    User.findByIdAndRemove(req.params._id, {new: true}, function (err, user) {
        if (err) return next(err);
        res.send(user);
    });
};