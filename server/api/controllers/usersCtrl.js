const _ = require("lodash");
const mongoose = require('mongoose');
const UserModel = require('../models/User');
const errorHandlers = require('../handlers/errors/errorHandler');
const successHandlers = require('../handlers/success/succesHandlers');
const validations = require('../validations/validations');
const hash = require('../validations/hash');

exports.signup = (req, res) => {
    const { username, first_name, last_name, email_id, password } = req.body;
    
    if (!username) return errorHandlers.invalidInput(res, "Username is missing");
    if (!first_name) return errorHandlers.invalidInput(res, "First name is missing.");
    if (!last_name) return errorHandlers.invalidInput(res, "Last name is missing.");
    if (!email_id) return errorHandlers.invalidInput(res, "Email is missing.");
    if (!password) return errorHandlers.invalidInput(res, "Password is missing.")
    
    UserModel.findOne({ email_id })
    .exec(async (userErr, user) => {
        if (userErr) return errorHandlers.dbErrorHandler(res, userErr);

        if (user) return errorHandlers.invalidInput(res, "User already exist.");

        // Email validation
        const isEmailValid = validations.emailValidator(email_id);
        if (!isEmailValid) return errorHandlers.invalidInput(res, "Email is invalid.");

        // Password Validation
        const isPasswordValid = validations.passwordValidator(password);
        if (isPasswordValid !== password) return errorHandlers.invalidInput(res, isPasswordValid);

        // Hash Password
        const hashedPassword = await hash.hashPassword(password);
   
        // New User
        let newUser = new UserModel(req.body);
        newUser.password = hashedPassword;

        newUser.save((newUserErr, newSavedUser) => {
            if (newUserErr) return errorHandlers.dbErrorHandler(res, newUserErr);
            console.log("Signup New: ", newSavedUser);
            const result = _.pick(newSavedUser, ["_id", "first_name", "last_name", "username", "email_id"]);
            return successHandlers.successfullResponse(res, result, "User registered successfully.");
        });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body; 

    if (!username) return errorHandlers.invalidInput(res, "Username is missing");
    if (!password) return errorHandlers.invalidInput(res, "Password is missing.")

    UserModel.findOne({username})
    .exec(async(userErr, user) => {
        
        if (userErr) return errorHandlers.dbErrorHandler(res, userErr); 
        
        if (!user) return errorHandlers.invalidInput(res, "Invalid username or password.");
        
        const compare = await hash.comparePasswords(password, user.password);
        if (!compare) return errorHandlers.invalidInput(res, "Invalid username or password.");

        const jwtToken = user.generateJwtToken();
        return successHandlers.successfullResponseWithToken(res, jwtToken, "Login successful.");
    });
};