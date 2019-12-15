const Resource = require('../models/resource.model');
const fs = require('fs');

exports.getResources = function (req,res,next) {
    Resource.findById(req.params.id, function (err, resource) {
        if (err) return next(err);
        let thumb = new Buffer(resource.image.data).toString('base64');
        res.json({content: thumb});
    })
};

exports.uploadResource = function (req,res) {
    let resource = new Resource();
    resource.image.data = fs.readFileSync(req.files[0].path);
    resource.image.contentType = 'image/jpeg';
    resource.save();

    res.status(200);
    res.send(resource);
};