"use strict";

var express = require("express");
var passport = require("passport");
var router = express.Router();

router.get("/", function(req, res, next) {
    if (!req.user) {
        return res.redirect("/login");
    }

    return res.render("index", {
        title: "Management",
        user: req.user,
        messages: req.flash("info")
    });
});

router.get("/login", function(req, res, next) {
    res.render("login", {
        title: "Log in",
        messages: req.flash("error")
    });
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));

module.exports = router;
