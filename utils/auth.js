"use strict";

var jsonfile = require("jsonfile");
var _ = require("lodash");

function getUsers(fulfill, reject) {
    if (!reject) {
        reject = function(err) {
            if (err) {
                throw err;
            }
        };
    }

    jsonfile.readFile("users.json", function(err, obj) {
        if (err) {
            return reject(err);
        }

        return fulfill(obj);
    });
}

function serializeUser(user, done) {
    done(null, user.id);
}

function deserializeUser(userId, done) {
    getUsers(function(users) {
        var user = _.find(users, function(u) {
            return u.id == userId;
        });

        if (!user) {
            return done({
                message: "Unknown user ID"
            });
        }

        return done(null, user);
    });
}

function checkLogin(username, password, fulfill, reject) {
    getUsers(function(users) {
        var user = _.find(users, function(user) {
            return user.username == username;
        });

        if (!user) {
            return reject({
                message: "Invalid username"
            });
        } else if (user.password == password) {
            return fulfill(user);
        }

        return reject({
            message: "Invalid password"
        });
    }, function(err) {
        return reject(err);
    });
}

module.exports = {
    checkLogin: checkLogin,
    serializeUser: serializeUser,
    deserializeUser: deserializeUser
};
