const mongodb = require('mongodb');
const mongoose = require('mongoose');

module.exports = function() {
    const connectionString = "mongodb://jmxxii:jmxxii321@ds359847.mlab.com:59847/heroku_d30fkn4v";
    mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    });
    mongoose.connection.on('error', (err) => {
        console.log(err);
    });
    mongoose.connection.once('open', () => {
        console.log('Connected to MongoDB');
    });
}