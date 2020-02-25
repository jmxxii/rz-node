const jwt = require('jsonwebtoken');
const errorHandlers = require('../handlers/errors/errorHandler');

module.exports = (req, res, next) => {
    const jwtToken = req.header('x-jwt-token');
    if (!jwtToken) return errorHandlers.invalidInput(res, "Access denied. There was no token provided.");

    try {
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (exp) {
        return errorHandlers.invalidInput(res, "Invalid token");
    }
}