const Product = require('../models/product.model');

exports.details = function (req,res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

exports.create = function (req, res) {
    const product = new Product(
        {
            name: req.body.name,
            title: req.body.title,
            idCategory: req.body.idCategory
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product created successfully');
    })
};

exports.update = function (req,res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body},
        function (err, product) {
            if (err) return next(err);
            res.send('Product updated');
        });
};

exports.delete = function (req,res) {
    Product.findByIdAndRemove(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send('Product deleted');
    });
};