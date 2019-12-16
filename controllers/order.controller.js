const Order = require('../models/order.model');

exports.details = function (req,res,next) {
    Order.findById(req.params.id, function (err, order) {
        if (err) return next(err);
        res.json(order);
    })
};

exports.create = function (req, res, next) {
    const order = new Order(
        {
            product: req.body.product,
            quantity: req.body.quantity,
            finalPrice: req.body.finalPrice
        }
    );

    order.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send(order);
    })
};

exports.update = function (req,res) {
    Order.findByIdAndUpdate(req.params.id, {$set: req.body},
        function (err, order) {
            if (err) return next(err);
            res.send(order);
        });
};

exports.delete = function (req,res,next) {
    Order.findByIdAndRemove(req.params.id, function (err, order) {
        if (err) return next(err);
        res.send(order);
    });
};