"use strict";

var express = require("express");
var fs = require("fs");
var router = express.Router();
var ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

router.post("/getlog",
    ensureLoggedIn(),
    function(req, res) {
        var path = "/var/log/" + req.body.logname;

        fs.readFile(path, function(err, data) {
            if (err) {
                res.status(500);
                res.send("Error reading log file:\n" + err.message);
            } else {
                res.send(data);
            }
        });
    });

module.exports = router;
