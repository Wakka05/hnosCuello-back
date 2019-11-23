const Category = require('../models/category.model');
// Pagination of queries
const PAGE = 0;
const LIMIT = 10;

exports.getAll = function (req, res) {
    const limit = req.query.limit ? +req.query.limit : LIMIT;
    const page = req.query.page ? +req.query.page : PAGE;

    Category.find({}, null, { limit: limit, skip: page }, function (err, docs) {
        if (err) return next(err);
        res.send(docs);
    });
};

exports.details = function (req,res) {
    Category.findById(req.params.id, function (err, category) {
        if (err) return next(err);
        res.json(category);
    })
};

exports.create = function (req, res) {
    const category = new Category(
        {
            name: req.body.name,
            title: req.body.title
        }
    );

    category.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Category created successfully');
    })
};

exports.update = function (req,res) {
    Category.findByIdAndUpdate(req.params.id, {$set: req.body},
        function (err, category) {
            if (err) return next(err);
            res.send('Category updated');
        });
};

exports.delete = function (req,res) {
    Category.findByIdAndRemove(req.params.id, function (err, category) {
        if (err) return next(err);
        res.send('Category deleted');
    });
};