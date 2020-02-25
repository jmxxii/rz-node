const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.hashPassword = (password) => new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds).then((hashedPassword) => {
        return resolve(hashedPassword);
    });
});

exports.comparePasswords = (passwordEntered, passwordHashed) => new Promise((resolve, reject) => {
    bcrypt.compare(passwordEntered, passwordHashed).then((result) => {
        return resolve(result);
    });
});