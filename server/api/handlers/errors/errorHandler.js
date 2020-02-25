const mongoose = require('mongoose');

exports.dbErrorHandler = function(res, error) {
    return res.status(500).json({
        success: false,
        status: 500,
        message: error.message,
        error,
        result: null
    });
};

exports.invalidInput = function(res, error) {
    return res.status(400).json({
        success: false,
        status: 400,
        message: error,
        error,
        result: null
    });
};