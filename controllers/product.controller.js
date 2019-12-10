const Product = require('../models/product.model');
// Pagination of queries
const PAGE = 0;
const LIMIT = 10;

exports.getAll = function (req, res) {
    const limit = req.query.limit ? +req.query.limit : LIMIT;
    const page = req.query.page ? +req.query.page : PAGE;
    let query;

    if (req.query.idCategory) {
        query = Product.find({ idCategory: req.query.idCategory }).limit(limit).skip(limit * page);
    } else {
        query = Product.find({}).limit(limit).skip(limit * page);
    }
    query.exec(function (err, docs) {
        if (err) return next(err);
        res.send(docs);
    });

};

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