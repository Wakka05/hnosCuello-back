const User = require('../models/user.model');
// Pagination of queries
const PAGE = 0;
const LIMIT = 10;

exports.getAll = function (req, res) {
    const limit = req.query.limit ? +req.query.limit : LIMIT;
    const page = req.query.page ? +req.query.page : PAGE;

    User.find({}, null, { limit: limit, skip: page }, function (err, docs) {
        if (err) return next(err);
        res.send(docs);
    });
};

exports.details = function (req,res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
};

exports.create = function (req, res) {
    const user = new User(
        {
            name: req.body.name,
            title: req.body.title,
            picture: req.body.picture,
            roles: req.body.roles,
            email: req.body.email
        }
    );

    if (user.roles && user.roles.length ===0) {
        user.roles.push('U0');
    }

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('User created successfully');
    })
};

exports.update = function (req,res) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body},
        function (err, user) {
            if (err) return next(err);
            res.send('User updated');
        });
};

exports.delete = function (req,res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send('User deleted');
    });
};