const Category = require('../models/category.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.details = function (req,res) {
    Category.findById(req.params.id, function (err, category) {
        if (err) return next(err);
        res.send(category);
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