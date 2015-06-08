var http = require("https");

var ImgurProto = {
  gallery: function(callback) {
    var options = {
      hostname: "api.imgur.com",
      path: "/3/gallery.json",
      headers: {
        "Authorization": ["Client-ID", this.clientId].join(" "),
        "Content-Type": "application/json"
      }
    };

    http.get(options, function(res) {
      var body = "";

      res.on("data", function(chunk) {
        body += chunk;
      });

      res.on("end", function() {
        try {
          var payload = JSON.parse(body);
          if (payload.success) {
            callback(null, payload.data || []);
          } else {
            callback(payload.data.error);
          }
        } catch (error) {
          callback(error);
        }
      });
    }).on("error", function(error) {
      callback(error);
    });
  }
};

module.exports = function(clientId) {
  return Object.create(ImgurProto, {
    clientId: {
      writable: false,
      configurable: false,
      enumerable: false,
      value: clientId
    }
  });
};
