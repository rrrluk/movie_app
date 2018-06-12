var express = require("express");
var app = express();
var request = require("request");

app.get("/", function (req, res) {
    res.render("search.ejs");
});

app.get("/results", function (req, res) {

    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            if (data["Response"] == "False") {
                res.render("error.ejs", {
                    data: data
                });
            } else {
                res.render("results.ejs", {
                    data: data
                });
            }



        }
    });

});

// START SERVER
app.listen(8002, "127.0.0.1", function () {
    console.log("Server START!")

});