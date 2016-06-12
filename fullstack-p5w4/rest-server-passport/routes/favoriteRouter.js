var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var Favorites = require('../models/favorites');

var favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')

.all(Verify.verifyOrdinaryUser)

.get(function(req, res, next) {
  Favorites.findOne({
      postedBy: req.decoded._doc._id
    })
    .populate('dishes')
    .populate('postedBy')
    .exec(function(err, favorite) {
      if (err) throw err;
      res.json(favorite);
    });
})

.post(function(req, res, next) {
  var userId = req.decoded._doc._id;
  Favorites.findOneAndUpdate({
    postedBy: userId
  }, {
    $addToSet: {
      dishes: req.body
    }
  }, {
    upsert: true,
    new: true
  }, function(err, favorite) {
    if (err) throw err;

    res.json(favorite);
  });
})


// .post(function(req, res, next) {
//   Favorites.findOne({
//     postedBy: req.decoded._doc._id
//   }, function(err, favorite) {
//     if (err) throw err;
//     if (!favorite) {
//       Favorites.create({
//         dishes: [req.body._id],
//         postedBy: req.decoded._doc._id
//       }, function(err, favorite) {
//         if (err) throw err;
//         console.log('Favorite created!');
//         res.json(favorite);
//       });
//     } else {
//       favorite.dishes.push(req.body._id);
//       favorite.save(function(err, favorite) {
//         if (err) throw err;
//         res.json(favorite);
//       });
//     }
//   })
//
// })

// .delete(function(req, res, next) {
//   Favorites.remove({
//     postedBy: req.decoded._doc._id
//   }, function(err, resp) {
//     if (err) throw err;
//     res.json(resp);
//   });
// });

.delete(function(req, res, next) {
  var userId = req.decoded._doc._id;

  Favorites.findOneAndRemove({
    postedBy: userId
  }, function(err, resp) {
    if (err) throw err;
    res.json(resp);
  });
});

favoriteRouter.route('/:dishObjectId')

.all(Verify.verifyOrdinaryUser)

// .delete(function(req, res, next) {
//   Favorites.findOne({
//     postedBy: req.decoded._doc._id
//   }, function(err, favorite) {
//     var dishIdx = favorite.dishes.indexOf(req.params.dishObjectId);
//     if (dishIdx > -1) {
//       favorite.dishes.splice(, 1);
//       favorite.save(function(err, favorite) {
//         if (err) throw err;
//         res.json(favorite);
//       });
//     }
//   });
// });

.delete(function(req, res, next) {
  var userId = req.decoded._doc._id;

  Favorites.findOneAndUpdate({
    postedBy: userId
  }, {
    $pull: {
      dishes: req.params.dishObjectId
    }
  }, {
    new: true
  }, function(err, favorite) {
    if (err) throw err;

    res.json(favorite);
  });
});

module.exports = favoriteRouter;
