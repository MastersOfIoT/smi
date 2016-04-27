"use strict";

var express = require("express");
var childProcess = require("child_process");
var router = express.Router();
var _ = require("lodash");
var ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

router.post("/check",
    ensureLoggedIn(),
    function(req, res) {
        if (!req.body.host) {
            return res.send("No host specified!");
        } else if (req.body.host.indexOf(";") != -1) {
            // Prevent command chaining
            return res.send("Hacking attempt blocked!");
        }

        var command = "ping -c 3 " + req.body.host;

        childProcess.exec(command, function(err, stdout, stderr) {
            if (err) {
                res.status(500);
                res.send(stderr);
            }

            var lines = stdout.split("\n");
            var packets = _.find(lines, function(line) {
                return line.indexOf("packets") > -1;
            });

            res.send(packets);
        });
    });

module.exports = router;
