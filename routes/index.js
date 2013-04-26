
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.internas = function(req, res){ res.render('internas'); };

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};
