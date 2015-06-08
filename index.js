var app = require("express")();
var imgur = require("./imgur")(process.env.IMGUR_CLIENT_ID);

var PORT = process.env.PORT || 3000;

app.set("view engine", "jade");
app.use(require("morgan")("combined"));

app.locals.formatDate = function(timestamp) {
  var date = new Date();
  date.setTime(timestamp);
  return date.toUTCString();
};

app.get("/gallery.rss", function(req, res) {
  imgur.gallery(req.query, function(err, images) {
    if (err) {
      res.status(500).end(err);
    } else {
      res.render("gallery", {
        images: images
      });
    }
  });
});

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:%s", PORT);
});

