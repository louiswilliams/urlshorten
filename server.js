var express = require('express');
var logger = require('morgan');
var short = require('short');
var app = express();

short.connect('mongodb://localhost/short');

short.connection.on('error', function (err) {
  throw new Error(err);
});

app.use(logger('dev'));

app.get('/', function (req, res) {
  res.send();
});

app.get('/c/:url', function (req, res) {
  short.generate({
    URL: req.params.url
  }).then(function (doc) {
    console.log(">> Hashed >> " + doc.URL + " -> " + doc.hash);

    var url = req.protocol + "://" + req.get('host') + "/" + doc.hash;
    res.json({
      url: url,
      hash: doc.hash
    });
  }, function (err) {
    res.end(err);
  });
});

app.get('/g/:hash', function (req, res) {
  short.retrieve(req.params.hash).then(function (result) {
    console.log(">> Retrieved >> " + result.hash + " -> " + result.URL);
    res.json({
      url: result.URL
    });
  }, function (err) {
    console.log(err);
    res.json({url: null});
  })
});

app.get('/:hash', function (req, res) {
  console.log(req.params.hash);
  short.retrieve(req.params.hash).then(function (result) {
    console.log(">> Retrieved >> " + result.hash + " -> " + result.URL);
    res.redirect(addhttp(result.URL));
  }, function (err) {
    console.log(err);
    res.redirect('/');
  })
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(3003, function () {
  console.log("Started server on 3003");
});

function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
}